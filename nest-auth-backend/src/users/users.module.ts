import { UsersController } from './usersController';
import { UserService } from './users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UserService,JwtService],
  imports: [TypeOrmModule.forFeature([User])],
  exports:[UserService,TypeOrmModule]
})
export class UsersModule {}
