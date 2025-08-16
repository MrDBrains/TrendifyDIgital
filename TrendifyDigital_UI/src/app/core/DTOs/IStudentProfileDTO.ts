export interface IStudentProfileDTO {
  StudentID: number;
  LoginID: string;
  FullName: string;          // FirstName + LastName
  FirstName?: string;        // optional if needed separately
  LastName?: string;         // optional if needed separately
  Email: string;
  MobileNo?: string;
  Phone?: string;            // alternative phone field
  DOB?: string;
  Gender?: string;
  Address?: string;
  State?: string;
  City?: string;             // combined Address + State or city info
  ProfilePicture?: string | null;
  Resume?: string | null;
  ObjectiveOfCourse?: string;
  Occupation?: string;
  CompanyName?: string;
  Designation?: string;
  RegistrationDate?: string;
  Status?: boolean;

  // Enrollment / course info
  EnrollID?: string;
  CourseCode?: string;
  BatchCode?: string;
  BatchTiming?: string;
}
