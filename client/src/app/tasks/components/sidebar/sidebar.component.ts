import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

interface MenuLink {
  title: string,
  url: string,
  icon?: string

}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  public listMenuLinks: MenuLink[] = [
    {
      title: 'Tasks',
      url: '/tasks/list'
    },
    {
      title: 'Favorites',
      url: '/tasks/favorites'
    },
    {
      title: 'New task',
      url: '/tasks/form'
    },

  ]
}
