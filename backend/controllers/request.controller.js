import Request from "../models/Request.js";


// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.json(request);
  } catch (error) {
    res.status(500).json(error);
  }
};


// GET ALL REQUESTS
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json(error);
  }
};


// ✅ Mark Request Fulfilled
export const fulfillRequest = async (
  req,
  res
) => {
  try {
    const request =
      await Request.findByIdAndUpdate(
        req.params.id,
        { status: "fulfilled" },
        { new: true }
      );

    res.json(request);

  } catch (error) {
    res.status(500).json(error);
  }
};
