import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { Task } from '../../utils/types';
import { CapitalizeFirstPipe } from '../../utils/capitalize-first.pipe';
import { TruncatePipe } from '../../utils/truncate.pipe';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent, CapitalizeFirstPipe, TruncatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const mockTask: Task = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
      userId: 1
    };
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toBe('Test Task');
  });

  it('should display task description', () => {
    const descriptionElement = fixture.nativeElement.querySelector('p');
    expect(descriptionElement.textContent).toBe('Test Description');
  });
});