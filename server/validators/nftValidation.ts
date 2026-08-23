import { check } from "express-validator";

export const setNftValidation = [
  check("name").notEmpty().withMessage("NameIsRequired"),
  check("description").notEmpty().withMessage("DescriptionIsRequired"),
  check("imageUrl").notEmpty().withMessage("ImageIsRequired"),
  check("price").notEmpty().withMessage("PriceIsRequired"),
  check("deleteImageUrl").notEmpty().withMessage("DeleteImageUrlIsRequired"),

  check("keywords")
    .notEmpty()
    .custom((val) => {
      const arr = Array.isArray(val) // якщо масив- вертаэмо так
        ? val
        : val
            .split(",") //якщо строка робимо масив по комам
            .map((v: string) => v.trim()) // обрізаєм пробіли
            .filter((v: string) => Boolean(v)); // позбуваємось пустих строк в середені

      return arr.length >= 3;
    })
    .withMessage("NeedAtLeastThreeKeywords"),
];

export const patchNftValidation = [
  check("name").optional().notEmpty().withMessage("NameIsRequired"),
  check("description")
    .optional()
    .notEmpty()
    .withMessage("DescriptionIsRequired"),
  check("imageUrl").optional().notEmpty().withMessage("ImageIsRequired"),
  check("price").optional().notEmpty().withMessage("PriceIsRequired"),
  check("deleteImageUrl")
    .optional()
    .notEmpty()
    .withMessage("DeleteImageUrlIsRequired"),

  check("keywords")
    .optional()
    .notEmpty()
    .custom((val) => {
      const arr = Array.isArray(val) // якщо масив- вертаэмо так
        ? val
        : val
            .split(",") //якщо строка робимо масив по комам
            .map((v: string) => v.trim()) // обрізаєм пробіли
            .filter((v: string) => Boolean(v)); // позбуваємось пустих сирок в середені
      return arr.length >= 3;
    })
    .withMessage("NeedAtLeastThreeKeywords"),
];
