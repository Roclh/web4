import {Inject, Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Point} from '../objects/Point';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  constructor(@Inject('pointsUrl') private url: string,
              private configService: ConfigService,
              private http: HttpClient) {
  }

  getPoints(): Observable<any> {
    return this.http.get(this.url, this.options);
  }

  postPoint(hit: Point): Observable<any> {
    return this.http.post(this.url, hit, this.options);
  }

  deletePoints(): Observable<any> {
    return this.http.delete(this.url, this.options);
  }

  get options() {
    return {
      headers: new HttpHeaders({authorization: 'Bearer ' + this.configService.token})
    };
  }
}
