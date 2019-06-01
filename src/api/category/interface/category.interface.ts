import { Document } from 'mongoose';

export interface Category extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
}
