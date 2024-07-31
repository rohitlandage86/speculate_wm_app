import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SuperAdminService } from '../../super-admin.service'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environments'

@Component({
  selector: 'app-add-update-organization',
  templateUrl: './add-update-organization.component.html',
  styleUrls: ['./add-update-organization.component.scss']
})
export class AddUpdateOrganizationComponent implements OnInit {
  isEdit = false
  organizationForm!: FormGroup
  organization_id: any
  baseUrlImage = environment.baseUrlImage
  logo2Name: any
  logo1Name: any
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>
  @ViewChild('shortimagePreview')
  shortimagePreview!: ElementRef<HTMLImageElement>

  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createOrganizationForm()
    //active route get organization id
    this.organization_id = this.url.snapshot.params['id']
    if (this.organization_id) {
      this.getOrganizationById(this.organization_id)
      this.isEdit = true
    }
  }

  //organization form
  createOrganizationForm() {
    this.organizationForm = this.fb.group({
      org_name: ['', Validators.required],
      short_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      contact_number: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
      ],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      logo1Name: ['', Validators.required],
      logo2Name: ['', Validators.required],
      logo1Base64: ['', Validators.required],
      logo2Base64: ['', Validators.required]
    })
  }

  get controls() {
    return this.organizationForm.controls
  }

  submit() {
    this.isEdit ? this.updateOrganization() : this.addOrganization()
  }

  //update organization
  updateOrganization() {
    let data = this.organizationForm.getRawValue()
    if (this.organizationForm.valid) {
      this._superAdminService
        .editOrganization(this.organization_id, data)
        .subscribe({
          next: (res: any) => {
            if (res.status == 200) {
              this._toastrService.success(res.message)
              this.router.navigate([
                '/super-admin',
                { outlets: { super_Menu: 'organization' } }
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
      this.organizationForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }
  //add organization
  addOrganization() {
    let data = this.organizationForm.value
    if (this.organizationForm.valid) {
      this._superAdminService
        .addOrganization(this.organizationForm.value)
        .subscribe({
          next: (res: any) => {
            if (res.status == 201 || res.status == 200) {
              this._toastrService.success(res.message)
              this.router.navigate([
                '/super-admin',
                { outlets: { super_Menu: 'organization' } }
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
      this.organizationForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }

  // get organization by id
  getOrganizationById(id: any) {
    this._superAdminService.getOrganizationById(id).subscribe({
      next: (result: any) => {
        const organizationData = result.data;
        this.controls['org_name'].patchValue(organizationData.org_name)
        this.controls['short_name'].patchValue(organizationData.short_name)
        this.controls['email_id'].patchValue(organizationData.email_id)
        this.controls['contact_number'].patchValue(organizationData.contact_number)
        this.controls['country'].patchValue(organizationData.country)
        this.controls['state'].patchValue(organizationData.state)
        this.controls['city'].patchValue(organizationData.city)
        this.controls['address'].patchValue(organizationData.address)
        this.controls['logo1Name'].patchValue(organizationData.logo1)
        this.controls['logo2Name'].patchValue(organizationData.logo2)

        // Patch long logo
        if (organizationData.longLogoBase64) {
          const reader1 = new FileReader()
          reader1.onload = (e: any) => {
            this.controls['logo1Name'].patchValue(organizationData.logo1Name)
            this.controls['logo1Base64'].patchValue(organizationData.logo1Base64)
            this.imagePreview.nativeElement.src =
              'data:image/png;base64,' + organizationData.logo1Base64
          }
          reader1.readAsDataURL(organizationData.logo1Base64)
        }
        this.logo1Name = organizationData.logo1
        // Patch short logo
        if (organizationData.shortLogoBase64) {
          const reader2 = new FileReader()
          reader2.onload = (e: any) => {
            this.controls['logo2Name'].patchValue(organizationData.logo2Name)
            this.controls['logo2Base64'].patchValue(organizationData.logo2Base64)
            this.shortimagePreview.nativeElement.src =
              'data:image/png;base64,' + organizationData.logo2Base64
          }
          reader2.readAsDataURL(organizationData.logo2Base64)
        }
        this.logo2Name = organizationData.logo2
      }
    })
  }
  //logo 1 show
  onImageChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      this.controls['logo1Name'].patchValue(file.name)
      reader.onload = (e: any) => {
        const longimage = e.target.result
        const base64Image = e.target.result.split(',')[1]
        this.controls['logo1Base64'].patchValue(base64Image) // Patch the base64 image to the form control
        this.imagePreview.nativeElement.src = longimage // Preview the selected image
      }
      reader.readAsDataURL(file)
    }
  }
  //logo 2 show
  onshortImageChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      this.controls['logo2Name'].patchValue(file.name)
      reader.onload = (e: any) => {
        const shortimage = e.target.result
        const base64Image = e.target.result.split(',')[1]
        this.controls['logo2Base64'].patchValue(base64Image) // Patch the base64 image to the form control
        this.shortimagePreview.nativeElement.src = shortimage // Preview the selected image
      }
      reader.readAsDataURL(file)
    }
  }
}
