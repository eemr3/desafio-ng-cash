import * as Yup from 'yup';

export const schema = Yup.object({
  username: Yup.string()
    .min(3, 'Nome du usuário precisa ter no mínimo 3 caracteres')
    .required('Nome de usuário é obrigatório'),
  value: Yup.number().required('Valor é obrgatório'),
});
