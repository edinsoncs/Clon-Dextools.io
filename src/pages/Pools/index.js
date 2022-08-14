import Sidebar from '../Static/sidebar';
import Uniswap from '../../apollo/uniswap';
import Uniswapv3 from '../../apollo/uniswapv3';
import Sushiswap from '../../apollo/sushiswap';
import Shibaswap from '../../apollo/shibaswap';
import Suniexchange from '../../apollo/suniexchange';
import Quickswap from '../../apollo/quickswap';
import Ampleswap from '../../apollo/ampleswap';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';

import Listdefi from '../Static/listdefi';

function Pools() {

  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <div className="content">

            <Subheader />

            <section className='isDefi_Type'>
              <article className='type__Flex'>
                  <div className='type__Image'>
                    <img src='/images/ethereum.svg' width='50' />
                  </div>
                  <div className='network__Name'>
                    <h2>Network Ethereum</h2>
                  </div>
               </article>

               <article className='list__Defi'>
                  <span>DeFI Track <b>(5)</b></span>
               </article>
            </section>

            <Listdefi />

            <section className="board pools">

                <Uniswap view={true} />

                <Uniswapv3 view={true} />

                <Sushiswap view={true} />

                <Shibaswap view={true} />



            </section>

             
        </div>

        <Footer/>

    </main>


    </>
  );
}

export default Pools;
