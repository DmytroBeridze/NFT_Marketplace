import { body, check } from "express-validator";

export const profileValidation = [
  body("bio")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("invalidBio"),
  body("socialLinks.instagram")
    .optional()
    .isURL()
    .withMessage("invalidInstagram"),
  body("socialLinks.facebook")
    .optional()
    .isURL()
    .withMessage("invalidFacebook"),
  body("socialLinks.telegram")
    .optional()
    .isURL()
    .withMessage("invalidTelegram"),
  body("socialLinks.twitter").optional().isURL().withMessage("invalidTwitter"),
  body("socialLinks.youtube").optional().isURL().withMessage("invalidYoutube"),
  body("socialLinks.website").optional().isURL().withMessage("invalidWebsite"),
];
