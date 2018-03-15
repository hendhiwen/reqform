import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatToolbarModule, MatListModule, MatIconModule, 
         MatButtonModule, MatFormFieldModule, MatTooltipModule,
         MatCardModule, MatInputModule  } from '@angular/material';

import { RequestService } from '../../shared/index';

@NgModule({
    imports: [
        FormsModule,
        CommonModule, RequestRoutingModule,
        MatToolbarModule, MatListModule, MatIconModule, 
        MatButtonModule, MatFormFieldModule, MatTooltipModule,
        MatCardModule, MatInputModule
    ],
    declarations: [
        RequestComponent
    ],
    providers:[
        RequestService
    ]
})
export class RequestModule {}
