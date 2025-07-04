// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
// });

// export default mongoose.model("Admin", adminSchema);


import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' } // 👈 Add this
});

export default mongoose.model("Admin", adminSchema);
