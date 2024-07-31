import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.scss']
})
export class OrganizationUserComponent implements OnInit {
  allOrganizationUserList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;
  constructor(private _superAdminService: SuperAdminService, private _toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.getAllOrganizationUserList();
  }

  //get all Organization user List...
  getAllOrganizationUserList() {
    this._superAdminService.getAllOrganizationUserList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allOrganizationUserList = res.data;
          this.total = res.pagination.total;
        } else {
          this.allOrganizationUserList = [];
          this.total = 0
        }
      }
    });
  }

  //Enable Disable organization user
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._superAdminService.organizationUserEnableDisable(id, status).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllOrganizationUserList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
        }
      },
    })
  }

  //pagination organization user table
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllOrganizationUserList();
  }

}
