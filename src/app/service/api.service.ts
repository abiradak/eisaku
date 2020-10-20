import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
export const apiUrl = 'http://159.89.171.95/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  alert: any;
  globaldata: any;
  settedValue: any;
  token: any;
  

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private dataservice: DataService
  ) { }

  getToken() {
    this.token = JSON.parse(localStorage.getItem('token'));
    return this.token;
  }


  sendHttpCallWithToken(data: any = '', url: any, method: any) {
    if (navigator.onLine === false) {
      this.dataservice.presentToast('Opps unable to connect internet' , 'danger');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'accept': 'aplication/json',
          Authorization: 'Bearer ' + this.getToken()
        })
      };

      switch (method) {
        case 'post':
          return this.http.post<any>(apiUrl + url, (data), httpOptions );

        case 'get':
          return this.http.get<any>(apiUrl + url, httpOptions);

        case 'put':
          return this.http.put<any>(apiUrl + url, (data), httpOptions);

        case 'delete':
          return this.http.delete<any>(apiUrl + url, httpOptions);

        default:
          console.log('Add method');
      }
    }
  }


  sendHttpCall(data: any = '', url: any, method: any) {
    if (navigator.onLine === false) {
      this.dataservice.presentToast('Opps unable to connect internet' , 'danger');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'accept': 'aplication/json',
        })
      };
      // console.log('check' , httpOptions);
      switch (method) {
        case 'post':
          return this.http.post<any>(apiUrl + url, (data), httpOptions );

        case 'get':
          return this.http.get<any>(apiUrl + url, httpOptions);

        case 'put':
          return this.http.put<any>(apiUrl + url, (data), httpOptions);

        case 'delete':
          return this.http.delete<any>(apiUrl + url, httpOptions);

        default:
          console.log('Add method');
      }
    }
  }
}