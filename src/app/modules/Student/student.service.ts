import type { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.find({ id });
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getStudentFromDB,
  getSingleStudentFromDB,
};
