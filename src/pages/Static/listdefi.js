import { useParams } from "react-router-dom";

function Listdefi() {

  const { defi } = useParams()
  //alert(defi)
  return (
    <section className='isDefi_Network'>

        <a href='/pools' className={`isDefi__Type ${defi == undefined ? 'active' : ''} `}>
          <div className='flex__Div'>
            <img src='/images/ethereum.svg' width={20} />
            Ethereum
          </div>
        </a>

        <a href='#' className={`isDefi__Type ${defi == 'bsc' ? 'active' : ''} `}>
          <div className='flex__Div'>
            <img src='/images/binance.png' width={20} />
            Binance Smart Chain
            <span>
              SOON
            </span>
          </div>
        </a>

        <a href='#' className={`isDefi__Type ${defi == 'polygon' ? 'active' : ''} `}>

          <div className='flex__Div'>
            <img src='/images/polygonscan.svg' width={20} />
            Polygon (Matic)
            <span className='new-network'>
              NEW
            </span>
          </div>

        </a>

        <a href='#' className='isDefi__Type '>

          <div className='flex__Div'>
            <img src='/images/fantom.png' width={20} />
            Fantom
            <span>
              SOON
            </span>
          </div>

        </a>

        <a href='#' className='isDefi__Type '>
          <div className='flex__Div'>
            <img src='/images/solana.png' width={20} />
            Solana
            <span>
              SOON
            </span>
          </div>
        </a>

        <a href='#' className='isDefi__Type '>
          <div className='flex__Div'>
            <img src='/images/cronos.png' width={20} />
            Cronos
            <span>
              SOON
            </span>
          </div>
        </a>


        <a href='#' className='isDefi__Type '>
          <div className='flex__Div'>
            <img src='/images/avalanche.png' width={20} />
            Avalanche
            <span>
              SOON
            </span>
          </div>
        </a>

    </section>
  );
}

export default Listdefi;
