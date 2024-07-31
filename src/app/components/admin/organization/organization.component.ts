import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SuperAdminService } from '../../super-admin/super-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrganizationComponent } from './view-organization/view-organization.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  allOrganizationList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0;

  constructor(
    private _superAdminService: SuperAdminService, private dialog: MatDialog
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
        } else {
          this.allOrganizationList = []
          this.total = 0
        }
      }
    });
  }
  //open view organization component ...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(ViewOrganizationComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      this.getAllOrganizationList();
      console.log('nothing happen');
    });
  }
  //pagination organization table
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllOrganizationList();
  }
}
