import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitUpdateUserService {
  public updateUser: EventEmitter<null> = new EventEmitter();
  constructor() { }
  doUpdateUser() {
    this.updateUser.emit();
  }
}
