import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IStudentProfileDTO } from '../../../../core/DTOs/IStudentProfileDTO';
import { StudentService } from '../../Service/student.service';

@Component({
  selector: 'app-dashbord',
  standalone: false,
  templateUrl: './Dashbord.html',
  styleUrls: ['./Dashbord.css'] 
})
export class Dashbord implements OnInit {
  studentProfile!: IStudentProfileDTO;
  isLoading = false;

  user: { name: string; email: string } = { name: '', email: '' };

  progress = {
    topics: 78,
    pdfLessons: 49,
    videoLessons: 46
  };

  installments: Array<{
    date: string;
    amount: number;
    status: string;
    paymentMode: string;
    enrollId: string;
  }> = [];

  constructor(
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentProfile = history.state.profile as IStudentProfileDTO;

    if (!this.studentProfile) {
      console.warn('No student profile found. Redirecting to login.');
      this.router.navigate(['/login']);
    } else {
      this.loadProfileData();
      this.loadInstallmentsData();
    }
  }

  // Map DTO to user object
  loadProfileData() {
    if (this.studentProfile) {
      this.user.name = this.studentProfile.FullName;
      this.user.email = this.studentProfile.Email;
    }
  }


  // Load payment/installments dynamically
  loadInstallmentsData() {
    if (this.studentProfile?.StudentID != null) {
      this.studentService.getPayments(this.studentProfile.StudentID).subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            // Map API keys to proper JS keys
            this.installments = data.map(item => ({
              enrollId: item['ENROLL ID'] || '',
              date: item['INSTALLMENT DATE'] || '',
              amount: item['AMOUNT'] || 0,
              status: item['STATUS'] || '',
              paymentMode: item['PAYMENT MODE / REFERENCE NO.'] || ''
            }));
            console.log('Mapped installments:', this.installments);
          } else {
            this.installments = [];
          }
        },
        error: (err) => {
          console.error('Error fetching installments:', err);
          this.installments = [];
        }
      });
    }
  }

  // Total payment amount
  get totalAmount(): number {
    return this.installments.reduce((acc, cur) => acc + cur.amount, 0);
  }

  // Refresh progress animation
  refreshProgress() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  // Navigate to profile page with DTO
 goToProfile(): void {
  if (this.studentProfile) {
    this.router.navigate(['/home/my-Profile'], { state: { profile: this.studentProfile } });
  } else {
    console.warn('No student profile available to pass');
  }
}

}
