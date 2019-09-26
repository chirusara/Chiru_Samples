import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isAuthenticated: boolean;
  user = null;
  errorMessage = null;
  getState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState)
  }

  ngOnInit() {
    this.getState.subscribe((state) => {            
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    })
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }

}
