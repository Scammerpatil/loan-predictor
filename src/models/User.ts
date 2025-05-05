import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    income: {
      type: Number,
      required: true,
    },
    creditScore: {
      type: Number,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    location: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    panCard: {
      number: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    aadharCard: {
      number: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    salarySlip: {
      type: String,
      required: true,
    },
    addressProof: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
