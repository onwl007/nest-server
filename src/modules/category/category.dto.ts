import { IsString, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export class Category extends Document {
  @IsString({ message: '字符串?' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: '字符串?' })
  description: string;
}
