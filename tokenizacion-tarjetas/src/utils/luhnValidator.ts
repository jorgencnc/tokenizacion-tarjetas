export function isValidLuhn(cardNumber: string): boolean {
  let sum = 0;
  let alternate = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      
      if (alternate) {
          digit *= 2;
          if (digit > 9) {
              digit = (digit % 10) + 1;
          }
      }
      
      sum += digit;
      alternate = !alternate;
  }
  
  return sum % 10 === 0;
}