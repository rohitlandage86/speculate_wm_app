import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SportsComponent } from '../sports.component';
import { AdminService } from '../../admin.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-view-sports',
  templateUrl: './view-sports.component.html',
  styleUrls: ['./view-sports.component.scss']
})
export class ViewSportsComponent implements OnInit {
  sportsId: any;
  sportsDetails: any = {};
  baseUrlImage = environment.baseUrlImage
  logo1Name: any;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>
  constructor(private dialogRef: MatDialogRef<SportsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _adminService: AdminService) { }

  ngOnInit(): void {
    if (this.data) {
      this.sportsId = this.data.sport_id;
      this.getSportsById(this.sportsId)
      

    }
  }
  getSportsById(id: any) {
    this._adminService.getSportsById(id).subscribe({
      next: (result: any) => {
        this.sportsDetails = result.data;
        if (this.sportsDetails.longLogoBase64) {
          const reader1 = new FileReader()
          reader1.onload = (e: any) => {
            this.imagePreview.nativeElement.src =
              'data:image/png;base64,' + this.sportsDetails.logo1Base64
          }
          reader1.readAsDataURL(this.sportsDetails.logo1Base64)
        }
        this.logo1Name = this.sportsDetails.image
      },
    });
  }

  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
