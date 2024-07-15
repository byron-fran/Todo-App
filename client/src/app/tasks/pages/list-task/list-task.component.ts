import { Component, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { Task } from '../../interfaces/Task';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [TaskCardComponent, NavbarComponent],
  templateUrl: './list-task.component.html',

})
export class ListTaskComponent implements OnInit, OnDestroy {

  constructor(private taskServies: TasksService) { }

  public tasks: Task[] = []

  private tasksSubscription!: Subscription;

  ngOnInit(): void {
    this.tasksSubscription = this.taskServies.tasks.subscribe(tasks => {
      this.tasks = tasks
    })

  };
  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

}
