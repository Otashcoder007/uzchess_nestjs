import { Module } from '@nestjs/common';
import { ChatGateway } from './controllers/chat-gateway';

@Module({ providers: [ChatGateway] })
export class ChatModule {}
