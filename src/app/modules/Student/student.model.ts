import { model, Schema } from 'mongoose';
import validator from 'validator';
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
    trim: true, // Remove spaces
    maxlength: [20, 'First Name cannot exceed 20 characters'],
    // Custom validation for capitalizing first letter
    validate: {
      validator: function (value: string) {
        const FirstCapitalLetter =
          value.charAt(0).toUpperCase() + value.slice(1);
        return value === FirstCapitalLetter; // Validator returns boolean
      },
      message: '{VALUE} must start with a capital letter',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle Name cannot exceed 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    // Custom validation for alphabetic characters only
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value); // Return boolean to check alpha
      },
      message: '{VALUE} can only contain alphabetic characters',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's Contact Number is required"],
    validate: {
      validator: function (value: string) {
        return validator.isMobilePhone(value);
      },
      message: '{VALUE} is not a valid contact number',
    },
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's Contact Number is required"],
    validate: {
      validator: function (value: string) {
        return validator.isMobilePhone(value);
      },
      message: '{VALUE} is not a valid contact number',
    },
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian's Name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required"],
    validate: {
      validator: function (value: string) {
        return validator.isMobilePhone(value);
      },
      message: '{VALUE} is not a valid contact number',
    },
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  name: {
    type: nameSchema,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: "Gender must be either 'male' or 'female'",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of Birth is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
    validate: {
      validator: function (value: string) {
        return validator.isMobilePhone(value);
      },
      message: '{VALUE} is not a valid contact number',
    },
  },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
    validate: {
      validator: function (value: string) {
        return validator.isMobilePhone(value);
      },
      message: '{VALUE} is not a valid emergency contact number',
    },
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUE} is not a valid blood group',
    },
    required: [true, 'Blood Group is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian information is required'],
  },
  profileImg: {
    type: String,
    validate: {
      validator: function (value: string) {
        return validator.isURL(value);
      },
      message: '{VALUE} is not a valid URL',
    },
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  avatar: {
    type: String,
    validate: {
      validator: function (value: string) {
        return validator.isURL(value);
      },
      message: '{VALUE} is not a valid avatar URL',
    },
  },
});

// model creation
export const StudentModel = model<Student>('Student', studentSchema);
