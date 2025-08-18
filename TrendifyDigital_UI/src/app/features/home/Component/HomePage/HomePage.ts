import { Component, OnInit } from '@angular/core';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { Router } from '@angular/router';
import { StudentService } from '../../Service/student.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './HomePage.html',
  styleUrls: ['./HomePage.css'] // corrected property name
})
export class HomePage implements OnInit {
  studentProfile!: IStudentProfileDTO | null;
  isLoading = false;
  errorMessage = '';
  studentName: string = '';
  registrationDate: any;

  constructor(private studentService: StudentService,
    private router: Router,
  ) { }

 ngOnInit(): void {
  const profileStr = sessionStorage.getItem('studentProfile');

  if (profileStr) {
    this.studentProfile = JSON.parse(profileStr) as IStudentProfileDTO;
    console.log('Student Profile (from session):', this.studentProfile);
  } else {
    console.warn('No profile found in sessionStorage');
  }

  this.loadProfile();
}

  loadProfile() {
    if (this.studentProfile) {
      this.studentName = this.studentProfile.FullName;
      this.registrationDate = this.studentProfile.RegistrationDate;
    }
  }

  goToProfile(): void {
    if (this.studentProfile) {
      this.router.navigate(['/home/my-Profile'], { state: { profile: this.studentProfile } });
    } else {
      console.warn('No student profile available to pass');
    }
  }
  signOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.studentProfile = null;
    this.router.navigate(['/login']);
  }



}
