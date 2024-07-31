import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin/super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  allStatesList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;
  constructor(private _superAdminService: SuperAdminService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllStatesList();
  }
  //get all states List...
  getAllStatesList() {
    this._superAdminService.getAllStatesList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allStatesList = res.data;
          this.total = res.pagination.total;
        } else {
          this.allStatesList = [];
          this.total = 0;

        }
      }
    });
  }

  //Enable Disable state
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._superAdminService.statesEnableDisable(id, status).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllStatesList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
        }
      },
    })
  }
  //pagination state table
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllStatesList();
  }
}
