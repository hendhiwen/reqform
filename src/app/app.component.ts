import { Component, OnInit } from '@angular/core';
import { SwUpdate  } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Monstera IT Support';

  constructor(private swUpdate: SwUpdate ){

  }
  ngOnInit() {
      if (this.swUpdate.isEnabled) {
          this.swUpdate.available.subscribe(() => {
            this.swUpdate.activateUpdate().then(() => {
              window.location.reload();
            }).catch(err => {
              console.error(err);
            })
          });
      }        
  }
}
