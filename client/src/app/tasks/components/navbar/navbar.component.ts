import { Component } from '@angular/core';
import { UsersService } from '../../../users/users.service';


@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private userServices : UsersService){};
  
  
  public onLogout() {
    this.userServices.logout()
  }

}
