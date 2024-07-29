import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../../super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-add-update-organization',
  templateUrl: './add-update-organization.component.html',
  styleUrls: ['./add-update-organization.component.scss']
})
export class AddUpdateOrganizationComponent implements OnInit {
  isEdit = false;
  organizationForm!: FormGroup;
  organization_id: any;
  baseUrl = environment.baseUrl;
  logo2Name: any;
  logo1Name: any;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('shortimagePreview') shortimagePreview!: ElementRef<HTMLImageElement>;

  constructor(
    private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createOrganizationForm();
    this.organization_id = this.url.snapshot.params['id'];
    if (this.organization_id) {
      this.getOrganizationById(this.organization_id);
      this.isEdit = true;
    }
  }

  createOrganizationForm() {
    this.organizationForm = this.fb.group({
      org_name: ['', Validators.required],
      short_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      contact_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      logo1Name: ['', Validators.required],
      logo2Name: ['', Validators.required],
      logo1Base64: ['', Validators.required],
      logo2Base64: ['', Validators.required],
    });
  }

  get controls() {
    return this.organizationForm.controls;
  }

  submit() {
    this.isEdit ? this.updateOrganization() : this.addOrganization();
  }

  updateOrganization() {
    let data = this.organizationForm.getRawValue();
    
    console.log(this.organizationForm.valid);
    if (this.organizationForm.valid) {
      console.log("bnskjd", this.organizationForm.value);
      this._superAdminService.editOrganization(this.organization_id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'organization' } }]);
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    } else {
      this.organizationForm.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }

  addOrganization() {
    let data = this.organizationForm.value;
    console.log('data',data);
    
    if (this.organizationForm.valid) {
      this._superAdminService.addOrganization(this.organizationForm.value).subscribe({
        next: (res: any) => {
          console.log("data", res);
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'organization' } }]);
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    } else {
      this.organizationForm.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }

  getOrganizationById(id: any) {
    this._superAdminService.getOrganizationById(id).subscribe({
      next: (result: any) => {
        console.log("data", result.data);
        this.controls['org_name'].patchValue(result.data.org_name);
        this.controls['short_name'].patchValue(result.data.short_name);
        this.controls['email_id'].patchValue(result.data.email_id);
        this.controls['contact_number'].patchValue(result.data.contact_number);
        this.controls['country'].patchValue(result.data.country);
        this.controls['state'].patchValue(result.data.state);
        this.controls['city'].patchValue(result.data.city);
        this.controls['address'].patchValue(result.data.address);
        this.controls['logo1Name'].patchValue(result.data.logo1);
        this.controls['logo2Name'].patchValue(result.data.logo2);
  
     
        
          // Patch long logo
          if (result.data.longLogoBase64) {
            const reader1 = new FileReader();
            reader1.onload = (e: any) => {
              this.controls['logo1Name'].patchValue(result.data.logo1Name);
              this.controls['logo1Base64'].patchValue(result.data.logo1Base64);
              this.imagePreview.nativeElement.src = 'data:image/png;base64,' + result.data.logo1Base64;
            };
            reader1.readAsDataURL(result.data.logo1Base64);
          }

          // Patch short logo
          if (result.data.shortLogoBase64) {
            const reader2 = new FileReader();
            reader2.onload = (e: any) => {
              this.controls['logo2Name'].patchValue(result.data.logo2Name);
              this.controls['logo2Base64'].patchValue(result.data.logo2Base64);
              this.shortimagePreview.nativeElement.src = 'data:image/png;base64,' + result.data.logo2Base64;
            };
            reader2.readAsDataURL(result.data.logo2Base64);
          }

      },
    });
  }
//logo 1 
  onImageChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      this.controls['logo1Name'].patchValue(file.name);
      reader.onload = (e: any) => {
        const longimage = e.target.result;
        const base64Image = e.target.result.split(',')[1];
        this.controls['logo1Base64'].patchValue(base64Image); // Patch the base64 image to the form control
        this.imagePreview.nativeElement.src = longimage; // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  }
//logo 2

  onshortImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.controls['logo2Name'].patchValue(file.name);
      reader.onload = (e: any) => {
        const shortimage = e.target.result;
        const base64Image = e.target.result.split(',')[1];
        this.controls['logo2Base64'].patchValue(base64Image); // Patch the base64 image to the form control
        this.shortimagePreview.nativeElement.src = shortimage; // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  }




}
