import { TaskId } from '../value-objects/TaskId';

export class Task {
  constructor(
    private _id: TaskId,
    private _title: string,
    private _isCompleted: boolean = false
  ) {}

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  toggleCompleted() {
    this._isCompleted = !this._isCompleted;
  }
}
