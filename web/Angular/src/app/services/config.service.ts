import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

interface AuthResponse{
  token?: string;
}

interface Credentials{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private storage = localStorage;

  constructor(@Inject('login') private loginUrl: string,
    @Inject('register') private registerUrl: string,
    private http: HttpClient) { }

  logIn(credentials: Credentials):Observable<any>{

    console.log(this.loginUrl +" " + credentials.username + " " + credentials.password);
    return this.post(this.loginUrl, credentials);
  }

  register(credentials: Credentials):Observable<any>{
    return this.post(this.registerUrl, credentials);
  }

  private post(url: string, credentials: Credentials): Observable<any>{
    return this.http.post(url, credentials).pipe(
      tap(response => {
        this.saveUserToken((<AuthResponse>response).token!, credentials.username)
      }),
      catchError(ConfigService.handleError.bind(this))
    );
  }

  private static handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp);
  }

  private saveUserToken(token: string, login: string){
    this.storage.setItem('token', token);
    this.storage.setItem('login', login);
  }

  private removeUserToken(){
    this.storage.removeItem('token');
    this.storage.removeItem('login');
  }

  signOut():void{
    console.log('${this.username} signed out');
    this.removeUserToken();
  }

  get loggedIn(): boolean{
    return this.token != null;
  }

  get token(): string | null{
    return this.storage.getItem('token');
  }

  get login(): string | null{
    return this.storage.getItem('login');
  }

}
