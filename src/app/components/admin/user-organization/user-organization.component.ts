import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin/super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-organization',
  templateUrl: './user-organization.component.html',
  styleUrls: ['./user-organization.component.scss']
})
export class UserOrganizationComponent implements OnInit {
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

  //pagination user organization
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllOrganizationUserList();
  }

}
