import { Document } from 'mongoose';

export interface Setting extends Document {
  readonly _id: string;
  readonly site: {
    readonly logo: string;
    readonly welcome: string;
    readonly links: Array<{
      readonly id: string;
      readonly name: string;
      readonly avatar: string;
      readonly slogan: string;
      readonly site: string;
      }>;
  };
   readonly personal: {
    readonly slogan: string;
    readonly description: string;
    readonly tag: [string];
    readonly hobby: [string];
    readonly skill: [string];
    readonly location: string;
    readonly company: string;
    readonly user: string;
    readonly github: object;
  };
}
