import { Request } from 'koa';

export interface RequestWithParams extends Request {
  params: { [key: string]: string };
}
