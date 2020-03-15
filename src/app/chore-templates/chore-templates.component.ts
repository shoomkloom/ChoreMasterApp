import { Component, OnInit } from '@angular/core';
import { ChoreTemplate } from '../models/choreTemplate';
import { AlertService } from '../services/alert.service';
import { ServerApiService } from '../services/server-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppError } from '../app-error';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cm-chore-templates',
  templateUrl: './chore-templates.component.html',
  styleUrls: ['./chore-templates.component.css']
})
export class ChoreTemplatesComponent implements OnInit {
  choreTemplates: ChoreTemplate[] = [];
  creatingNew = false;
  assignChore = false;
  assignedChoreTemplate: ChoreTemplate = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getChoreTemplates();
  }

  onNewChoreTemplate(){
    this.creatingNew = true;
  }

  sortChoreTemplates(){
    this.choreTemplates.sort(function(a, b) {
      return a.name>b.name?1:a.name<b.name?-1:0;
    })
  }

  getChoreTemplates(){
    this.serverApi.choreTemplatesGet()
      .subscribe(
        (resChoreTemplates: ChoreTemplate[]) => {
          resChoreTemplates.forEach(value => {
            this.choreTemplates.push(value);
            this.sortChoreTemplates();  
          });
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

  onChoreTemplateCreated(choreTemplateCreated: ChoreTemplate){
    this.choreTemplates.push(choreTemplateCreated);  
    this.sortChoreTemplates(); 
    this.creatingNew = false;
  }

  onChoreTemplateCreateCanceled(){
    this.creatingNew = false;
  }

  onChoreAssignClicked(assignedChoreTemplate: ChoreTemplate){
    this.assignedChoreTemplate = assignedChoreTemplate;
    this.assignChore = true;
  }

  onChoreTemplateAssigned(){
    this.assignChore = false;
  } 
  
  onChoreTemplateAssignCanceled(){
    this.assignChore = false;
  }
}

/*@@
  onChoreAssigned(){
    this.assignChore = true;
  }

  onAssignSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
/*@@
    if (this.createNewChoreTemplateForm.invalid) {
        return;
    }
@@/

    this.loading = true;
/*@@
    this.serverApi.choreTemplateCreate(this.createNewChoreTemplateForm.value)
      .subscribe(
        (validChoreTemplate: ChoreTemplate) => {
          this.choreTemplates.push(validChoreTemplate);
          this.submitted = false;
          this.creatingNew = false;
          this.loading = false;
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
@@/
  }
}
@@*/