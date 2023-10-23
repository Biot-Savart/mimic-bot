// web-socket-io.adapter.ts

import { Inject } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class WebSocketIoAdapter extends IoAdapter {
  constructor(@Inject('WS_PORT') private readonly port: number) {
    // console.log('port', port);
    super();
    // this.createIOServer(port);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    // You can specify the port here
    console.log('port', this.port);
    const server = super.createIOServer(this.port, options);

    // You can also add any additional configuration here
    return server;
  }
}
