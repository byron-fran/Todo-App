import { Component } from '@angular/core';
import { UsersService } from '../../../users/users.service';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private userServices : UsersService){};
  
  
  public onLogout() {
    this.userServices.logout()
  }

}
