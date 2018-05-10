import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  login(uid: string, password: string) {
    return this.http.post('/api/authentication.php', {uid, password}).map(response => response.json());
  }
}
