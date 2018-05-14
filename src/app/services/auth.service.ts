import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(uwid: string, upwd: string) {
    const postData = new FormData();
    postData.append('uwid' , uwid);
    postData.append('upwd' , upwd);
    return this.http.post('https://roubintech.com/backend/authentication.php', postData);
      // .map(response => response.json());
  }

  validate(){
    return this.http.get('https://roubintech.com/backend/authentication.php');
  }
}
