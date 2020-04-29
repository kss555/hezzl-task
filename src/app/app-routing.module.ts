/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Main components */
import { LoginComponent } from "./login/login.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { AccountComponent } from "./account/account.component";
import { EmptyComponent } from "./empty/empty.component";
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'sign-up', component: LoginComponent },
    { path: 'log-in', component: LoginComponent },
    {
        path: 'user', component: UserPageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            { path: '', component: AccountComponent },
            { path: 'empty', component: EmptyComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
