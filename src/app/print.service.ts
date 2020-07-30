import { Injectable } from '@angular/core';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx'
import { from } from 'rxjs';
import { Toast } from '@ionic-native/toast/ngx';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  list:any=[];
  unpairedDevices=[];

  constructor(
    public btserial:BluetoothSerial,
    public toast:Toast,
    public alert:AlertService
    
    ) {  }

  unpaired()
  {
    console.log('Unpaired Start');
    let unPair = [{
      "class": 276,
      "id": "10:BF:48:CB:00:00",
      "address": "10:BF:48:CB:00:00",
      "name": "Nexus 7"
  }];
      this.btserial.discoverUnpaired().then(success =>
      {
        this.unpairedDevices = success[0];
      },err=>{ this.alert.alerter(err);});
      return this.unpairedDevices;
   
  } 

  searchBluetoothPrinter()
{
  this.btserial.enable().then(sucess =>
    {
this.toast.showShortBottom('bluetooth enabled').subscribe(toast =>{console.log(toast)});
    },failure =>
    {
      this.toast.showShortBottom('bluetooth not enabled'+failure).subscribe(toast =>{console.log(toast)});
    });
    this.btserial.isEnabled().then(sucess =>{
     this.list = this.btserial.list();
     console.log('list :',this.list);
    },failure =>{
      this.alert.alerter(failure);
      this.toast.showShortBottom('bluetooth not enabled'+failure).subscribe(toast =>{console.log(toast)});
    })
    return this.btserial.list();
}
connectToBluetoothPrinter(macAdress)
{
  return this.btserial.connect(macAdress);
}
disconnectBluetoothPrinter(mac)
{
  console.log(mac+'Printer Disconnected ');
  this.alert.alerter(mac+'is Disconnected');
  return this.btserial.disconnect();
}
sendToBluetoothPrinter(mac,data)
{
  this.connectToBluetoothPrinter(mac).subscribe(
    _=> {
      this.toast.show('Connection success','short','bottom').subscribe(toast =>{console.log(toast)});
      this.btserial.write(data).then(_ =>{
        console.log('Data written to printer '+data);
        //this.toast.show('Print success','short','center').subscribe(toast =>{console.log(toast)});
        this.alert.printAlert('Written Data<br>' +data+'<br> Printer MAC <br>'+mac,this.disconnectBluetoothPrinter(mac) );
       /*  this.disconnectBluetoothPrinter().then(_ =>{
          console.log('Printer Disconnected ');
        this.alert.alerter('Printer Disconnected');
  }); */

      },err=>{
        this.alert.alerter('Printer Failed'+err);
        console.log('Printing failed',err);
       // this.toast.show('Print Failed'+err,'short','bottom').subscribe(toast =>{console.log(toast)});
      })
    },err => {
      this.alert.alerter('Connection Failed'+err);
      console.log("Connection failed",err);
     // this.toast.show('Connection failed'+err,'short','bottom').subscribe(toast =>{console.log(toast)});
    }
  );
  
}
}






