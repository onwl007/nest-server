import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
  readonly role: string;
  readonly password: string;
  readonly mute: boolean;
}
