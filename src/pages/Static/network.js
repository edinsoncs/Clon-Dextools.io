import React, { Component, PureComponent, useEffect, useCallback  } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Navigate, Route } from 'react-router-dom';
import Select, { components } from 'react-select'
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "@szhsin/react-menu/dist/theme-dark.css";

import { AiFillCaretDown } from "react-icons/ai";

const isNetwork = window.location.pathname.split('/')[1]
const path = window.location.pathname;

export default class Network extends Component {


  constructor(props) {
    super(props);

  }


  render(){

    var network_select;
    var network_image;
    switch (isNetwork) {
        case 'bsc':
            network_select = 'BNB CHAIN'
            network_image = '/images/binance.png';
            break;
        
        case 'polygon':
            network_select = 'POLYGON'
            network_image = '/images/polygon.png';
            break;
    
        default:
            network_select = 'ETHEREUM'
            network_image = '/images/ethereum.svg';
            break;
    }


    return (
      <>
            {(() => {
                if (path == '/' || 
                    path == '/bsc' || 
                    path == '/polygon' || 
                    path.split('/')[1] == 'ether' ||
                    path.split('/')[1] == 'bsc' ||
                    path.split('/')[1] == 'polygon') {
                  return (
                    <Menu
                        theming="dark"
                        menuButton={
                        
                        <MenuButton className='network__Menu'>
                            <img src={network_image} width={20}/>
                            <span>{network_select}</span>
                            <AiFillCaretDown />
                        </MenuButton>

                        } transition>

                            {(() => {
                                if (path == '/' || 
                                    path.split('/')[1] == 'ether') {
                                    return(<>
                                        
                                        <MenuItem className='network__Menu--Availables' href="/bsc">
                                            <img src="/images/binance.png" width={20}/> BNB CHAIN
                                        </MenuItem>
                                        
                                        <MenuItem className='network__Menu--Availables' href="/polygon">
                                            <img src="/images/polygon.png" width={20}/>POLYGON
                                        </MenuItem>

                                    </>)
                                }  
                                
                                else if(path == '/bsc' || 
                                        path.split('/')[1] == 'bsc'){
                                    return(<>
                                        
                                        <MenuItem className='network__Menu--Availables' href="/">
                                            <img src="/images/ethereum.svg" width={20}/> ETHEREUM
                                        </MenuItem>
                                        
                                        <MenuItem className='network__Menu--Availables' href="/polygon">
                                            <img src="/images/polygon.png" width={20}/>POLYGON
                                        </MenuItem>

                                    </>)
                                }

                                else if(path == '/polygon' || 
                                        path.split('/')[1] == 'polygon'){
                                    return(<>
                                        
                                        <MenuItem className='network__Menu--Availables' href="/">
                                            <img src="/images/ethereum.svg" width={20}/> ETHEREUM
                                        </MenuItem>
                                        
                                        <MenuItem className='network__Menu--Availables' href="/bsc">
                                            <img src="/images/binance.png" width={20}/> BNB CHAIN
                                        </MenuItem>

                                    </>)
                                }
                                
                            })()}
                    </Menu>
                  )
                } 

            })()}

      </>
    );
  }


}
