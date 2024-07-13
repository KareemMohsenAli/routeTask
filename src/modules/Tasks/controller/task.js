
import { StatusCodes } from "http-status-codes";
import sendSuccessResponse from "../../../utils/sendSuccessResponse.js";
import Category from "../../../../DB/model/Category.mode.js";
import Task from "../../../../DB/model/Task.model.js";
import { ApiFeatures } from "../../../utils/ApiFeatures.js";
import { ErrorClass } from "../../../utils/errorClass.js";

export const createTask= async (req, res, next) => {
  const { type, text, listItems, shared, category } = req.body;
  const task = new Task({ type, text, listItems, shared, category, user: req.user._id });
  await task.save();
  sendSuccessResponse(res, StatusCodes.CREATED, "task created successfully", { task: task });
}

export const getTasks = async (req, res, next) => {
    let query = {};
    if (req.user) {
        // Authenticated user: Show own tasks and shared tasks
        query = { $or: [{ user: req.user._id }, { shared: true }] };
    } else {
        // Unauthenticated user: Show only shared tasks
        query = { shared: true };
    }

    const features = new ApiFeatures(Task.find(query), req.query)
        .filter()
        .sort()
        .select()
        .pagination(Task);
    const tasks = await features.mongooseQuery;

    sendSuccessResponse(res, StatusCodes.CREATED, "task successfully fetched", 
    { 
      tasks, 
      totalPages: req.query.totalPages, 
      nextPage: req.query.nextPage, 
      previousPage: req.query.previousPage, 
      modelCounts: req.query.modelCounts ,
      page: req.query.page 

  }
    );

}

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { type, text, listItems, shared, category } = req.body;
  const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { type, text, listItems, shared, category },
      { new: true }
  );
  if (!task) {
      return next(new ErrorClass("Task not found", StatusCodes.BAD_REQUEST));

  }
  sendSuccessResponse(res, StatusCodes.OK, "task updated successfully", { task });
}

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) {
      return res.status(404).json({ message: 'Task not found' });
  }
  sendSuccessResponse(res, StatusCodes.OK, "task deleted successfully", { task });
}