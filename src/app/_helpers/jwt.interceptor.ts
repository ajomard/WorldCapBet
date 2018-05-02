import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent,HttpResponse,HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, tap } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MatSnackBar} from '@angular/material';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router,
    public snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.auth_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.auth_token}`
                }
            });
        }

        return next.handle(request).pipe(
          tap(event => {
          if (event instanceof HttpResponse) {

          }
        }, error => {
            this.openSnackBar(error.statusText, 10000);
            if(error.status == 401) {
              this.router.navigate(['/login']);;
            }

    }));

    }

    openSnackBar(message: string, time: number) {
      this.snackBar.open(message,'Close', {
        duration: time,
      });
    }
}
