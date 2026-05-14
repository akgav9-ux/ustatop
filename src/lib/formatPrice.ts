export function formatPrice(amount: number) {
  return `${new Intl.NumberFormat("ru-RU").format(amount)} сум`;
}