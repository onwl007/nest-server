import { Document } from 'mongoose';

export interface Comment extends Document {
  readonly _id: string;
  readonly content: string;
  readonly renderedContent: string;
  readonly state: number;
  readonly spam: boolean;
  readonly author: string;
  readonly ups: number;
  readonly sticky: number;
  readonly type: number;
  readonly article: string;
  readonly meta: {
    readonly ip: string;
    readonly location: object;
    readonly ua: string;
    readonly refer: string;
  };
  readonly parent: string;
  readonly forward: string;
}
