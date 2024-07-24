import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Profile } from '../../features/auth/interfaces/auth.interface';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {
  private _currentUser = JSON.parse(sessionStorage.getItem('userProfile') as string) as Profile;
  private _currentUserRole: string = this._currentUser.roles

  @Input() set appRole(role: string) {
    if (role === this._currentUserRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
}
