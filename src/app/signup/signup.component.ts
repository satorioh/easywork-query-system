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
      upwdGroup: fb.group({
        upwd: ['', [Validators.required]],
        upwdConfirm: ['', [Validators.required]]
      }, {validator: this.pwdValidator})
    });
  }

  pwdValidator(group: FormGroup): any {
    const pwd: FormControl = group.get('upwd') as FormControl;
    const pwdConfirm: FormControl = group.get('upwdConfirm') as FormControl;
    const valid: boolean = pwd.value === pwdConfirm.value;
    console.log('password是否校验通过：' + valid);
    return valid ? null : {upwdConfirmResult: true};
  }

  signup(){
    console.log(this.formModel.value);
  }
}
