import Gasprice from '../Sections/Gasprice';
import Priceeth from '../Sections/Priceeth';
import Pricebnb from '../Sections/Pricebnb';
import Pricematic from '../Sections/Pricematic';
import React, { Component, PureComponent, useEffect, useCallback, useState } from 'react';
import { GiBurningEmbers } from "react-icons/gi";


function Subheader() {

  const [hotList, setHot] = useState([])
  var details_network;
  var type_defi = window.location.pathname.split('/');
  var show_pairs = ''

  var network_hot;

  if (type_defi[1].length > 0) {

    if (type_defi[1] == 'pools') {

      if (type_defi[2] == 'bsc') {
        network_hot = type_defi[2];
      }
      else if (type_defi[2] == 'polygon') {
        network_hot = type_defi[2];
      }
      else {
        network_hot = 'ether';
      }

    }


    else {

      if (type_defi[1] == 'pools-list') {

        switch (type_defi[2]) {
          case 'uniswap':
            network_hot = 'ether';
            break;

          case 'uniswapv3':
            network_hot = 'ether';
            break;

          case 'sushi':
            network_hot = 'ether';
            break;

          case 'shiba':
            network_hot = 'ether';
            break;

          case 'suni':
            network_hot = 'ether';
            break;

          case 'biswap':
            network_hot = 'bsc';
            break;

          case 'apeswap':
            network_hot = 'bsc';
            break;

          case 'babyswap':
            network_hot = 'bsc';
            break;

          case 'quickswap':
            network_hot = 'polygon';
            break;

          default:
            break;
        }

      }

      else if(type_defi[1] == 'news' || type_defi[1] == 'launchpad' || type_defi[1] == 'favorites'){
        network_hot = 'ether';
      }

      else {
        network_hot = type_defi[1];
      }
    }




  } else {
    network_hot = 'ether';
  }


  useEffect(() => {
    fetch('https://api.metadex.tools/hotlist/' + network_hot)
      .then(response => response.json())
      .then(data => (data.status) ? setHot(data.data) : setHot(null));
  }, []);


  function stop() {
    getClassTag('marquee')[0].stop();
  }

  function play() {
    getClassTag('marquee')[0].start();
  }

  function getClassTag(tag) {
    return document.getElementsByClassName(tag);
  }
  if (type_defi[1] == 'ether' ||
    type_defi[1] == 'news' ||
    type_defi[1] == 'favorites' ||
    type_defi[1] == '') {

    details_network = <>  <Priceeth /><Gasprice /> </>

  } else if (type_defi[1] == 'bsc') {
    details_network = <>  <Pricebnb /> </>
  } else if (type_defi[1] == 'polygon') {
    details_network = <>  <Pricematic /></>
  } else if (type_defi[1] == 'launchpad') {
    details_network = <>  <Pricebnb /> <Priceeth /> </>
  }


  else if (type_defi[1] == 'pools') {
    /**
     * Pools
     * Verificar los pools de las redes ETH - BSC - POLYGON
     */

    //Preguntamos si tiene la url /pools/bsc => si existe estamos en la red de BSC
    if (type_defi[2] == 'bsc') {
      details_network = <>  <Pricebnb /> </>
    }

    else if (type_defi[2] == 'polygon') {
      details_network = <>  <Pricematic /> </>
    }

    //La pagina por default tomara la url /pools => se mostrara la informacion de la red ETH
    else {
      details_network = <>  <Priceeth /><Gasprice /> </>
    }

  }


  else if (type_defi[1] == 'pools-list') {

    if (type_defi[2] == 'biswap') {
      details_network = <>  <Pricebnb /> </>
    } else if (type_defi[2] == 'babyswap') {
      details_network = <>  <Pricebnb /> </>
    } else {
      details_network = <>  <Priceeth /><Gasprice /> </>
    }

  }


  return (
    <>
      

      <div className="trending-line">
        <div className="fixed-content">
          {/* {details_network} */}
          <div className="item trending"><img src="/images/trending-icon.svg" alt="" /><div className="gas">HOT PAIRS</div></div>
        </div>
        
        <div className="moving-content">
          <div className="hot-mobile"><img src="/images/trending-icon.svg" alt="" /><div className="gas">HOT PAIRS</div></div>
          <marquee scrolldelay="150" className='marquee' behavior="scroll" direction="left" scrollamount="10" onMouseOver={stop} onMouseOut={play}>

            {hotList.map(function (e, i) {
              return <a href={`/${e.network}/${e.defi}/pair-explorer/${e.pair}`} class="item">

                <span class="position">
                  <b>#{i + 1}</b>
                </span>
                <span class="name">
                  {e.name}
                  <img src={`/images/${e.defi}.png`} width={10} className='image-defi' />
                </span>

              </a>
            })}

          </marquee>

          <div className='hot-ads-hot-1'>
            <a href='#'>
              <img src='/images/shiba.png' width='20' />
              Shiba
            </a>
          </div>

          
          <div className='hot-ads-hot'>
           
            <a href='#'>
              <GiBurningEmbers />
              Live Trading
            </a>
          </div>
        </div>
      </div>
    </>

  );
}

export default Subheader;
