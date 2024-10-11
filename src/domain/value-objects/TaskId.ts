import { v4 as uuidv4 } from 'uuid';

export class TaskId {
  constructor(private _value: string = uuidv4()) {}

  get value() {
    return this._value;
  }
}
