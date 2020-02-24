import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //Auth
  authGetToken(user: User){
    const url = this.url + '/api/auth';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(url, JSON.stringify(user), { headers, responseType: 'text'})
      .pipe(
        map(token => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          localStorage.setItem('token', token.toString());
          return token;
        }),
        catchError( err => {
            if (err.status == 401) {
                return EMPTY;
            } else {
                /*@@*/console.log('error=', err);
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
                /*@@*/console.log('error=', err);
                return throwError(new AppError(err.status));
            }
        })
      );
  }

  userGet(Id: string){
    const url = this.url + '/api/users/' + Id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  //Groups
  groupsGet(){
    const url = this.url + '/api/groups';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  groupGet(Id: string){
    const url = this.url + '/api/groups/' + Id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  groupCreate(group){
    const url = this.url + '/api/groups';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.post(url, JSON.stringify(group), httpOptions);
  }

  groupUpdate(group){
    const url = this.url + '/api/groups';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.put(url, JSON.stringify(group), httpOptions);
  }

  groupAddUser(Id: string, userId: string){
    const url = this.url + '/api/groups/' + Id + '/addUser/' + userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.put(url, httpOptions);
  }

  groupRemoveUser(Id: string, userId: string){
    const url = this.url + '/api/groups/' + Id + '/removeUser/' + userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.put(url, httpOptions);
  }

  groupDelete(Id: string){
    const url = this.url + '/api/groups';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.delete(url, httpOptions);
  }

  //Chore Templates
  choreTemplatesGet(){
    const url = this.url + '/api/chore-templates';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  choreTemplateGet(Id: string){
    const url = this.url + '/api/chore-templates' + Id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  choreTemplateCreate(choreTemplate){
    const url = this.url + '/api/chore-templates';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.post(url, JSON.stringify(choreTemplate), httpOptions);
  }

  choreTemplateUpdate(choreTemplate){
    const url = this.url + '/api/chore-templates';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.put(url, JSON.stringify(choreTemplate), httpOptions);
  }

  choreTemplateDelete(Id: string){
    const url = this.url + '/api/chore-templates';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.delete(url, httpOptions);
  }

  //Chores
  choresGet(){
    const url = this.url + '/api/chores';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  choreGet(Id: string){
    const url = this.url + '/api/chores' + Id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.get(url, httpOptions);
  }

  choreCreate(chore){
    const url = this.url + '/api/chores';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.post(url, JSON.stringify(chore), httpOptions);
  }

  choreUpdate(chore){
    const url = this.url + '/api/chore';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.put(url, JSON.stringify(chore), httpOptions);
  }

  choreDelete(Id: string){
    const url = this.url + '/api/chore';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.delete(url, httpOptions);
  }
}
