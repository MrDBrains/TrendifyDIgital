import { Component, OnInit } from '@angular/core';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { StudentService } from '../../Service/student.service';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './MyProfile.html',
  styleUrls: ['./MyProfile.css']
})
export class MyProfile implements OnInit {

  studentProfile!: IStudentProfileDTO | null;
  user = {
    name: '',
    enrollId: '',
    registrationDate: '',
    courseCode: '',
    batchCode: '',
    batchTiming: '',
    phone: '',
    email: '',
    address: '',
    city: '',

    firstName: '',
    lastName: '',
    mobile: '',
    dob: '',
    gender: '',
    state: '',
    objective: '',
    occupation: '',
    companyName: '',
    designation: ''
  };


  activityTimeline = [
    {
      date: '19-Oct-2024',
      title: 'Update Entry Form Informations-VIKAS',
      details: 'By Digi User:- BSB249259 Dated:- 19-Oct 01:10 AM'
    },
    {
      date: '18-Oct-2024',
      title: 'New Registration-VIKAS-BSB249259',
      details: 'By Digi User:- ADMIN-BSB Dated:- 18-Oct 02:10 AM'
    },
    {
      date: '18-Oct-2024',
      title: 'New Registration-VIKAS-BSB249259',
      details: 'By Digi User:- ADMIN-BSB Dated:- 18-Oct 02:10 AM'
    }
    // Add more items dynamically or fetch from an API
  ];

  constructor(private studentService: StudentService) { }

ngOnInit(): void {
  const profileStr = sessionStorage.getItem('studentProfile');

  if (profileStr) {
    this.studentProfile = JSON.parse(profileStr) as IStudentProfileDTO;
    console.log('Student Profile from session:', this.studentProfile);
    this.loadProfileData();
  } else {
    console.warn('No student profile found in session, redirecting to login');
  }
}


  
  loadProfileData() {
    const profile = this.studentProfile!;

    // Basic info
    this.user.name = profile.FullName;
    this.user.firstName = profile.FirstName || '';
    this.user.lastName = profile.LastName || '';
    this.user.email = profile.Email || '';
    this.user.mobile = profile.MobileNo || '';
    this.user.phone = profile.Phone || profile.MobileNo || '';
    this.user.dob = profile.DOB ? new Date(profile.DOB).toISOString().split('T')[0] : '';
    this.user.gender = profile.Gender || '';
    this.user.state = profile.State || '';
    this.user.address = profile.Address || '';
    this.user.city = profile.City || `${profile.Address}, ${profile.State}`;
    this.user.objective = profile.ObjectiveOfCourse || '';
    this.user.occupation = profile.Occupation || '';
    this.user.companyName = profile.CompanyName || '';
    this.user.designation = profile.Designation || '';
    this.user.registrationDate = profile.RegistrationDate
      ? new Date(profile.RegistrationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '';

    // Enrollment / batch info
    this.user.enrollId = profile.EnrollID || '';
    this.user.courseCode = profile.CourseCode || '';
    this.user.batchCode = profile.BatchCode || '';

    // Format batch timing (HH:mm)
    if (profile.BatchTiming) {
      const batchTime = new Date(profile.BatchTiming);
      const hours = batchTime.getHours().toString().padStart(2, '0');
      const minutes = batchTime.getMinutes().toString().padStart(2, '0');
      this.user.batchTiming = `${hours}:${minutes}`;
    } else {
      this.user.batchTiming = '';
    }
  }

  onProfilePicSelected(event: any) {
    const file = event.target.files[0];
    console.log('Profile picture selected:', file);
  }

  onResumeSelected(event: any) {
    const file = event.target.files[0];
    console.log('Resume selected:', file);
  }
}