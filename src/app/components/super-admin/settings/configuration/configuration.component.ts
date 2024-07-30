import { Component, OnInit } from '@angular/core'
import { SuperAdminService } from '../../super-admin.service'
import { PageEvent } from '@angular/material/paginator'

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
  constructor(private _superAdminService: SuperAdminService) { }

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

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1
    this.perPage = event.pageSize
    this.getAllConfigurationList()
  }
}
