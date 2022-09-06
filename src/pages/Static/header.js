import React, { Component, PureComponent  } from 'react';
import Connect from './connect';
import SearchWidget from './search';
import NetworkSelect from './network';
import Priceeth from '../Sections/Priceeth';
import Gasprice from '../Sections/Gasprice';
import './header.css'

import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";




const checkChars = (str) => {
  var max = 8
  return str.length > max ? str.substring(0, max) + '...' : str
}

let activeOrDisabled = 0;

export default class Header extends Component {

  activeMenu(){
    let sidebar = document.getElementById('sidebar');
    let show = document.getElementById('menu-Mobile-Show');
    let hidde = document.getElementById('menu-Mobile-Hidde');

    if(activeOrDisabled == 0) {
      sidebar.style.display = 'block';
      show.style.display = 'none';
      hidde.style.display = 'block';
      activeOrDisabled = 1;
    } else {
      sidebar.style.display = 'none';
      show.style.display = 'block';
      hidde.style.display = 'none';
      activeOrDisabled = 0;
    }


  }

  getId(element){
    return document.getElementById(element);
  }

  render(){
    return(
     <>
      <section className='app-Mobile'>
        <div className='menu-Mobile' onClick={this.activeMenu}>
            <AiOutlineMenu id='menu-Mobile-Show' />
            <AiOutlineLeft id='menu-Mobile-Hidde'/>
        </div>
      </section>


       <section className='ads-gifts'>
          <iframe src='https://ads.ryoshi.pro/' width='100%' height='90'></iframe>
       </section>

       <header>
           <div className="col1">
             <NetworkSelect />
             <Priceeth />
             <Gasprice />
           </div>
           <div className="col2 ">
               <SearchWidget />
           </div>
           <div className="col3">
               <div className="contact">
                   <img src="/images/send.svg" />
                   <div className="text">
                       <div className="line1">Contact advertising</div>
                       <div className="line2"><a href="mailto:info@ryoshi.pro" className='no-link'>info@ryoshi.pro</a></div>
                   </div>
               </div>
               <Connect/>
           </div>
           
       </header>
     </>
    )
  }

}
