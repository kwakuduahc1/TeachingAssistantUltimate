// import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
// import { StatusProvider } from "../providers/StatusProvider";
// import { Injectable } from "@angular/core";
// import { RouteProvider } from "../providers/RouteProvider";

// @Injectable()
// export class LoginGuard implements CanActivate {
//     canActivate(route: ActivatedRouteSnapshot): boolean {
//         if (this.status.isLoggedIn)
//             return true;
//         else if (route.url.length > 0) {
//             this.routeProv.path = route.url[0].path;
//             if (route.url.length > 1) {
//                 this.routeProv.param = route.url[1].path as string | any;
//             }
//         }
//         this.router.navigate(['/login']);
//         return false;
//     }

//     constructor(private router: Router, private status: StatusProvider, private routeProv: RouteProvider) {

//     }
// }
