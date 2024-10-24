import { z } from 'zod';

// Name validation
const nameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name cannot exceed 20 characters')
    .regex(/^[A-Z][a-z]+$/, 'First Name must start with a capital letter')
    .nonempty('First Name is required'),
  middleName: z
    .string()
    .max(20, 'Middle Name cannot exceed 20 characters')
    .optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Last Name can only contain alphabetic characters')
    .nonempty('Last Name is required'),
});

// Guardian validation
const guardianSchema = z.object({
  fatherName: z.string().nonempty("Father's Name is required"),
  fatherOccupation: z.string().nonempty("Father's Occupation is required"),
  fatherContactNumber: z
    .string()
    .nonempty("Father's Contact Number is required")
    .refine((val) => z.string().regex(/^\+\d{1,15}$/).safeParse(val).success, {
      message: 'Invalid contact number',
    }),
  motherName: z.string().nonempty("Mother's Name is required"),
  motherOccupation: z.string().nonempty("Mother's Occupation is required"),
  motherContactNumber: z
    .string()
    .nonempty("Mother's Contact Number is required")
    .refine((val) => z.string().regex(/^\+\d{1,15}$/).safeParse(val).success, {
      message: 'Invalid contact number',
    }),
});

// Local Guardian validation
const localGuardianSchema = z.object({
  name: z.string().nonempty("Local Guardian's Name is required"),
  occupation: z.string().nonempty("Local Guardian's Occupation is required"),
  contactNumber: z
    .string()
    .nonempty("Local Guardian's Contact Number is required")
    .refine((val) => z.string().regex(/^\+\d{1,15}$/).safeParse(val).success, {
      message: 'Invalid contact number',
    }),
  address: z.string().nonempty("Local Guardian's Address is required"),
});

// Student validation
const studentValidationSchema = z.object({
  id: z.string().nonempty('Student ID is required'),
  name: nameSchema,
  email: z.string().email('Invalid email').nonempty('Email is required'),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
  }),
  dateOfBirth: z.string().nonempty('Date of Birth is required'),
  contactNumber: z
    .string()
    .nonempty('Contact Number is required')
    .refine((val) => z.string().regex(/^\+\d{1,15}$/).safeParse(val).success, {
      message: 'Invalid contact number',
    }),
  emergencyContactNumber: z
    .string()
    .nonempty('Emergency Contact Number is required')
    .refine((val) => z.string().regex(/^\+\d{1,15}$/).safeParse(val).success, {
      message: 'Invalid emergency contact number',
    }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
    errorMap: () => ({ message: 'Invalid blood group' }),
  }),
  presentAddress: z.string().nonempty('Present Address is required'),
  permanentAddress: z.string().nonempty('Permanent Address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z
    .string()
    .url('Invalid URL')
    .optional(),
  isActive: z.enum(['active', 'inActive']).default('active'),
  avatar: z
    .string()
    .url('Invalid avatar URL')
    .optional(),
});

export default studentValidationSchema;