import { useParams } from "react-router-dom";

import Sidebar from '../Static/sidebar';

import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';

import Listdefi from '../Static/listdefi';

function Pools() {

  const { defi } = useParams()


  const list_defi = {
    bsc: 8,
    polygon: 2
  }

  var ListExchanges = require(`./networks/${defi}.js`).default;


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
                    <img src={`/images/${defi}.png`} width='50' />
                  </div>
                  <div className='network__Name'>
                    <h2>Network <span style={{textTransform: 'capitalize'}}>{defi}</span></h2>
                  </div>
               </article>

               <article className='list__Defi'>
                  <span>DeFI Track <b>({list_defi[defi]})</b></span>
               </article>
            </section>

            <Listdefi />

            <ListExchanges />

        </div>

        <Footer/>

    </main>


    </>
  );
}

export default Pools;
