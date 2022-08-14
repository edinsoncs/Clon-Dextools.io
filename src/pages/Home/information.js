import Feed from './feed'
import Market from './market'
import { BiFileFind, BiBorderAll, BiNews, BiDiamond } from "react-icons/bi";


function Information() {

  return (
    <>
    
    <div className="board-col col1">
                    <div className="board-block tools-suni">
                        <div className="col-title"><span className="icon"></span> RYOSHI <strong>PRO</strong></div>
                        <div className="col-content">
                            <div class="line-1">
                              <a class="item-btn-action active" href="/ether/uniswap/pair-explorer/0xaca404571ae8bc9067fcd52cc989869b28a7540c">
                                <span class="icon">
                                    <BiFileFind />
                                </span>
                                <span class="content">Pairs Explorer</span>
                              </a>
                              <a class="item-btn-action active" href="/pools">
                                <span class="icon">
                                  <BiBorderAll />
                                </span>
                                <span class="content">Pool Explorer</span>
                              </a>
                            </div>

                            <div class="line-1 m-top-3">

                              <a class="item-btn-action active" href="/news" >
                                <span class="icon">
                                   <BiNews />
                                </span>
                                <span class="content">News Crypto</span>
                              </a>

                              <a class="item-btn-action active" href="/pools">
                                <span class="icon">
                                  <BiDiamond/>
                                </span>
                                <span class="content">Launchpad</span>
                              </a>

                            </div>
                        </div>
                    </div>
                    <div className="board-block news market">
                        <div className="col-title"><span className="icon"><img src="images/annoucements.svg" alt="" /></span> MARKET STATUS</div>
                        <div className="col-content">
                          <Market />
                        </div>
                    </div>

                    <div className="board-block news">
                        <div className="col-title"><span className="icon"><img src="images/annoucements.svg" alt="" /></span> ANNOUNCEMENTS</div>
                        <div className="col-content">
                          <Feed/>
                        </div>
                    </div>
    </div>

    </>
  );
}

export default Information;
