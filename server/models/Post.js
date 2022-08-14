import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    title: { type: String, maxlength: 50, minlength: 1, required: true },
    img: { type: String, maxlength: 500, minlength: 1, required: true },
    upvotes: { type: Number, default: 0,},
    downvotes: { type: Number, default: 0,},
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
