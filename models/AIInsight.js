// import mongoose from "mongoose";

// const aiInsightSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//             index: true,
//         },
//         type: {
//             type: String,
//             enum: ["weekly","suggestion","recovery","chat","morning"],
//             required: true,
//         },
//         content: {type: String, required:true},
//         meta: {type: mongoose.Schema.Types.Mixed, default: {}},
//         generatedAt: {type: Date, Default: Date.now},
//     },
//     {timestamps: true},
// );

// export default mongoose.model("AIInsight", aiInsightSchema);

import mongoose from "mongoose";

const CATEGORY = [
  "weekly",
  "suggestion",
  "recovery",
  "chat",
  "morning",
];

const aiInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: CATEGORY,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    generatedAt: {
      type: Date,
      default: Date.now,   // ✅ lowercase "default"
    },
  },
  { timestamps: true }
);

export default mongoose.model("AIInsight", aiInsightSchema);
