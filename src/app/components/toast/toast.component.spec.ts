import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { NotificationService } from '../../services/notification.service';
import { of } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['getNotifications', 'remove']);
    notificationServiceSpy.getNotifications.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    }).compileComponents();

    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty notifications', () => {
    expect(component.notifications).toEqual([]);
  });

  it('should update notifications when service emits new ones', () => {
    const mockNotifications = [
      { id: 1, message: 'Success message', type: 'success' as const },
      { id: 2, message: 'Error message', type: 'error' as const }
    ];
    notificationService.getNotifications.and.returnValue(of(mockNotifications));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.notifications).toEqual(mockNotifications);
  });

  it('should call remove on notification service when removing a notification', () => {
    const notificationId = 1;
    component.removeNotification(notificationId);
    expect(notificationService.remove).toHaveBeenCalledWith(notificationId);
  });
});
