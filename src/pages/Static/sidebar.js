import { HiOutlineHome,
        HiOutlineSearchCircle,
        HiOutlinePresentationChartLine,
        HiOutlineNewspaper,
        HiSpeakerphone,
        HiCog,
        HiHeart,
        HiOutlineGift,
        HiTemplate,
        HiDatabase} from "react-icons/hi";

import { NavLink } from 'react-router-dom';
import Connect from './connect';


let pairClassFn = () => {


    let networkEth = window.location.pathname.match(/^\/ether/);
    let networkBsc = window.location.pathname.match(/^\/bsc/);

    if(networkEth) {
       return window.location.pathname.match(/^\/ether/)  ? "active" : "";
    }

    if(networkBsc) {
      return window.location.pathname.match(/^\/bsc/)  ? "active" : "";
    }

}

function Sidebar() {
  const { location } = window;

  const homeClass = location.pathname === "/" ? "active" : "";
  const pairClass = pairClassFn();
  const poolsClass = location.pathname.match(/^\/pools/) ? "active" : "";
  const newsClass = location.pathname.match(/^\/news/) ? "active" : "";
  const boardClass = location.pathname.match(/^\/board/) ? "active" : "";
  const launchpadClass = location.pathname.match(/^\/launchpad/) ? "active" : "";




  return (
    <div className="sidebar" id='sidebar'>
        <div className="logo"><img src="/images/logoryoshi.png" /><span className="title">RYOSHI</span></div>
        <div className="sidebar-menu">
            <ul>
                <li className={`item ${homeClass}`}>
                  <a href="/">
                    <HiOutlineHome /><span>Home</span>
                  </a>
                </li>

                <li className={`item ${boardClass}`}>
                  <a href="/board">
                      <HiTemplate />
                      <span>Board Explorer</span>
                  </a>
                </li>

                <li className={`item ${pairClass}`}>
                  <a href="/ether/uniswap/pair-explorer/0xd4dcc708f46260f008320383fb1a7379f421c46b">
                      <HiOutlineSearchCircle />
                      <span>Pair Explorer</span>
                  </a>
                </li>

                <li className={`item ${poolsClass}`}>
                  <a href="/pools">
                    <HiOutlinePresentationChartLine />
                    <span>Pool Explorer</span>
                  </a>
                </li>

                <li className={`item ${newsClass}`}>
                  <a href="/news">
                    <HiOutlineNewspaper />
                    <span>News</span>
                  </a>
                </li>

                <li className="item soon">
                  <a href="#">
                    <HiSpeakerphone />
                    <span>Alerts (soon)</span>
                  </a>
                </li>

                <li className="item soon">
                  <a href="#">
                    <HiOutlineGift />
                    <span>Stake (soon)</span>
                  </a>
                </li>

                

                <li className="item soon">
                  <a href="#">
                    <HiCog />
                    <span>Settings (soon)</span>
                  </a>
                </li>

                <li className="item">
                  <a href="/favorites">
                    <HiHeart />
                    <span>Favorites</span>
                  </a>
                </li>

            </ul>
        </div>
        <div className='sidebar-connect-mobile'>
           <Connect/>
        </div>
    </div>

  );
}

export default Sidebar;
