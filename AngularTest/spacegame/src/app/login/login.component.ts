import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const taget = event.target;
    const username = taget.querySelector('#username').value;
    const password = taget.querySelector('#password').value;

    this.Auth.getUserDetails(username, password).subscribe((data) => {
      console.log('GOT');
      console.log('login event response', data);
      if (data.success === false) {
        alert(data.message);
      } else {
        AuthService.token = data.token;
        alert('logged in');
        this.router.navigate(['/play']);
      }
    });

  }
}
