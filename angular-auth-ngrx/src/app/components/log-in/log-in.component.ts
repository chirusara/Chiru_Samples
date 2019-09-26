import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/actions/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {

    this.getState.subscribe((state) => {      
      this.errorMessage = state.errorMessage;
    })
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}
