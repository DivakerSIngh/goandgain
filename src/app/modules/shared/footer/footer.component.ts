import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ElementRef, Renderer, Inject } from '@angular/core';
import { StudentService } from '../../../services/student.service'

import { HeaderService } from '../../../header.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers:[StudentService]
})


export class FooterComponent implements OnInit {
  IsFooterShow:Boolean=false;
  allowOrNot:boolean;
  isScrollButton = false;

  constructor(private studentService:StudentService,
  private headerService:HeaderService) { }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    var ht = window.pageYOffset
    if (ht >= 200){
      this.isScrollButton = true;
    } else {
      this.isScrollButton = false;
    }
  }

    @HostListener('click', ['$event'])
      onClick(scrollTopBtn) { 
      var getOffset  = document.querySelectorAll('body');      
      var getOffsetArr = Array.prototype.slice.call(getOffset);
      getOffsetArr[0] = document.documentElement.scrollTop = 0;  

      console.log(getOffsetArr[0]);
  }

  ngOnInit() {
   //this.chckForHeaders();
   setTimeout(() => {
    this.IsFooterShow=true;
  }, 350);
   this.headerService.bs.subscribe((x) => {
    //console.log('=============', x);
    this.allowOrNot=x;
  })
  }
//check for footer
chckForHeaders() {
  if(localStorage.getItem('auth-token')!=undefined){
  this.studentService.checkForHeaders().subscribe((data) => {
    if(data.code=='200'){
      this.allowOrNot=!data.headerStatus;
    }
   
  }, error => {
   console.log(error.code);
  }
  );
}
else{
  this.allowOrNot=false;
}
}
}
