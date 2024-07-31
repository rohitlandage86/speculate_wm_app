import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationComponent } from '../organization.component';
import { AdminService } from '../../admin.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss']
})
export class ViewOrganizationComponent implements OnInit {
  organizationId: any;
  organizationDetails: any = {};
  baseUrlImage = environment.baseUrlImage
  logo2Name: any
  logo1Name: any
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>
  @ViewChild('shortimagePreview')
  shortimagePreview!: ElementRef<HTMLImageElement>
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
console.log('data==',this.organizationDetails);
        // Patch long logo
        if (this.organizationDetails.longLogoBase64) {
          const reader1 = new FileReader()
          reader1.onload = (e: any) => {
            this.imagePreview.nativeElement.src =
              'data:image/png;base64,' + this.organizationDetails.logo1Base64
          }
          reader1.readAsDataURL(this.organizationDetails.logo1Base64)
        }
        this.logo1Name = this.organizationDetails.logo1
        // Patch short logo
        if (this.organizationDetails.shortLogoBase64) {
          const reader2 = new FileReader()
          reader2.onload = (e: any) => {
            this.shortimagePreview.nativeElement.src =
              'data:image/png;base64,' + this.organizationDetails.logo2Base64
          }
          reader2.readAsDataURL(this.organizationDetails.logo2Base64)
        }
        this.logo2Name = this.organizationDetails.logo2

      },
    });
  }
  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
