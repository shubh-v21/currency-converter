import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-[#1C2B12]">
      {/* Simple background with no animations */}
      <div className="absolute inset-0 bg-[#1C2B12] opacity-80"></div>
      
      <div className="w-full z-10">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-6xl font-black text-center mb-10 text-[#E0F85A] tracking-tighter">
            SNAP MASTER
            <div className="h-1 w-32 bg-[#E0F85A] mx-auto mt-3"></div>
          </h1>
          
          <div className="relative border border-[#E0F85A]/20 rounded-2xl p-8 backdrop-blur-sm bg-[#27381A]/80 shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
              className="selection:bg-[#E0F85A] selection:text-[#1C2B12]"
            >
              <div className="w-full mb-4 bg-[#1C2B12]/80 p-4 rounded-xl border border-[#E0F85A]/10">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              
              <div className="relative w-full h-0.5 my-4">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#E0F85A]/30 rounded-lg bg-[#E0F85A] hover:bg-[#c8df41] text-[#1C2B12] px-5 py-2 transition-all duration-200 font-bold flex items-center gap-2"
                  onClick={swap}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  Swap
                </button>
              </div>
              
              <div className="w-full mt-4 mb-6 bg-[#1C2B12]/80 p-4 rounded-xl border border-[#E0F85A]/10">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#E0F85A] hover:bg-[#c8df41] text-[#1C2B12] px-6 py-4 rounded-xl transition-all duration-200 font-bold text-lg focus:ring-2 focus:ring-[#E0F85A]/50 focus:outline-none"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
          
          <p className="text-[#E0F85A]/70 text-center mt-6 text-sm font-medium">
            Real-time exchange rates • Updated every hour
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
