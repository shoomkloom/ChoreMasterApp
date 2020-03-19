import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ServerApiService } from './services/server-api.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { ChoreTemplateComponent } from './components/chore-template/chore-template.component';
import { ChoreTemplatesComponent } from './components/chore-templates/chore-templates.component';
import { ChoreTemplateCreateComponent } from './components/chore-template-create/chore-template-create.component';
import { ChoreTemplateAssignComponent } from './components/chore-template-assign/chore-template-assign.component';
import { ChoreTemplateCreatorPipe } from './pipes/chore-template-creator.pipe';
import { GroupComponent } from './components/group/group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { NgSelectModule } from '@ng-select/ng-select';

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
    ChoreTemplateAssignComponent,
    ChoreTemplateCreatorPipe,
    GroupComponent,
    GroupsComponent,
    GroupCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    ServerApiService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
