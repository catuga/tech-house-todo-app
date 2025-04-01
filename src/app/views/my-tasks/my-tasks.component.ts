import { Component, inject, OnInit, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { NewTask, Task } from '../../utils/types';
import { TaskComponent } from '../../components/task/task.component';
import { finalize, tap } from 'rxjs';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-my-tasks',
  imports: [TaskComponent, AddTaskModalComponent],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  tasks: Task[] = [];
  isLoading = signal(false);
  hasError = signal(false);
  showModal = signal(false);

  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor() { }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.loadTasks();
  }

  saveTask(newTask: NewTask) {
    this.isLoading.set(true);
    
    this.tasksService.createTask(newTask).subscribe({
      next: (response) => {
        this.currentPage = 1;
        this.loadTasks();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al crear la tarea:', error);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
  
  loadTasks() {
    this.isLoading.set(true);
    this.hasError.set(false);
    
    this.tasksService.getTasks(this.currentPage)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.tasks = response.items;
          this.totalItems = response.total;
          this.totalPages = response.totalPages;
        },
        error: (error) => {
          console.error('Error:', error);
          this.hasError.set(true);
        }
      });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTasks();
  }

  retryLoad(): void {
    this.hasError.set(false);
    this.loadTasks();
  }

  openAddTaskModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  deleteTask(id: number) {
    this.isLoading.set(true);
    
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        if (this.tasks.length === 1 && this.currentPage > 1) {
          this.currentPage--;
        }
        this.loadTasks();
      },
      error: (error) => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}
