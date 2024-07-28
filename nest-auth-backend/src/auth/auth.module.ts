import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService,JwtService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    
  ],
})
export class AuthModule {}
