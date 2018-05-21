import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formModel: FormGroup;
  signupErrInfo = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    const fb = new FormBuilder;
    this.formModel = fb.group({
      uwid: ['', [Validators.required]],
      upwdGroup: fb.group({
        upwd: ['', [Validators.required, Validators.minLength(6)]],
        upwdConfirm: ['', [Validators.required, Validators.minLength(6)]]
      }, {validator: this.pwdValidator})
    });
  }

  pwdValidator(group: FormGroup): any {
    const pwd: FormControl = group.get('upwd') as FormControl;
    const pwdConfirm: FormControl = group.get('upwdConfirm') as FormControl;
    const valid: boolean = pwd.value === pwdConfirm.value;
    return valid ? null : {upwdConfirmResult: true};
  }

  signup() {
    const uwid = this.formModel.value.uwid;
    const upwd = Md5.hashStr(this.formModel.value.upwdGroup.upwd);
    this.authService.auth('signup', uwid, upwd).subscribe(data => {
      console.log(data);
      if (data['result'] === 1) {
        this.signupErrInfo = '';
        alert('注册成功！点击确定跳转至登录页');
        this.router.navigate(['/login']);
      } else {
        this.signupErrInfo = data['message'];
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  forgetPwd() {
    alert('请联系Robin1_Wang(42055)');
  }
}
