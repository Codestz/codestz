import Axios, { AxiosInstance } from 'axios';
import { GraphQLClient } from 'graphql-request';
import { Environment } from '../environment';
import { IHttp, IRequestGraphQL, IRequestOption } from './interfaces/';

export class Http implements IHttp {
  axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create();
  }

  request<T>(requestOption: IRequestOption): Promise<T> {
    return this.axios
      .request({
        method: requestOption.method,
        url: requestOption.url,
        data: requestOption.body,
        headers: requestOption.headers,
      })
      .then((res) => res.data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestGraphQL<T, T2 = any>(request: IRequestGraphQL<T2>): Promise<T> {
    const client = new GraphQLClient(request.url, {
      headers: {
        Authorization: Environment.token,
      },
    });
    return client.request<T>(request.requestDocument, request.variables || {}).catch((e) => e);
  }
}
