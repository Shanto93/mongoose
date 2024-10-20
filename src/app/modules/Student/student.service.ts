import type { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentToDB = (student: Student) => {
  const result = StudentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentToDB,
};
