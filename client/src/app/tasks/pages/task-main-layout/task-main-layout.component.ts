import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UsersService } from '../../../users/users.service';

@Component({
  selector: 'app-task-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './task-main-layout.component.html',
  styleUrl: './task-main-layout.component.scss'

})
export class TaskMainLayoutComponent {
  
  constructor(private userServices: UsersService) { }

}
