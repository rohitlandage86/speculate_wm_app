import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  selectedIndex: number = 0;
  sign_upForm!: FormGroup;
  selectedDay: string | undefined;
  selectedMonth: string | undefined;
  selectedYear: string | undefined;
  days: string[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: string[] = [];
  geoCoder: any;
  allStateList: Array<any> = [];
  passwordVisible: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _toastr: ToastrService,
    private _sharedService: SharedService,

  ) { }

  ngOnInit() {
    this.createSign_upFormGroup();
    this.initializeDays();
    this.initializeYears();
    // Fetch the IP address and patch it to the form
    // this._sharedService.getIPAddress().subscribe((data: any) => {

    //   this.sign_upForm.patchValue({
    //     ip_address: data.ip

    //   });

    // });


    // Get device information and patch it to the form
    const deviceInfo = this.getDeviceInfo();
    this.sign_upForm.patchValue({
      device_info: deviceInfo
    });


    // // Fetch live location and patch it to the form
    // this._sharedService.getCurrentPosition().then(position => {
    //   this.sign_upForm.patchValue({
    //        location: `${position.latitude},${position.longitude}`
    //   });
    //   this.getAddress(position.latitude,position.longitude)
    // }).catch(error => {
    //   console.error('Error getting location', error);
    // });
    this.getAllStateList();
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder?.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  createSign_upFormGroup() {
    this.sign_upForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: [null, Validators.required],
      state_id: [null, Validators.required],
      terms_privacy_policy: [0, Validators.required], // Initialize with 0
      user_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      ip_address: ['192.158.1.38', [Validators.required]],
      device_info: [null, Validators.required],
      platform: ['web', Validators.required],
      location: ['sangli', Validators.required],
      password: ['', Validators.required]
    });
  }

  get controls() {
    return this.sign_upForm.controls;
  }

  initializeDays() {
    for (let i = 1; i <= 31; i++) {
      this.days.push(i.toString());
    }
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      this.years.push(i.toString());
    }
  }

  updateDOB() {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
      const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex.toString();
      const formattedDay = this.selectedDay.length < 2 ? `0${this.selectedDay}` : this.selectedDay;
      const formattedDOB = `${formattedDay}-${formattedMonth}-${this.selectedYear}`;
      this.sign_upForm.get('dob')?.setValue(formattedDOB);
    }
  }

  onDayChange(event: Event) {
    this.selectedDay = (event.target as HTMLSelectElement).value;
    this.updateDOB();
  }

  onMonthChange(event: Event) {
    this.selectedMonth = (event.target as HTMLSelectElement).value;
    this.updateDOB();
  }

  onYearChange(event: Event) {
    this.selectedYear = (event.target as HTMLSelectElement).value;
    this.updateDOB();
  }

  onTermsPrivacyCheckedChange(event: any) {
    this.sign_upForm.get('terms_privacy_policy')?.setValue(event.target.checked ? 1 : 0);
  }

  getDeviceInfo(): string {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    let deviceInfo = 'Unknown Device';

    if (/android/i.test(userAgent)) {
      deviceInfo = 'Android Device';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      deviceInfo = 'iOS Device';
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(platform)) {
      deviceInfo = 'Mac';
    } else if (/Win32|Win64|Windows|WinCE/.test(platform)) {
      deviceInfo = 'Windows PC';
    } else if (/Linux/.test(platform)) {
      deviceInfo = 'Linux PC';
    } else if (/CrOS/.test(userAgent)) {
      deviceInfo = 'Chrome OS Device';
    } else {
      deviceInfo = `Other (${platform})`;
    }

    return deviceInfo;
  }

  SubmitSignup() {
    let data = this.sign_upForm.value;
    if (this.sign_upForm.valid) {
      this._authService.signUp(data).subscribe({
        next: (res: any) => {
          if (res.status == 200 || res.status == 201) {
            localStorage.setItem('accessToken', res.token);
            localStorage.setItem('expiresin', res.expiresIn);
            localStorage.setItem('isLogin', 'true');
            this.router.navigate(['/gambler', { outlets: { sub_Menu: 'dashboard' } }]);
            this._toastr.success(res.message);
            this.sign_upForm.reset();
          } else {
            this._toastr.warning(res.message);
          }
        },
        error: (error: any) => {
          if (error.error.status == 422) {
            this._toastr.warning(error.error.message);
          } else {
            this._toastr.error(error.error.message);
          }
        },
      });
    } else {
      this.sign_upForm.markAllAsTouched();
    };

  }
  //get  State list...
  getAllStateList() {
    this._authService.allstateList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allStateList = res.data;
        }
      }
    });
  }

  onStepChange(event: any) {
    this.selectedIndex = event.selectedIndex;
  }
  //password show and hide

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
