import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarToggleService {
  private _isHidden = window.innerWidth > 991; //we open the toggler when we are in desktop mode

  private _navBarIsHiddenSource = new BehaviorSubject<boolean>(this._isHidden);
  navBarIsHidden$ = this._navBarIsHiddenSource.asObservable();

  toggleVisibility (){
    this._isHidden = !this._navBarIsHiddenSource.value;
    this._navBarIsHiddenSource.next(!this._navBarIsHiddenSource.value);
  }

  showNavBar() {
    this._navBarIsHiddenSource.next(true)
  }
}
