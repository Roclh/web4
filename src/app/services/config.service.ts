import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject('login') private loginUrl: string,
    @Inject('register') private registerUrl: string,
    private http: HttpClient) { }

  login(login: string, password: string):Observable<any>{
    console.log(this.loginUrl +" " + login + " " + password);
    return this.post(this.loginUrl, login, password);
  }

  register(login: string, password: string):Observable<any>{
    return this.post(this.registerUrl, login, password);
  }

  private post(url: string, login: string, password: string): Observable<any>{
    return this.http.post(url, {login, password}).pipe(
      catchError(ConfigService.handleError.bind(this))
    );
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp);
  }




}
