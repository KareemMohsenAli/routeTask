import mongoose, { model } from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Category = mongoose.models.Category|| model( "Category", CategorySchema )
export default Category