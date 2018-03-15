import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, User, RequestService, UserRequest } from '../../shared/index';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  myProfile: User;
  listRequest: UserRequest[] = Array();

  constructor(private router : Router, private authSvc : AuthenticationService, private snackBar : MatSnackBar,
    private reqSvc : RequestService, public dialog: MatDialog) { }

  ngOnInit() {
    this.myProfile = this.authSvc.getUserInfo();

    this.reloadList();
  }

  private reloadList(){
    this.reqSvc.getRequests(this.myProfile.userId).then((success)=>{
      this.listRequest = <UserRequest[]> success;
     },(error)=>{
      console.log(error);
    })
  }

  newRequest(){
    this.router.navigate(['/request']);
  }
  
  signOut(){
    this.authSvc.logout();
  }

  hideResolution(req:UserRequest){
    if(req.status == 1){
      return true;
    }else{
      return false;
    }
  }

  deleteRequest(requestId : number = 0){
    //const dialogRef = this.dialog.open(DialogDelete, {height: '250px'});
    const dialogRef = this.dialog.open(DialogDelete);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let params = { 
          requestId : requestId
        }

        this.reqSvc.deleteNewRequest(params).then((success:any) => {
          this.listRequest = this.listRequest.filter(x => x.requestId != requestId );

          this.snackBar.open(success.message, "Congratulation !", { duration: 2000 });
        }, (err) => {
          this.snackBar.open("Sorry ! Your request can not be deleted.", "Warning", { duration: 3000 });
        });
      }
    });
  }

  private openAlert(_msg : string = '', _title : string = 'Warning'): void {
    this.snackBar.open(_msg,_title, { duration: 3000 });
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {}