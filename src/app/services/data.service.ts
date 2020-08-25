import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  showToaster(message: string): any {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  //for questions

  addQuestion(data: any) {
    let api_Url: string = `${this.url}/addQuestion`
    return this.http.post(api_Url, data);
  }

  getQuestions() {
    let api_Url: string = `${this.url}/getAll`
    return this.http.get(api_Url);
  }

  removeQuestion(id: any) {
    let api_Url: string = `${this.url}/deleteQuestion`
    return this.http.delete(api_Url + '/' + id);
  }

  getQuesbyID(id: any) {
    let api_Url: string = `${this.url}/getQuestionById`
    return this.http.get(api_Url + '/' + id);
  }

  updateQuesById(data: any) {
    let id=data._id;
    let api_Url: string = `${this.url}/updateQuestion`
    return this.http.put(api_Url + '/' + id, data);
  }

  //for Group
  addGroup(data: any) {
    let api_Url: string = `${this.url}/addGroup`
    return this.http.post(api_Url, data);
  }

  updateGroupById(data:any){
    let id=data._id;
    let api_Url: string = `${this.url}/updateGroup`
    return this.http.put(api_Url + '/' + id, data);
  }

  getGroups() {
    let api_Url: string = `${this.url}/getAllGroup`
    return this.http.get(api_Url);
  }

  getGroupbyID(id: any) {
    let api_Url: string = `${this.url}/getGroupById`
    return this.http.get(api_Url + '/' + id);
  }

  removeGroup(id: any) {
    let api_Url: string = `${this.url}/deleteGroup`
    return this.http.delete(api_Url + '/' + id);
  }


}
