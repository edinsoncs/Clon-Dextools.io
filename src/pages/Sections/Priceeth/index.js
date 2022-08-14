import useSWR from 'swr'
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';
import Loaderline from '../../../Utils/loaderline';

function Priceeth() {

  const { data, error }: any = useSWR('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', url =>
        fetch(url).then(r => r.json())
  )

  if (error) return <div>failed to load</div>
  if (!data) return <Loaderline/>

  global.price_eth = data[1].current_price;

  return (
    <>
      <div className="item tools-price" data-tip={`High 24h: ${data[1].high_24h} `}><div className="price"><NumberFormat value={data[1].current_price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /></div></div>
      <ReactTooltip />
    </>
  );
}

export default Priceeth;
