import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    LocalAuthGuard,
  ],
})
export class AuthModule {}
