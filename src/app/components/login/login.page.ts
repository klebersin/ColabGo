import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public imgUrl = 'https://image.flaticon.com/icons/png/512/295/295128.png';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  loginwithgoogle(){
    this.router.navigate(['/main/home']);
  }
}
