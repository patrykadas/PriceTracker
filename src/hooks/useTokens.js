import useSWR from 'swr';
import fetch from 'unfetch';

const baseURL = 'https://min-api.cryptocompare.com/data/pricemultifull';

const defaultCryptoCurrencies = ['DAI', 'BAT'];
const defaultCurrency = 'USD';

const fetcher = (url) => fetch(url).then((r) => r.json());

function useTokens(
  currency = defaultCurrency,
  cryptoCurrencies = defaultCryptoCurrencies,
  noRefresh = false
) {
  const URL = `${baseURL}?fsyms=${cryptoCurrencies.join()}&tsyms=${currency}&api_key=${
    process.env.REACT_APP_API_KEY
  }`;
  const { data, error } = useSWR(URL, fetcher, {
    revalidateOnFocus: !noRefresh,
    refreshInterval: !noRefresh && 5000,
  });
  return {
    tokens: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTokens;
