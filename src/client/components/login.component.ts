//Should have username and password fields
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'login',
  providers: [ ],
  template: `
    <div>
        <div class="row">
          <div class="col-md-6">
            <form>
              <div class="form-group">
                <label for="name">Username</label>
                <input type="text" class="form-control" #username placeholder="yours@example.com">
              </div>
              <div class="form-group">
                <label for="name">Password</label>
                <input type="password" class="form-control" #password placeholder="your password">
              </div>
              <div class="form-group">
                <label for="name">Color</label>
                <input type="text" class="form-control" #color placeholder="favorite color">
              </div>
              <button type="submit" class="btn btn-default" (click)="auth.login(username.value, password.value)">Login</button>
              <button type="submit" class="btn btn-default" (click)="auth.signUp(username.value, password.value, color.value)">Sign Up</button>
            </form>
            <button type="submit" class="btn btn-default btn-primary" (click)="auth.googleLogin()">Login with google</button>
          </div>
        </div>
      </div>
  `
})
export class Login {
  // Selected observables to test async pipe model.

  // Members to test subscribe model.

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>
    ) { }
}

