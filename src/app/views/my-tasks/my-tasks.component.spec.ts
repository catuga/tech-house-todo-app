import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTasksComponent } from './my-tasks.component';
import { TasksService } from '../../services/tasks.service';
import { of, throwError } from 'rxjs';

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;
  let tasksService: jasmine.SpyObj<TasksService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TasksService', ['getTasks', 'createTask', 'deleteTask']);
    spy.getTasks.and.returnValue(of({
      items: [],
      total: 0,
      totalPages: 2
    }));

    await TestBed.configureTestingModule({
      imports: [MyTasksComponent],
      providers: [
        { provide: TasksService, useValue: spy }
      ]
    }).compileComponents();

    tasksService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load tasks on init', () => {
    expect(tasksService.getTasks).toHaveBeenCalledWith(1);
  });

  it('should handle error when loading tasks', () => {
    tasksService.getTasks.and.returnValue(throwError(() => new Error('Test error')));
    component.loadTasks();
    expect(component.hasError()).toBe(true);
  });

  it('should change page', () => {
    // Simulate initial load
    component.ngOnInit();
    fixture.detectChanges();

    // Change page
    component.changePage(2);
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    expect(tasksService.getTasks).toHaveBeenCalledWith(2);
  });
});