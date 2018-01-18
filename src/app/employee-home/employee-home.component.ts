import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import {NgForm} from '@angular/forms'
import {FormsModule} from '@angular/forms'
import {ROOT_URL} from '../Models/Config'
import {employee} from '../Models/Employee'
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
  FormHeader=""
  editCustomer:boolean=false;

  Dummyemployee:employee;
  constructor(private http:HttpClient)
   { 
   }
  employees: Observable<employee[]>;
  newemployee:Observable<any>;

  ngOnInit() {
    this.getEmployee();
  
  }
  

  ShowRegForm=function(employee)
  {
    this.editCustomer=true;
    if(employee!=null)
    {
    
    this.fname=employee.fname;
    this.lname=employee.lname;
    this.email=employee.email;
    this.id=employee.id;
    this.FormHeader="Edit"
    }
    else{
      this.fname="";
      this.lname="";
      this.email="";
      this.id="";
      this.FormHeader="Add"
    }
    console.log(employee);
   
  }

  Register(regForm:NgForm)
  {

   this.Dummyemployee= new employee
    this.Dummyemployee.Email=regForm.value.email;
    this.Dummyemployee.Fname=regForm.value.fname;
    this.Dummyemployee.Lname=regForm.value.lname;
    this.Dummyemployee.ID="";
    //console.log( this.Dummyemployee);
    this.AddEmployee( this.Dummyemployee);
     
    

    //console.log(regForm.value);
  }

  getEmployee() 
  {

       this.employees = this.http.get<employee[]>(ROOT_URL + '/Employees')    
  }

  AddEmployee(emp:employee)
  {
    
    console.log(emp);
    var body = JSON.stringify(emp);
  this.newemployee= this.http.post<employee>('http://localhost:39029/api/Employees/postemployee',body).
   catch(err=>
    {
     return Observable.of(err);
   })
   this.newemployee.subscribe();
 


  }
  

}
