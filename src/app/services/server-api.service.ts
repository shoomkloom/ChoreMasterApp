import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EMPTY, throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../app-error';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  url = "http://localhost:3000";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) { 
    if(localStorage.getItem('currentUser') == null){
      this.clearUser();
    }
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public logout(){
    this.clearUser();
    this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')));
  }

  clearUser(){
    localStorage.setItem('currentUser', JSON.stringify({id: -1}));
    localStorage.setItem('token', '-1');
  }

  getAuthHttpOptions(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-auth-token': localStorage.getItem('token')
      })
    };

    return httpOptions;
  }

  //Auth
  authGetValidUser(user: User){
    const url = this.url + '/api/auth';

    //We need to observe the response so we can get the jwt token from the response header
    return this.httpClient.post(
      url, 
      JSON.stringify(user), 
      {headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: "response"})
      .pipe(
        map((res: HttpResponse<Object>) => {
          //Store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(res.body));
          this.currentUserSubject.next(res.body as User);
          localStorage.setItem('token', res.headers.get('x-auth-token'));
          return res.body as User;
        }),
        catchError( err => {
            if (err.status == 401) {
                return EMPTY;
            } else {
                return throwError(new AppError(err.status));
            }
        })
      );
  }

  //Users
  userRegister(user){
    const url = this.url + '/api/users';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.httpClient.post(url, JSON.stringify(user), httpOptions)
      .pipe(catchError( err => {
            if (err.status == 401) {
                return EMPTY;
            } else {
                return throwError(new AppError(err.status));
            }
        })
      );
  }

  userGet(Id: String){
    const url = this.url + '/api/users/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  //Groups
  groupsGet(){
    const url = this.url + '/api/groups';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  groupGet(Id: String){
    const url = this.url + '/api/groups/' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  groupCreate(group){
    const url = this.url + '/api/groups';
    return this.httpClient.post(url, JSON.stringify(group), this.getAuthHttpOptions());
  }

  groupUpdate(group){
    const url = this.url + '/api/groups';
    return this.httpClient.put(url, JSON.stringify(group), this.getAuthHttpOptions());
  }

  groupAddUser(Id: String, userId: String){
    const url = this.url + '/api/groups/' + Id + '/addUser/' + userId;
    return this.httpClient.put(url, this.getAuthHttpOptions());
  }

  groupRemoveUser(Id: String, userId: String){
    const url = this.url + '/api/groups/' + Id + '/removeUser/' + userId;
    return this.httpClient.put(url, this.getAuthHttpOptions());
  }

  groupDelete(Id: String){
    const url = this.url + '/api/groups';
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }

  //Chore Templates
  choreTemplatesGet(){
    const url = this.url + '/api/chore-templates';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreTemplateGet(Id: String){
    const url = this.url + '/api/chore-templates' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreTemplateCreate(choreTemplate){
    const url = this.url + '/api/chore-templates';
    choreTemplate.creatorId = (JSON.parse(localStorage.getItem('currentUser')) as User)._id;
    return this.httpClient.post(url, JSON.stringify(choreTemplate), this.getAuthHttpOptions());
  }

  choreTemplateUpdate(choreTemplate){
    const url = this.url + '/api/chore-templates';
    return this.httpClient.put(url, JSON.stringify(choreTemplate), this.getAuthHttpOptions());
  }

  choreTemplateDelete(Id: String){
    const url = this.url + '/api/chore-templates';
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }

  //Chores
  choresGet(){
    const url = this.url + '/api/chores';
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreGet(Id: String){
    const url = this.url + '/api/chores' + Id;
    return this.httpClient.get(url, this.getAuthHttpOptions());
  }

  choreCreate(chore){
    const url = this.url + '/api/chores';
    return this.httpClient.post(url, JSON.stringify(chore), this.getAuthHttpOptions());
  }

  choreUpdate(chore){
    const url = this.url + '/api/chore';
    return this.httpClient.put(url, JSON.stringify(chore), this.getAuthHttpOptions());
  }

  choreDelete(Id: String){
    const url = this.url + '/api/chore';
    return this.httpClient.delete(url, this.getAuthHttpOptions());
  }
}
