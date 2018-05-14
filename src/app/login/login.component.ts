import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  returnUrl: string;
  loginErrInfo = false;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit() {
    const fb = new FormBuilder;
    this.formModel = fb.group({
      uwid: ['', [Validators.required]],
      upwd: ['', [Validators.required]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log(this.formModel.value);
    const uid = this.formModel.value.uwid;
    const password = this.formModel.value.upwd;
    this.authService.login(uid, password).subscribe(data => {
      console.log(data);
      if (data['result'] === 1) {
        this.loginErrInfo = false;
        this.setSession(data);
      } else {
        this.loginErrInfo = true;
      }
    });
  }

  setSession(data) {
    // console.log(new Date(data.issuedAt * 1000));
    // console.log(new Date(data.expiresAt * 1000));
    // const expiresAt = data.expiresAt * 1000;
    localStorage.setItem('token', data.token);
    localStorage.setItem('uwid', data.uwid);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    this.router.navigate([this.returnUrl]);
  }
}
