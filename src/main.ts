import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //Enable CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with the actual URL of your Angular app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.enableCors(); // Enable CORS for all origins

  // Enable WebSocket support
  //app.useWebSocketAdapter(new WsAdapter(app));

  //Use validation pipe or other middleware if needed
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(3010);
}
bootstrap();
