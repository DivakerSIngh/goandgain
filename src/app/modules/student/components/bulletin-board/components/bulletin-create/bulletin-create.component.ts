import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../../../../services/student.service'

import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../../../modules/shared/loader';


declare var $: any;
@Component({
  selector: 'app-bulletin-create',
  templateUrl: './bulletin-create.component.html',
  styleUrls: ['./bulletin-create.component.css']
})
export class BulletinCreateComponent implements OnInit {

  languageList: any[];
  description: string = '';
  language: string = '0';
  category: string = '0';
  articleHeading: string = '';
  createdStatus: string = '';
  urlToSearch: string = '';
  formData: any;
  imageUrlFetch:string='';
  constructor(private studentService: StudentService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit() {
    this.formData = new FormData();
    this.getLanguge();
  }

  getLanguge() {
    this.studentService.getStudentLanguages().subscribe((data) => {

      if (data.code == '200') {
        this.languageList = data.data;
      } else {
        this.router.navigate(['']);
      }
    }, error => {
      this.loader.display(false);
      this.router.navigate(['']);
    });
  }

  ifAllValid(): boolean {

    if (this.description.trim() != '' && this.language != '0' && this.category != '0' && this.articleHeading.trim() != '') {
      return false;
    }
    return true;

  }

  createdBulletinBoard() {
    if (this.description != '' && this.language != '0' && this.category != '0' && this.articleHeading != '') {
      this.loader.display(true);
      var saveData = {
        description: this.description.trim(),
        language: this.language,
        category: this.category,
        articleHeading: this.articleHeading.trim(),
        image:this.imageManualPath
      }
      this.studentService.creatingBulletinBoard(saveData).subscribe((data) => {

        if (data.code == '200') {
          this.loader.display(false);
          this.createdStatus = 'Bulletin board created successfully.'
          this.description = '';
          this.language = '0';
          this.category = '0';
          this.articleHeading = '';

          this.router.navigate(['./bulletin-board']);
          var myInterVal = setTimeout(() => {
          this.createdStatus='';
       
         }, 5000);
       

        } else {
          this.loader.display(false);
          this.router.navigate(['']);
        }
      }, error => {

        this.loader.display(false);
        this.router.navigate(['']);
      });

    }
  }

  saveurlFetchingData() {
    this.loader.display(true);
    var saveData = {
      description: this.urldescription.trim(),
      url: this.urlToSearch.trim(),
      category: this.category,
      articleHeading: this.urlTitle.trim(),
      image:this.imageUrlFetch.trim(),
      language:this.language
    }
    this.studentService.creatingBulletinBoardUrl(saveData).subscribe((data) => {
    
      if (data.code == '200') {
        this.loader.display(false);
        this.urlstatusMessage = 'Bulletin board created successfully.'
        this.description = '';
        this.language = '0';
        this.category = '0';
        this.articleHeading = '';
        this.urlToSearch = '';
        $('#fetchUrl').modal('hide');
        this.router.navigate(['./bulletin-board']);

      } else {
        $('#fetchUrl').modal('hide');
        this.loader.display(false);
        this.router.navigate(['']);

      }
    }, error => {
    
      $('#fetchUrl').modal('hide');
      this.loader.display(false);
      this.router.navigate(['']);
    });

  }


  urlDescriptionChange() {
    this.remainingCountUrlDescription = 1000 - this.urldescription.length;
  }
  isurlValidDetails(): boolean {
    
    if (this.urlToSearch.trim() != '' && this.category != '0' && this.urlTitle.trim() != '' && this.urldescription != '' && this.language != '0' ) {
      return false;
    }
    return true;
  }

  changedescriptionCount() {
    this.remainingCountDescription = 5000 - this.description.length;
  }

  urlTitle: string = '';
  urldescription: string = '';
  urlstatusMessage: string = '';
  isValidUrl: boolean = false;
  remainingCountUrlDescription: number = 1000;
  remainingCountDescription: number = 5000;
  findUrlDetails() {
    if (this.urlToSearch != '') {

      this.loader.display(true);

      this.studentService.fetchurlData(this.urlToSearch).subscribe((data) => {

        if (data.code == '200') {

          if(data.title!=undefined){
          this.urlTitle = data.title;
          }
          if(data.description!=undefined){
          this.urldescription = data.description;
          this.remainingCountUrlDescription = 1000 - this.urldescription.length;
          }

          $('#fetchUrl').modal('show');
          this.isValidUrl = true;

        } else {
          this.isValidUrl = false;
          this.urlstatusMessage = data.message;
       
          var myinvalid = setTimeout(() => {
            this.urlstatusMessage='';
         
           }, 5000);

          // this.router.navigate(['']);
        }
        this.loader.display(false);
      }, error => {
        this.loader.display(false);
        this.loader.display(false);
        this.router.navigate(['']);
      });
    }
  }

  resetUrlTextBox() {
    this.isValidUrl = false;
    this.urlTitle = '';
    this.urldescription = ''
    this.urlstatusMessage = ''
    this.urlToSearch = '';
  }


  isValidImage(ext: string): boolean {
    if (ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "bmp" && ext != "gif") {
      return false;
    }
    return true;
  }


  // ismanual():boolean{
  //   if(this.articleHeading!=''){
  //     return true;
  //   }
  //   else{
  //     this.urlToSearch='';
  //   return false;
  //   }
  // }
  invalidImageManual:boolean=false;
  inavlidImageManualMessage:string='';
  imageSizeExceed:boolean=false; 
  internalError:boolean=false;
 

  imageManualPath:string='assets/images/image-placeholder.jpg';
  onFileChange(fileInput) {
   
    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
      this.loader.display(true);
      let file: File = fileList[0];
      console.log(fileList, file);
      let fileSize: number = fileList[0].size;
      let fileExtenstion = fileList[0].name.split('.').pop();
      if (this.isValidImage(fileExtenstion.toLowerCase())) {
        //500 KB
        if (fileSize <= 512000) {
          this.formData.delete('userImage');
          this.formData.append('userImage', file);
         
          this.studentService.uploadstudentFiles(this.formData).subscribe((data) => {
          
            if (data.code == '200') {

              this.internalError=false;
              this.invalidImageManual=false;
              this.internalError=false;

              console.log(data.imageURL)
              this.imageManualPath = data.imageURL;
              this.inavlidImageManualMessage = '';
               setTimeout(() => {
                this.loader.display(false);
            }, 1000);
            }
            else {
              this.loader.display(false);               
              this.internalError=true;
              this.invalidImageManual=false;
              this.imageSizeExceed=false;
             
            }
          }, error => {

            this.loader.display(false);               
            this.internalError=true;
            this.invalidImageManual=false;
            this.imageSizeExceed=false;
           // this.internalErrorMessage = 'There is some internal error.';
            setTimeout(() => {
              this.internalError = false;
            }, 5000);
          });
        }
        else {
           this.loader.display(false);
           this.invalidImageManual = false;
           this.internalError=false;           
           this.imageSizeExceed=false;

           this.inavlidImageManualMessage = 'File size can not be more than 500 kb.';
           setTimeout(() => {
            this.imageSizeExceed = false;
          }, 5000);
        }
      }
      else {
        this.loader.display(false);
        this.internalError=false;
        this.invalidImageManual=true;
        this.imageSizeExceed=false;
        this.invalidImageManual = true;
        this.inavlidImageManualMessage = 'Please upload a valid image.';
        setTimeout(() => {
          this.invalidImageManual = false;
        }, 5000);
      }
    }

  }

}
