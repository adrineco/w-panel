import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const user = await this.usersService.create(registerDto);
    const { password: _, ...result } = user;
    
    return this.login(result);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      // Por segurança, não revela se o email existe
      return { message: 'Se o email existir, um link de recuperação será enviado' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hora

    await this.usersService.setResetPasswordToken(
      user.email,
      resetToken,
      resetExpires,
    );

    await this.mailService.sendPasswordReset(user.email, resetToken);

    return { message: 'Se o email existir, um link de recuperação será enviado' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByResetToken(resetPasswordDto.token);
    
    if (!user || !user.resetPasswordExpires) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    if (new Date() > user.resetPasswordExpires) {
      throw new BadRequestException('Token expirado');
    }

    await this.usersService.updatePassword(user.id, resetPasswordDto.password);
    await this.usersService.clearResetPasswordToken(user.id);

    return { message: 'Senha redefinida com sucesso' };
  }
}
