import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useSWR from 'swr'
import ReactTooltip from 'react-tooltip';
import Query from '../../apollo/query';
import Daily from '../../apollo/daily';
import token from '../../modules/getToken';
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

function titleCase(string){
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
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
    background: '#121317'
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

  if(type_defi[2] == 'quickswap'){
    var query = Query.FindPairQuickswap(id);
    daily = Daily.Quickswap(id);
    txsTotal = daily.length ? daily[0].dailyTxns : 0;
  } else if(type_defi[2] == 'kyberswap'){
    var query = Query.FindPairKyberPoly(id);
    daily = Daily.KyberPoly(id);
    txsTotal = daily.length ? daily[0].dailyTxns : 0;
  }

  //Obtenemos el volumen diario de cualquier token en distintos DEFI
  let volumeDaily = DailyVolume(exchange, daily);


  let volDay0 = daily.length ? daily[0].dailyVolumeUSD : 0;

  if (!query.token1) return <TemplateLoading/>

  const token_single = token(query);
  let line_name_format = '';
  let line_name_token = '';
  let line_smybol_token = '';
  let line_smybol_token_b = '';
  let tokensAB = [];
  var price_token;


  if(token_single == isAddress(query.token0.id)){
    line_name_format = <><b>{query.token0.symbol}</b> /  {query.token1.symbol}</>;
    line_name_token = query.token0.name;
    line_smybol_token = query.token0.symbol;
    line_smybol_token_b = query.token1.symbol;
    localStorage.setItem('token', query.token0.symbol)

    /**
     * Detectamos el precio para ApeSwap
     * Detectamos el precio para otros Exchanges Defi
     */

      price_token = Number(query.token0.derivedETH) * Number(global.price_eth);


    /**
     * Verificamos la cantidad de transacciones realizadas en las 24 horas
     * Si no encuentra la key preguntamos para que encuentre el else
     */
    var totaltx = query.txCount;
    localStorage.setItem('reverse', 1)
    tokensAB = [token_single, query.token1.id]
  }


  if(token_single == isAddress(query.token1.id)){
    line_name_format = <>{query.token0.symbol} /  <b>{query.token1.symbol}</b></>;
    line_name_token = query.token1.name;
    line_smybol_token = query.token1.symbol;
    line_smybol_token_b = query.token0.symbol;
    localStorage.setItem('token', query.token1.symbol)

    /**
     * Detectamos el precio para ApeSwap
     * Detectamos el precio para otros Exchanges Defi
     */

    price_token = Number(query.token1.derivedETH) * Number(global.price_eth);


    var totaltx = query.txCount;
    localStorage.setItem('reverse', 0)
    tokensAB = [token_single, query.token0.id]
  }

  //console.log(query);
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



  return (
    <>

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
                {type_defi[2] == 'uniswap' ?

                  <span className='version'>v2</span> :

                  ''

                }
            </div>
            <div className="icons">

                <a href={`https://polygonscan.com/token/${token_single}`} target="_blank" rel="noreferrer" data-tip={`Polygon Contract `}>
                  <img src="/images/polygonscan.svg" width='20' alt="" />
              </a>


              {(() => {
                if (type_defi[2] == 'quickswap') {
                  return (
                    <a href={`https://quickswap.exchange/#/swap?inputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${titleCase(exchange)}`}>
                          <img src="/images/quick.png" alt="" width='20' height='20' />
                    </a>
                  )
                } else if (type_defi[2] == 'pancakeswap') {
                  return (
                    <a href={`https://app.uniswap.org/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange}`}>
                        <img src="/images/uniswap.png" alt="" width='20' height='20' />
                    </a>
                  )
                }

              })()}



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
              if (type_defi[2] == 'quickswap') {
                return (
                  <a href={`https://quickswap.exchange/#/swap?inputCurrency=${token_single}`} target="_blank" rel="noreferrer" className='social-icon-trade'>
                    Trade
                  </a>
                )
              } else if (type_defi[2] == 'bigswap') {
                return (
                  <a href={`https://exchange.biswap.org/#/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" className='social-icon-trade'>
                    Trade
                  </a>
                )
              }

            })()}



          </div>
          <div className="col-body pair-info">
             <div className="item item-price even">
                <span className="label">Price:</span>
                <span className="content price"><NumberFormat value={price_token} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={10} /></span>
             </div>
             <div className="item odd">
                <span className="label">Total Liquidity:</span><span className="content"><NumberFormat value={query.reserveUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /></span>
             </div>

             <div className="item even">
                <span className="label">Daily Volume:</span><span className="content"><NumberFormat value={volumeDaily} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></span>
             </div>

             <div className="item odd">
                <span className="label">Daily tx:</span><span className="content"><NumberFormat value={txsTotal} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
             </div>

             <div className="item even">
                <span className="label">Total tx:</span><span className="content">{totaltx}</span>
             </div>

               <HoldersComponent token={token_single}data={daily} pair={query.id} />

             <div className="item odd">
              <span className="label">Pooled {query.token0.symbol}:</span><span className="content pooled"><NumberFormat value={query.reserve0} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
             </div>
             <div className="item even">
                <span className="label">Pooled {query.token1.symbol}:</span><span className="content pooled"><NumberFormat value={query.reserve1} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
             </div>

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
