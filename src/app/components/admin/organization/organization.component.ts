import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SuperAdminService } from '../../super-admin/super-admin.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent  implements OnInit{
  allOrganizationList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;

  constructor(
    private _superAdminService: SuperAdminService
  ) { }
  
  ngOnInit(): void {
    this.getAllOrganizationList();
  }

    //get all Organization List...
    getAllOrganizationList() {
      this._superAdminService.getAllOrganizationList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allOrganizationList = res.data;
            this.total = res.pagination.total;
          }
        }
      });
    }
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllOrganizationList();
    }
}
