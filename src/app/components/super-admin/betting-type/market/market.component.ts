import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit{
  allMarketList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;
  constructor(private _superAdminService:SuperAdminService) {}

  ngOnInit(): void {
    this.getAllMarketList();
  }

    //get all Market List...
    getAllMarketList() {
      this._superAdminService.getAllBettingMarketTypeList(this.page,this.perPage).subscribe({
        next:(res:any)=>{
          if(res.data.length>0){
            console.log(res);
            this.allMarketList=res.data;
            this.total=res.pagination.total;
          }
        }
    })
  }

  // pagination 
onPageChange(event: PageEvent): void {
  this.page = event.pageIndex + 1;
  this.perPage = event.pageSize;
  this.getAllMarketList();
}

  
}
