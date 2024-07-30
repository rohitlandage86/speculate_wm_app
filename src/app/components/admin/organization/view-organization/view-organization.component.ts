import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationComponent } from '../organization.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss']
})
export class ViewOrganizationComponent implements OnInit {
  organizationId: any;
  organizationDetails: any = {};
  constructor(private dialogRef: MatDialogRef<OrganizationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _adminService: AdminService) { }

  ngOnInit(): void {
    if (this.data) {
      this.organizationId = this.data.org_id;
      this.getOrganizationById(this.organizationId)
    }
  }
  getOrganizationById(id: any) {
    this._adminService.getOrganizationById(id).subscribe({
      next: (result: any) => {
        this.organizationDetails = result.data;
      },
    });
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
