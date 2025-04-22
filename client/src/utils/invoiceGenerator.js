export const generateInvoiceNumber = (num) => {
  const date = new Date();
  const components = [
      // 'INV', date.getFullYear(),
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
      // '-',
      num
  ];

  return components.join('');
}