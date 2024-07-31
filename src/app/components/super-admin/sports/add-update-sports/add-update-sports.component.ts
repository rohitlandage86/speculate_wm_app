import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SuperAdminService } from '../../super-admin.service'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute, Router } from '@angular/router'
import { environment } from 'src/environments/environments'

@Component({
  selector: 'app-add-update-sports',
  templateUrl: './add-update-sports.component.html',
  styleUrls: ['./add-update-sports.component.scss']
})
export class AddUpdateSportsComponent implements OnInit {
  isEdit = false
  sportsForm!: FormGroup
  sports_Id: any
  data: any = {}
  baseUrlImage = environment.baseUrlImage
  logo1Name: any
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>
  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.createSportsForm()
    //activate route get sports id
    this.sports_Id = this.url.snapshot.params['id']
    if (this.sports_Id) {
      this.getSportsById(this.sports_Id)
      this.isEdit = true
    }
  }
  //sports form
  createSportsForm() {
    this.sportsForm = this.fb.group({
      sports_name: ['', Validators.required],
      small_name: ['', Validators.required],
      api_keys: ['', Validators.required],
      logo1Name: ['', Validators.required],
      logo1Base64: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  get controls() {
    return this.sportsForm.controls
  }

  submit() {
    this.isEdit ? this.updateSports() : this.addSports()
  }

  //update sports
  updateSports() {
    let data = this.sportsForm.getRawValue()
    if (this.sportsForm.valid) {
      this._superAdminService.editSports(this.sports_Id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message)
            this.router.navigate([
              '/super-admin',
              { outlets: { super_Menu: 'sports' } }
            ])
          } else {
            this._toastrService.warning(res.message)
          }
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error('Internal Server Error')
          }
        }
      })
    } else {
      this.sportsForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }

  //add sports
  addSports() {
    let data = this.sportsForm.value
    if (this.sportsForm.valid) {
      this._superAdminService.addSports(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message)
            this.router.navigate([
              '/super-admin',
              { outlets: { super_Menu: 'sports' } }
            ])
          } else {
            this._toastrService.warning(res.message)
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message)
          } else {
            this._toastrService.error('Internal Server Error')
          }
        }
      })
    } else {
      this.sportsForm.markAllAsTouched()
      this._toastrService.warning('Fill required fields')
    }
  }

  //get sports by id
  getSportsById(id: any) {
    this._superAdminService.getSportsById(id).subscribe({
      next: (result: any) => {
        const sportsData = result.data;
        this.controls['sports_name'].patchValue(sportsData.sports_name)
        this.controls['small_name'].patchValue(sportsData.small_name)
        this.controls['api_keys'].patchValue(sportsData.api_keys)
        this.controls['description'].patchValue(sportsData.description)
        //patch logo 
        if (sportsData.longLogoBase64) {
          const reader1 = new FileReader()
          reader1.onload = (e: any) => {
            this.controls['logo1Name'].patchValue(sportsData.logo1Name)
            this.controls['logo1Base64'].patchValue(sportsData.logo1Base64)
            this.imagePreview.nativeElement.src =
              'data:image/png;base64,' + sportsData.logo1Base64
          }
          reader1.readAsDataURL(sportsData.logo1Base64)
        }
        this.logo1Name = sportsData.image
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
}
