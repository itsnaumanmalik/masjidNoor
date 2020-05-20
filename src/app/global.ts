import { Injectable } from '@angular/core'

@Injectable()
export class GlobalVariable {
    staging: boolean = true;

//Product: Array<{ productName: string, image: string, Quantity: number,price: number  }> = [];
cartflag: boolean = false;
BusinessID : any = -1  ;
udid:any;
email:any;
Product:any[] = new Array();

//Development Keys:-
 //paypalId: any = 'AW0PZOtfB6YzX5_3w70hdAtdWX18q7qN6o7tWaHmAvHIkyChXLHAif4F0qYipTMEvr9vbWcb2i4XguyN';
//StripId:any = 'pk_test_tlKA7FnnkzqjFk4Vh62yXNm3';
//StripId:any = 'sk_test_sZsauchwqCCE8ZLGz7WE8Inq';

//Development Stripe Key
//StripId:any = 'pk_test_WtkmOtqXEJe2Zya9XNxX42ZP00oCLybGWT';
//pk_test_tlKA7FnnkzqjFk4Vh62yXNm3
 
 //Secret Key
 //StripId:any = 'sk_test_sZsauchwqCCE8ZLGz7WE8Inq';

//Sandbox key
paypalSandboxId: any = 'AW0PZOtfB6YzX5_3w70hdAtdWX18q7qN6o7tWaHmAvHIkyChXLHAif4F0qYipTMEvr9vbWcb2i4XguyN';


//Live Keys:-
paypalId: any = 'AY5SYStA8d567xtFYQs1kKy2nA8nQkRYMpHTsCFjFvYNyyLP4eHZoiB0pWOY8QIi-5H9s3KyTkSHMUqY';
//Live Keys:-
StripId: any = 'pk_live_7QWheQF9Fd0prGb5wxUN25ce00dury00IM';

OrderId:any;
Timing:any;

BaseUrl:string;   
MenuUrl:string;

HomeFlag:boolean;

code:any;
constructor(){

        // if(this.staging ==true)
        // {
        //     this.BaseUrl = 'http://34.203.122.153/api/gain_staging/gain-server/index.php/Customer_controller'; 
        //     this.MenuUrl = 'http://34.203.122.153/api/gain_staging/gain-server/index.php/menu';
        //     this.RadeemUrl = 'http://34.203.122.153/api/gain_staging/gain-server/index.php/business_controller';
        // }
        //  else{
        //     this.BaseUrl = 'http://34.203.122.153/api/adsonscanapp/index.php/Customer_controller'; 
        //     this.MenuUrl = 'http://34.203.122.153/api/adsonscanapp/index.php/menu';
        //     this.RadeemUrl = 'http://34.203.122.153/api/adsonscanapp/index.php/business_controller';
        // }
    }
}


