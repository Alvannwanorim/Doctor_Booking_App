import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  onlineUsers: { userId: string; socketId: string }[] = [];

  handleConnection(socket: Socket) {
    console.log('New Connection', socket.id);
  }

  handleDisconnect(socket: Socket) {
    this.onlineUsers = this.onlineUsers.filter(
      (user) => user.socketId !== socket.id,
    );
    this.server.emit('getOnlineUsers', this.onlineUsers);
  }

  @SubscribeMessage('addNewUser')
  handleAddNewUser(socket: Socket, userId: string) {
    const isOnlineUser = this.onlineUsers.some(
      (user) => user.userId === userId,
    );
    if (!isOnlineUser) {
      this.onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    this.server.emit('getOnlineUsers', this.onlineUsers);
  }
  @SubscribeMessage('sendMessage')
  handleSendMessage(socket: Socket, message: any) {
    const user = this.onlineUsers.find(
      (user) => user.userId === message.recipientId,
    );
    if (user) {
      this.server.to(user.socketId).emit('getMessage', message);
    }
  }
}
