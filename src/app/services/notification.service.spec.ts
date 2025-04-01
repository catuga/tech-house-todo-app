import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { firstValueFrom } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty notifications', async () => {
    const notifications = await firstValueFrom(service.getNotifications());
    expect(notifications).toEqual([]);
  });

  it('should add a new notification', async () => {
    const message = 'Test notification';
    const type = 'success' as const;

    service.show(message, type);
    const notifications = await firstValueFrom(service.getNotifications());

    expect(notifications.length).toBe(1);
    expect(notifications[0].message).toBe(message);
    expect(notifications[0].type).toBe(type);
    expect(notifications[0].id).toBeDefined();
  });

  it('should remove a notification by id', async () => {
    service.show('Test notification');
    const initialNotifications = await firstValueFrom(service.getNotifications());
    const notificationId = initialNotifications[0].id;

    service.remove(notificationId);
    const updatedNotifications = await firstValueFrom(service.getNotifications());

    expect(updatedNotifications.length).toBe(0);
  });

  it('should maintain notification order', async () => {
    service.show('First notification');
    service.show('Second notification');
    service.show('Third notification');

    const notifications = await firstValueFrom(service.getNotifications());
    expect(notifications.length).toBe(3);
    expect(notifications[0].message).toBe('First notification');
    expect(notifications[1].message).toBe('Second notification');
    expect(notifications[2].message).toBe('Third notification');
  });
});
