import { TaskId } from '../value-objects/TaskId';

export class Task {
  constructor(
    private readonly _id: TaskId,
    private _title: string,
    private _description: string,
    private _isCompleted: boolean = false,
    private _userId: string
  ) {}

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  get userId() {
    return this._userId;
  }

  updateTitle(title: string) {
    this._title = title;
  }

  updateDescription(description: string) {
    this._description = description;
  }

  updateUserId(userId: string) {
    this._userId = userId;
  }

  toggleCompleted() {
    this._isCompleted = !this._isCompleted;
  }

}
