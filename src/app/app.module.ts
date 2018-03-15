import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//USING service-worker
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { MatButtonModule, MatIconModule, MatCardModule, MatInputModule, 
  MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, 
  MatDatepickerModule, MatNativeDateModule, 
  MatSnackBarModule, MatListModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared';
import { AuthenticationService , RequestService} from './shared/index';

/* USING COVALENT */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/monitsupport/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    CommonModule,
    HttpModule,
    AppRoutingModule,
    MatButtonModule, MatIconModule, MatCardModule, MatInputModule, 
    MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, 
    MatDatepickerModule, MatNativeDateModule,
    MatSnackBarModule, MatListModule
  ],
  providers: [
    AuthGuard, AuthenticationService, RequestService,
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
