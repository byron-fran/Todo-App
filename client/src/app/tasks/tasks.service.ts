import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Task, TaskForm } from './interfaces/Task';
import { BehaviorSubject, Observable, catchError, map, of, tap, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {

    this.listTasks()
      .subscribe(res => this._tasks.next([...res]))
  };

  private _tasks = new BehaviorSubject<Task[]>([]);

  public get tasks() {
    return this._tasks.asObservable()
  }

  public createTask(task: Partial<Task>): Observable<Task | undefined> {

    return this.http.post<Task>('/tasks/', task)
      .pipe(
        map(task => {
          const tasks = this._tasks.getValue()
          this._tasks.next([...tasks, task])
          return task
        }),
        catchError((error: HttpErrorResponse) => of(undefined))
      )

  };

  public listTasks(): Observable<Task[]> {

    return this.http.get<Task[]>('/tasks/')
      .pipe(
        map(tasks => tasks),
        catchError((error: HttpErrorResponse) => of([]))
      )
  };

  public getTaskById(id: string): Observable<Task | undefined> {

    return this.http.get<Task>(`/tasks/${id}/`)
      .pipe(
        map(task => task),
        catchError((error: HttpErrorResponse) => of(undefined))
      )
  }

  public deleteTaskById(id: string) {

    return this.http.delete(`/tasks/${id}/`)
      .pipe(
        tap(() => {
          const tasks = this._tasks.getValue().filter(task => task.id !== id)
          this._tasks.next(tasks)
        })
      )

  };

  public updateTaskById(id: string, task: TaskForm): Observable<Task | string> {

    return this.http.put<Task>(`/tasks/${id}/`, task)
      .pipe(
        tap(task => {
          const tasks = this._tasks.getValue().map(t => t.id === task.id ? task : t)
          this._tasks.next(tasks)
        }),
        catchError((error: HttpErrorResponse) => of(error.error.message))
      )
  }

  public handleFavorite(id: string): Observable<string> {

    return this.http.put<string>(`/favorites/${id}/`, {})
      .pipe(
        tap(message => {

          const taskfind = this._tasks.getValue().find(task => task.id === id)

          if (taskfind) {
            const tasksUpdate = this._tasks.getValue().map(task => {

              if (taskfind.id === task.id) return { ...task, is_favorite: !task.is_favorite }
              return task

            });
            this._tasks.next(tasksUpdate)
          }
        })
      )
  };

  public handleDone(id: string): Observable<string> {

    return this.http.put<string>(`/done/${id}/`, {})
      .pipe(
        tap(message => {
          const taskfind = this._tasks.getValue().find(task => task.id === id)

          if (taskfind) {
            const tasksUpdate = this._tasks.getValue().map(task => {

              if (taskfind.id === task.id) return { ...task, done: !task.done }
              return task

            });
            this._tasks.next(tasksUpdate)
          }
        })
      )
  };

}
