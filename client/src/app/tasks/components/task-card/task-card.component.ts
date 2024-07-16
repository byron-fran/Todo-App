import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TasksService } from '../../tasks.service';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatCheckboxModule, 
    MatMenuModule, 
    MatButtonModule, 
    MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  constructor(private tasksServices: TasksService) { }
  
  @Input('task')
  public task: Task = {} as Task


  public onDelete(id: string) {
    this.tasksServices.deleteTaskById(id)?.subscribe()
  };

  public onClickDone(id: string) {
    this.tasksServices.handleDone(id).subscribe()
  };

  public onClickFavorite(id: string) {

    this.tasksServices.handleFavorite(id).subscribe()
  }

}
