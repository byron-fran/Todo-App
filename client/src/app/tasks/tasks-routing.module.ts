import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ListTaskComponent } from "./pages/list-task/list-task.component";
import { FormTaskComponent } from "./pages/form-task/form-task.component";
import { TaskMainLayoutComponent } from "./pages/task-main-layout/task-main-layout.component";
import { FavoritesComponent } from "./pages/favorites/favorites.component";

const routes : Routes = [
    {
        path : '',
        component : TaskMainLayoutComponent,
        children : [
            {path : 'list', component : ListTaskComponent},
            {path : 'form', component : FormTaskComponent},
            {path : 'favorites', component : FavoritesComponent},
            {path : 'update/:id', component : FormTaskComponent},
            {path : '**', redirectTo : 'list'}
        ]
    },
    
];

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class TasksRoutingModdule {}