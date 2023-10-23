import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface IData {
  request?: string;
  response?: string;
}

@WebSocketGateway(3011, {
  cors: { origin: 'http://localhost:4200' },
})
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    // WebSocket gateway is initialized
    console.log('WebSocket gateway initialized');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): string {
    // Handle incoming WebSocket messages
    console.log('Message received: ', data.message);
    const message = data.message;
    console.log('Message received: ', message);
    // You can emit a response to all connected clients
    this.server.emit('response', { message: 'Received: ' + message });

    return 'Message received:  ' + message;
  }

  emitMessage(subscription: string, data: IData) {
    console.log('Emitting message: ', data);
    this.server.emit(subscription, data);
  }
}
