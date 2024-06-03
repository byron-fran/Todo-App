import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TasksService } from '../../tasks.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  constructor(private tasksServices : TasksService) {}

  @Input('task')
  public task : Task = {} as Task

  public onDelete(id : string) {
    this.tasksServices.deleteTaskById(id)?.subscribe()
  }

}
