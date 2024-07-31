import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';

@Component({
  selector: 'app-edit-states',
  templateUrl: './edit-states.component.html',
  styleUrls: ['./edit-states.component.scss']
})
export class EditStatesComponent implements OnInit {
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
    //active route get state id
    this.state_Id = this.url.snapshot.params['id'];
    if (this.state_Id) {
      this.getStatesById(this.state_Id);
      this.isEdit = true;
    }
  }

  //state form
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
    this.updateStates();
  }

  //update state
  updateStates() {
    let data = this.statesForm.getRawValue();
    if (this.statesForm.valid) {
      this._superAdminService.editStates(this.state_Id, data).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/admin', { outlets: { admin_Menu: 'states' } }]);
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

  //get state by id
  getStatesById(id: any) {
    this._superAdminService.getStatesById(id).subscribe({
      next: (result: any) => {
        const stateData = result.data
        this.controls['state_name'].patchValue(stateData.state_name);
        this.controls['description'].patchValue(stateData.description);
      },
    });
  }
}
