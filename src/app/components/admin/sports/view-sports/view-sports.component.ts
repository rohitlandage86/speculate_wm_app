import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SportsComponent } from '../sports.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-sports',
  templateUrl: './view-sports.component.html',
  styleUrls: ['./view-sports.component.scss']
})
export class ViewSportsComponent implements OnInit {
  sportsId: any;
  sportsDetails: any = {};
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
      },
    });
  }

  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
