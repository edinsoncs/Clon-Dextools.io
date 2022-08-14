import Sidebar from '../Static/sidebar';
import Quickswap from '../../apollo/quickswap';
import Kyberswap from '../../apollo/kyberswappoly';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import Feed from './feed'
import Market from './market'

function Home() {

  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <div className="content">

            <Subheader />

            <section className="board">
                <div className="board-col col1">
                    <div className="board-block tools-suni">
                        <div className="col-title"><span className="icon"></span> META <strong>DEX</strong><img className="line" src="images/line.svg" /></div>
                        <div className="col-content">
                            <div class="line-1">
                              <a class="item-btn-action active" href="/ether/uniswap/pair-explorer/0xaca404571ae8bc9067fcd52cc989869b28a7540c">
                                <span class="icon">
                                    <img src="/images/telegram.svg" alt="" />
                                </span>
                                <span class="content">Pairs Explorer</span>
                              </a>
                              <a class="item-btn-action active" href="/pools">
                                <span class="icon">
                                  <img src="/images/pool-explorer.svg" alt="" />
                                </span>
                                <span class="content">Pool Explorer</span>
                              </a>
                            </div>

                            <div class="line-1 m-top-3">

                              <a class="item-btn-action active" href="/news" >
                                <span class="icon">
                                    <img src="/images/telegram.svg" alt="" />
                                </span>
                                <span class="content">News Crypto</span>
                              </a>

                              <a class="item-btn-action active" href="/pools">
                                <span class="icon">
                                  <img src="/images/pool-explorer.svg" alt="" />
                                </span>
                                <span class="content">Launchpad</span>
                              </a>

                            </div>
                        </div>
                    </div>
                    <div className="board-block news market">
                        <div className="col-title"><span className="icon"><img src="images/annoucements.svg" alt="" /></span> MARKET STATUS<img className="line" src="images/line.svg" /></div>
                        <div className="col-content">
                          <Market />
                        </div>
                    </div>

                    <div className="board-block news">
                        <div className="col-title"><span className="icon"><img src="images/annoucements.svg" alt="" /></span> ANNOUNCEMENTS<img className="line" src="images/line.svg" /></div>
                        <div className="col-content">
                          <Feed/>
                        </div>
                    </div>
                </div>

                <Quickswap />

                <Kyberswap />

            </section>
        </div>

        <Footer/>

    </main>


    </>
  );
}

export default Home;
