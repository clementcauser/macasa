import * as Yup from "yup";

export const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$"
);

export const signInFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Adresse email invalide")
    .required("Champ obligatoire"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Doit comporter 6 caractères minimum avec 1 majuscule, 1 minuscule et 1 chiffre"
    )
    .required("Champ obligatoire"),
  confirmPassword: Yup.string()
    .required("Champ obligatoire")
    .oneOf([Yup.ref("password")], "Doit être identique au mot de passe"),
});

export const signUpFormValidationSchema = Yup.object().shape({
  firstname: Yup.string().required("Champ obligatoire"),
  lastname: Yup.string().notRequired(),
  email: Yup.string()
    .email("Adresse email invalide")
    .required("Champ obligatoire"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Doit comporter 6 caractères minimum avec 1 majuscule, 1 minuscule et 1 chiffre"
    )
    .required("Champ obligatoire"),
  confirmPassword: Yup.string()
    .required("Champ obligatoire")
    .oneOf([Yup.ref("password")], "Doit être identique au mot de passe"),
});
