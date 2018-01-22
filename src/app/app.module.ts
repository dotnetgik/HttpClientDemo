import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';

import {EmployeeDataService} from './DataServices/EmployeeDataService'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeHomeComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule
  ],
  providers: [EmployeeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
