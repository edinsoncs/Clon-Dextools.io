import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useSWR from 'swr'
import ReactTooltip from 'react-tooltip';
import Query from '../../apollo/query';
import Daily from '../../apollo/daily';
import getToken from '../../modules/getToken';
import GetInfo from '../../modules/GetInfo';
import NumberFormat from 'react-number-format';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { FcShare, FcLike } from "react-icons/fc";
import Modal from 'react-modal';
import { ShareSocial } from 'react-share-social'
import LikeComponent from '../Component/LikeComponent';
import InformationComponent from './Component/InformationComponent';
import HoldersComponent from './Component/HoldersComponent';
import DailyVolume from './Mod/dailyvolume';
import VotesComponent from './Component/VotesComponent';
import { useWeb3React } from '@web3-react/core';
import TemplateLoading from '../Static/templateloading'
import { TVChartContainer } from '../Component/TVChartContainer/index';

import { Helmet } from "react-helmet";


import { getAddress } from '@ethersproject/address'

const isAddress = (value: any) => {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}



const checkChars = (str) => {
  var max = 15
  return str.length > max ? str.substring(0, max) + '...' : str
}


const get_url = window.location.href;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#142028'
  },
};

const style = {
  background: 'transparent',
  borderRadius: 3,
  border: 0,
  color: 'white',
  padding: '0 30px',
};

function hot(pair, defi, name, network){

  fetch("https://api.dexi.tools/hot", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pair: pair,
        defi: defi,
        name: name,
        network: network
      })
  })
  .then(function(response) {
      if(response.ok){
          return response.json();
      }{
          throw new Error("Post Failed")
      }
  }).then(function(data){
      if(data.status){
        this.setState({ votes: data })
      }
  })
  .catch(function(error) {
      console.log("Request failed", error);
  });



}

function Pairname() {

  var type_defi = window.location.pathname.split('/');

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { exchange, id } = useParams()
  const {account } = useWeb3React();

  let arr = JSON.parse(localStorage.getItem('likes')) || [];
  let arr_token = [];

  //Transacciones totales variable
  let txsTotal, daily;

  //We identify the type of exchange

  if(type_defi[2] == 'uniswap') {
    var query = Query.FindPair(id);
    daily = Daily.UniPair(id);
    txsTotal = daily.length ? daily[0].dailyTxns : 0;
  }

  else if(type_defi[2] == 'uniswapv3') {
    var query = Query.FindPairV3(id);
    daily = Daily.UniPair3(id);
    txsTotal = daily.length ? daily[0].txCount : 0;
  }
   else if(type_defi[2] == 'sushi'){
    var query = Query.FindPairSushi(id);
    daily = Daily.SushiPair(id);
    txsTotal = daily.length ? daily[0].txCount : 0;


  } else if(type_defi[2] == 'shiba'){
    var query = Query.FindPairShiba(id);
    daily = Daily.ShibaPair(id);
    txsTotal = daily.length ? daily[0].txCount : 0;

  } else if(type_defi[2] == 'suni'){
    var query = Query.FindPairSuni(id);
    daily = Daily.SuniPair(id);
    txsTotal = daily.length ? daily[0].txCount : 0;
  }

  //Obtenemos el volumen diario de cualquier token en distintos DEFI
  let volumeDaily = DailyVolume(exchange, daily);


  let volDay0 = daily.length ? daily[0].dailyVolumeUSD : 0;

  if (!query.token1) return <TemplateLoading/>

  const token_single = getToken(query);
  let line_name_format = '';
  let line_name_token = '';
  let line_smybol_token = '';
  let line_smybol_token_b = '';
  let tokensAB = [];

  if(token_single == isAddress(query.token0.id)){
    line_name_format = <><b className='symbol-pair'>{query.token0.symbol}</b> /  {query.token1.symbol}</>;
    line_name_token = query.token0.name;
    line_smybol_token = query.token0.symbol;
    line_smybol_token_b = query.token1.symbol;
    localStorage.setItem('token', query.token0.symbol)
    var price_token = query.token0.derivedETH * global.price_eth;
    var totaltx = query.txCount;
    localStorage.setItem('reverse', 1)
    tokensAB = [token_single, query.token1.id]
  }

  if(token_single == isAddress(query.token1.id)){
    line_name_format = <>{query.token0.symbol} /  <b className='symbol-pair'>{query.token1.symbol}</b></>;
    line_name_token = query.token1.name;
    line_smybol_token = query.token1.symbol;
    line_smybol_token_b = query.token0.symbol;
    localStorage.setItem('token', query.token1.symbol)
    var price_token = query.token1.derivedETH * global.price_eth;
    var totaltx = query.txCount;
    localStorage.setItem('reverse', 0)
    tokensAB = [token_single, query.token0.id]
  }

  //send hot top pairs
  const sendHot = hot(id, type_defi[2], line_smybol_token, type_defi[1]);

   var onCopy = () => {
   };

    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
      setIsOpen(false);
    }


    var title = line_smybol_token + ' $' + price_token;
    var desMeta = 'Real-time price, charts, daily trades, 24-hour volumes and crypto analysis of ' + title + ' ' + ' Pair Explorer - METADex';

  return (
    <>

    <Helmet>
          <title>{ title  } - Pair Explorer - RYOSHI</title>
          <meta name="description" content={`${desMeta}`} />
    </Helmet>

    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Share on Social Media</h2>

        <ShareSocial
           style={style}
           url ={get_url}
           socialTypes={['facebook','twitter','reddit','linkedin']}
         />

        <button onClick={closeModal} className='close-modal'>close</button>

      </Modal>

    <div className="pair-title">

       <GetInfo address={token_single} name={line_name_token} />
       <div className="pair-section">
         <div className="pair-name">
            <div className="text">
                {line_name_format}


                {(() => {
                  if (type_defi[2] == 'uniswap') {
                    return (
                      <span className='version'>v2</span>
                    )
                  } else if (type_defi[2] == 'uniswapv3') {
                    return (
                      <span className='version'>v3</span>
                    )
                  }

                })()}

            </div>
            <div className="icons">

              <a href={`https://etherscan.io/token/${token_single}`} target="_blank" rel="noreferrer" data-tip={`Etherscan Contract `}>
                  <img src="/images/etherscan.png" width='20' alt="" />
              </a>

              {(() => {
                if (type_defi[2] == 'uniswap') {
                  return (
                    <a href={`https://app.uniswap.org/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange}`}>
                        <img src="/images/uniswap.png" alt="" width='20' height='20' />
                    </a>
                  )
                } else if (type_defi[2] == 'uniswapv3') {
                  return (
                    <a href={`https://app.uniswap.org/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange}`}>
                        <img src="/images/uniswap.png" alt="" width='20' height='20' />
                    </a>
                  )
                } else if (type_defi[2] == 'sushi') {
                  return (
                    <a href={`https://app.sushi.com/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange}`}>
                        <img src="/images/sushiswap.png" alt="" width='20' height='20' />
                    </a>

                  )
                } else if (type_defi[2] == 'shiba') {
                  return (
                    <a href={`https://shibaswap.com/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange}`}>
                        <img src="/images/shiba.png" alt="" width='20' height='20' />
                    </a>

                  )
                } else if (type_defi[2] == 'suni') {
                  return (
                    <a href={`https://suni.exchange/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange.toUpperCase()}`}>
                        <img src="/images/suni.png" alt="" width='20' height='20' />
                    </a>
                  )
                }
              })()}

              <a href={`https://app.bubblemaps.io/eth/token/${token_single}`} target="_blank" rel="noreferrer" data-tip={`BubbleMaps`}>
                  <img src="/images/bubblemaps.png" width='25' alt="" />
              </a>

              <InformationComponent token={token_single} pair={query.id}  />

            </div>
            <ReactTooltip />
         </div>
         <div className="pair-details">
              <small className='m-right-1 first-line-token'>({line_name_token}) </small>
              <small>Token contract: {checkChars(token_single)}
              <CopyToClipboard onCopy={onCopy} text={token_single} className='m-left-1' id="first-click">
                  <FaCopy data-tip={`Copy to clipboard `}  />
              </CopyToClipboard>
              </small>
              <small className="m-left-1 m-right-1">-</small>
              <small className="">
                Pair:
                <CopyToClipboard onCopy={onCopy} text={query.id} className='m-left-1' id="second-click">
                    <FaCopy data-tip={`Copy to clipboard `}  />
                </CopyToClipboard>
              </small>
         </div>
      </div>


    </div>
    <div className="row">
       <div className="col1">
          <div className="col-title social-pairs-links">
             <a  rel="noreferrer" onClick={openModal} className='social-icon-share'>
                <FcShare/>
             </a>


            <LikeComponent symbol={line_smybol_token} data={query} />

            {(() => {
              if (type_defi[2] == 'uniswap') {
                return (
                  <a href={`https://app.uniswap.org/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" className='social-icon-trade'>
                    SWAP
                  </a>
                )
              } else if (type_defi[2] == 'sushi') {
                return (
                  <a href={`https://app.sushi.com/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" className='social-icon-trade'>
                    SWAP
                  </a>

                )
              } else {
                return (
                  <a href={`https://shibaswap.com/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" className='social-icon-trade'>
                    SWAP
                  </a>
                )
              }
            })()}



          </div>
          <div className="col-body pair-info">
             <div className="item item-price even">
                <span className="label">Price:</span>
                <span className="content price"><NumberFormat value={price_token} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={ (parseFloat(price_token) > 0.99) ? 2 : 14} /></span>
             </div>

             <div className="item odd">
                <span className="label">Total Liquidity:</span>
                <span className="content">

                {(() => {
                  if (type_defi[2] !== 'uniswapv3') {
                    return (
                      <NumberFormat value={query.reserveUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                    )
                  } else {
                    return (
                      <NumberFormat value={query.totalValueLockedUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                    )
                  }
                })()}



                </span>
             </div>

             <div className="item odd">
                <span className="label">Daily Volume:</span><span className="content"><NumberFormat value={volumeDaily} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></span>
             </div>

             <div className="item odd">
                <span className="label">Daily tx:</span><span className="content"><NumberFormat value={txsTotal} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
             </div>



             <div className="item even">
                <span className="label">Total tx:</span><span className="content">{totaltx}</span>
             </div>

             <HoldersComponent token={token_single} pair={query.id} price={price_token} />

             {(() => {
               if (type_defi[2] !== 'uniswapv3') {
                 return (<>

                   <div className="item even">
                    <span className="label">Pooled {query.token0.symbol}:</span><span className="content pooled"><NumberFormat value={query.reserve0} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                   </div>

                   <div className="item odd">
                      <span className="label">Pooled {query.token1.symbol}:</span><span className="content pooled"><NumberFormat value={query.reserve1} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                   </div>

                 </>)
               } else {
                 return (<>

                   <div className="item even">
                    <span className="label">Pooled {query.token0.symbol}:</span><span className="content pooled"><NumberFormat value={query.token0.totalValueLocked} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                   </div>

                   <div className="item odd">
                      <span className="label">Pooled {query.token1.symbol}:</span><span className="content pooled"><NumberFormat value={query.token1.totalValueLocked} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                   </div>

                 </>)
               }
             })()}






          </div>
          <VotesComponent name={line_name_token} pair={query.id} account={account} />
       </div>

       <div className="col2">
          <input type='hidden' name='tokenA' value={tokensAB} id='tokenAB'/>
          <input type='hidden' name='tokenName' value={[line_smybol_token, line_smybol_token_b]} id='tokenName'/>
          <TVChartContainer query={query} defi={exchange} pair={id}  />
       </div>
    </div>


    </>
  );

}

export default Pairname;
