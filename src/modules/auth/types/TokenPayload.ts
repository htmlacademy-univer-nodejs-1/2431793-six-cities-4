import { UserType } from '../../../types/user-type.enum.js';

export type TokenPayload = {
  email: string;
  name: string;
  type: UserType;
  id: string;
};
