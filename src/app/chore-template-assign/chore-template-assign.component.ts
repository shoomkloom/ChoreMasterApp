import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChoreTemplate } from '../models/choreTemplate';
import { ServerApiService } from '../services/server-api.service';
import { AlertService } from '../services/alert.service';
import { AppError } from '../app-error';

@Component({
  selector: 'cm-chore-template-assign',
  templateUrl: './chore-template-assign.component.html',
  styleUrls: ['./chore-template-assign.component.css']
})
export class ChoreTemplateAssignComponent implements OnInit {
  @Input() choreTemplate: ChoreTemplate;
  submitted = false;
  loading = false;

  @Output() assigned = new EventEmitter<ChoreTemplate>();
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

    /*@@*/
    this.alertService.success("-- Success --");
    this.loading = false;
    return;
    /*@@*/
    
    this.serverApi.choreCreate(this.choreTemplate)
      .subscribe(
        (validChoreTemplate: ChoreTemplate) => {
          this.submitted = false;
          this.loading = false;
          this.assigned.emit(validChoreTemplate);
          this.alertService.success("-- Success --");
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
  }

  onCancel(){
    this.canceled.emit();
  }

}
