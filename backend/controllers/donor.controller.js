// import Donor from "../models/Donor.js";

// export const addDonor = async (req, res) => {
//   const donor = await Donor.create(req.body);
//   res.json(donor);
// };

// export const getDonors = async (req, res) => {
//   const donors = await Donor.find();
//   res.json(donors);
// };

// export const searchDonors = async (req, res) => {
//   const { bloodGroup, city } = req.query;

//   const donors = await Donor.find({
//     bloodGroup,
//     city,
//     availability: true
//   });

//   res.json(donors);
// };


// import Donor from "../models/Donor.js";


// // ADD DONOR (linked to logged user)
// export const addDonor = async (req, res) => {
//   try {
//     const donor = await Donor.create({
//       ...req.body,
//       userId: req.user.id   // 🔥 link user
//     });

//     res.json(donor);

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


// // GET ALL
// export const getDonors = async (req, res) => {
//   const donors = await Donor.find()
//     .populate("userId", "name email");

//   res.json(donors);
// };


// // SEARCH
// export const searchDonors = async (req, res) => {
//   const { bloodGroup, city } = req.query;

//   const donors = await Donor.find({
//     bloodGroup,
//     city,
//     availability: true
//   });

//   res.json(donors);
// };


import Donor from "../models/Donor.js";


// ➕ Add Donor (already exists)
export const addDonor = async (req, res) => {
  try {
    const donor = await Donor.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(donor);

  } catch (error) {
    res.status(500).json(error);
  }
};



// 👤 Get Logged User Donor Profile
export const getMyDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({
      userId: req.user.id
    });

    if (!donor)
      return res.status(404).json("Donor profile not found");

    res.json(donor);

  } catch (error) {
    res.status(500).json(error);
  }
};



// ✏️ Update Donor Profile
export const updateDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(donor);

  } catch (error) {
    res.status(500).json(error);
  }
};



// 🔄 Toggle Availability
export const toggleAvailability = async (req, res) => {
  try {
    const donor = await Donor.findOne({
      userId: req.user.id
    });

    donor.availability = !donor.availability;

    await donor.save();

    res.json({
      message: "Availability updated",
      availability: donor.availability
    });

  } catch (error) {
    res.status(500).json(error);
  }
};



// ❌ Delete Donor Profile
export const deleteDonorProfile = async (req, res) => {
  try {
    await Donor.findOneAndDelete({
      userId: req.user.id
    });

    res.json("Donor profile deleted");

  } catch (error) {
    res.status(500).json(error);
  }
};



// 🌍 Public APIs (existing)
export const getDonors = async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
};


export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    // 🔒 Escape regex special chars
    const safeBlood =
      bloodGroup.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const safeCity =
      city.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const donors = await Donor.find({
      bloodGroup: {
        $regex: safeBlood,
        $options: "i"
      },
      city: {
        $regex: safeCity,
        $options: "i"
      },
      availability: true
    });

    res.json(donors);

  } catch (error) {
    res.status(500).json(error);
  }
};


// 📍 GET NEARBY DONORS
export const getNearbyDonors = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const donors = await Donor.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 5000
        }
      },
      availability: true,
      verified: true
    });

    res.json(donors);

  } catch (error) {
    res.status(500).json(error);
  }
};


// 🧠 MATCH DONORS FOR REQUEST
export const matchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const donors = await Donor.find({
      bloodGroup: {
        $regex: bloodGroup,
        $options: "i"
      },
      city: {
        $regex: city,
        $options: "i"
      },
      availability: true
    });

    res.json(donors);

  } catch (error) {
    res.status(500).json(error);
  }
};
