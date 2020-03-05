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
  createNewChoreTemplateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverApi: ServerApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.createNewChoreTemplateForm = this.formBuilder.group({
      name: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.getChoreTemplates();
  }

  // convenience getter for easy access to form fields
  get f() { return this.createNewChoreTemplateForm.controls; }

  onNewChoreTemplate(){
    this.creatingNew = true;
    this.submitted = false;
  }

  getChoreTemplates(){
    this.serverApi.choreTemplatesGet()
      .subscribe(
        (resChoreTemplates: ChoreTemplate[]) => {
          resChoreTemplates.forEach(value => {
            this.choreTemplates.push(value);  
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

  onSubmit() {
    this.submitted = true;
    this.creatingNew = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createNewChoreTemplateForm.invalid) {
        return;
    }

    this.loading = true;

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
  }
}
