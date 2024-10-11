import { v4 as uuidv4 } from 'uuid';

export class UserId {
  constructor(public readonly value: string) {
    if (!value) {
      this.value = uuidv4();
    }
  }
}
