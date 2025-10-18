import mongoose from 'mongoose';
const librarySchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean
  },
  issuedTo: {
    type: String,
    default: null
  },
  issueDate: {
    type: Date,
    default: null
  }
});
export default mongoose.model('Library',librarySchema);