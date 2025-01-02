import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [currencyList, setCurrencyList] = useState<any>({});
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function GetCurrencyList() {
      const res = await fetch(
        'https://api.frankfurter.app/currencies'
      );
      const data = await res.json();
      setCurrencyList(data);
    }

    GetCurrencyList();
  }, [])

  async function Convert() {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
    const data = await res.json();
    if (!data.rates)
      setErrorMessage(data.message);
    else
      setConvertedAmount(data.rates[toCurrency]);
  }

  useEffect(() => {
    if ( !amount || amount === 0)
      return setConvertedAmount(0);

    if (fromCurrency === toCurrency)
      setConvertedAmount(amount);
    else
      Convert();
  }, [fromCurrency, toCurrency])

  function TestInput(input: string) {
    const regex = /^[0-9.]+$/;
    return regex.test(input);
  }

  function ChangeInput(value: any) {
    if (value && !TestInput(value.toString()))
      setErrorMessage('Wrong Input Format');
    else if (errorMessage !== '')
      setErrorMessage('');

    setAmount(value);
    if (convertedAmount)
      setConvertedAmount(0);
  }

  return (
    <div className='currency-converter'>
      <h2 style={{ color: 'rgb(63,72,143)', textAlign: 'center' }}>Currency Swap Form</h2>

      <label style={{ marginRight: '8px' }}>Amout to send:</label>
      <input
        type='number'
        value={amount}
        placeholder={fromCurrency}
        className={errorMessage !== '' ? 'error' : ''}
        onChange={(e) => ChangeInput(e.target.value)}
      />

      <label style={{ marginLeft: '8px', marginRight: '8px' }}>from</label>
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {Object.keys(currencyList).map((currency) => (
          <option value={currency} key={currency}>{currency} - {currencyList[currency]}</option>
        ))}
      </select>

      <label style={{ marginLeft: '8px', marginRight: '8px' }}>to</label>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {Object.keys(currencyList).map((currency) => (
          <option value={currency} key={currency}>{currency} - {currencyList[currency]}</option>
        ))}
      </select>

      <button style={{ marginLeft: '8px' }} onClick={Convert}>CONFIRM SWAP</button>
      {convertedAmount && <p>Amount to receive: {convertedAmount} {toCurrency}</p>}
      {errorMessage !== '' && <p style={{ color: '#d82b2b' }}>{errorMessage}</p>}
    </div>
  )
}

export default App
