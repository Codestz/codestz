import { IFileEntity } from './iFile';

export interface IProjectEntity {
  Id?: string;
  Name?: string;
  Description?: string;
  LeftImage?: IFileEntity;
  RightImage?: IFileEntity;
  Link?: string;
}
