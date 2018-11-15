var COMPLETED_ITEMS_MAIL = ['oliveraluloski@gmail.com', 'oliveraluloski@gmail.com'];//'ridwaan@itility.co.uk';

var logSheet='1YAsfxGc0sFhHZw4b_Sh4e4tuULAGOH1_kPMiFV6S1T0';

var PRODUCTION_FILE_ID='136hpJ3Ro5u5u1BWycljcaaYfnmLatwP6MczLTOi6vPw';
var PACKAGING_FILE_ID='1KzFXDpDxj_Gp9nNnmaf6NtBQuvZhXAMNXQaD6Kigg-k';
var SHIPPING_FILE_ID='1-J55GsiP9sEAf22Ab4_4z1eYTwv82Tj8VBZBRKmsx5E';
var SHIPPING_FILE_ID2='1gOyqNifqa129xRLyXx3D4wDYns1Xq8kaZBg-qNo9A3c';
var ORDER_FILE_ID='1qwK31tKqfvj5slq8EjDlfQusnQS4NWmf2vfh9DbPlPo';
var XERO_FILE_ID='1Ffr3HwHLwnkDgMmpCmFLxiCn1RaeRfb1NiMhokeBjfA';
var COMPLETED_FILE_ID='1boF8u67P4crfZMQ4QDd3uK0KIEe6opolJIgUsKHr2b0';

var BATCH_NOTES_FOLDER='1K_G8U8onL0GGlDRxtEDJTkMlMHoY30fl';
var SHIPPING_NOTES_FOLDER='1Bnh6aNdcFqZyLdSpoYN1HNvTe7cAgUU_';
var PACKAGING_NOTES_FOLDER='1ECd_C9grVngbefN0TDMIxRarl5e9UK2S';
var ORDERS_FOLDER='1JtJZpf9b4e5cj0E-GNDW6aih-Oog_wyx';
var EXPORTS_FOLDER='1Jb4ObJ3epEJGg3Nk0sDCIeh0sp6xtSus';
var XERO_FOLDER='1KocUhCjOA869EYoQTdp8b4lwClr3G8v_';
var COMPLETED_ITEMS_FOLDER='1T4LoA1BzvG5l-e_Lhc4UVuoQTsK1Zd6y';

var TRANSACTION_SHEET = '1Y13IPKeBV32K_qW2PNKKoya9UoZ3kO4Zr8P1mlVUTxU';

var SCHEDULE_TEMPLATE='1b0tz2KAybito0rXJfBkXRU7T5yaLnu3wUhoA2XaCUYg'
var SCHEDULES_FOLDER='10SrmU1Y1Kwy4e4Tq1R002TEbh0VZeoIC';

var LOGOIMG='1BZiIDAXNW2mNCln5OJdb2bplepctiWhm';
var BOTTLEIMG='17y_MVC8n7iywrRMgV0RCoxjLXutfHtVE';
var TITLE='Testing';
var NODE_PATH='testapp';
var SERVER_URL = 'http://factory-dev-adm.gbvco.co.uk/';

var secret='Uvl0pyPGexQvu6vvoR3DMUWFX6l1GTnyxXdSC7jN';
var config = {
  apiKey: "AIzaSyAYlA63QS2K87EauWA-ul1ASPDE3w5YZgY",
  authDomain: "testing-gbvco-factory-app.firebaseapp.com",
  databaseURL: "https://testing-gbvco-factory-app.firebaseio.com/",
  projectId: "testing-gbvco-factory-app",
  storageBucket: "testing-gbvco-factory-app.appspot.com",
  messagingSenderId: "618814587524"
};

var base = FirebaseApp.getDatabaseByUrl(config.databaseURL,secret);

function include(filename) {
  var template = HtmlService.createHtmlOutputFromFile(filename);
  
  return template.getContent();
}






function testpush(){
  var data=JSONtoARR(base.getData('FlavourMixOrders'));
  
  Logger.log(data);
  
}


function testmatch(){
  
  
  var pages=['PremixesTypes','BrandedTypes','UnbrandedTypes'];
  for(var k=0;k<pages.length;k++){
    var data=JSONtoARR(base.getData(pages[k]));
    var rawData=base.getData(pages[k]);
    for(var i=0;i<data.length;i++){
      if(data[i].sku=='UNB9519W'){
        Logger.log('found');}
      if(data[i].sku){
        try{
          if(data[i].sku=='UNB9519W'){Logger.log('In');}
          
          if(!data[i].Reserved){
            rawData[data[i].sku].Reserved=0;
          }
          if(!data[i].Completed){
            rawData[data[i].sku].Completed=0;
          }
          if(!data[i].Running){
            rawData[data[i].sku].Running=0;
          }
          if(0>data[i].Reserved){
            rawData[data[i].sku].Reserved=0;
          }
          if(0>data[i].Completed){
            rawData[data[i].sku].Completed=0;
          }
          if(0>data[i].Running){
            rawData[data[i].sku].Running=0;
          }
          if(isNaN(data[i].Reserved)){
            rawData[data[i].sku].Reserved=0;
          }
          if(isNaN(data[i].Completed)){
            rawData[data[i].sku].Completed=0;
          }
          if(isNaN(data[i].Running)){
            rawData[data[i].sku].Running=0;
          }
        }catch(e){Logger.log(data[i].sku);}
      }
    }
    base.updateData(pages[k],rawData);
    
  }
}
function delvalbb(){
  var batch='Banoffee';
  
  var params={
    
    //orderBy:'flavour'
    orderBy : ['flavour'],
    equalTo: batch
    
  };
  var mixes=base.getData('Orders',params);
  
  Logger.log(mixes);
  
}
function fixFlavour(){
  var list1=JSONtoARR(base.getData("Orders"));
  for(var i=0;i<list1.length;i++){
    if(list1[i].flavour=='Cap n Cook'){
      
      list1[i].flavour='Cap N Cook';
      base.updateData('Orders/'+list1[i].batch,list1[i]);
    }
    
  }
  
  
  
}
function testDOGET(){
  var obj={
    parameter:{
      id:'PASSWORD',
      
    },
  };
  
  doGet(obj)
}


function doGet(e) {
  var email=Session.getActiveUser().getEmail();
  var allowed=checkAllowed(email);
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
    return "<h1>NO ACCESS</h1>"
  }
  
  
}
function testdateSS(){
  Logger.log(new Date('2017-12-07T12:41:25Z'));
  //Logger.log(new Date('01/01/2017'));
  Logger.log(new Date('22-01-2017'));
  //  06-02-2018
  var x=new Date(1519858800000);
  Logger.log(x);
  if(x.getTime()>new Date().getTime()){
    var from='06-02-2018'.replace(/\//g,'-').split("-");
    Logger.log(new Date(from[2], parseInt(from[1]-1) , from[0]));
  }
  var from='06-02-2018'.replace(/\//g,'-').split("-");
  Logger.log(new Date(from[2], parseInt(from[1]-1) , from[0]));
  
  var from='02-06-2018'.replace(/\//g,'-').split("-");
  Logger.log(new Date(from[2], parseInt(from[0]-1) , from[1]));
  
}

function getRandom() {
  var thisNumber = Math.floor(Math.random() * 10000)
  
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

function logUser(page,app){
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'App Opened',
    batch:app,
    page: page,
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  logItem(LOGDATA)
  
} 


function logItem(item){
  
  item.time=(new Date()).toString();
  if(item.data){
    item.data=item.data.join(';');
  }else{
    item.data='';
  }
  
  base.pushData('Log/',item); 
  //  }
}
function getStatus(){
  var status=base.getData('LogStatus');
  if(status){
    return true;
  }else{
    return false;
  }
  
  
}

function setStatusinDB(attr){
  Logger.log(attr);
  if(attr=='Off'){
    var data={
      status:'On',
    }
    base.updateData('LogStatus',data);
    return true;
  }else{
    
    base.removeData('LogStatus');
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
              'shuaib@gmail.com',
              'sh@gbvco.co.uk',
              'ikara@gbvco.co.uk',
              'shoyab@gbvco.co.uk',
              'saeed@gbvco.co.uk',
              'ridwaan@itility.co.uk',
              'ridi_adam@hotmail.com',
              'yourdailyengi@gmail.com',
              'oliveraluloski@gmail.com',
               'aluloskioliver@gmail.com',
              'gbvco.factory2@gmail.com'];
              
              var index=1;
              
              if(index!=-1){
              return true;
              }else{
              return false;
              }
              
              
              }
              
              
function transferPC(){
  
  var secret2='2Ue42tEo5yfjkZn6Fd6NB4eNygOEGJPXjcjxGy2d';
  var config2 = {
    apiKey: "AIzaSyAbjFGr0HjZDmM3ybZLzy_u8yyjv2ePe8Q",
    authDomain: "gbvco-vape-factory-solution.firebaseapp.com",
    databaseURL: "https://gbvco-vape-factory-solution.firebaseio.com/",
    projectId: "gbvco-vape-factory-solution",
    storageBucket: "gbvco-vape-factory-solution.appspot.com",
    messagingSenderId: "164416568407"
  };
  var base2 = FirebaseApp.getDatabaseByUrl(config2.databaseURL,secret2);
  var data = base2.getData('Inventory');
//  var PCORIG =  JSONtoARR(data);
//  for(var i=0;i<PCORIG.length;i++){
//    if(data[PCORIG[i].productcode+'BB']){
//    data[PCORIG[i].productcode].linkedBB = PCORIG[i].productcode+'BB';
//    }
//  }
  base.updateData('Inventory',data);

  
//  var data=base2.getData('References');
//  
//  base.updateData('References',data);
  
}

              
              function importORDERS(){
              
              var secret2='2Ue42tEo5yfjkZn6Fd6NB4eNygOEGJPXjcjxGy2d';
              var config2 = {
              apiKey: "AIzaSyAbjFGr0HjZDmM3ybZLzy_u8yyjv2ePe8Q",
              authDomain: "gbvco-vape-factory-solution.firebaseapp.com",
              databaseURL: "https://gbvco-vape-factory-solution.firebaseio.com/",
              projectId: "gbvco-vape-factory-solution",
              storageBucket: "gbvco-vape-factory-solution.appspot.com",
              messagingSenderId: "164416568407"
              };
              var base2 = FirebaseApp.getDatabaseByUrl(config2.databaseURL,secret2);
              
              var sheets = ['BrandedTypes','UnbrandedTypes','Flavours','BottleTypes','Boxes','Colors','Packages','Misc','Labels','Lids'];
  sheets.map(function(item){
    var data=base.getData(item);
    if(data){
      //    var data2=base2.getData(item);
      //    if(data2){
      //    var keys=Object.keys(data);
      //      keys.map(function(item2){
      //        if(data2[item2] && data[item2]){
      //          data2[item2].Running =   data[item2].Running;
      //          data2[item2].Reserved =   data[item2].Reserved;
      //          data2[item2].Completed =   data[item2].Completed;
      //          data2[item2].Stock =   data[item2].Stock;
      //        }
      //      });
      base2.updateData(item,data);
      //      }
    }
  });
  
  
}


