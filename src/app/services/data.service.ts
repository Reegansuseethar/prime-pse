import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient) {
  }

  getUsers(data: any) {
    let api_Url: string = `${this.url}/official/getAll`
    return this.http.get(api_Url + '?roleId=' + data)
  }

  getRoles() {
    let api_Url: string = `${this.url}/role/getAll`
    return this.http.get(api_Url)
  }

  addQuestion(data: any) {
    let api_Url: string = `${this.url}/question/add`
    return this.http.post(api_Url, data)
  }

  deleteUser(id: any) {
    let api_Url: string = `${this.url}/official/delete`
    return this.http.delete(api_Url + '?officialId=' + id)
  }

  deleteAll(ids: any) {
    console.log(ids)
    let data = ids.join('&officialIds=');
    let api_Url: string = `${this.url}/official/deleteAll`

    return this.http.delete(api_Url + '?officialIds=' + data)
  }

  setUserData(val: object) {
    this.userData = val;
  }

  getUserData(): Observable<any> {
    console.log(this.userData)
    return this.userData;
  }
}
