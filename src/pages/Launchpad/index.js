import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import Pads from './pads';

function Launchpad() {

  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <div className="content">

            <Subheader />

            <section className="board">
              <Pads />
            </section>
        </div>

        <Footer/>

    </main>


    </>
  );
}

export default Launchpad;
