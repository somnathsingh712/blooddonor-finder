// import mongoose from "mongoose";

// const donorSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   bloodGroup: String,
//   phone: String,
  
//   city: String,
//   availability: {
//     type: Boolean,
//     default: true
//   },
//   location: {
//   type: {
//     type: String,
//     default: "Point"
//   },
//   coordinates: [Number]
// },
//   lastDonated: Date
// }, { timestamps: true });

// export default mongoose.model("Donor", donorSchema);


import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    // 🔗 Link donor to user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🩸 Blood details
    bloodGroup: {
      type: String,
      required: true
    },

    // 📞 Contact
    phone: {
      type: String,
      required: true
    },

    // 🌆 City
    city: {
      type: String,
      required: true
    },

    // 🟢 Availability toggle
    availability: {
      type: Boolean,
      default: true
    },

    // 🪪 Admin verification
    verified: {
      type: Boolean,
      default: false
    },

    // 🗓️ Last donation date
    lastDonated: {
      type: Date
    },

    // 📍 Geo Location (for nearby search)
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    }
  },
  {
    timestamps: true
  }
);


// 🌍 Geo index for nearby queries
donorSchema.index({ location: "2dsphere" });


export default mongoose.model("Donor", donorSchema);
