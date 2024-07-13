import mongoose, { model } from 'mongoose';

const TaskSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: String, enum: ['text', 'list'], required: true },
    text: { type: String },
    // listItems: [{ text: String }],
    listItems: [String],
    shared: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


const Task = mongoose.models.Task|| model( "Task", TaskSchema )
export default Task