import { Project as GQLProject } from '../../definitions';
import { IFileEntity, IProjectEntity } from '../interfaces';
import { File } from './File';

export class Project implements IProjectEntity {
  private readonly _id?: string;
  private readonly _name?: string;
  private readonly _description?: string;
  private readonly _leftImage: IFileEntity;
  private readonly _rightImage: IFileEntity;
  private readonly _link?: string;

  constructor(params: GQLProject) {
    this._id = params.id || undefined;
    this._name = params.name || undefined;
    this._description = params.description || undefined;
    this._leftImage = new File(params.leftImage || {});
    this._rightImage = new File(params.rightImage || {});
    this._link = params.link || undefined;
  }

  get Id(): string | undefined {
    return this._id;
  }

  get Name(): string | undefined {
    return this._name;
  }

  get Description(): string | undefined {
    return this._description;
  }

  get Link(): string | undefined {
    return this._link;
  }

  get LeftImage(): IFileEntity {
    return this._leftImage;
  }

  get RightImage(): IFileEntity {
    return this._rightImage;
  }
}
