import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { SuperAdminService } from '../../../super-admin.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-add-update-outcome',
  templateUrl: './add-update-outcome.component.html',
  styleUrls: ['./add-update-outcome.component.scss']
})
export class AddUpdateOutcomeComponent implements OnInit {
  isEdit = false
  outcomeForm: any
  outcome_Id: any
  allSportslist: Array<any> = []

  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createOutcomeForm()
    this.getAllSportsList()
    this.url.params.subscribe(params => {
      this.outcome_Id = params['id']
      if (this.outcome_Id) {
        this.isEdit = true
        this.getOutcomeById(this.outcome_Id)
      }
    })
  }
  createOutcomeForm() {
    this.outcomeForm = this.fb.group({
      record_id: ['', Validators.required],
      name: ['', Validators.required],
      sport_id: ['', Validators.required]
    })
  }

  get controls() {
    return this.outcomeForm.controls
  }

  submit() {
    this.isEdit ? this.updateOutcome() : this.addOutcome()
  }
//update outcome
  updateOutcome() {
    let data = this.outcomeForm.getRawValue()
    if (this.outcomeForm.valid) {
      this._superAdminService
        .editBettingOutcomeType(this.outcome_Id, data)
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              this._toastrService.success(res.message)
              this.router.navigate([
                '/super-admin',
                { outlets: { super_Menu: 'outcome' } }
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
      this.outcomeForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
//add outcome
  addOutcome() {
    let data = this.outcomeForm.value
    if (this.outcomeForm.valid) {
      this._superAdminService.addBettingOutcomeType(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.router.navigate([
              '/super-admin',
              { outlets: { super_Menu: 'outcome' } }
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
      this.outcomeForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //get by id outcome
  getOutcomeById(id: any) {
    this._superAdminService.getBettingOutcomeTypeById(id).subscribe({
      next: (result: any) => {
        const outcomeData = result.data
        this.controls['record_id'].patchValue(outcomeData.record_id)
        this.controls['name'].patchValue(outcomeData.name)
        this.controls['sport_id'].patchValue(outcomeData.sport_id)
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
