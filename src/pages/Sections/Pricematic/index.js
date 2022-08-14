import useSWR from 'swr'
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';
import Loaderline from '../../../Utils/loaderline';

function Pricematic() {

  const { data, error }: any = useSWR('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', url =>
        fetch(url).then(r => r.json())
  )

  if (error) return <div>failed to load</div>
  if (!data) return <Loaderline/>

  let positionToken = data.findIndex(item => item.symbol === "matic");
  let positionToken_ethereum = data.findIndex(item => item.symbol === "eth");
  global.price_polygon = data[positionToken].current_price;

  //La red de polygon se obtiene los precios mediante ETH
  global.price_eth = data[positionToken_ethereum].current_price;

  return (
    <>
      <div className="item tools-price" data-tip={`High 24h: ${data[positionToken].high_24h} `}><img src="/images/polygon.png" alt="" /><div className="price" data-price={global.price_bnb}><NumberFormat value={data[positionToken].current_price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /></div></div>
      <ReactTooltip />
    </>
  );
}

export default Pricematic;
