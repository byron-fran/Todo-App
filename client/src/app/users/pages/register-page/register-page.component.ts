import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../users.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private userServices: UsersService,
    private router : Router
  ) { };
  
  private _errorMessages  = signal<string[]>([])
  public errorMessages = computed(() => this._errorMessages());

  public form: FormGroup = this.fb.group({

    username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],

  });


  public onSubmit() {
    console.log(this.form.value)
    if(this.form.invalid){
      return
    }
    this.userServices.register(this.form.value)
      .subscribe({
        next : () => {
          this._errorMessages.set(this.userServices.errorRegister())
        },
        error  : (error) => {
          console.log(error)
        }
      })

  }

}
