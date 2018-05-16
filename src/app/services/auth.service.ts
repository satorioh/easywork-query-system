import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(uwid: string, upwd: any) {
    const postData = new FormData();
    postData.append('uwid' , uwid);
    postData.append('upwd' , upwd);
    return this.http.post('https://roubintech.com/backend/authentication.php', postData);
  }

  validate(uwid: string){
    const postData = new FormData();
    postData.append('uwid' , uwid);
    return this.http.post('https://roubintech.com/backend/validation.php', postData);
  }

  logout(){
    localStorage.clear();
  }
}
