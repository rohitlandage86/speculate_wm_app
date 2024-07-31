import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { SuperAdminService } from '../../../super-admin.service'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-add-update-market',
  templateUrl: './add-update-market.component.html',
  styleUrls: ['./add-update-market.component.scss']
})
export class AddUpdateMarketComponent implements OnInit {
  isEdit = false
  marketForm: any
  market_Id: any
  allSportslist: Array<any> = []
  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createMarketForm()
    this.market_Id = this.url.snapshot.params['id']
    if (this.market_Id) {
      this.getMarketById(this.market_Id)
      this.isEdit = true
    }
    this.getAllSportsList()
  }

  createMarketForm() {
    this.marketForm = this.fb.group({
      record_id: ['', Validators.required],
      name: ['', Validators.required],
      sport_id: ['', Validators.required]
    })
  }

  get controls() {
    return this.marketForm.controls
  }

  submit() {
    this.isEdit ? this.updateMarket() : this.addMarket()
  }
  updateMarket() {
    let data = this.marketForm.getRawValue()
    if (this.marketForm.valid) {
      this._superAdminService
        .editBettingMarketType(this.market_Id, data)
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              this._toastrService.success(res.message)
              this.router.navigate([
                '/super-admin',
                { outlets: { super_Menu: 'market' } }
              ])
            } else {
              this._toastrService.warning(res.message)
            }
          },
          error: (err: any) => {
            if (err.error.status == 401 || err.error.status == 422) {
              this._toastrService.warning(err.error.message)
            } else {
              this._toastrService.error(err.error.message)
            }
          }
        })
    } else {
      this.marketForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }

  addMarket() {
    let data = this.marketForm.value
    if (this.marketForm.valid) {
      this._superAdminService.addBettingMarketType(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.router.navigate([
              '/super-admin',
              { outlets: { super_Menu: 'market' } }
            ])
          } else {
            this._toastrService.warning(res.message)
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error(err.error.message)
          }
        }
      })
    } else {
      this.marketForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  getMarketById(id: any) {
    this._superAdminService.getBettingMarketTypeById(id).subscribe({
      next: (result: any) => {
        const marketData = result.data

        this.controls['record_id'].patchValue(marketData.record_id)
        this.controls['name'].patchValue(marketData.name)
        this.controls['sport_id'].patchValue(marketData.sport_id)
      }
    })
  }
  //get Sports wma list...
  getAllSportsList() {
    this._superAdminService.getAllSportswmaList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSportslist = res.data
        } else {
          this.allSportslist = []
        }
      }
    })
  }
}
