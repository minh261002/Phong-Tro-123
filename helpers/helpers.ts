export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function truncateString(str: string, num: number) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}
