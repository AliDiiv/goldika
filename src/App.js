import React, { useContext, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import 'react-toastify/dist/ReactToastify.css';
import { GoldPriceContext } from './Context/GoldPriceContext';
import { useQuery } from 'react-query';
import Loading from './components/Loading/Loading';

import './assets/css/reset.css';
import './assets/css/mainStyle.css';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

async function fetchGoldPrice() {
  try {
    const response = await fetch('http://localhost:3001/gold');
    const text = await response.text(); // Get the raw text response

    try {
      const data = JSON.parse(text); // Attempt to parse as JSON
      console.log(data);
      return data;
    } catch (jsonError) {
      console.error('Error parsing JSON:', text);
      throw new Error('Failed to parse JSON');
    }
  } catch (error) {
    console.error('Error fetching gold price:', error);
    throw error;
  }
}
export default function App() {
  const router = useRoutes(routes);
  const { updatePrices } = useContext(GoldPriceContext);
  const { isLoading, data: goldAmount, error } = useQuery('goldPrice', fetchGoldPrice);

  useEffect(() => {
    if (goldAmount && goldAmount.length > 0) {
      updatePrices({
        goldBuyBalance: goldAmount[0].goldBuyBalance || '0',
        goldSellBalance: goldAmount[0].goldSellBalance || '0',
      });
    }
  }, [goldAmount, updatePrices]);


  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return <CacheProvider value={cacheRtl}>{router}</CacheProvider>;
}