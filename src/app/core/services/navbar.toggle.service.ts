import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarToggleService {
  isHidden =false;
  private navBarIsHiddenSource = new BehaviorSubject<boolean>(this.isHidden);
  navBarIsHidden$ = this.navBarIsHiddenSource.asObservable();

  toggleVisibility (){
    this.isHidden = !this.navBarIsHiddenSource.value;
    this.navBarIsHiddenSource.next(!this.navBarIsHiddenSource.value);
  }
}
