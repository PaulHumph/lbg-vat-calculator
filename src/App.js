import { useState } from 'react';
import './App.css';
import DisplayBlock from './DisplayBlock';
import PriceEntryField from './PriceEntryField';
import VatRateField from './VatRateField';

function App() {
  const [netPrice, setNetPrice] = useState(0.0);
  const [grossPrice, setGrossPrice] = useState(0.0);
  const [vatToPay, setVatToPay] = useState(0.0);
  const [vatRate, setVatRate] = useState(20.0);

  let string_Net_Price = "";
  let string_Gross_Price = "";
  let interim_gross_price = 0;
  let interim_net_price = 0;


  const handleNetPriceChange = (price) => {
    let interim_gross_price = price * ((vatRate / 100) + 1);
    let string_Gross_Price = interim_gross_price.toFixed(2);
    const gross_Price = parseFloat(string_Gross_Price);
    setNetPrice(price);
    setGrossPrice(gross_Price);
    setVatToPay(gross_Price - price);
  };

  const handleGrossPriceChange = (price) => {
    let interim_net_price = price * ((vatRate / 100) + 1);
    let string_Net_Price = interim_net_price.toFixed(2);
    const net_Price = parseFloat(string_Net_Price);
    setNetPrice(net_Price);
    setGrossPrice(price);
    setVatToPay(price - net_Price);
  };

  const handleVatRateChanged = (rate) => {
    setVatRate(rate);
    updatePrices();
  };

  const updatePrices = () => {
    handleNetPriceChange(netPrice);
  };

  return (
    <div className='header field'>
      VAT CALCULATOR
      <div className='colour-border'>
        <VatRateField customstyle="field" vatRateChanged={handleVatRateChanged} value={vatRate} updatePrices={updatePrices} />
        <PriceEntryField customstyle="field" label="Price excl VAT: " priceChanged={handleNetPriceChange} price={netPrice === 0.0 ? "" : netPrice} />
        <DisplayBlock customstyle="field" label="VAT to pay: " value={vatToPay} />
        <PriceEntryField customstyle="field" label="Price incl VAT: " priceChanged={handleGrossPriceChange} price={grossPrice === 0.0 ? "" : grossPrice} />
      </div>
    </div>
  );
}

export default App;
