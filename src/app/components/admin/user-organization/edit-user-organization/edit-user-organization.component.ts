import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';

@Component({
  selector: 'app-edit-user-organization',
  templateUrl: './edit-user-organization.component.html',
  styleUrls: ['./edit-user-organization.component.scss']
})
export class EditUserOrganizationComponent  implements OnInit{
  isEdit = false;
  organizationUserForm!: FormGroup;
  organizationUser_Id: any;
  allOrganizationUserTypeList: Array<any> = [];
  allOrganizationList: Array<any> = [];
  data: any = {}
  constructor(private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute) { }

  ngOnInit(): void {
 
    this.createOrganizationUserForm();

    this.organizationUser_Id = this.url.snapshot.params['id'];
    if (this.organizationUser_Id) {
      this.getOrganizationUserById(this.organizationUser_Id);
      this.isEdit = true;
    }
    this.getAllOrganizationUserTypeList();
    this.getAllOrganizationList();
  }
  createOrganizationUserForm() {
    this.organizationUserForm = this.fb.group({
      user_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      user_type_id: ['', Validators.required],
      org_id: ['', Validators.required]

    });
  }

  get controls() {
    return this.organizationUserForm.controls;
  }

  submit() {
  this.updateOrganizationUser();
  }
  updateOrganizationUser() {
    let data = this.organizationUserForm.getRawValue();

    if (this.organizationUserForm.valid) {
      this._superAdminService.editOrganizationUser(this.organizationUser_Id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/admin', { outlets: { admin_Menu: 'user-organization' } }]);
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
      this.organizationUserForm.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
    getOrganizationUserById(id: any) {
      this._superAdminService.getOrganizationUserById(id).subscribe({
        next: (result: any) => {
          this.controls['user_name'].patchValue(result.data.user_name);
          this.controls['email_id'].patchValue(result.data.email_id);
          this.controls['user_type_id'].patchValue(result.data.user_type_id);
          this.controls['org_id'].patchValue(result.data.org_id);
        },
      });
    }
      //get Organization User Type list...
  getAllOrganizationUserTypeList() {
    this._superAdminService.getAllOrganizationUserTypeList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allOrganizationUserTypeList = res.data;
          
        }
      }
    });

  }
    //get Organization wma list...
  getAllOrganizationList() {
    this._superAdminService.getAllOrganizationwmaList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allOrganizationList = res.data;          
        }
      }
    });

  }

}
