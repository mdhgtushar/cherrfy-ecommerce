 const Dispute = require("./dispute.model"); 

 const createDispute = async (req, res) => {
   try {
     const { orderId, subject, description, category } = req.body;
     const newDispute = await Dispute.create({ user: req.user._id, orderId, subject, description, category });
     res.status(201).json({ success: true, data: newDispute });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
 };
 
 const getUserDisputes = async (req, res) => {
  try {
    const userId = req.user._id;
    const disputes = await Dispute.find({ user: userId });
    res.status(200).json({ success: true, data: disputes });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserDisputes, createDispute };