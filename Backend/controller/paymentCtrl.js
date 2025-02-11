const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_live_aQsKEWjueIB7ow",
  key_secret: "MbGHZCYZ8YgeBvl2JINyTjQP",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  try {
    const option = {
      amount: amount * 100, // Convert to paise (smallest unit)
      currency: "INR",
    };
    const order = await instance.orders.create(option);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    // Catching errors and returning an error response
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating Razorpay order',
      error: error.message,
    });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  try {
    // You can add verification logic here (e.g., checking signature)
    res.json({
      razorpayOrderId,
      razorpayPaymentId,
    });
  } catch (error) {
    // Catching errors and returning an error response
    console.error('Error during payment verification:', error);
    res.status(500).json({
      success: false,
      message: 'Error during payment verification',
      error: error.message,
    });
  }
};

module.exports = {
  checkout,
  paymentVerification,
};
