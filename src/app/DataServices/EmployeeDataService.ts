


import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

import {employee} from '../Models/Employee';

import {ROOT_URL} from '../Models/Config';
import { Injectable }   from '@angular/core';


@Injectable()
export class EmployeeDataService

{
    employees: Observable<employee[]>;
    newemployee:Observable<employee>;
  
    constructor(private http:HttpClient)
    {

    }
getEmployee()
{
 return this.http.get<employee[]>(ROOT_URL + '/Employees')
}
AddEmployee(emp:employee)
{

  const headers = new HttpHeaders().set('content-type', 'application/json');
  var body = {
                    Fname:emp.Fname,Lname:emp.Lname,Email:emp.Email
             }

return this.http.post<employee>(ROOT_URL+'/Employees',emp,{headers})

}


EditEmployee(emp:employee)
{
    const params = new HttpParams().set('ID', emp.ID);
  const headers = new HttpHeaders().set('content-type', 'application/json');
  var body = {
                    Fname:emp.Fname,Lname:emp.Lname,Email:emp.Email,ID:emp.ID
             }
        return this.http.put<employee>(ROOT_URL+'/Employees/'+emp.ID,body,{headers,params})

}




DeleteEmployee(emp:employee)
{
    const params = new HttpParams().set('ID', emp.ID);
  const headers = new HttpHeaders().set('content-type', 'application/json');
  var body = {
                    Fname:emp.Fname,Lname:emp.Lname,Email:emp.Email,ID:emp.ID
             }
        return this.http.delete<employee>(ROOT_URL+'/Employees/'+emp.ID)

}
}