import { Component } from '@angular/core';
import {PrintService} from '../print.service';
import { from } from 'rxjs';

import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Toast} from '@ionic-native/toast/ngx';


import {Platform} from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textData:string;
  subscription :any;
  pdfObj=null;
      unpairlist:any;
    ListBluetooth :any;
    selectedPrinter :any;
  constructor(
    private plt :Platform,
     private print:PrintService,
     private file :File,
     private fileOpener :FileOpener,
     private social :SocialSharing,
     private toast :Toast,
     private alert:AlertService
     ) {
   // this.listPrinter();
  }
  createPdf() {
let itemname :any =[['item 1','item 2','item 3','item 4','item5','item6','item7'],
[2,3,3,4,5,6,7],
[100,200,300,250,25,579,121],
[100,200,300,250,25,579,121],];
var tot = itemname[itemname.length-1];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
var sum = tot.reduce(reducer);
var Disc=0;
var Btax =sum;
var tax =0;
var Ntotal=sum+(tax*sum)-Disc;
var date='12/2/2020'
var Invoice=12345;
var User='user';
var Name='Demo Name';
var Adress='Demo Address';
var Phone='1234567889';



var dd = {
pageSize: {
width: 288,
height: 432,

},
pageMargins: [ 20, 25, 10, 0 ],
content: [
{
style:'column1', margin:[0,0,0,0],
columns: [
{

width: 80,
text:'Invoice :'
},
{
text:Invoice
}
]
},
{
style:'column1',
columns: [
{
width: 80,
text:'Date      :'
},
{
text:date
}
]
},
{
style:'column1',
columns: [
{
width: 80,
text:'User      :'
},
{
text:User
}
]
},
{
style:'column2', margin:[0,15,0,0],
columns: [
{
width: 80,
text:'Customer :'
},
{
text:Name
}
]
},
{
style:'column2',
columns: [
{
width: 80,
text:'Address   :'
},
{
text:Adress
}
]
},
{
style:'column2',
columns: [
{
width: 80,
text:'Phone      :'
},
{
text:Phone
}
]
},
{
style:'table1',
table:{
headerRows:1,
widths:['*','*','*','*'],
body:[
['','','',''],
['Item Name','Quantity','Price','Total'],
 ['','','','']
]
},	layout: 'headerLineOnly'
},
{
style:'table2',
table:{
widths:['*','*','*','*'],
body:[
itemname
]
},	layout: 'headerLineOnly'
},
{
style:'table3',
table:{
headerRows:1,
widths:['*','*','*','*'],
body:[
['','','',''],
[{text:'Terms and Conditions',fontSize:12,colSpan:2},'','Total',sum],
 [{qr:'Thanks',rowSpan:4,colSpan:2,margin:[0,10,0,0]},'','Discount',Disc],
  ['','','Before Tax',Btax],
   ['','','Tax',tax],
    ['','','Net Total',Ntotal]
]
},	layout: 'headerLineOnly'
},



],
styles:{
column1:{

fontSize:10,
bold:true
},
column2:{

fontSize:10,
italics:true
},
table1:{
margin:[0,20,0,0],
fontSize:10,
bold:true
},
table2:{

fontSize:10,
italics:true,


},
table3:{

fontSize:10,
bold:true
}
}

}
   
    this.pdfObj = pdfMake.createPdf(dd);
    this.toast.show('PDF created','short','bottom').subscribe(
      toast => {
        console.log('toast');
       
      }
    );
    this.alert.alerter("PDF Created");
  }
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.externalDataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
        
        
        })
      });
      this.toast.show('Pdf downloaded to'+this.file.externalDataDirectory+'myletter.pdf','long','top').subscribe(toast =>
        {
          console.log(toast);
        });
        this.alert.alerter('PATH:'+this.file.externalDataDirectory);
    } else {
      // On a browser simply use download!
      this.pdfObj.download().then(_ =>{
       // this.toast.showShortBottom("Downloading");
      });
      this.alert.alerter('Downloaded');
    }
  }

  openpdf()
  {
    this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf');
  }



  listPrinter()
  {
    console.log("List Print")
    this.print.searchBluetoothPrinter().then
    (resp => {
      this.ListBluetooth =resp;
      console.log(resp);
    });
    this.toast.show('Listng devices','short','bottom').subscribe(toast =>
      {
        console.log(toast);
      });
  }
   listunpaired()
  {
    this.unpairlist = this.print.unpaired();
    console.log('From home Unpaired'+this.unpairlist);
  }
  selectPrinter(macAdress)
  {
  this.selectedPrinter= macAdress;
  }

  printText()
  {
     var Text = 'Hello this is a test Print';
     this.print.sendToBluetoothPrinter(this.selectedPrinter,Text);
  }
  printCustomText()
  {
     
     this.print.sendToBluetoothPrinter(this.selectedPrinter,this.textData);
  }
printStuff()
{
  var myText ="Hello";
  this.print.sendToBluetoothPrinter(this.selectedPrinter,this.file.externalDataDirectory+'myletter.pdf');
 // this.toast.showShortBottom("PDF sending to Printer");
  this.toast.show('sending to print ','short','bottom').subscribe(toast =>
    {
      console.log(toast);
    });


}
printStuffArray()
{
  var buffer = this.pdfObj.getBuffer();
  var arr = new Uint32Array(buffer);
  var binaryArray = arr.buffer;
  var myText ="Hello";
  this.print.sendToBluetoothPrinter(this.selectedPrinter ,binaryArray);
 // this.toast.showShortBottom("PDF sending to Printer");
  this.toast.show('sending Array to print ','short','bottom').subscribe(toast =>
    {
      console.log(toast);
    });


}
printStuffBlob()
{
  var buffer = this.pdfObj.getBuffer();
  var arr = new Uint32Array(buffer);
  var binaryArray = arr.buffer;
  var blob = new Blob( [binaryArray],{type:'application/pdf'})
  var myText ="Hello";
  this.print.sendToBluetoothPrinter(this.selectedPrinter ,blob);
 // this.toast.showShortBottom("PDF sending to Printer");
  this.toast.show('sending Array to print ','short','bottom').subscribe(toast =>
    {
      console.log(toast);
    });


}

share()
{
  this.social.share('hello','hi',this.file.externalDataDirectory+'myletter.pdf');
  this.toast.show('Sharing','short','bottom').subscribe(toast =>
    {
      console.log(toast);
    });

}    







 ionViewWillEnter()
{
this.plt.backButton.subscribe(()=>{ navigator['app'].exitApp(); }); 
} 
ionViewWillLeave(){ this.subscription.unsubscribe(); } 
}
 
