import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  allSportsList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;
  constructor(private _superAdminService: SuperAdminService, private _toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.getAllSportsList();
  }
  //get all Sports List...
  getAllSportsList() {
    this._superAdminService.getAllSportsList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSportsList = res.data;
          this.total = res.pagination.total;
        } else {
          this.allSportsList = [];
          this.total = 0
        }
      }
    });
  }

  //Enable Disable sports
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._superAdminService.sportsEnableDisable(id, status).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllSportsList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
        }
      },
    })
  }
  //pagination in sports table
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllSportsList();
  }
}
