import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../../super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-state',
  templateUrl: './add-update-state.component.html',
  styleUrls: ['./add-update-state.component.scss']
})
export class AddUpdateStateComponent implements OnInit{
  isEdit = false;
  statesForm!: FormGroup;
  state_Id: any;
  constructor(private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute) { }

  ngOnInit(): void {
    this.createStatesForm();

    this.state_Id = this.url.snapshot.params['id'];
    if (this.state_Id) {
      this.getStatesById(this.state_Id);
      this.isEdit = true;
    }
  }
  createStatesForm() {
    this.statesForm = this.fb.group({
      state_name: ['', Validators.required],
      description: ['', Validators.required]

    });
  }

  get controls() {
    return this.statesForm.controls;
  }
  submit() {
    this.isEdit ? this.updateStates() : this.addStates();
  }
  updateStates() {
    let data = this.statesForm.getRawValue();

    console.log(this.statesForm.valid);
    if (this.statesForm.valid) {
      console.log("bnskjd", this.statesForm.value);
      this._superAdminService.editStates(this.state_Id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'states' } }]);
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
      this.statesForm.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }

  addStates() {
    let data = this.statesForm.value;
    console.log('data', data);

    if (this.statesForm.valid) {
        this._superAdminService.addStates(data).subscribe({
          next: (res: any) => {
            console.log("data", res);
            if (res.status == 201 || res.status == 200) {
              this._toastrService.success(res.message);
              this.router.navigate(['/super-admin', { outlets: { super_Menu: 'states' } }]);
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
        this.statesForm.markAllAsTouched();
        this._toastrService.warning("Fill required fields");
      }
    }
    getStatesById(id: any) {
      this._superAdminService.getStatesById(id).subscribe({
        next: (result: any) => {
          console.log("data", result.data);
          this.controls['state_name'].patchValue(result.data.state_name);
          this.controls['description'].patchValue(result.data.description);
        },
      });
    }
     
}
