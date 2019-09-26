import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { GetStatus } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetStatus());
  }

}
