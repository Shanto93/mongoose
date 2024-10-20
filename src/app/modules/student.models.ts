import { model, Schema } from 'mongoose';
import type {
  Guardian,
  LocalGuardian,
  Name,
  Student,
} from './Student/student.interface';

const nameSchema = new Schema<Name>({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: nameSchema,
  email: { type: String, required: true },
  gender: ['male', 'female'],
  dateOfBirth: String,
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: String,
  isActive: ['active', 'inActive'],
  avatar: String,
});


// model creation

const Student = model<Student>('Student', studentSchema);