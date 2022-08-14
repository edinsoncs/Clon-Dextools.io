import useSWR from 'swr'
import ReactTooltip from 'react-tooltip';
import Loaderline from '../../../Utils/loaderline';
function Gasprice() {

  const { data, error }: any = useSWR('https://www.etherchain.org/api/gasPriceOracle', url =>
        fetch(url).then(r => r.json())
  )

    if (error) return <div>failed to load</div>
    if (!data) return <Loaderline/>

  return (
    <>
      <div className="item current-gas" data-tip={`Gas price fee `}><img src="/images/gas-load.svg" alt="" /><div className="gas">{data.currentBaseFee} GWEI</div></div>
      <ReactTooltip />
    </>
  );
}

export default Gasprice;
