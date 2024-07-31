import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { SuperAdminService } from '../../../super-admin.service'

@Component({
  selector: 'app-add-update-configuration',
  templateUrl: './add-update-configuration.component.html',
  styleUrls: ['./add-update-configuration.component.scss']
})
export class AddUpdateConfigurationComponent implements OnInit {
  isEdit = false
  configurationForm!: FormGroup
  configuration_Id: any
  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createConfigurationForm()
    //active route get configuration id
    this.configuration_Id = this.url.snapshot.params['id']
    if (this.configuration_Id) {
      this.getConfigurationById(this.configuration_Id)
      this.isEdit = true
    }
  }
  //configuration form
  createConfigurationForm() {
    this.configurationForm = this.fb.group({
      url_name: ['', Validators.required],
      base_url: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  get controls() {
    return this.configurationForm.controls
  }

  submit() {
    this.isEdit ? this.updateConfiguration() : this.addConfiguration()
  }
  //update configuration
  updateConfiguration() {
    let data = this.configurationForm.getRawValue()
    if (this.configurationForm.valid) {
      this._superAdminService
        .editConfiguration(this.configuration_Id, data)
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              this._toastrService.success(res.message)
              this.router.navigate([
                '/super-admin',
                { outlets: { super_Menu: 'configuration' } }
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
      this.configurationForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }

  //add configuration
  addConfiguration() {
    let data = this.configurationForm.value
    if (this.configurationForm.valid) {
      this._superAdminService.addConfiguration(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.router.navigate([
              '/super-admin',
              { outlets: { super_Menu: 'configuration' } }
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
      this.configurationForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //get configuration by id
  getConfigurationById(id: any) {
    this._superAdminService.getConfigurationById(id).subscribe({
      next: (result: any) => {
        const configurationData = result.data
        this.controls['url_name'].patchValue(configurationData.url_name)
        this.controls['base_url'].patchValue(configurationData.base_url)
        this.controls['description'].patchValue(configurationData.description)
      }
    })
  }
}
