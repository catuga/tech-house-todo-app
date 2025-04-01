import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskModalComponent } from './add-task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskModalComponent, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('description')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const form = component.taskForm;
    expect(form.valid).toBeFalsy();

    form.controls['title'].setValue('Test Task');
    form.controls['description'].setValue('Test Description');
    expect(form.valid).toBeTruthy();
  });

  it('should validate title length', () => {
    const titleControl = component.taskForm.get('title');
    
    titleControl?.setValue('ab'); // too short
    expect(titleControl?.valid).toBeFalsy();

    titleControl?.setValue('a'.repeat(51)); // too long
    expect(titleControl?.valid).toBeFalsy();

    titleControl?.setValue('Valid Title'); // valid length
    expect(titleControl?.valid).toBeTruthy();
  });

  it('should validate description length', () => {
    const descriptionControl = component.taskForm.get('description');
    
    descriptionControl?.setValue('short'); // too short
    expect(descriptionControl?.valid).toBeFalsy();

    descriptionControl?.setValue('a'.repeat(501)); // too long
    expect(descriptionControl?.valid).toBeFalsy();

    descriptionControl?.setValue('Valid description with enough characters'); // valid length
    expect(descriptionControl?.valid).toBeTruthy();
  });

  it('should emit close event', () => {
    spyOn(component.closeModal, 'emit');
    component.onClose();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should emit save event with form values when valid', () => {
    spyOn(component.save, 'emit');
    const taskData = {
      title: 'Test Task',
      description: 'Test Description'
    };

    component.taskForm.patchValue(taskData);
    component.onSave();
    expect(component.save.emit).toHaveBeenCalledWith(taskData);
  });

  it('should not emit save event when form is invalid', () => {
    spyOn(component.save, 'emit');
    component.onSave();
    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched when saving invalid form', () => {
    const titleControl = component.taskForm.get('title');
    const descriptionControl = component.taskForm.get('description');

    component.onSave();
    expect(titleControl?.touched).toBeTruthy();
    expect(descriptionControl?.touched).toBeTruthy();
  });
});
