import { File as GQLFile } from '../../definitions';
import { IFileEntity } from '../interfaces';

export class File implements IFileEntity {
  private readonly _downloadUrl?: string;

  constructor(params: GQLFile) {
    this._downloadUrl = params.downloadUrl || undefined;
  }

  get DownloadUrl(): string | undefined {
    return this._downloadUrl;
  }
}
