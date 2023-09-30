const generateBuffer = require('./../../../shared/utils/generateBuffer');

class MockAuthUserPersistance {
  constructor(
    UserID,
    FirstName,
    LastName,
    Email,
    Password,
    Role,
    Gender,
    MobileNumber,
    LastLogin,
    StudentID,
    ProfilePictureID,
    MFA_QR,
    MFA_Secret,
    file,
  ) {
    this.UserID = UserID;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Password = Password;
    this.Role = Role;
    this.Gender = Gender;
    this.MobileNumber = MobileNumber;
    this.LastLogin = LastLogin;
    this.StudentID = StudentID;
    this.ProfilePictureID = ProfilePictureID;
    this.MFA_QR = MFA_QR;
    this.MFA_Secret = MFA_Secret;
    this.file = file;
  }
}

const MockAuthUserPersistance1 = new MockAuthUserPersistance(
  generateBuffer('dff37947-fb84-4908-b0e5-b24844ba9068'),
  'Hassan',
  'Lucero',
  'hasLuce@gmail.com',
  'Password123',
  'Student',
  'Male',
  93329811,
  null,
  '2391001',
  null,
  null,
  null,
);

module.exports = MockAuthUserPersistance1;
