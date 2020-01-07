import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public user: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  goToPlay() {
    this.router.navigate(['play']);
  }

}
