import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SuperAdminService } from '../../../super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-update-period',
  templateUrl: './add-update-period.component.html',
  styleUrls: ['./add-update-period.component.scss']
})
export class AddUpdatePeriodComponent implements OnInit {
isEdit:boolean=false;
periodForm:any;
period_Id:any;
allSportslist:Array<any>=[];


  constructor(private fb: FormBuilder,
    private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService,
    private router: Router,
    private url: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.createPeriodForm();
    this.getAllSportsList();
    this.url.params.subscribe(params => {
      this.period_Id = params['id'];
      if (this.period_Id) {
        this.isEdit = true;
        this.getPeriodById(this.period_Id);
      }
    });

  }
  createPeriodForm(){ 
    this.periodForm=this.fb.group({
      record_id:['',Validators.required],
      name:['',Validators.required],
      sport_id:['',Validators.required]
    })
  }

  get controls(){
    return this.periodForm.controls;
  }

  submit(){
    this.isEdit?this.updatePeriod():this.addPeriod();
  }
  
  updatePeriod(){
    let data=this.periodForm.getRawValue();
    console.log(this.periodForm.valid);
    if(this.periodForm.valid){
      console.log("bnskjd",this.periodForm.value);
      this._superAdminService.editBettingPeriodType(this.period_Id,data).subscribe({
        next:(res:any)=>{
          if(res.status==200){
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'period' } }]);
          }else{
            this._toastrService.error(res.message);
          }
        },
        error:(err:any)=>{
          if (err.error.status == 401 || err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error("Internal Server Error");
          }
        }
      })
    }else {
      this.periodForm.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
 
  }

  addPeriod(){
    let data=this.periodForm.getRawValue();
    console.log(this.periodForm.valid);
    if (this.periodForm.valid) {
      this._superAdminService.addBettingPeriodType(data).subscribe({
        next: (res: any) => {
          console.log("data", res);
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'period' } }]);
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
      this.periodForm.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
  getPeriodById(id: any) {
    this._superAdminService.getBettingPeriodTypeById(id).subscribe({
      next: (result: any) => {
        console.log("data", result.data);
        this.controls['record_id'].patchValue(result.data.record_id);
        this.controls['name'].patchValue(result.data.name);
        this.controls['sport_id'].patchValue(result.data.sport_id);
      },
    });
  }
    //get Sports wma list...
    getAllSportsList() {
      this._superAdminService.getAllSportswmaList().subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.allSportslist = res.data;          
          }
        }
      });
  
    }
}
