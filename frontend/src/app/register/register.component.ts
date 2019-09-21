import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error;
  message;

  public get f() {
    return this.registerForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
    private router: Router, private authenticationService: AuthenticationService, private userService: UserService) {

    if (this.authenticationService.currentUserValue) {
      // redirect to home if already logged in
      this.router.navigate(['/home']);
    }
  }
  debouncer: any;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])], //, this.uniqueEmailValidator.bind(this)
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  uniqueEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        this.userService.findbyemail(control.value).pipe(first()).subscribe(
          data => {
            if (data['success'] === 1) {
              resolve(null);
            }
            else {
              //this.error = data['msg'];
              resolve({ 'usernameInUse': true });
            }
          }
        )
      }
    );
    return promise;
  }

  onSubmit() {
    this.submitted = true;
    this.error = null;
    this.message = null;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.alertService.success('Registration successful', true);
          if (data['success'] === 1) {
            this.message = data['msg']
            this.router.navigate(['/login']);
          }
          else {
            this.error = data['msg'];
            this.loading = false;
          }
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;

        })
  }
}
