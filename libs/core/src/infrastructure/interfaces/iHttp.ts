/* eslint-disable @typescript-eslint/no-explicit-any */
import { Method } from 'axios';
import { RequestDocument } from 'graphql-request';

export interface IRequestOption {
  readonly method: Method;
  readonly url: string;
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, unknown>;
  readonly body?: Record<string, unknown>;
}

export interface IRequestGraphQL<T2> {
  url: string;
  requestDocument: RequestDocument;
  variables?: T2;
}

export interface IHttp {
  requestGraphQL<T, T2 = any>(_params: IRequestGraphQL<T2>): Promise<T>;
  request<T>(_requestOption: IRequestOption): Promise<T>;
}
