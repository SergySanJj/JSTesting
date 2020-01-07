import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AppRoutingModule} from '../app-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(public user: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToPlay() {
    this.router.navigate(['play']);
  }
}
