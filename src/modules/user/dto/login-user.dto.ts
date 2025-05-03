import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateLoginUserMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsNotEmpty({ message: CreateLoginUserMessage.email.invalidFormat })
  @IsEmail({}, { message: CreateLoginUserMessage.email.invalidFormat })
  public email: string;

  @IsNotEmpty({ message: CreateLoginUserMessage.password.invalidFormat })
  @IsString({ message: CreateLoginUserMessage.password.invalidFormat })
  public password: string;
}
