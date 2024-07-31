import { Component, OnInit } from '@angular/core'
import { SuperAdminService } from '../../super-admin.service'
import { PageEvent } from '@angular/material/paginator'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  allConfigurationList: Array<any> = []
  page = 1
  perPage = 50
  total = 0
  constructor(private _superAdminService: SuperAdminService, private _toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.getAllConfigurationList()
  }

  //get all Configuration List...
  getAllConfigurationList() {
    this._superAdminService
      .getAllConfigurationList(this.page, this.perPage)
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allConfigurationList = res.data
            this.total = res.pagination.total
          } else {
            this.allConfigurationList = []
            this.total = 0
          }
        }
      })
  }

  //Enable Disable configuration
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._superAdminService.configurationEnableDisable(id, status).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllConfigurationList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
        }
      },
    })
  }
  //pagination in configuration table
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1
    this.perPage = event.pageSize
    this.getAllConfigurationList()
  }
}
