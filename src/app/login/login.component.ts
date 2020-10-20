import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  login: FormGroup;
  url: string;

  constructor(
    public fromBuilder: FormBuilder,
    private apiService: ApiService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.login = fromBuilder.group({
      username: ['', [Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {}

  ionViewWillEnter() {
    
  }

  async submit() {
    if (this.login.value.username && this.login.value.username != '' && this.login.value.username != null &&
      this.login.value.password && this.login.value.password != '' && this.login.value.password != null) {
        this.dataService.presentLoading();
        let sendData = {
          email: this.login.value.username,
          password: this.login.value.password,
          user_type: 'Licensee',
        }
        this.apiService.sendHttpCall(sendData , 'login/' , 'post').subscribe( (response) => {
          console.log('response coming >>>>>>>>>' , response);
          let message = response.message;
          if(response.code == 200) {
            localStorage.setItem('userid' , response.user_id);
            this.dataService.hideLoading();
            this.dataService.presentToast(message , 'success');
            this.router.navigate(['students']);
          }
          if(response.code == 4){
            this.dataService.presentToast(message, 'danger');
            this.dataService.hideLoading();
          }
         // this.dataService.hideLoading();
        } , (err) => {
          this.dataService.hideLoading()
          console.log('errors coming >>>>>' , err);
        });
    } else {
      this.dataService.presentToast('Enter All Fields!' , 'warning');
    }
  }
}
