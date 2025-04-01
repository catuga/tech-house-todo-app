import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateTaskResponse, NewTask, TasksResponse } from '../utils/types';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  getTasks(page: number): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.apiUrl, {
      params: new HttpParams().set('page', page.toString())
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error al cargar las tareas';
        
        if (error.status === 0) {
          errorMessage = 'Error de conexión. Verifica la URL del servidor y tu conexión a internet';
        } else if (error.status === 404) {
          errorMessage = 'Recurso no encontrado';
        }

        this.notificationService.show(errorMessage, 'error');
        return throwError(() => error);
      })
    );
  }

  createTask(newTask: NewTask): Observable<CreateTaskResponse> {
    return this.http.post<CreateTaskResponse>(this.apiUrl, newTask).pipe(
      tap(() => {
        this.notificationService.show('Tarea creada exitosamente', 'success');
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error al crear la tarea';
        
        if (error.status === 0) {
          errorMessage = 'Error de conexión. Verifica la URL del servidor y tu conexión a internet';
        } else if (error.status === 400) {
          errorMessage = 'Datos inválidos para crear la tarea';
        }

        this.notificationService.show(errorMessage, 'error');
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.notificationService.show('Tarea eliminada exitosamente', 'success');
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error al eliminar la tarea';
        
        if (error.status === 0) {
          errorMessage = 'Error de conexión. Verifica la URL del servidor y tu conexión a internet';
        } else if (error.status === 404) {
          errorMessage = 'La tarea que intentas eliminar no existe';
        }

        this.notificationService.show(errorMessage, 'error');
        return throwError(() => error);
      })
    );
  }
}
