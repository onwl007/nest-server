import { Document } from 'mongoose';

export interface Tag extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
}
