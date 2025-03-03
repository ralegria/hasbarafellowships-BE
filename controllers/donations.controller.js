import { User } from "../models/users.model.js";
import { Donation } from "../models/donations.model.js";
import { constructEvent, createPayment } from "../stripe.js";

export const getDonationsByUser = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { isPaymentCompleted: true, user_id: req.params.user_id },
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAmountCollectedByUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { short_id: req.params.user_id },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const donations = await Donation.findAll({
      where: { isPaymentCompleted: true, user_id: user.id },
    });
    const amountCollected = donations.reduce(
      (total, donation) => total + donation.amount_donated,
      0
    );
    res.json({ collected: amountCollected });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDonationHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const event = constructEvent(req.body, sig);

  if (event.error) {
    return res.status(500).json({ message: event.error });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const student = await User.findOne({
      where: { short_id: session?.metadata?.student_id },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newDonation = await Donation.create({
      user_id: student.id,
      donor_name: session?.customer_details?.name,
      donor_email: session?.customer_details?.email,
      amount_donated: session?.amount_total,
      payment_ID: session?.payment_intent,
      isPaymentCompleted: true,
    });

    res.json(newDonation);
  }
};

export const generateStripeURL = async (req, res) => {
  try {
    const student = await User.findOne({
      where: { short_id: req.body.user_id },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const session = await createPayment({
      ...req,
      body: {
        ...req.body,
        student_name: `${student.firstnames} ${student.lastnames}`,
      },
    });
    if (session.error) {
      return res.status(500).json({ message: session.error });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    await donation.update(req.body);
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
