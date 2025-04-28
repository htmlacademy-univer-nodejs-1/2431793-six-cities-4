import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public email: string;
  public avatarUrl: string;
  public name: string;
  public type: UserType;
  public password: string;
}
