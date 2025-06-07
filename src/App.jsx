import { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  // Use a separate state for the input value as string
  const [inputValue, setInputValue] = useState('');
  // Keep amount as number for calculations
  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    if (amount === null || amount === 0) return;
    const result = amount * currencyInfo[to];
    setConvertedAmount(parseFloat(result.toFixed(2)));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  // Validate input to allow only numbers and decimal point
  const handleAmountChange = (e) => {
    const value = e.target.value;
    
    // Allow empty input (to show placeholder)
    if (value === '') {
      setInputValue('');
      setAmount(null);
      return;
    }
    
    // Check if the input is a valid number format (digits and one decimal point)
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setInputValue(value);
      // Only convert to number if it's a valid number (not just a decimal point)
      setAmount(value === '.' ? 0 : parseFloat(value));
    }
  };

  // Convert automatically when amount, from or to currency changes
  useEffect(() => {
    if (amount > 0 && Object.keys(currencyInfo).length > 0) {
      convert();
    } else if (amount === 0 || amount === null) {
      setConvertedAmount(0);
    }
  }, [amount, from, to, currencyInfo]);

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-[#1C2B12] py-4 px-3">
      <div className="absolute inset-0 bg-[#1C2B12] opacity-80"></div>

      <div className="w-full z-10">
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
          <h1 className="text-4xl sm:text-5xl font-black text-center mb-4 sm:mb-6 text-[#E0F85A] tracking-tighter">
            CURRENCYFY
            <div className="h-1 w-24 sm:w-32 bg-[#E0F85A] mx-auto mt-2"></div>
          </h1>

          <div className="relative border border-[#E0F85A]/20 rounded-2xl p-4 sm:p-6 backdrop-blur-sm bg-[#27381A]/80 shadow-lg">
            {/* Flexible layout that stacks on mobile, side-by-side on larger screens */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Left Column - Amount & Currency Selection */}
              <div className="lg:w-1/2 space-y-4">
                {/* Amount Field */}
                <div className="w-full bg-[#1C2B12]/80 p-3 sm:p-4 rounded-xl border border-[#E0F85A]/10">
                  <label className="text-[#E0F85A] mb-1 sm:mb-2 inline-block font-bold">Amount</label>
                  <div className="relative">
                    <input
                      className="outline-none w-full bg-transparent py-1.5 sm:py-2 text-[#E0F85A] text-xl sm:text-2xl font-bold border-b-2 border-[#E0F85A]/30 focus:border-[#E0F85A] transition-colors duration-200 px-1"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={inputValue}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>

                {/* Currency Selection - Responsive layout */}
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
                  {/* From Currency */}
                  <div className="sm:col-span-3 bg-[#1C2B12]/80 p-3 sm:p-4 rounded-xl border border-[#E0F85A]/10">
                    <label className="text-[#E0F85A] mb-1 sm:mb-2 inline-block font-bold">From</label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 bg-[#27381A] text-[#E0F85A] cursor-pointer outline-none border-2 border-[#E0F85A]/30 hover:border-[#E0F85A]/50 focus:border-[#E0F85A] transition-all duration-200 text-sm sm:text-base"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      >
                        {options.map((currency) => (
                          <option key={currency} value={currency}>
                            { currency.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#E0F85A]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Swap Button */}
                  <button
                    type="button"
                    className="sm:col-span-1 mx-auto border border-[#E0F85A]/30 rounded-lg bg-[#E0F85A] hover:bg-[#c8df41] text-[#1C2B12] p-2 transition-all duration-200 font-bold"
                    onClick={swap}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:rotate-0 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>

                  {/* To Currency */}
                  <div className="sm:col-span-3 bg-[#1C2B12]/80 p-3 sm:p-4 rounded-xl border border-[#E0F85A]/10">
                    <label className="text-[#E0F85A] mb-1 sm:mb-2 inline-block font-bold">To</label>
                    <div className="relative">
                      <select
                        className="appearance-none w-full rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 pr-8 bg-[#27381A] text-[#E0F85A] cursor-pointer outline-none border-2 border-[#E0F85A]/30 hover:border-[#E0F85A]/50 focus:border-[#E0F85A] transition-all duration-200 text-sm sm:text-base"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      >
                        {options.map((currency) => (
                          <option key={currency} value={currency}>
                            { currency.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#E0F85A]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Convert Button */}
                <button
                  type="button"
                  onClick={convert}
                  className="w-full bg-[#E0F85A] hover:bg-[#c8df41] text-[#1C2B12] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 font-bold text-base sm:text-lg focus:ring-2 focus:ring-[#E0F85A]/50 focus:outline-none"
                >
                  Convert
                </button>
              </div>

              {/* Right Column - Conversion Result */}
              <div className="lg:w-1/2 flex flex-col justify-center mt-4 lg:mt-0">
                <div className="h-full bg-[#1C2B12]/60 p-4 sm:p-5 rounded-xl border border-[#E0F85A]/10 flex flex-col justify-center">
                  <p className="text-[#E0F85A]/80 text-xs sm:text-sm mb-2">Converted Amount</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#E0F85A] font-bold text-sm sm:text-base">Amount:</span>
                      <span className="text-[#E0F85A] text-lg sm:text-xl font-bold">{amount !== null ? amount.toFixed(2) : '0.00'} {from.toUpperCase()}</span>
                    </div>
                    <div className="w-full border-t border-[#E0F85A]/20 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#E0F85A] font-bold text-sm sm:text-base">Converted:</span>
                      <span className="text-[#E0F85A] text-lg sm:text-xl font-bold">{convertedAmount.toFixed(2)} {to.toUpperCase()}</span>
                    </div>
                    <div className="w-full border-t border-[#E0F85A]/20 my-2"></div>
                    <div className="flex justify-between items-center flex-wrap">
                      <span className="text-[#E0F85A] font-bold text-sm sm:text-base">Exchange Rate:</span>
                      <span className="text-[#E0F85A] text-base sm:text-lg font-bold">
                        1 {from.toUpperCase()} = {currencyInfo[to]?.toFixed(4) || 0} {to.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with credits */}
          <div className="text-center mt-3 sm:mt-4">
            <p className="text-[#E0F85A]/70 text-xs sm:text-sm font-medium">
              Fast • Free • Forever
            </p>
            <p className="text-[#E0F85A]/50 text-xs mt-1">
              Powered by <a 
                href="https://github.com/fawazahmed0/exchange-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-[#E0F85A] transition-colors duration-200"
              >
                Exchange API
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
