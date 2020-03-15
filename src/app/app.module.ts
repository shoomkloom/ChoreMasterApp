import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ServerApiService } from './services/server-api.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './alert/alert.component';
import { ChoreTemplateComponent } from './chore-template/chore-template.component';
import { ChoreTemplatesComponent } from './chore-templates/chore-templates.component';
import { ChoreTemplateCreateComponent } from './chore-template-create/chore-template-create.component';
import { ChoreTemplateAssignComponent } from './chore-template-assign/chore-template-assign.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    ChoreTemplateComponent,
    ChoreTemplatesComponent,
    ChoreTemplateCreateComponent,
    ChoreTemplateAssignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ServerApiService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
