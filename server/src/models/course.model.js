import  mongoose, {Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a course title."],
      minlength: [8, "Title must be atleast 8 characters"],
      maxlength: [50, "Title cannot be more than 50 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [20, "Description must be atleast 20 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },

    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
        lecturesThumbnail: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: [true, "Course instructor name is required"],
    },
    
  },
  {
    timestamps: true,
  }
);

courseSchema.index({
  title: "text",
  description: "text",
  category: "text",
  "lectures.title": "text"
});

 const Course = mongoose.model("Course", courseSchema);

 export {Course}

