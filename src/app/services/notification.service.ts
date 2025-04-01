import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private nextId = 0;

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const notification: Notification = {
      message,
      type,
      id: this.nextId++
    };

    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, notification]);

    setTimeout(() => {
      this.remove(notification.id);
    }, 5000);
  }

  remove(id: number) {
    const currentNotifications = this.notifications.value;
    this.notifications.next(
      currentNotifications.filter(notification => notification.id !== id)
    );
  }
}