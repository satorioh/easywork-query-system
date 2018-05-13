import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  login(uwid: string, upwd: string) {
    const postData = new FormData();
    postData.append('uwid' , uwid);
    postData.append('upwd' , upwd);
    return this.http.post('https://roubintech.com/backend/authentication.php', postData)
      .map(response => response.json());
  }
}
