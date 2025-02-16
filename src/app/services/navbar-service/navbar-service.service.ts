import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private isExtendedSubject = new BehaviorSubject<boolean>(false);
  isExtended$ = this.isExtendedSubject.asObservable();

  toggleExtension() {
    this.isExtendedSubject.next(!this.isExtendedSubject.value);
  }
}
