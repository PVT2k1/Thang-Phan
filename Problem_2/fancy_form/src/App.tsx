import { useEffect, useState } from 'react'
import './App.css'
import { getParamByParam } from 'iso-country-currency';

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
    if (!amount || amount === 0)
      return setConvertedAmount(0);

    if (fromCurrency === toCurrency)
      setConvertedAmount(amount);
    else
      Convert();
  }, [fromCurrency, toCurrency, amount])

  function ChangeInput(value: any) {
    setAmount(value);
  }

  return (
    <div className='flex flex-col bg-blue-100 p-4 gap-4 rounded-lg'>
      <p className='text-2xl font-bold text-purple-900'>Currency Converter</p>
      <div className='flex flex-col p-4 gap-4 bg-white rounded-lg'>
        <div className='flex flex-col'>
          <label className="mr-2 text-gray-500">Amout</label>
          <div className='flex flex-row gap-2'>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className='bg-gray-100 rounded-md'
            >
              {Object.keys(currencyList).map((currency) => (
                <option value={currency} key={currency}>{currency}</option>
              ))}
            </select>
            <input
              type='number'
              value={amount}
              placeholder={fromCurrency}
              className='bg-gray-100 rounded-md px-2'
              onChange={(e) => ChangeInput(e.target.value)}
            />
            <div
              className='flex p-1 rounded-full w-8 h-8 bg-blue-100 items-center justify-center'>
              <p>{getParamByParam('currency', fromCurrency, 'symbol')}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label className="mr-2 text-gray-500">Converted Amount</label>
          <div className='flex flex-row gap-2'>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className='bg-gray-100 rounded-md'
            >
              {Object.keys(currencyList).map((currency) => (
                <option value={currency} key={currency}>{currency}</option>
              ))}
            </select>
            <input
              type='number'
              value={convertedAmount}
              disabled
              className='bg-gray-100 rounded-md px-2'
            />
            <div
              className='flex p-1 rounded-full w-8 h-8 bg-blue-100 items-center justify-center'>
              <p>{getParamByParam('currency', toCurrency, 'symbol')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col p-4'>
        <p className='text-lg font-bold text-purple-800'>Indicate Currency</p>
        <p>{fromCurrency}: {currencyList[fromCurrency]}</p>
        {fromCurrency !== toCurrency && <p>{toCurrency}: {currencyList[toCurrency]}</p>}
      </div>
    </div>
  )
}

export default App
