import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  urlBase = environment.apiUrl;
  clientUpdated: Subject<string> = new Subject();
  accountUpdated: Subject<string> = new Subject();

  constructor(private http: HttpClient,) { }

  getData<T>(url: string): Observable<T> {
    return this.http.get<T>(this.urlBase + url)
  }

  updateData<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.urlBase + url, data);
  }

  patchData<T>(url: string, data: any): Observable<T> {
    return this.http.patch<T>(this.urlBase + url, data);
  }

  addData<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(this.urlBase + url, data)
  }

  deleteData(url: string) {
    return this.http.delete(this.urlBase + url);
  }

}
