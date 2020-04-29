import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AccountComponent } from './account/account.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EmptyComponent } from './empty/empty.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AccountComponent,
        UserPageComponent,
        EmptyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({}, {})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
