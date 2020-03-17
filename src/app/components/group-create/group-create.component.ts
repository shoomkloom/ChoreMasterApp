import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/models/group';
import { ServerApiService } from 'src/app/services/server-api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AppError } from 'src/app/app-error';
import { User } from 'src/app/models/user';

@Component({
  selector: 'cm-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  group = new Group();
  submitted = false;
  loading = false;

  @Output() created = new EventEmitter<Group>();
  @Output() canceled = new EventEmitter();

  constructor(
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // reset alerts on submit
    this.alertService.clear();

    this.group.masterId = (JSON.parse(localStorage.getItem('currentUser')) as User)._id;

    //Create the group
    this.serverApi.groupCreate(this.group)
      .subscribe(
        (validGroup: Group) => {
          this.submitted = false;
          this.loading = false;
          this.created.emit(validGroup);
        },
        (error: AppError) => {
          console.log('ERROR:', error);
          if(error.status === 400){
            this.alertService.error('Invalid name or details!');
          }
          else if(error.status === 401){
            this.alertService.error('Unauthorised, please login again!');
          }
          else{
            this.alertService.error('There was an unexpected error, please try again.');
          }
          this.loading = false;
        }
      )

      //Now need to add the other users
  }

  onCancel(){
    this.canceled.emit();
  }

}
