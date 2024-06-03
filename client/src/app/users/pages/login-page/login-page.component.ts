import { Component, OnInit, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../users.service';


@Component({
  selector: 'auth-login-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-page.component.html',

})
export class LoginPageComponent implements OnInit {

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private userServices: UsersService,
    private router: Router
  ) {
    
     
   }  

  private _errorMessage  = signal<string>('')
  public errorMessage = computed(() => this._errorMessage())
  public form: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.minLength(2), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],


  });

  public onSubmit() {
    if(this.form.invalid){

      return
    };

    const { email, password } = this.form.value
    
    return this.userServices.login(email, password)
      .subscribe({
        next : () => {this._errorMessage.set(this.userServices.errorLogin())}
      })
  }
}
