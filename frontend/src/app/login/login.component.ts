import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error: string;
  returnUrl: string = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    //
    this.loginForm = this.formBuilder.group({
      "password": ['', Validators.required],
      "email": ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          if (data != null) {
            if (this.returnUrl != null)
              this.router.navigate([this.returnUrl]);
            else
              this.router.navigate(['home']);
          }
        },
        error => {
          console.log("errrr " + JSON.stringify(error.message))
          this.error = error.message;
          this.loading = false;
        });
  }




}
