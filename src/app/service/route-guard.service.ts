import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , CanActivate, Router} from '@angular/router';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.dataService.isToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
