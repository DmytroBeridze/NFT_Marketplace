import { Request, Response } from "express";
import Subscriber from "../models/Subscribers.js";

export const setMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "mailExists" });
      // return res.status(409).json({ message: "This email already exists" });
    }

    await Subscriber.create({ email });
    return res.status(201).json({ message: "mailAdded" });
    // return res.status(201).json("Email added");
  } catch (error) {
    return res.status(500).json({ message: "serverError" });
    // return res.status(500).json({ message: "Server error" });
  }
};
