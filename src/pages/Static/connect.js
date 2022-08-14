import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3'
import { useCallback, useEffect} from 'react';
import { BiUserCircle } from "react-icons/bi";

import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "@szhsin/react-menu/dist/theme-dark.css";


const checkChars = (str) => {
  var max = 8
  return str.length > max ? str.substring(0, max) + '...' : str
}


function Connect() {

  const {active, activate, account, library, error } = useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previousConnect', true);
  }, [activate])

  useEffect(() => {
    if(localStorage.getItem('previousConnect') == 'true') connect();
  }, [connect]);


  return (<>


    <div className="connect-wallet" onClick={connect}>

                {active ? (
                  <>
                  <Menu
                  theming="dark"
                  menuButton={
                    <MenuButton>
                      <img src="/images/wallet.svg"/>
                      <div className="text">{checkChars(account)}</div>
                      <div className='userMeta'>
                        <a href='#'>
                          <BiUserCircle />
                        </a>
                      </div>
                    </MenuButton>
                    } transition>
                          <MenuItem href='/board'>Board</MenuItem>
                          {/*<MenuItem>Profile</MenuItem>
                          <MenuItem href="/user/settings">Settings</MenuItem>*/}
                          <MenuDivider />
                          {/* <MenuItem>About</MenuItem> */}
                          <MenuItem href='https://docs.metadex.tools' target='_blank'>Docs</MenuItem>
                      </Menu>



                  </>
                ) : (<>

                  <img src="/images/wallet.svg"/>
                  <div className="text">
                    {isUnsupportedChain ? 'No support' : 'Connect'}
                  </div>

                </>)}

    </div>
  </>);
}

export default Connect;
