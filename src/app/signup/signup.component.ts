import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formModel: FormGroup;

  constructor() {
  }

  ngOnInit() {
    const fb = new FormBuilder;
    this.formModel = fb.group({
      uwid: ['', [Validators.required]],
      upwd: ['', [Validators.required]],
      upwdConfirm: ['', [Validators.required]]
    }, {validator: this.pwdValidator});
  }

  pwdValidator(formModel: FormGroup): any {
    const pwd: FormControl = formModel.get('upwd') as FormControl;
    const pwdConfirm: FormControl = formModel.get('upwdConfirm') as FormControl;
    const valid: boolean = pwd.value === pwdConfirm.value;
    console.log('password是否校验通过：' + valid);
    return valid ? null : {password: {description: '密码不匹配'}};
  }

}
