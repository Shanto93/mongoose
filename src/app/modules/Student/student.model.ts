import { model, Schema } from 'mongoose';
import type {
  Guardian,
  LocalGuardian,
  Name,
  Student,
} from './student.interface';

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true, //remove spaces
    maxlength: [20, 'First name can not be more than 20 characters'],
    //Custom Validation
    validate: {
      validator: function (value: string) {
        const FirstCapitalLetter =
          value.charAt(0).toUpperCase() + value.slice(1);
        if (value !== FirstCapitalLetter) {
          return false;
        } else {
          return true;
        }
      },
      message: '{VALUE} is not in capitalize fomat',
    },
  },
  middleName: String,
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
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
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: nameSchema,
    required: true,
  },
  email: { type: String, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: "The gender field can only be the following: 'male', 'female'",
    },
    required: true,
  },
  dateOfBirth: String,
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  avatar: String,
});

// model creation

export const StudentModel = model<Student>('Student', studentSchema);
