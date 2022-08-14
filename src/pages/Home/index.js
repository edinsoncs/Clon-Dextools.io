import Sidebar from '../Static/sidebar';
import Navigation from '../Static/navigation';
import Uniswap from '../../apollo/uniswap';
import Sushiswap from '../../apollo/sushiswap';
import Shibaswap from '../../apollo/shibaswap';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import Feed from './feed'
import Market from './market'
import Information from './information'

import ListSponsor from './listsponsor';

function Home() {

  return (
    <>

    {/* <Navigation /> */ }

     <Sidebar />

    <main>
        <Header />

        <div className="content">

            <Subheader />

            <ListSponsor />

            <section className="board mt-5">
                
                <Information />

                <Uniswap />

                <Sushiswap />

                <Shibaswap />

            </section> 
        </div>

        <Footer/>

    </main>


    </>
  );
}

export default Home;
