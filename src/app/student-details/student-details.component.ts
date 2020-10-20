import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
  courses = [];
  detailsData: any[];
  subjects: string;
  studentDetails = {};

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  

  ngOnInit() {}

  ionViewWillEnter() {
    this.getStidentsDetails();
  }

  async getStidentsDetails() {
    const id = this.route.snapshot.paramMap.get('id'); 
    let userid = localStorage.getItem('userid');
    let sendData = {
      user_id:  userid,
      student_id: id
    }
    this.dataService.presentLoading();
    this.apiService.sendHttpCall(sendData , 'student-details/' , 'post').subscribe((response) => {
      this.dataService.hideLoading();
      this.studentDetails = response.student_details;
      console.log('response details >>>>>>>' , this.studentDetails);
      this.detailsData = response.response;
      for (let index = 0; index < response.response.length; index++) {
        const element = response.response[index].courseSubjects;
        element.forEach(element => {
          this.courses.push(element.display_name)
        });
      }
      this.subjects = this.courses.toString();
      console.log('pre details >>>>>>>' ,response);
    }, err => {
      this.dataService.hideLoading();
      console.log('errors coming >>>>>>>' , err);
    })
  }

  back() {
    this.router.navigate(['students']);
  }
}
