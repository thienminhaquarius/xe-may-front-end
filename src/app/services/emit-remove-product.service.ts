import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitRemoveProductService {

  public updateDashboard: EventEmitter<string> = new EventEmitter();
  constructor() { }

  doUpdateDashboard(id: string) {
    this.updateDashboard.emit(id);
  }
}
