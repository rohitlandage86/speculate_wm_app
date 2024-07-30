import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../super-admin.service';
import { PageEvent } from '@angular/material/paginator';

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
  constructor(private _superAdminService: SuperAdminService) { }

  ngOnInit(): void {
    this.getAllOrganizationUserList();
  }

  //get all Organization List...
  getAllOrganizationUserList() {
    this._superAdminService.getAllOrganizationUserList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allOrganizationUserList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allOrganizationUserList =[];
          this.total = 0
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllOrganizationUserList();
  }

}
