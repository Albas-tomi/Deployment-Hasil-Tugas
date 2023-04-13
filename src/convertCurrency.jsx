export const  convertCurrency = (amount, fromCurrency, toCurrency) =>{
    let convertedAmount;
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        convertedAmount = amount * data.rates[toCurrency];
        console.log(convertedAmount);
      });
  }
  
  // Contoh Penggunaan
  convertCurrency(100, "USD", "IDR");