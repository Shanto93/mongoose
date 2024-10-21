import type { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentInfo = req.body;
    // Will call service  function to send this data
    const result = await StudentServices.createStudentToDB(studentInfo);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrived successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Student are retrived successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getStudent,
  getSingleStudent,
};
