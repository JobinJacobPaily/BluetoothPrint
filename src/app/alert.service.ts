import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(
    public alertService:AlertController
  ) { }

  async alerter(Messag)
  {
    let x = await this.alertService.create({
      header:'Alert !',
      message:Messag,
      
      buttons:['ok']
    });
    await x.present();
  }
  async printAlert(Messag,hand)
  {
    let x = await this.alertService.create({
      header:'Alert !',
      message:Messag,
      
      buttons:[
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: hand

          }
      ]
    });
    await x.present();
  }

}
