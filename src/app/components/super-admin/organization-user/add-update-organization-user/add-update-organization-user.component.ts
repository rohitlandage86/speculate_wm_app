import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../../super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-organization-user',
  templateUrl: './add-update-organization-user.component.html',
  styleUrls: ['./add-update-organization-user.component.scss']
})
export class AddUpdateOrganizationUserComponent implements OnInit {
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
    this.isEdit ? this.updateOrganizationUser() : this.addOrganizationUser();
  }
  updateOrganizationUser() {
    let data = this.organizationUserForm.getRawValue();

    console.log(this.organizationUserForm.valid);
    if (this.organizationUserForm.valid) {
      console.log("bnskjd", this.organizationUserForm.value);
      this._superAdminService.editOrganizationUser(this.organizationUser_Id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'organization-user' } }]);
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

  addOrganizationUser() {
    let data = this.organizationUserForm.value;
    console.log('data', data);

    if (this.organizationUserForm.valid) {
        this._superAdminService.addOrganizationUser(data).subscribe({
          next: (res: any) => {
            console.log("data", res);
            if (res.status == 201 || res.status == 200) {
              this._toastrService.success(res.message);
              this.router.navigate(['/super-admin', { outlets: { super_Menu: 'organization-user' } }]);
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
        this.organizationUserForm.markAllAsTouched();
        this._toastrService.warning("Fill required fields");
      }
    }
    getOrganizationUserById(id: any) {
      this._superAdminService.getOrganizationUserById(id).subscribe({
        next: (result: any) => {
          console.log("data", result.data);
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
          console.log("this.allOrganizationUserTypeList", this.allOrganizationUserTypeList);
          
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
  

