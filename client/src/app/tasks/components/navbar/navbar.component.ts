import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users/users.service';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { debounceTime, Subject } from 'rxjs';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(
    private userServices: UsersService,
    private tasksServices: TasksService
  ) { };

  private searchSubject = new Subject<string>();
  
  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.tasksServices.listTasks(value).subscribe(
        tasks => this.tasksServices.updateTasks(tasks))
    })
  }

  public onLogout() {
    this.userServices.logout()
  };

  public onSearch(q: string) {
    this.searchSubject.next(q)
  }

}
