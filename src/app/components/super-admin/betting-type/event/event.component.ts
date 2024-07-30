import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  allEventList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;
  constructor(private _superAdminService: SuperAdminService) { }

  ngOnInit(): void {
    this.getAllEventList();
  }
  // get all betting event list
  getAllEventList() {
    this._superAdminService.getAllBettingEventTypeList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allEventList = res.data;
          this.total = res.pagination.total;
        } else{
          this.allEventList=[];
          this.total = 0
        }
      }
    })
  }
  // pagination 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllEventList();
  }
}

