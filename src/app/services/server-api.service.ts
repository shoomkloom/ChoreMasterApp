import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  //Users
  userRegister(user){
    const url = this.url + '/api/users';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    return this.httpClient.post(url, JSON.stringify(user), httpOptions);
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
