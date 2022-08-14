import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Pairdefi from './pair-defi';
import Transactions from './transactions';
import SocialMedia from '../Static/socialmedia'
import Footer from '../Static/footer';

import { useParams } from "react-router-dom";

function ViewFormat() {

  const { exchange, id } = useParams()


  return (
    <>
      <Sidebar />

      <main>

        <Header />

        <div className="content">

          <Subheader />
          
           <Pairdefi />
            
        </div>

        <Footer />

      </main>

    </>
  );
}


export default ViewFormat;
