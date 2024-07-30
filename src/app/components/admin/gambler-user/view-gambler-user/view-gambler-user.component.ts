import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GamblerUserComponent } from '../gambler-user.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-gambler-user',
  templateUrl: './view-gambler-user.component.html',
  styleUrls: ['./view-gambler-user.component.scss']
})
export class ViewGamblerUserComponent implements OnInit {
  gamblerDetails: any = {};
  gamblarId: any
  constructor(private dialogRef: MatDialogRef<GamblerUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _adminService: AdminService) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.gamblarId = this.data.gambler_id;
      this.getGamblersById(this.gamblarId)
    }
  }
  //gambler by id patch data
  getGamblersById(id: any) {
    this._adminService.getGamblersById(id).subscribe((result: any) => {
      this.gamblerDetails = result.data;
    });
  }

  closeDialog(message?: any) {
    this.dialogRef.close(message);
  }
}
