import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ type: String, unique: true, required: true })
  public email: string;

  @prop({ type: String, required: false, default: '' })
  public avatarUrl: string;

  @prop({ type: String, required: true, default: '' })
  public name: string;

  @prop({ type: String, required: true, default: '' })
  private password?: string;

  @prop({ type: String, enum: UserType, required: true })
  public type: UserType;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
