import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import Listfav from './listfav';

function Favorites() {

  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <div className="content">

            <Subheader />

            <section className="board">
              <Listfav />
            </section>
        </div>

        <Footer/>

    </main>


    </>
  );
}

export default Favorites;
