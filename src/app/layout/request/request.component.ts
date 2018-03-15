import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RequestService, AuthenticationService } from '../../shared/index';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  reqSubject: string = "";
  reqDesc: string = "";

  constructor(private router: Router, private snackBar : MatSnackBar, private authSvc : AuthenticationService, private reqSvc : RequestService) { }

  ngOnInit() {
  }

  createRequest(){
    let params = { 
      nik : this.authSvc.getUserInfo().userId,
      subject : this.reqSubject,
      desc : this.reqDesc
    }
    
    this.reqSvc.submitNewRequest(params).then((data:any) =>{
      if(data.statusCode >= 200 && data.statusCode <=300){
        this.router.navigate(['/dashboard']);
      }
         
      this.openAlert(data.message, "Information");
    },(err) =>{
      console.log(err);
      this.openAlert("Request can not be created!", "Warning");
    })
  }

  doSubmit(){
    this.createRequest();
  }

  private openAlert(_msg : string = '', _title : string = 'Warning'): void {
    this.snackBar.open(_msg,_title,{duration: 3000});
  }

}
