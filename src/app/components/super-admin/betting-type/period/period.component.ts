import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit{
  allperiodList : Array<any> =[];
  page = 1;
  perPage =50 ;
  total =0 ;


  constructor(private _superAdminService:SuperAdminService){}

 ngOnInit(){
this.getAllPeriodList();
  }
   //get all period list
  getAllPeriodList(){
   this._superAdminService.getAllBettingPeriodTypeList(this.page,this.perPage).subscribe({
    next:(res:any)=>{
      if(res.data.length>0){
        console.log(res);
        this.allperiodList=res.data;
        this.total=res.pagination.total;
      }
    }
   })
  }

  //pagination
  onPageChange(event:PageEvent):void{
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPeriodList();
  }




}
