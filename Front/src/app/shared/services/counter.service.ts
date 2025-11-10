import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private counter: number = 0;

  incrementCounter(): void {
    this.counter++;
  }

  getCounter(): number {
    return this.counter;
  }

  isAccessBlocked(): boolean {
    return this.counter > 20;
  }
}
