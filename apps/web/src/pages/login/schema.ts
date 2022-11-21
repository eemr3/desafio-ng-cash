import * as Yup from 'yup';

export const schema = Yup.object({
  username: Yup.string()
    .min(3, 'Nome de usuário deve conter 3 caracteres no minimo!')
    .required('Nome de usuário é obrigatŕoio'),
  password: Yup.string()
    .min(8, 'Senha deve coner no minimo 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
      'Senha deve conter pelo menos 1 número, 1 letra maiúscula',
    )
    .required('Senha é obrigatória'),
});
