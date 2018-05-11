import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  login(uwid: string, upwd: string) {
    return this.http.post('https://roubintech.com/backend/authentication.php', {uwid, upwd}).map(response => response.json());
  }
}
