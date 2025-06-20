import mongoose, { Schema } from 'mongoose';
import { Post } from 'types/PostsTypes';

const PostSchema: Schema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    featureImage: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true,
    versionKey: false
  }
)

export const PostModel = mongoose.model<Post>("Posts", PostSchema);