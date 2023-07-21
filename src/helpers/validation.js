import * as Yup from 'yup';

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .required("What's your name?")
    .min(3, 'First name must be at least 3 characters long.')
    .max(30, 'First name must be at most 30 characters long.')
    .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  lastName: Yup.string()
    .required("What's your name?")
    .min(3, 'Last name must be at least 3 characters long.')
    .max(30, 'Last name must be at most 30 characters long.')
    .matches(
      /^[aA-zZ\s]+$/,
      'Numbers and special characters are not allowed. White space is allowed.'
    ),
  email: Yup.string()
    .required(
      "You'll use this when you log in and if you ever need to reset your password."
    )
    .email('Please enter a valid email address.'),
  // status: Yup.string().max(64, 'Status must be at most 64 characters long.'),
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).'
    )
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //   'Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.'
    // )
    .min(6, 'Password must be at least 6 characters long.')
    .max(50, 'Password must be at most 50 characters long.'),
});
