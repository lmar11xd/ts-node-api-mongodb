import mongoose, { Schema } from 'mongoose';
import { Rol } from 'types/RolesTypes';

const RolSchema: Schema = new Schema<Rol>(
  {
    name: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true,
    versionKey: false
  }
)

export const RolModel = mongoose.model<Rol>("Roles", RolSchema);