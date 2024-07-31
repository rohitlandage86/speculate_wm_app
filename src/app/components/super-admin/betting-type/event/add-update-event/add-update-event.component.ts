import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SuperAdminService } from '../../../super-admin.service'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-add-update-event',
  templateUrl: './add-update-event.component.html',
  styleUrls: ['./add-update-event.component.scss']
})
export class AddUpdateEventComponent implements OnInit {
  isEdit = false
  eventForm!: FormGroup
  event_Id: any
  allSportslist: Array<any> = []
  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createEventForm()
    this.event_Id = this.url.snapshot.params['id']
    if (this.event_Id) {
      this.getEventById(this.event_Id)
      this.isEdit = true
    }
    this.getAllSportsList()
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      record_id: ['', Validators.required],
      name: ['', Validators.required],
      sport_id: ['', Validators.required]
    })
  }
  get controls() {
    return this.eventForm.controls
  }

  submit() {
    this.isEdit ? this.updateEvent() : this.addEvent()
  }
  updateEvent() {
    let data = this.eventForm.getRawValue()
    if (this.eventForm.valid) {
      this._superAdminService
        .editBettingEventType(this.event_Id, data)
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              this._toastrService.success(res.message)
              this.router.navigate([
                '/super-admin',
                { outlets: { super_Menu: 'event' } }
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
      this.eventForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }

  addEvent() {
    let data = this.eventForm.value
    if (this.eventForm.valid) {
      this._superAdminService.addBettingEventType(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.router.navigate([
              '/super-admin',
              { outlets: { super_Menu: 'event' } }
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
      this.eventForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  getEventById(id: any) {
    this._superAdminService.getBettingEventTypeById(id).subscribe({
      next: (result: any) => {
        const eventData = result.data
        this.controls['record_id'].patchValue(eventData.record_id)
        this.controls['name'].patchValue(eventData.name)
        this.controls['sport_id'].patchValue(eventData.sport_id)
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
