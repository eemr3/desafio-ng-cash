import * as Yup from 'yup';

export const schema = Yup.object({
  username: Yup.string()
    .min(3, 'Nome de usuário precisa ter no mínimo 3 caracteres')
    .required('Nome de usário é obrigatório'),
  password: Yup.string()
    .min(8, 'Senha precisa tem no mínimo 8 caracteres.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
      'Senha deve conter pelo menos 1 número, 1 letra maiúscula',
    )
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
    .required('Confirmar senha é obrigatório'),
});
