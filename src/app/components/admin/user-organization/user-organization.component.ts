import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin/super-admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-organization',
  templateUrl: './user-organization.component.html',
  styleUrls: ['./user-organization.component.scss']
})
export class UserOrganizationComponent implements OnInit{
  allOrganizationUserList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0; 
    constructor(private _superAdminService:SuperAdminService) { }
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
