import { Donation } from "../models/donations.model.js";

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

export const createDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create(req.body);
    res.json(newDonation);
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
