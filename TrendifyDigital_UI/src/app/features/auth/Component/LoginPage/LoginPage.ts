import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { StudentService } from '../../../home/Service/student.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-LoginPage',
  standalone: false,
  templateUrl: './LoginPage.html',
  styleUrls: ['./LoginPage.css'] // corrected property name
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      studentId: ['vikas.seth', Validators.required],
      password: ['NewPass@123', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { studentId, password } = this.loginForm.value;

    this.fetchProfile(studentId)
      .then(profile => this.performLogin(studentId, password, profile))
      .catch(err => this.errorMessage = err);
  }

  private fetchProfile(studentId: string): Promise<IStudentProfileDTO> {
    return new Promise((resolve, reject) => {
      this.authService.getProfile(studentId).subscribe({
        next: (profile) => {
          if (!profile) {
            reject('Profile not found');
            return;
          }
          resolve(this.mapToDTO(profile));
        },
        error: (err) => reject(err.error?.message || 'Error fetching profile')
      });
    });
  }

  private mapToDTO(profile: any): IStudentProfileDTO {
    return {
      StudentID: profile.StudentID,
      LoginID: profile.LoginID,
      FullName: `${profile.FirstName} ${profile.LastName}`.trim(),
      FirstName: profile.FirstName,
      LastName: profile.LastName,
      Email: profile.Email,
      MobileNo: profile.MobileNo,
      Phone: profile.MobileNo,
      DOB: profile.DOB,
      Gender: profile.Gender,
      Address: profile.Address,
      State: profile.State,
      City: profile.City || `${profile.Address}, ${profile.State}`,
      ProfilePicture: profile.ProfilePicture,
      Resume: profile.Resume,
      ObjectiveOfCourse: profile.ObjectiveOfCourse,
      Occupation: profile.Occupation,
      CompanyName: profile.CompanyName,
      Designation: profile.Designation,
      RegistrationDate: profile.RegistrationDate,
      Status: profile.Status,
      EnrollID: profile.EnrollID || profile.EnrollmentID || null,
      CourseCode: profile.CourseCode || null,
      BatchCode: profile.BatchCode || null,
      BatchTiming: profile.BatchTiming || null
    };
  }

  private performLogin(studentId: string, password: string, profile: IStudentProfileDTO): void {
    this.authService.login(studentId, password).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem('token', res.token || 'loggedin');
          this.router.navigate(['/home'], { state: { profile } });
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
      },
      error: (err) => this.errorMessage = err.error?.message || 'Server error'
    });
  }
}