// השתמשתי בחומרי עזר מהאינטרנט 

import React, { useEffect, useState } from 'react';
import Input from './Input';
import Score from './Score';
import swapImage from './swap.png';

function ExchangeApp() {
  const [arCodes, setArCodes] = useState([]);
  const [selectedCode1, setSelectedCode1] = useState('');
  const [selectedCode2, setSelectedCode2] = useState('');
  const [inputValue, setInputValue] = useState(1);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    DoApi();
  }, []);

  useEffect(() => {
    
    if (selectedCode1 && selectedCode2 && exchangeRates[selectedCode1] && exchangeRates[selectedCode2]) {
      const rate1 = exchangeRates[selectedCode1];
      const rate2 = exchangeRates[selectedCode2];
      const result = (inputValue / rate1) * rate2;
      setConvertedValue(result.toFixed(2));
    }
  }, [selectedCode1, selectedCode2, inputValue, exchangeRates]);

  const DoApi = async () => {
    try {
      const url = "https://monkeys.co.il/api2/currency.php";
      const resp = await fetch(url);

      const data = await resp.json();
      const quotes = data.quotes;

      setExchangeRates(quotes);

      const codes = Object.keys(quotes);
      
      setArCodes(codes);
      setSelectedCode1(codes[0]);
      setSelectedCode2(codes[1]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSelectChange1 = (event) => {
    setSelectedCode1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setSelectedCode2(event.target.value);
  };

  const handleSwitch = () => {
    let temp = selectedCode1;
    setSelectedCode1(selectedCode2);
    setSelectedCode2(temp);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  console.log(convertedValue)

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Currency Codes</h1>
      <div className='row'>
        <div className='col-md-4'>
          <Input value={inputValue} onChange={handleInputChange} />
        </div>
        <div className='col-md-4'>
          <select className='form-control' value={selectedCode1} onChange={handleSelectChange1}>
            {arCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-primary' id='button1' onClick={handleSwitch}>
            <img src={swapImage} alt="Swap" />
          </button>
        </div>
        <div className='col-md-4'>
          <select className='form-control' value={selectedCode2} onChange={handleSelectChange2}>
            {arCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Score convertedValue={convertedValue} />
    </div>
  );
}

export default ExchangeApp;