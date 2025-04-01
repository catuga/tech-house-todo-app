import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../utils/types';
import { CapitalizeFirstPipe } from '../../utils/capitalize-first.pipe';
import { TruncatePipe } from '../../utils/truncate.pipe';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CapitalizeFirstPipe, TruncatePipe],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() deleted = new EventEmitter<number>();

  onDelete() {
    this.deleted.emit(this.task.id);
  }
}
