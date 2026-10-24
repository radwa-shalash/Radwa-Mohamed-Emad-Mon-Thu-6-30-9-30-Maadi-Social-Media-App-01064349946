import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "name should be more than 3 chars")
      .max(10, "name should be less than 10 chars"),
    email: zod
      .email()
      .nonempty("email is required")
      .regex(
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        "invalid email",
      ),
    dateOfBirth: zod
      .string()
      .nonempty("date is required")
      .refine((dateOfBirth) => {
        const userDate = new Date(dateOfBirth).getFullYear(); //userYear
        const nowDate = new Date().getFullYear(); //nowYear

        return nowDate - userDate > 10 ? true : false;

        // if (nowDate - userDate > 10) {
        //   return true;
        // } else {
        //   return "invalid date";
        // }
      }, "date should be less than 2015"),
    gender: zod.enum(["male", "female"]),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "The password must contain an uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long.",
      ),
    rePassword: zod.string().nonempty("repassword is required"),
  })
  .refine(
    (obj) => {
      if (obj.rePassword === obj.password) {
        return true;
      } else {
        return false;
      }
    },
    {
      path: ["rePassword"],
      error: "repassword and password not match",
    },
  );

export type registerSchemaType = zod.infer<typeof registerSchema>;

///////////////////////////////////////////////////////////////////////////////////////////////////

export const loginSchema = zod.object({
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "invalid email",
    ),

  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "The password must contain an uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long.",
    ),
});

export type loginSchemaType = zod.infer<typeof loginSchema>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
export const changePassSchema = zod
  .object({
    password:zod
      .string()
      .nonempty("current password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "The password must contain an uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long.",
      ),
    newPassword: zod
      .string()
      .nonempty("new password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "The password must contain an uppercase letter, a lowercase letter, a number, a special character, and be at least 8 characters long.",
      ),

  })
  ;

export type changePassSchemaType = zod.infer<typeof changePassSchema>;
