import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Pairname from './pair-name';
import Transactions from './transactions';
import Footer from '../Static/footer';

function ViewPoly() {
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

            <Transactions />

         </section>
      </div>

      <Footer/>

    </main>

  </>
  );
}


export default ViewPoly;
