import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { User } from 'src/app/models/user';

@Component({
  selector: 'cm-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  creatingNew = false;
  assignChore = false;
  colors = ['#27AE60', '#F39C12', '#7D3C98', '#1A5276', '#D35400'];
  assignChoreUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getGroups();
  }

  onNewGroup(){
    this.creatingNew = true;
  }

  sortGroups(){
    this.groups.sort(function(a, b) {
      return a.name>b.name?1:a.name<b.name?-1:0;
    })
  }

  getGroups(){
    this.serverApi.groupsGetMe((JSON.parse(localStorage.getItem('currentUser')) as User)._id)
      .subscribe(
        (resGroups: Group[]) => {
          resGroups.forEach(value => {
            this.groups.push(value);
          });
          this.sortGroups();
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 401){
            this.alertService.error('Unauthorised, please login again!');
          }
          else{
            this.alertService.error('There was an unexpected error, please try again.');
          }
        }
      )
  }

  onGroupCreated(groupCreated: Group){
    this.groups.push(groupCreated);  
    this.sortGroups(); 
    this.creatingNew = false;
  }

  onGroupCreateCanceled(){
    this.creatingNew = false;
  }

  getColor(i: number){
    let colorIndex = i;
    while(colorIndex > this.colors.length-1){
      colorIndex-=this.colors.length;
    }

    return this.colors[colorIndex];
  }

  onChoreAssignClicked(groupUser: User){
    //Assign a chore to this user
    this.assignChoreUser = groupUser;
  }
}
