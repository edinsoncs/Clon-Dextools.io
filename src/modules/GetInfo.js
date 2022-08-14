import { getAddress } from '@ethersproject/address'
import ReactTooltip from 'react-tooltip';
const isAddress = (value: any) => {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

function GetInfo(obj) {

   const logo_token = `https://raw.githubusercontent.com/EcosystemSuni/assets/master/blockchains/ethereum/assets/${isAddress(obj.address)}/logo.png`;
    return (
      <>
        <a href='https://github.com/EcosystemSuni/assets' target='_blank' className="pair-logo">
           <img data-tip={`${obj.name}`} src={`${logo_token}`} onError={(e)=> {
             e.target.onerror = null;
             e.target.src="/images/default-image.svg";

           }}
           alt=""
           id="logo_crypto"  />
           <ReactTooltip />
        </a>

      </>
    );
}

export default GetInfo;
