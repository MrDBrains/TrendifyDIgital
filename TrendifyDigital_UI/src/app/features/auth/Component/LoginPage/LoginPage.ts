import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-LoginPage',
  standalone: false,
  templateUrl: './LoginPage.html',
  styleUrls: ['./LoginPage.css']
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

  Login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { studentId, password } = this.loginForm.value;

    this.authService.login(studentId, password).subscribe({
      next: (response) => {
        const student = response?.student;

        if (student && student.Success === 1) {
          // ✅ Success toast
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Login successful',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });

          // Navigate after short delay
          setTimeout(() => {
            this.fetchProfile(studentId).then(profile => {
              this.router.navigate(['/home'], { state: { profile } });
            });
          }, 2000);

        } else {
          // 🔴 Error toast
          Swal.fire({
            toast: true,
            icon: 'error',
            title: student?.Message || 'Wrong student ID or password',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      },
      error: (err) => {
        Swal.fire({
          toast: true,
          icon: 'error',
          title: err.error?.message || 'Server error, please try again later.',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }




  private fetchProfile(studentId: string): Promise<IStudentProfileDTO> {
    return new Promise((resolve, reject) => {
      this.authService.getProfile(studentId).subscribe({
        next: (profile) => {
          if (!profile) {
            reject('Profile not found');
            return;
          }

          const dto = this.mapToDTO(profile);

          // ✅ Save to sessionStorage
          sessionStorage.setItem('studentProfile', JSON.stringify(dto));

          resolve(dto);
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
}
