import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from '../utils/types';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  getPaginatedTodos(page: number, limit: number): Observable<{ todos: Todo[], total: number }> {
    const params = {
      _page: page.toString(),
      _limit: limit.toString()
    };

    return this.http.get<Todo[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map((response: HttpResponse<Todo[]>) => {
          const total = Number(response.headers.get('X-Total-Count'));
          return {
            todos: response.body || [],
            total
          };
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }
}
