import { HiBookOpen, HiNewspaper } from "react-icons/hi";
import { FaMedium } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';


function Footer() {
  return (
    <footer>
        <div className="social-icons">
            <div className="item"><a href="https://t.me/ryoshipro" target="_blank" data-tip={`Telegram`}><img src="/images/telegram.svg" /></a></div>
            <div className="item"><a href="https://twitter.com/ryoshitools" target="_blank" data-tip={`Twitter`}><img src="/images/twitter.svg" /></a></div>
            <div className="item">
              <a href="https://ryoshipro.medium.com/welcome-to-ryoshi-defi-tools-83f8f8123fcc" target="_blank" data-tip={`White paper`}>
              <HiBookOpen/>
              </a>
            </div>
            <div className="item">
              <a href="https://ryoshipro.medium.com/" target="_blank" data-tip={`Medium`}>
              <HiNewspaper/>
              </a>
              
            </div>
            <div>
              <a href="#" target="_blank" data-tip={`Coinmarketcap`}>
                <img src='/images/cmclogomdex.svg' width={22} />
              </a>
            </div>
        </div>
        <ReactTooltip />
        <div className="copyright">©RYOSHI - <small>V0.0.1</small></div>
    </footer>


  );
}



export default Footer;
