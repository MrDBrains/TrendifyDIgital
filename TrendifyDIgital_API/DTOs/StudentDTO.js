// dtos/StudentDTO.ts
export class StudentDTO {
    constructor(student) {
        this.StudentID = student.StudentID;
        this.LoginID = student.LoginID;
        this.FirstName = student.FirstName;
        this.LastName = student.LastName;
        this.Email = student.Email;
        this.MobileNo = student.MobileNo;
        this.DOB = student.DOB;
        this.Gender = student.Gender;
        this.Address = student.Address;
        this.State = student.State;
        this.Occupation = student.Occupation;
        this.CompanyName = student.CompanyName;
        this.Designation = student.Designation;
        this.ObjectiveOfCourse = student.ObjectiveOfCourse;
        this.RegistrationDate = student.RegistrationDate;
        this.Status = student.Status;
        this.ProfilePicture = student.ProfilePicture;
        this.Resume = student.Resume;

        // Additional fields
        this.EnrollID = student.EnrollID || student.EnrollmentID || null;
        this.CourseCode = student.CourseCode || null;
        this.BatchCode = student.BatchCode || null;
        this.BatchTiming = student.BatchTiming || null;
        this.Phone = student.MobileNo || null;
        this.City = student.City || (student.Address && student.State ? `${student.Address}, ${student.State}` : null);
    }
}
