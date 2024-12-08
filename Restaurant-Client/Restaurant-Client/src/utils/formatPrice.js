export const formatPrice = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};
