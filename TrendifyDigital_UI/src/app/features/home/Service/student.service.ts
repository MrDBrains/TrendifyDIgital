import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiBaseUrl}students`;

  constructor(private http: HttpClient) {}

  // 🔹 Login
  login(loginID: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { loginID, password });
  }

  // 🔹 Change Password
  changePassword(studentID: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      studentID,
      oldPassword,
      newPassword
    });
  }

  // 🔹 Get Profile
  getProfile(studentID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentID}/profile`);
  }

  // 🔹 Get Payments
  getPayments(studentID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentID}/payments`);
  }
}
