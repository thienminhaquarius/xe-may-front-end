import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogoutComponent } from './logout/logout.component';
import { AddNewBikeComponent } from './add-new-bike/add-new-bike.component';

import { StarRatingModule } from 'angular-star-rating';
import { FooterComponent } from './footer/footer.component';


const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'detailsproduct/:id', component: DetailsProductComponent },
  { path: 'add-new-bike', component: AddNewBikeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProductComponent,
    DashboardComponent,
    DetailsProductComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LogoutComponent,
    AddNewBikeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
