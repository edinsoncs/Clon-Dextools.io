import { useParams } from "react-router-dom"
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import DefiPool from '../../apollo/defipool';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from "react";
import token from '../../modules/getToken';
import { getAddress } from '@ethersproject/address'
import DataTableExtensions from 'react-data-table-component-extensions';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Oval } from  'react-loader-spinner'

const isAddress = (value: any) => {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}


const columns = [
    {
        name: 'Date',
        selector: row => row.date,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Pair',
        selector: row => row.pair,
    },
    {
        name: 'Total Liquids',
        selector: row => row.totalp,
    },
    {
        name: 'Transactions',
        selector: row => row.trxs,
    },
    {
        name: 'Price',
        selector: row => row.pricetoken,
    },

    {
        name: 'Actions',
        selector: row => row.actions,
    },
];



const customStyles = {
    rows: {
        when: row => row.completed,
        style: {
            minHeight: '40px', // override the row
            backgroundColor: '#142028',
            color: 'white',
            '&:hover': {
              backgroundColor: '#000000de!important',
              color: 'white!important',
              outlineWidth: '0!important',
              borderBottomWidth: '0!important'
            },
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: '#142028',
            color:'white',
            fontWeight: '800'
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
    pagination:{
      style: {
          backgroundColor: '#142028',
          color: 'white'
      },
    }
};

function Transactions(obj) {
  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const { defi } = useParams()

  React.useEffect(() => {
		const timeout = setTimeout(() => {
			//setRows(show);
			setPending(false);
		}, 5000);
		return () => clearTimeout(timeout);
	}, []);
  


  var type_network;
  var exchange_select;

  if(obj.defi == 'uniswap'){
    var trxs = DefiPool.UniSwap();
    type_network = 'ether';
  }

  if(obj.defi == 'uniswapv3'){
    var trxs = DefiPool.UniSwapv3();
    type_network = 'ether';
  }

  if(obj.defi == 'sushi'){
    var trxs = DefiPool.SushiSwap();
    type_network = 'ether';
  }

  if(obj.defi == 'shiba'){
    var trxs = DefiPool.ShibaSwap();
    type_network = 'ether';
  }

  if(obj.defi == 'suni'){
    var trxs = DefiPool.SuniExchange();
    type_network = 'ether';
  }

  if(obj.defi == 'biswap'){
    var trxs = DefiPool.Biswap();
    type_network = 'bsc';
    exchange_select = 'https://exchange.biswap.org/#/swap?outputCurrency=';
  }

  if(obj.defi == 'apeswap'){
    var trxs =  DefiPool.Apeswap();
    type_network = 'bsc';
    exchange_select = 'https://app.apeswap.finance/swap?inputCurrency=';
  }

  if(obj.defi == 'babyswap'){
    var trxs = DefiPool.Babyswap();
    type_network = 'bsc';
    exchange_select = 'https://exchange.babyswap.finance/#/swap?inputCurrency=';
  }

  if(obj.defi == 'quickswap'){
    var trxs = DefiPool.Quickswap();
    type_network = 'polygon';
  }

  const show = [];


  trxs.map((e,i,a) => {

     let date = (e.createdAtTimestamp) ? new Date(e.createdAtTimestamp * 1000) : new Date(e.timestamp * 1000);

     let obj = {};
     obj.id = e.id;

     const token_single = token(e);

     obj.date = date.getFullYear() + '-' +(date.getMonth()+1) +  '-' +date.getDate() + ' ' + date.getHours() +':'+date.getMinutes()+':'+date.getSeconds() ;
     obj.pair = <><a href={`/${type_network}/${defi}/pair-explorer/${e.id}`} className='list-pairs-symbol'>{e.token0.symbol} / {e.token1.symbol}</a></>;

     if(defi == 'uniswapv3'){
       obj.totalp = <NumberFormat value={e.totalValueLockedUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />;
     } else {
       obj.totalp = <NumberFormat value={e.reserveUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />;
     }


     if(defi == 'biswap' || defi == 'babyswap'){
       obj.trxs = e.totalTransactions;
     } else {
       obj.trxs = e.txCount;
     }

     var idToken, pricePrivateToken;

     if(token_single == isAddress(e.token0.id)){

        //Preguntamos por el precio
        // 1. RED BSC - DEFI BISWAP
        // 2. RED ETH - DEFI ALL
        if(defi == 'biswap' || defi == 'babyswap'){
          pricePrivateToken = Number(e.token0.derivedBNB) * global.price_bnb;
        } else{
          pricePrivateToken = Number(e.token0.derivedETH) * global.price_eth;
        }



        obj.pricetoken = <> <span className='price-list-pools'> <NumberFormat value={pricePrivateToken} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={14} /> </span> </>
        obj.name = <><a href={`/${type_network}/${defi}/pair-explorer/${e.id}`} className='list-pairs-symbol'>{e.token0.symbol}</a></>;
        idToken = e.token0.id;
     }

     if(token_single == isAddress(e.token1.id)){

       //Preguntamos por el precio
       // 1. RED BSC - DEFI BISWAP
       // 2. RED ETH - DEFI ALL
       if(defi == 'biswap' || defi == 'babyswap'){
         pricePrivateToken = Number(e.token0.derivedBNB) * global.price_bnb;
       } else{
         pricePrivateToken = Number(e.token0.derivedETH) * global.price_eth;
       }

        obj.pricetoken = <><span className='price-list-pools'> <NumberFormat value={pricePrivateToken} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={14} /> </span> </>
        idToken = e.token1.id;


        obj.name = <><a href={`/${type_network}/${defi}/pair-explorer/${e.id}`} className='list-pairs-symbol'>{e.token1.symbol}</a></>;
     }



     obj.actions = <>


     {(() => {
       if (type_network == 'ether') {
         return (<>

           <a href={`https://etherscan.io/token/${idToken}`} target='_blank' className='list-pairs-live'>
             <img src='/images/etherscan.png' width='20'/>
           </a>

           <a className='list-pairs-live' href={`https://app.unicrypt.network/amm/uni-v2/pair/${obj.id}`} target='_blank'>
             <img src='/images/unicrypt_v3.svg' width='20'/>
           </a>

           <a href={`https://app.uniswap.org/#/swap?outputCurrency=${idToken}`} target='_blank' className='list-pairs-live'>
             <img src={`/images/${defi}.png`} width='20'/>
           </a>

           </>
         )
       } else if (type_network == 'bsc') {
         return (

           <>

           <a href={`https://bscscan.com/token/${idToken}`} target='_blank' className='list-pairs-live'>
             <img src='/images/bsc-scan.svg' width='20'/>
           </a>

           <a className='list-pairs-live' href={`https://mudra.website/?certificate=yes&type=0&lp=${obj.id}`} target='_blank'>
             <img src='/images/mudra.png' width='20'/>
           </a>

           <a href={`${exchange_select}${idToken}`} target='_blank' className='list-pairs-live'>
             <img src={`/images/${defi}.png`} width='20'/>
           </a>

           </>
         )
       } else if (type_network == 'polygon') {
         return (
           <>

           <a href={`https://bscscan.com/token/${idToken}`} target='_blank' className='list-pairs-live'>
             <img src='/images/polygonscan.svg' width='20'/>
           </a>


           <a href={`https://exchange.biswap.org/#/swap?outputCurrency=${idToken}`} target='_blank' className='list-pairs-live'>
             <img src={`/images/${defi}.png`} width='20'/>
           </a>

           </>
         )
       }

     })()}




     </>

     show.push(obj);


  });


  

  return (
    <>
              <div className="transaction-list">

                    <DataTable
                     title={`${obj.defi.toUpperCase()} New pairs listed on ${type_network} exchanges with pool variation in real time`}
                     className="table-striped-rows"
                     columns={columns}
                     data={show}
                     progressPending={pending}
                     progressComponent={<Oval height="50" width="50"/>}
                     pagination
                     paginationPerPage={30}
                     highlightOnHover={true}
                     customStyles={customStyles}
                     responsive
                     />
              </div>
    </>
  );
}


export default Transactions;
