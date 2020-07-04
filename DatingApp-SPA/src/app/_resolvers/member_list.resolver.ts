import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertifyService } from '../_services/Alertify.service';
import { UserService } from '../_services/user.service';


import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { resolve } from 'dns';
import {  Observable ,of } from 'rxjs';
@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  constructor(private userService:UserService,
    private router:Router, private alertify:AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            catchError(error =>{
                this.alertify.error('problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );

    }
  
  
};