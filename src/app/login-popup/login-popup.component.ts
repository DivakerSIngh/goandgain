import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DOCUMENT ,SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {


  title:string;
  
  constructor(
    public dialogRef: MatDialogRef<LoginPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: any
    ,private sanitizer: DomSanitizer
  ) {   
    // let url= data.src;
    // var ext= url.split(',');
    // ext =ext[ext.length-1];
  
    // if(ext.toString()=='doc' || ext.toString()=='docx'){
    // let fullurl='http://docs.google.com/gview?url='+url+'&embedded=true';
    // this.src =  sanitizer.bypassSecurityTrustResourceUrl(fullurl); 
    // this.title=data.title;
    // }
    // else{
    //   this.src =  sanitizer.bypassSecurityTrustResourceUrl(url); 
    //   this.title=data.title;
    //}    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  deleteData() {

  
  }

  ngOnInit() {
    
    //var iframe=this.document.getElementById('frmDocument').contentDocument.location.reload(true);;
    //iframe.reload();
  }


}
