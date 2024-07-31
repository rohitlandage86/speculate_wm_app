import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private _superAdminService: SuperAdminService, private _toastrService: ToastrService) { }

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
        } else {
          this.allEventList = [];
          this.total = 0
        }
      }
    })
  }
  //Enable Disable
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._superAdminService.bettingEventEnableDisable(id, status).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllEventList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
        }
      },
    })
  }
  // pagination 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllEventList();
  }
}

