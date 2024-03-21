export const GenerateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otp_expiry = new Date();
  otp_expiry.setTime(new Date().getTime() + 5 * 60 * 1000);
  return { otp, otp_expiry };
};
