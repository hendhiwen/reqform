import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DialogDelete } from './dashboard.component';

import { MatToolbarModule, MatListModule, MatIconModule, 
         MatCardModule, MatButtonModule, MatExpansionModule, 
         MatFormFieldModule, MatTooltipModule, MatTabsModule,
         MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatToolbarModule, MatListModule, MatIconModule, 
        MatCardModule, MatButtonModule, MatExpansionModule,
        MatFormFieldModule, MatTooltipModule, MatTabsModule,
        MatDialogModule
    ],
    declarations: [
        DashboardComponent, DialogDelete
    ],
    entryComponents:[
        DialogDelete
    ]
})
export class DashboardModule {}
