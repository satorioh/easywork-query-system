import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  auth(method: string, uwid: string, upwd: any) {
    const postData = new FormData();
    postData.append('uwid', uwid);
    postData.append('upwd', upwd);
    switch (method) {
      case 'login': {
        return this.http.post('https://easywork.asus.com.cn/backend/authentication.php', postData);
      }
      case 'signup': {
        return this.http.post('https://easywork.asus.com.cn/backend/signup.php', postData);
      }
      case 'validate': {
        return this.http.post('https://easywork.asus.com.cn/backend/validation.php', postData);
      }
    }
  }

  logout() {
    localStorage.clear();
  }
}
