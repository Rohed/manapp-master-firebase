var COMPLETED_ITEMS_MAIL = ['ridwaan@itility.co.uk','reports@gbvco.co.uk'];

var logSheet='1eBgWg9aFdpJWpUoa_pNbbX_Yn8Ogqw6843OfPLnDeZ0';
//var logSheet='1bm0rLoeqaMMjMNxfMyLmxKDM08akj-BQNVbayOS87bY';

var PRODUCTION_FILE_ID='136hpJ3Ro5u5u1BWycljcaaYfnmLatwP6MczLTOi6vPw';
var PACKAGING_FILE_ID='1KzFXDpDxj_Gp9nNnmaf6NtBQuvZhXAMNXQaD6Kigg-k';
var SHIPPING_FILE_ID='1-J55GsiP9sEAf22Ab4_4z1eYTwv82Tj8VBZBRKmsx5E';
var SHIPPING_FILE_ID2='1gOyqNifqa129xRLyXx3D4wDYns1Xq8kaZBg-qNo9A3c';
var ORDER_FILE_ID='1qwK31tKqfvj5slq8EjDlfQusnQS4NWmf2vfh9DbPlPo';
var XERO_FILE_ID='1Ffr3HwHLwnkDgMmpCmFLxiCn1RaeRfb1NiMhokeBjfA';
var COMPLETED_FILE_ID='1riSkwlPQf6W-JylG8mZINHonEC8c-30R9Z-AUWnjHx4';

var BATCH_NOTES_FOLDER='10Tsr2pzAw6M3gvX-Fk7puLcwHPTvsLWW';
var SHIPPING_NOTES_FOLDER='1dHsz0oIZ-cBo8oxj1EhYzo_SlmbeOOvm';
var PACKAGING_NOTES_FOLDER='1Ad6oULU6kWZksI8Tt5pc-Y83_Pk8H8mM';
var ORDERS_FOLDER='1CvAwh8PDebDH_fjdgIJZTMqwfDFOKFI4';
var EXPORTS_FOLDER='1WHrh3TyGvNxhGqsk-uhmztC2rYAQjKMP';
var XERO_FOLDER='1TR_CeaRUspfNLmqes5MVbW577yaGW-TZ';
var COMPLETED_ITEMS_FOLDER='1JLNQkfYrP5lukYxEbO_8xSSlLEMpsLf6';




var TRANSACTION_SHEET = '1UsVDLzLrM-InfyLE0trFLjtQnRVrkBxtSgSOTASddtI';


var SCHEDULE_TEMPLATE='1b0tz2KAybito0rXJfBkXRU7T5yaLnu3wUhoA2XaCUYg'
var SCHEDULES_FOLDER='1fTERlkL5bPu7UzUYkGfgaQF87RHxNMlj';


var NODE_PATH='manapp';
var SERVER_URL = 'http://factory-dev-adm.gbvco.co.uk/';
var DATABASE_URL = 'http://factory-dev-adm.gbvco.co.uk/manapp/db';

var secret='2Ue42tEo5yfjkZn6Fd6NB4eNygOEGJPXjcjxGy2d';
var config = {
    apiKey: "AIzaSyAbjFGr0HjZDmM3ybZLzy_u8yyjv2ePe8Q",
    authDomain: "gbvco-vape-factory-solution.firebaseapp.com",
    databaseURL: "https://gbvco-vape-factory-solution.firebaseio.com/",
    projectId: "gbvco-vape-factory-solution",
    storageBucket: "gbvco-vape-factory-solution.appspot.com",
    messagingSenderId: "164416568407"
  };
//var base = FirebaseApp.getDatabaseByUrl(config.databaseURL,secret);
   var base =  new Base(DATABASE_URL);

//var secret='Uvl0pyPGexQvu6vvoR3DMUWFX6l1GTnyxXdSC7jN';
//var config = {
//    apiKey: "AIzaSyAYlA63QS2K87EauWA-ul1ASPDE3w5YZgY",
//    authDomain: "testing-gbvco-factory-app.firebaseapp.com",
//    databaseURL: "https://testing-gbvco-factory-app.firebaseio.com/",
//    projectId: "testing-gbvco-factory-app",
//    storageBucket: "testing-gbvco-factory-app.appspot.com",
//    messagingSenderId: "618814587524"
//  };
//
//var base = FirebaseApp.getDatabaseByUrl(config.databaseURL,secret);

var LOGOIMG='1BZiIDAXNW2mNCln5OJdb2bplepctiWhm';
var BOTTLEIMG='17y_MVC8n7iywrRMgV0RCoxjLXutfHtVE';
var TITLE='Manchester';
function testord(){

var data =base.getData('Machines');
var arr = JSONtoARR(data);
Logger.log(data);
}


function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function doGet(e) {
var email=Session.getActiveUser().getEmail();
var allowed=checkAllowed(email);
if(!allowed){
allowed=checkAllowedFormOnly(email);
}
if(allowed){
    var id = e.parameter.id;
    var sheet = e.parameter.sheet;
    if (!sheet) {
        if (id == PASSWORD) {
            var template = HtmlService.createTemplateFromFile('adminPage');
          template.LOGOIMG=LOGOIMG;
          template.BOTTLEIMG=BOTTLEIMG;
          template.TITLE=TITLE;
            return template.evaluate();
        } else if (id == 'form') {
            var template = HtmlService.createTemplateFromFile('OrderForm');
            template.id = id;
            template.LOGOIMG=LOGOIMG;
          template.BOTTLEIMG=BOTTLEIMG;
          template.TITLE=TITLE;
            return template.evaluate();

        }
    } else if (id == SLSHEETPASSWORD) {
        var template = HtmlService.createTemplateFromFile('slSheets');
        template.sheetName = sheet;
        template.LOGOIMG=LOGOIMG;
          template.BOTTLEIMG=BOTTLEIMG;
          template.TITLE=TITLE;
        return template.evaluate();
    }
    }else{
    //https://drive.google.com/file/d/1AFoqQQIpW9Y5Jt1D4HiRTocAJu247n2_/view?usp=sharing
    // var template = HtmlService.createHtmlOutput("<img style='height:900px; width:100%;' src='https://drive.google.com/uc?export=view&id=1AFoqQQIpW9Y5Jt1D4HiRTocAJu247n2_'>");
    var template = HtmlService.createHtmlOutput("<h1>NO ACCESS</h1>");
    return template;
    }
    
}


function getRandom() {
    thisNumber = Math.floor(Math.random() * 10000)

    return thisNumber

}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < 1; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

  function searchResults(mainData) {

  var resultHTML = "";
    var Final = ['empt', 'empt'];
   
    for (var i = 0; i < mainData.length; i++) {
     var FoundRow=[];
        for (var k = 0; k < options.searchArray.length; k++) {
       
             for (var j = 0; j < mainData[i].length; j++) {
                 for (var n = 1; n < options.searchArray[k].length; n++) {

                    if (options.searchArray[k][0] == mainData[0][j].replace("#", "").replace(/ /g,"").replace("/",'').replace("&",'')) {
                      
                      if(((typeof mainData[i][j])=='string')&&mainData[i][j].indexOf(',')!=-1){
                           var row=mainData[i][j].split(', ');
                             for(var b=0;b<row.length;b++){
                               if(row[b]==options.searchArray[k][n]){
                               FoundRow.push('Found');
                               
                               }

                             }

                        }
                      else if(((typeof mainData[i][j])=='string')&&(mainData[i][j].toLowerCase().search(options.searchArray[k][n])!=-1)){
                       FoundRow.push('Found');
                      }  
                      else if((typeof mainData[i][j])=='number'&&options.searchArray[k][n]>= mainData[i][j]){
                       FoundRow.push('Found');
                      }
                      else if(mainData[i][j]==options.searchArray[k][n]){
                       FoundRow.push('Found');
                      }

                }

            }
        }


    }
    Final.push(FoundRow);
}

    var retarr=[];
    var resultHTML = "";
    var max = Final[0].length;
    
    for (var i = 0; i < Final.length; i++) {
      if (max < Final[i].length) {
        max = Final[i].length;
      }
    }
    for (var j = 0; j < mainData.length; j++) {
      if (mainData[j][30] != "" && Final[j].length >= max) {
        retarr.push(mainData[j])
      }
    }
    return retarr;
  }
  
 
function checkAllowedFormOnly(email){

var emails=[
'gusto@gorillavapour.co.uk'
]

var index=emails.indexOf(email);

if(index!=-1){
return true;
}else{
return false;
}



}

function checkAllowed(email){

var emails=['gbvco.manage@gmail.com',
'gbvco.manage2@gmail.com',
'gbvco.mixing@gmail.com',
'gbvco.production@gmail.com',
'gbvco.pack@gmail.com',
'gbvco.print@gmail.com',
'sh@gbvco.co.uk',
'ikara@gbvco.co.uk',
'shoyab@gbvco.co.uk',
'saeed@gbvco.co.uk',
'ridwaan@itility.co.uk',
'ridi_adam@hotmail.com',
'oliveraluloski@gmail.com',
 'aluloski.oliver@gmail.com',
'yourdailyengi@gmail.com',
'pantheon512@gmail.com',
'ali@gorillavapour.co.uk',
'accounts@gbvco.co.uk',
'shuaib@gbvco.co.uk',
'gbvco.factory@gmail.com',
'amir.rathor@gbvco.co.uk',
'jay@gbvco.co.uk',
'gbvco.factory2@gmail.com'];

var index=emails.indexOf(email);

if(index!=-1){
return true;
}else{
return false;
}


}
 
 

 
