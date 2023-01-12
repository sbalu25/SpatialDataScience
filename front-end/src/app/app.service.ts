import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url="http://localhost:8080/trajectories/list"
  constructor(private httpClient: HttpClient) { }
  getTrajectories(request:any):Observable<any>{
    return this.httpClient.post(this.url, request,{responseType:'text'});
  }
  getPlot(request:any):Observable<any>{
    const requestOptions: Object = {
      /* other options here */
      responseType: 'html'
    }
    return this.httpClient.post("http://localhost:4201/plot", requestOptions, request)
  }
}
