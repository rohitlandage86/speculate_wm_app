import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  password: string = '';
  passwordVisible: boolean = false;
  isSubmitted = false
 
  constructor(private fb: FormBuilder,    private _sharedService: SharedService,   private router: Router, private _authService: AuthService,    private _toastrService: ToastrService,) {}
  
  ngOnInit(): void {
    this.createForm();

  }
  createForm() {
    this.form = this.fb.group({
      email_id: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  get controls() {
    return this.form.controls;
  }
  login() {
    this.isSubmitted = true; // Set isSubmitted to true when the login process starts.
    if (this.form.valid) {

      this._authService.login(this.form.value).subscribe({
        next: (res: any) => {
          // console.log('res', res);
          this.isSubmitted = false;
          if (res.status == 200) {
            localStorage.setItem('accessToken', res.token);
            localStorage.setItem("untitled_id", res.data.untitled_id);
            localStorage.setItem("email_id", res.data.email_id);
            localStorage.setItem('tokenExpiresIn', res.tokenExpiresIn);
            localStorage.setItem('data',  JSON.stringify(res.data));
            localStorage.setItem('isLogin', 'true');
            this._sharedService.setIsLogin(true);
            this._toastrService.clear();
            this.router.navigate(['/gambler', { outlets: { sub_Menu: 'dashboard' } }]);
            this._toastrService.success(res.message);
           
          }
        },
        error: (err: any) => {
          this.isSubmitted = false;
          console.log(err);
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        },
        // complete: () => {
        //   console.log('Complete callback executed'); // Add this line for debugging
        //   this.isSubmitted = false; // Set isSubmitted to false when the login process is complete.
        // }

      });
    } else {
      this.isSubmitted = false; // Set isSubmitted to false in case of form validation failure.
      this.form.markAllAsTouched();
      this._toastrService.warning('Fill required fields');
    }
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
