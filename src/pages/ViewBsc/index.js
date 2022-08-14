import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Pairname from './pair-name';
import Pairdefi from './pair-defi';
import Transactions from './transactions';
import SocialMedia from '../Static/socialmedia'
import Footer from '../Static/footer';

import { useParams } from "react-router-dom";

function ViewBsc() {

  const { exchange, id } = useParams()


  return (
    <>
      <Sidebar />

      <main>

        <Header />

        <div className="content">

          <Subheader />


          <section className="chart">
            <div className="pair-chart">
              <div className="pair-chart-content">
                <Pairname />
              </div>
            </div>

            <div className='pair-list-actions'>
              <Transactions />
              <SocialMedia />
            </div>

          </section>
        </div>

        <Footer />

      </main>

    </>
  );
}


export default ViewBsc;
