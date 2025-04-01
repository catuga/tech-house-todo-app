import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }

  removeNotification(id: number) {
    this.notificationService.remove(id);
  }
}