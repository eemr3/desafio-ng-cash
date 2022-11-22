export const responseErrorStatusCode = (code: number, text?: string) => {
  switch (code) {
    case 400:
      return 'Saldo insuficiente para realizar a transação!';

    case 404:
      return `${text} não encontrado!`;

    case 401:
      return `${text} não autorizado!`;

    case 403:
      return 'Não é possível fazer uma transferência para a mesma conta!';

    case 409:
      return 'Usuário já registrado no sistema!';

    default:
      break;
  }
};
