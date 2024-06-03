import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../tasks.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTaskComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private tasksServices: TasksService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { };

  ngOnInit(): void {

    this.activateRouter.params.subscribe(value => {
      if (value['id']) {

        this.id = value['id'];
        this.tasksServices.getTaskById(value['id']).subscribe({
          next : task => {
            if (task) {
              this.form.setValue(
                {
                  title: task?.title ,
                  description: task?.description,
                  done: task?.done || null
                }
              )
            }
          }
        })

      };
      
      
    });

  }
  public id: string = '';
  public form = this.fb.group({

    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2000)]],
    done: [false]

  })

  public onSubmit() {
    
    if (this.form.invalid) return

    const newTask: Task = {
      title: this.form.value.title || '',
      description: this.form.value.description || '',
      id: this.id
    };

    if (this.id) {
      this.tasksServices.updateTaskById(this.id, newTask).subscribe({
        next: () => this.router.navigateByUrl('/tasks/list')
      })
      return
    }

    this.tasksServices.createTask(newTask).subscribe(
      {
        next: () => this.router.navigateByUrl('/tasks/list')
      }
    )
  }
}
