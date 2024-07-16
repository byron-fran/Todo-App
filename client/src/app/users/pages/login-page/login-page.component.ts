import { Component, OnInit, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../users.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../../components/loading/loading.component';
@Component({
  selector: 'auth-login-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    LoadingComponent
  ],
  templateUrl: './login-page.component.html',

})
export class LoginPageComponent implements OnInit {

  public isLoading?: boolean

  ngOnInit(): void {
    this.userServices.authStatus$.subscribe(res => {
      if (res === 'checking') {
        this.isLoading = true
      }
      else {
        this.isLoading = false
      }
    })
  }

  constructor(
    private fb: FormBuilder,
    private userServices: UsersService,
    private router: Router
  ) { };

  public hide = signal(true);

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();

  }
  private _errorMessage = signal<string>('')
  public errorMessage = computed(() => this._errorMessage())
  public form: FormGroup = this.fb.group({

    email: ['', [Validators.required, Validators.minLength(2), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],


  });

  public onSubmit() {
    if (this.form.invalid) {

      return
    };

    const { email, password } = this.form.value

    return this.userServices.login(email, password)
      .subscribe({
        next: () => { this._errorMessage.set(this.userServices.errorLogin()) }
      })
  }
}
