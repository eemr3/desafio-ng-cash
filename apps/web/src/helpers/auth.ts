export const isTokenExpired = (token: string | undefined) => {
  if (!token) {
    return;
  }
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
  const clockTimestamp = Math.floor(Date.now()) / 1000;
  return clockTimestamp > payload.exp;
};
