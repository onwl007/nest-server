import { Document } from 'mongoose';

export interface Article extends Document {
  readonly _id: string;
  readonly title: string;
  readonly keyword: string;
  readonly description: string;
  readonly tag: [string];
  readonly category: string;
  readonly content: string;
  readonly renderedContent: string;
  readonly source: number;
  readonly from: string;
  readonly thumb: string;
  readonly state: number;
  readonly meta: {
    pvs: number;
    ups: number;
    comments: number;
  };
}
