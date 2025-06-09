import { createContext, useState } from 'react';

export const GoldPriceContext = createContext({
    goldBuyBalance: '0',
    goldSellBalance: '0',
    updatePrices: () => {},
});

export const GoldPriceContextProvider = ({ children }) => {
    const [goldBuyBalance, setGoldBuyBalance] = useState('');
    const [goldSellBalance, setGoldSellBalance] = useState('');

    const updatePrices = ({ goldBuyBalance, goldSellBalance }) => {
        setGoldBuyBalance(goldBuyBalance);
        setGoldSellBalance(goldSellBalance);
    };

    return (
        <GoldPriceContext.Provider
            value={{
                goldBuyBalance,
                goldSellBalance,
                updatePrices,
            }}
        >
            {children}
        </GoldPriceContext.Provider>
    );
};
