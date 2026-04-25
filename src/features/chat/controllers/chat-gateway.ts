import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthenticationGuard } from '../../../core/guards/authentication.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';
import { MessageDto } from '../dtos/message.dto';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('uzchess-client')
  @UseGuards(AuthenticationGuard)
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  handleMessages(@MessageBody() message: MessageDto) {
    this.server.emit('uzchess-server', message);
    return message;
  }

  handleConnection(client: any, ...args): any {
    console.log(client.client.request);
  }
}
