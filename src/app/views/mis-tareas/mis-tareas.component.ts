import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Todo } from '../../utils/types';
import { TareaComponent } from '../../components/tarea/tarea.component';

@Component({
  selector: 'app-mis-tareas',
  imports: [TareaComponent],
  templateUrl: './mis-tareas.component.html',
  styleUrls: ['./mis-tareas.component.scss']
})
export class MisTareasComponent implements OnInit {
  private tasksService = inject(TasksService);
  todos: Todo[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  isLoading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.tasksService.getPaginatedTodos(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: data => {
          this.todos = data.todos;
          this.totalItems = data.total;
        },
        error: err => console.error('Error al cargar las tareas:', err)
      });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTodos();
  }
}
