import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { Subscription } from 'rxjs';
import { TasksService } from '../../tasks.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [TaskCardComponent, NavbarComponent],
  templateUrl: './favorites.component.html',

})
export class FavoritesComponent implements OnInit, OnDestroy {

  constructor(private taskServies: TasksService) { }
  public favorites: Task[] = []
  private favoritesSubscription!: Subscription;

  ngOnInit(): void {
    this.favoritesSubscription = this.taskServies.tasks.subscribe(tasks => {
      this.favorites = tasks.filter(task => task.is_favorite)
    })
  };

  ngOnDestroy(): void {
    if (this, this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe()

    }
  }
}
