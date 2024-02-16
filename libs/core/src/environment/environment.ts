/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEnvironment } from './iEnvironment';

export const Environment: IEnvironment = {
  // @ts-expect-error import.meta.env bad configured
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // @ts-expect-error import.meta.env bad configured
  token: import.meta.env.VITE_API_TOKEN,
};
