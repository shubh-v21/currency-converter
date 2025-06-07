import React, {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId()

    return (
        <div className={`bg-[#1C2B12]/50 p-4 rounded-xl text-sm flex border border-[#E0F85A]/20 ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-[#E0F85A] mb-2 inline-block font-bold">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-white placeholder-gray-400 border-b-2 border-[#E0F85A]/30 focus:border-[#E0F85A] transition-colors duration-200 px-1"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-[#E0F85A] mb-2 w-full font-bold">Currency Type</p>
                <div className="relative">
                    <select
                        className="appearance-none rounded-lg px-3 py-1.5 pr-8 bg-[#27381A] text-white cursor-pointer outline-none border-2 border-[#E0F85A]/30 hover:border-[#E0F85A]/50 focus:border-[#E0F85A] transition-all duration-200"
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                        disabled={currencyDisable}
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#E0F85A #27381A',
                        }}
                    >
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency} className="bg-[#27381A] hover:bg-[#1C2B12]">
                                {currency.toUpperCase()}
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
    );
}

export default InputBox;