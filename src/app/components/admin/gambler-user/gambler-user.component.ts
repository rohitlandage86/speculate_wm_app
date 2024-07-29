import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewGamblerUserComponent } from './view-gambler-user/view-gambler-user.component';

@Component({
  selector: 'app-gambler-user',
  templateUrl: './gambler-user.component.html',
  styleUrls: ['./gambler-user.component.scss']
})
export class GamblerUserComponent implements OnInit{
  allGamblersList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0; 
  constructor(private _adminService:AdminService,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllGamblersList();
  }
     //get all Gamblers List...
     getAllGamblersList() {
      this._adminService.getAllGamblersList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allGamblersList = res.data;
            this.total = res.pagination.total;
          }
        }
      });
    }
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllGamblersList();
    }
    //open module...
    openDialog(data?: any) {
      const dialogRef = this.dialog.open(ViewGamblerUserComponent, {
        data: data,
        width: '50%',
        panelClass: 'mat-mdc-dialog-container'
      });
      dialogRef.afterClosed().subscribe((message:any) => {
          this.getAllGamblersList();
          console.log('nothing happen');
        
      });
    }
}
