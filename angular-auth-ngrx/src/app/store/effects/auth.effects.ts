import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable, of, observable } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators'
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, GetStatus } from '../actions/auth.action';

@Injectable()
export class AuthEffects {
    constructor(private actions: Actions,
        private authService: AuthService,
        private router: Router) {

    }

    @Effect()
    LogIn: Observable<any> = this.actions.ofType(AuthActionTypes.LOGIN)
        .pipe(map((action: LogIn) => action.payload))
        .pipe(switchMap(payload => {
            return this.authService.logIn(payload.email, payload.password)
                .pipe(map((user) => {
                    console.log(user);
                    return new LogInSuccess({ token: user.token, email: payload.email });
                })).pipe(catchError((error) => {
                    console.log(error);
                    return of(new LogInFailure({ error: error }));
                }))
        }))

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions.ofType(AuthActionTypes.SIGNUP)
        .pipe(map((action: SignUp) => action.payload))
        .pipe(switchMap(payload => {
            return this.authService.signUp(payload.email, payload.password)
                .pipe(map((user) => {
                    console.log(user);
                    return new SignUpSuccess({ token: user.token, emial: payload.email });
                })).pipe(catchError((error) => {

                    console.log(error);
                    return of(new SignUpFailure({ error: error }));

                }))
        }));

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/');
        }));

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({ dispatch: false })
    LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
        })
    );


    @Effect({dispatch:false})
    GetStatus: Observable<any> = this.actions.ofType(AuthActionTypes.GET_STATUS)
        .pipe(switchMap(payload => {
            return this.authService.getStatus();
        }))
}