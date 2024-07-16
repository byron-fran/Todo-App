import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UsersService } from '../../../users/users.service';

@Component({
  selector: 'app-task-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './task-main-layout.component.html',
  styleUrl: './task-main-layout.component.scss'

})
export class TaskMainLayoutComponent implements OnInit {
  
  constructor(private userServices: UsersService, private route : Router) { }
  ngOnInit(): void {
    this.userServices.authStatus$.subscribe( status => {
        if(status === 'notAuthenticated'){
          this.route.navigateByUrl('auth/login')
        }
    })
  }

}
