import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  studentsData: any[];

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  

  ngOnInit() {}

  ionViewWillEnter() {
    this.getStudentsData();
  }

  async getStudentsData() {
    const userid = localStorage.getItem('userid');
    let sendData = {
      user_id: userid
    }
    this.apiService.sendHttpCall(sendData , 'students-by-institute/' , 'post').subscribe((response) => {
      let message = response.message;
      if(response.code == 3) {
        this.dataService.presentToast(message , 'danger')
      }
      if(response.code == 200) {
        this.studentsData = response.response;
        this.studentsData.forEach(element => {
          if(element.feedback == 1){
            element.feedback_status = true;
          } else {
            element.feedback_status = false;
          }
        });
      } 
      console.log('students data coming >>>>>>>>>>', response.response);
    } , (err) => {
      console.log('errors coming >>>>>>' , err);
    });
  }

  changeFeedback(id , e) {
    let value = null
    if(e == true){
      value = 0;
    } else {
      value = 1
    }
    let sendData = {
      user_id: localStorage.getItem('userid'),
      student_id: id,
      feedback_type: value
    }
    this.apiService.sendHttpCall(sendData, 'give-feedback/' , 'post').subscribe((response) => {
      console.log('asdfghjkl' , response);
      this.dataService.presentToast(response.message , 'success')
      this.getStudentsData();
    }, (err) => {
      console.log('errors coming >>>>>>' , err);
    });
  }
}
