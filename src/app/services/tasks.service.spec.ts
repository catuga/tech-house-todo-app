import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { NotificationService } from './notification.service';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['show']);
    TestBed.configureTestingModule({
      providers: [
        TasksService,
        { provide: NotificationService, useValue: notificationSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should get tasks', () => {
    const mockResponse = {
      items: [{ id: 1, title: 'Test Task', completed: false, description: 'test', userId: 1 }],
      total: 1,
      totalPages: 1
    };

    service.getTasks(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create task', () => {
    const newTask = { title: 'New Task', description: 'test' };
    const mockResponse = { id: 1, ...newTask, completed: false, userId: 1 };

    service.createTask(newTask).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(notificationService.show).toHaveBeenCalledWith('Tarea creada exitosamente', 'success');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});