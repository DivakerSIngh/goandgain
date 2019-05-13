import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';
import {AccountService} from '../../../services/account.service';

import { LoaderService } from '../../../../app/modules/shared/loader';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  id:string;
  passwordDoNotMatch:boolean=false;
  newPassword:string='';
  confirmPassword:string='';
  resetPasswordResponse:string;
  constructor(private route: ActivatedRoute,
    private router: Router,private accountService:AccountService,private loaderService :LoaderService) { }
  
  ngOnInit() {
    //this.passwordDoNotMatch=true;
   this.id= this.route.snapshot.paramMap.get('id');
  }
resetPassword(){
  
  if(!this.passwordDoNotMatch && this.newPassword==this.confirmPassword){
    this.loaderService.display(true);
    var obj={
      newpassword:this.newPassword,
      token:this.id
    }
    this.accountService.resetPassword(obj).subscribe((data) => {
      this.loaderService.display(false);
      if (data.code == '200') {
        this.resetPasswordResponse=data.message;
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
        }
    }, error => {
      this.loaderService.display(false);
      this.router.navigate(['']);
      //this.resetPasswordResponse=error.message;
      //console.log(error.code);
    });
  }
  else{
    this.passwordDoNotMatch=true;
  }
}
changeMessage(){
  this.passwordDoNotMatch=false;
}
changeMessageNewPass(){
  this.resetPasswordResponse='';
  this.passwordDoNotMatch=false;
  this.confirmPassword='';
}
changeMessageConfirmPassword(){
  this.resetPasswordResponse='';
if(this.newPassword!=this.confirmPassword){
  this.passwordDoNotMatch=true;
}
else{
  this.passwordDoNotMatch=false;
}
}
}
