import useSWR from 'swr'
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';

import { GoCopy, GoDatabase, GoRuby, GoHome } from "react-icons/go";
import { IconName } from "react-icons/go";


function Market() {

  const { data, error }: any = useSWR('https://api.ryoshi.pro/coinmarketcap/global', url =>
        fetch(url).then(r => r.json())
  )

  if (error) return <div>failed to load</div>
  if (!data) return '...'

  var obj = data[0].data[0].data;

  return (
    <>
      <section className='market__Container'>

        <article className='market__List'>
            <div className='market__List--Icon'>
              <GoCopy />
            </div>
            <div className='market__List--Show'>
                {obj.active_market_pairs}
            </div>
            <span className='market__List--Result'>
              Active Pairs
            </span>
        </article>

        <article className='market__List'>
            <div className='market__List--Icon'>
              <GoDatabase />
            </div>
            <div className='market__List--Show'>
              {obj.active_exchanges}
            </div>
            <span className='market__List--Result'>
              Active Exchange
            </span>
        </article>

        <article className='market__List'>
            <div className='market__List--Icon'>
              <GoRuby />
            </div>
            <div className='market__List--Show'>
            <NumberFormat value={obj.defi_volume_24h} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
            </div>
            <span className='market__List--Result'>
              Defi Volume
            </span>
        </article>

        <article className='market__List'>
            <div className='market__List--Icon'>
              <GoHome />
            </div>
            <div className='market__List--Show'>
            <NumberFormat value={obj.stablecoin_volume_24h} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
            </div>
            <span className='market__List--Result'>
              Stablecoin Volume
            </span>
        </article>


      </section>
    </>
  );
}

export default Market;
