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
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
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
    this.authService.login(uid, password).subscribe(data => console.log(data));
  }

  setSession(data){
    localStorage.setItem('id_token', data);
    this.router.navigate([this.returnUrl]);
  }
}
