import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewTask } from '../../utils/types';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss'
})
export class AddTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<NewTask>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value);
    } else {
      this.markFormGroupTouched(this.taskForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get titleControl() { return this.taskForm.get('title'); }
  get descriptionControl() { return this.taskForm.get('description'); }
}
