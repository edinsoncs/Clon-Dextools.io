import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import Listdefi from './listdefi';

import { useParams, Navigate  } from "react-router-dom";


function PoolsListDefi() {

  const { defi } = useParams()

  const array1 = ['uniswap', 'sushi', 'shiba', 'suni', 'uniswapv3', 'biswap', 'apeswap', 'babyswap', 'quickswap'];
  const found = array1.find(element => element == defi);

  if(!found){
    return <Navigate  to='/'/>;
  }


  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <div className="content">

            <Subheader />

            <section className="board pools">
              <Listdefi defi={defi} />
            </section>

        </div>

        <Footer/>

    </main>


    </>
  );
}

export default PoolsListDefi;
