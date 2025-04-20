import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";
import { Roles } from "../types/role";
import { encrypt } from "../utils/encryption";

const schema = mongoose.Schema;

const UserSchema = new schema<IUser>(
  {
    fullName: { type: Schema.Types.String, required: true },
    username: { type: Schema.Types.String, required: true, unique: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
    role: {
      type: Schema.Types.String,
      required: true,
      enum: [Roles.USER, Roles.ADMIN],
      default: Roles.USER,
    },
    profilePicture: { type: Schema.Types.String },
    isActive: { type: Schema.Types.Boolean, default: false },
    activationCode: { type: Schema.Types.String },
  },
  { timestamps: true }
);

// encryption setting before create user
UserSchema.pre("save", function (next) {
  const user = this;
  user.password = encrypt(user.password);
  user.activationCode = encrypt(user.id);
  next();
});

// hide password field in response
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
