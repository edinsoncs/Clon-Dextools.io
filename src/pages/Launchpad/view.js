import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import PadsView from './view_single';

function LaunchpadView() {

  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <div className="content">
            <Subheader />
            <PadsView />
        </div>

        <Footer/>

    </main>


    </>
  );
}

export default LaunchpadView;
