import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../super-admin/super-admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ViewSportsComponent } from './view-sports/view-sports.component';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit{
  allSportsList: Array<any> = [];
  page = 1;
  perPage = 50;
  total = 0; 
  constructor(private _superAdminService:SuperAdminService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllSportsList();
  }
     //get all Sports List...
     getAllSportsList() {
      this._superAdminService.getAllSportsList(this.page, this.perPage).subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allSportsList = res.data;
            this.total = res.pagination.total;
          }
        }
      });
    }
      //open ...view sports
      openDialog(data?: any) {
        const dialogRef = this.dialog.open(ViewSportsComponent, {
          data: data,
          width: '50%',
          panelClass: 'mat-mdc-dialog-container'
        });
        dialogRef.afterClosed().subscribe((message:any) => {
            this.getAllSportsList();
            console.log('nothing happen');
          
        });
      }
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex + 1;
      this.perPage = event.pageSize;
      this.getAllSportsList();
    }
}
