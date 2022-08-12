import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PostSchema } from '../models/Post.js'
import { CommentSchema } from "../models/Comment.js";


class DbContext {
  Posts = mongoose.model('Post', PostSchema);
  Account = mongoose.model('Account', AccountSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  Profiles = mongoose.model('Profiles', ProfilesSchema);
}

export const dbContext = new DbContext()
