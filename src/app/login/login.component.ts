import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  returnUrl: string;
  loginErrInfo = '';

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
    this.authService.logout();
  }

  login() {
    const uid = this.formModel.value.uwid;
    const password = Md5.hashStr(this.formModel.value.upwd);
    this.authService.login(uid, password).subscribe(data => {
      console.log(data);
      if (data['result'] === 1) {
        this.loginErrInfo = '';
        this.setSession(data);
      } else {
        this.loginErrInfo = data['message'];
      }
    });
  }

  setSession(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('uwid', data.uwid);
    localStorage.setItem('uename', data.uename);
    this.router.navigate([this.returnUrl]);
  }

  goToSignup(){
    this.router.navigate(['/signup']);
  }
}
