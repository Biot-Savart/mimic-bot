import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class DashboardService implements OnDestroy {
  private socket!: Socket;
  private errorSubject: Subject<Error> = new Subject<Error>();

  constructor() {
    this.socket = io('ws://localhost:3011');
  }

  // Listen for a specific event
  listen(eventName: string): Observable<any> {
    console.log('listening to ', eventName);
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  // Emit an event to the server
  emit(eventName: string, data: any): void {
    console.log('emit ', data);
    this.socket.emit(eventName, data);
  }

  // To get errors as an Observable
  get errors$(): Observable<Error> {
    return this.errorSubject.asObservable();
  }

  ngOnDestroy(): void {
    // Cleanup logic when service is destroyed
    this.socket.disconnect();
    this.errorSubject.complete();
  }
}
