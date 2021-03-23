import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {NotificationsService} from 'angular2-notifications';

import {ConfigService} from '../services/config.service';
import {Router} from '@angular/router';

interface Credentials{
  username: string;
  password: string;
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  private restrictedSymbols: string = '\"\' ;,.';

  login!: string;
  password!: string;

  msgs!: Message[];

  constructor(private service: NotificationsService,
              private configService: ConfigService,
              private router: Router) {

  }

  enter():void{
    let credentials : Credentials;
    credentials = {username: this.login, password: this.password}
    if(this.check()){
      this.onSuccess("Я попытался войти с помощью " + this.login +" "+ this.password);
      this.configService.logIn(credentials).subscribe(
        ()=> this.router.navigateByUrl('/').then(()=>console.log('Navigated to /'))
      );
    }else{
      this.onError("Вы ввели неверные данные. Проверьте длинну введенных логина и пароля и убедитесь, что вы не используете запрещенные символы");
    }
  }

  register(): void{
    let credentials : Credentials;
    credentials = {username: this.login, password: this.password}
    if(this.check()){
      this.onSuccess("Я попытался зарегестрироваться с помощью " + this.login +" "+ this.password);
      this.configService.register(credentials).subscribe(
        ()=> this.router.navigateByUrl('/').then(()=>console.log('Navigated to /'))
      );
    }else{
      this.onError("Вы ввели неверные данные. Проверьте длинну введенных логина и пароля и убедитесь, что вы не используете запрещенные символы");
    }
  }

  onSuccess(message: any){
    this.service.success('Success', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: any){
    this.service.error('Error', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  ngOnInit(): void {
    this.msgs = [];
  }

  private check(): boolean{
    let i = 0;
    if(this.login != undefined && this.password != undefined && this.login.length>=5 && this.password.length>=5){
      for(i=0; i< this.restrictedSymbols.length; i++){
        if(this.login.indexOf(this.restrictedSymbols[i])>-1||this.password.indexOf(this.restrictedSymbols[i])>-1){
          return false;
        }
      }
      return true;
    }
    return false;
  }

}
