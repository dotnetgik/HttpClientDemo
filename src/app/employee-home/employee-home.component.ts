import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import {FormsModule} from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {EmployeeDataService} from '../DataServices/EmployeeDataService';
import {employee} from '../Models/Employee';

import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  fname:string="";
  lname:string="";
  email:string="";
  id:string="";
  status:boolean=false;
  FormHeader=""
  editCustomer:boolean=false;
  employees:Observable<employee[]>
test:any[];
  employeelist:employee[];
mappedlist:employee[]=[];
  Dummyemployee:employee;
  constructor(private dataservice:EmployeeDataService)
   { 
   }
  ngOnInit()
   {
     this.dataservice.getEmployee().subscribe((tempdate) =>{  this.employeelist=tempdate;})
     ,err=>{
       console.log(err);
     }
   }
  ShowRegForm=function(employee)
  {
    this.editCustomer=true;
    if(employee!=null)
    {
      this.SetValuesForEdit(employee)
    
    }
    else{
      this.ResetValues();
    }
  }


  ShowRegFormForDelete=function(employee)
  {
    this.editCustomer=true;
    if(employee!=null)
    {
      this.SetValuesForDelete(employee)
    
    }
  }

  SetValuesForDelete=function(employee)
{
  this.fname=employee.fname;
  this.lname=employee.lname;
  this.email=employee.email;
  this.id=employee.id;
  this.FormHeader="Delete"
  
}
//Function to set the values for edit form
SetValuesForEdit=function(employee)
{
  this.fname=employee.fname;
  this.lname=employee.lname;
  this.email=employee.email;
  this.id=employee.id;
  this.FormHeader="Edit"
}
//Function to reset the values 
ResetValues(){
  this.fname="";
  this.lname="";
  this.email="";
  this.id="";
  this.FormHeader="Add"
}
//Common function for the Operation 
  Save(regForm:NgForm)
  {
    this.GetDummyObject(regForm);

    switch(this.FormHeader)
    {
    case "Add":
           this.Addemployee(this.Dummyemployee);
    break;
    case "Edit":
          this.UpdateEmployee(this.Dummyemployee);
    break;
    case "Delete":
          this.DeleteEmployee(this.Dummyemployee);
    break;
           default:
    break;

    }
  }


GetDummyObject(regForm:NgForm):employee
{
  this.Dummyemployee= new employee
  this.Dummyemployee.Email=regForm.value.email;
  this.Dummyemployee.Fname=regForm.value.fname;
  this.Dummyemployee.Lname=regForm.value.lname;
  this.Dummyemployee.ID=regForm.value.id;
  return this.Dummyemployee;
}
  Addemployee(e: employee)
  {
    this.dataservice.AddEmployee(this.Dummyemployee).subscribe(res=>
      {
        this.employeelist.push(res);
        alert("Data added successfully !! ")
        this.editCustomer=false;
      })
      ,err=>
      {
        console.log("Error Occured " + err);
      }
  }


  UpdateEmployee(e: employee)
  {
    this.dataservice.EditEmployee(this.Dummyemployee).subscribe(res=>
      {
          this.editCustomer=false;
          this.dataservice.getEmployee().subscribe(res=>{
          this.employeelist=res;
          });
          alert("Employee data Updated successfully !!")
      });
  }

  DeleteEmployee(e: employee)
  {
    this.dataservice.DeleteEmployee(this.Dummyemployee).subscribe(res=>
      {
        this.editCustomer=false;
      this.dataservice.getEmployee().subscribe(res=>{
                this.employeelist=res;
        });
        alert("employee Deleted succesfully !! ")
      });
  }


}



