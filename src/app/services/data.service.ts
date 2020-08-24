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

  addQuestion(data: any) {
    let api_Url: string = `${this.url}/add-question`
    return this.http.post(api_Url, data)
  }

  getQuestions() {
    let api_Url: string = `${this.url}/getAll`
    return this.http.get(api_Url)
  }

}
