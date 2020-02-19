import { Document } from 'mongoose';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class Tag extends Document {
  @IsString({ message: '字符串?' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: '字符串?' })
  description: string;

  @IsInt()
  count: number;
}
