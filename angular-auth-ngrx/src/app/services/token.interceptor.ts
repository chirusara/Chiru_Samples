import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, empty, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    request = request.clone(
      {
        setHeaders:
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    

    return next.handle(request).pipe(catchError((response: any) => {

      if (response instanceof HttpErrorResponse && response.status === 401) {
        console.log(response);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/log-in');
      }

      return throwError(response);

    }));

  }

}
