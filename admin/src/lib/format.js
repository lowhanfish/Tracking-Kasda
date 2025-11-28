// Simple currency formatter helpers
export function formatRupiah(value, { minimumFractionDigits = 0 } = {}) {
  if (value == null || value === '') return '-';
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits,
  }).format(number);
}

export default formatRupiah;
