
import { StatusCodes } from "http-status-codes";
import sendSuccessResponse from "../../../utils/sendSuccessResponse.js";
import Category from "../../../../DB/model/Category.mode.js";
import { ApiFeatures } from "../../../utils/ApiFeatures.js";
export const createCategory = async (req, res, next) => {
  const { name } = req.body;
  console.log(req.user)
    const category = new Category({ name, user: req.user._id });
    await category.save();
    sendSuccessResponse(res, StatusCodes.CREATED, "category created successfully", { category: category });
  };

export const getAllCategories = async (req, res, next) => {
  const features = new ApiFeatures(Category.find({ user: req.user._id }), req.query)
  .filter()
  .sort()
  .select()
  .pagination(Category);

const categories = await features.mongooseQuery;

sendSuccessResponse(res, StatusCodes.OK, "Categories fetched successfully", {
  categories,
  totalPages: req.query.totalPages,
  nextPage: req.query.nextPage,
  previousPage: req.query.previousPage,
  modelCounts: req.query.modelCounts,
  page: req.query.page
});
}

export const getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorClass("category not found", StatusCodes.NOT_FOUND));
  }
  sendSuccessResponse(res, StatusCodes.OK, "category successfully fetched", { category });
}

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
  sendSuccessResponse(res, StatusCodes.OK, "category updated successfully", { category });
}

export const deleteCategory = async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new ErrorClass("category not found", StatusCodes.NOT_FOUND));
  }
  sendSuccessResponse(res, StatusCodes.OK, "category deleted successfully", { category });
} 