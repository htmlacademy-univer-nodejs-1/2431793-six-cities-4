import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserType } from '../../../types/index.js';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsNotEmpty({ message: CreateUserMessages.email.invalidFormat })
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarUrl.invalidFormat })
  @Matches(/\.(jpg|png)$/i, {
    message: CreateUserMessages.avatarUrl.invalidExtension,
  })
  public avatarUrl?: string;

  @IsNotEmpty({ message: CreateUserMessages.name.invalidFormat })
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsNotEmpty({ message: CreateUserMessages.type.invalidType })
  @IsEnum(UserType, { message: CreateUserMessages.type.invalidType })
  public type: UserType;

  @IsNotEmpty({ message: CreateUserMessages.password.invalidFormat })
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
