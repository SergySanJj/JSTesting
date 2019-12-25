import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static token: string;
  constructor(private http: HttpClient) {
  }

  getUserDetails(username, password) {
    // post details to API server return user info if correct
    return this.http.post<any>('api/auth/', {
      username,
      password
    });
  }
}
