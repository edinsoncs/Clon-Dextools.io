import { useParams } from "react-router-dom"
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import DefiPool from '../../apollo/defipool';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from "react";
import token from '../../modules/getToken';
import { getAddress } from '@ethersproject/address'
import DataTableExtensions from 'react-data-table-component-extensions';

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
            backgroundColor: '##142028',
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
          backgroundColor: '##142028',
          color: 'white'
      },
    }
};

function Transactions(obj) {

  const { defi } = useParams()

  if(obj.defi == 'uniswap'){
    var trxs = DefiPool.UniSwap();
  }

  if(obj.defi == 'sushi'){
    var trxs = DefiPool.SushiSwap();
  }

  if(obj.defi == 'shiba'){
    var trxs = DefiPool.ShibaSwap();
  }

  if(obj.defi == 'suni'){
    var trxs = DefiPool.SuniExchange();
  }

  if(obj.defi == 'uniswapv3'){
    var trxs = DefiPool.UniSwapv3();
  }

  const show = [];


  trxs.map((e,i,a) => {

     let date = (e.createdAtTimestamp) ? new Date(e.createdAtTimestamp * 1000) : new Date(e.timestamp * 1000);

     let obj = {};
     obj.id = e.id;

     const token_single = token(e);

     obj.date = date.getFullYear() + '-' +(date.getMonth()+1) +  '-' +date.getDate() + ' ' + date.getHours() +':'+date.getMinutes()+':'+date.getSeconds() ;
     obj.pair = <><a href={`/ether/${defi}/pair-explorer/${e.id}`} className='list-pairs-symbol'>{e.token0.symbol} / {e.token1.symbol}</a></>;


     if(defi == 'uniswapv3'){
       //Uniswapv3
       obj.totalp = <NumberFormat value={e.totalValueLockedUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />;
     } else {
       //Exchange Defi traditional uniswapv2, sushi, shiba, suni
       obj.totalp = <NumberFormat value={e.reserveUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />;
     }

     obj.trxs = e.txCount;

     var idToken;

     if(token_single == isAddress(e.token0.id)){
        let pricePrivateToken = Number(e.token0.derivedETH) * global.price_eth;
        obj.pricetoken = <> <span className='price-list-pools'> <NumberFormat value={pricePrivateToken} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={14} /> </span> </>
        obj.name = <><a href={`/ether/${defi}/pair-explorer/${e.id}`} className='list-pairs-symbol'>{e.token0.symbol}</a></>;
        idToken = e.token0.id;
     }

     if(token_single == isAddress(e.token1.id)){
       let pricePrivateToken = Number(e.token1.derivedETH) * global.price_eth;
        obj.pricetoken = <><span className='price-list-pools'> <NumberFormat value={pricePrivateToken} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={14} /> </span> </>
        idToken = e.token1.id;
        obj.name = <><a href={`/ether/${defi}/pair-explorer/${e.id}`} className='list-pairs-symbol'>{e.token1.symbol}</a></>;
     }



     obj.actions = <>

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

     show.push(obj);


  });



  return (
    <>
              <div className="transaction-list">

                    <DataTable
                     title={`${obj.defi.toUpperCase()} New pairs listed on Ethereum exchanges with pool variation in real time`}
                     className="table-striped-rows"
                     columns={columns}
                     data={show}
                     progresoPending={true}
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
