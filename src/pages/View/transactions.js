import { useParams } from "react-router-dom"
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import Candles from '../../apollo/candles';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from "react";
import Moment from 'react-moment';


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

function Transactions() {

  var name_token = document.getElementById('tokenName');
  if(name_token){
    name_token = name_token.value.split(',');
  } else {
    name_token = '';
  }

  const columns = [
      {
          name: 'Date',
          selector: row => row.date,
      },
      {
          name: 'Type',
          selector: row => row.type,
      },
      {
          name: 'Price USD',
          selector: row => row.price_usd,
      },
      {
          name: 'Amount Token '+ name_token[0],
          selector: row => row.amount,
      },
      {
          name: 'Total '+ name_token[1],
          selector: row => row.total_eth,
      },
      {
          name: 'Maker',
          selector: row => row.maker,
      },
      {
          name: 'Other',
          selector: row => row.other,
      },
  ];

  var type_defi = window.location.pathname.split('/');
  var trxs;

  const { id } = useParams()
  if(type_defi[2] == 'uniswap') {
    trxs = Candles.FindSwap(id);
  } else if(type_defi[2] == 'uniswapv3') {
    trxs = Candles.FindSwapV3(id);
  } else if(type_defi[2] == 'sushi'){
    trxs = Candles.FindSwapSushi(id);
  } else if(type_defi[2] == 'shiba'){
    trxs =  Candles.FindSwapShiba(id);
  } else if(type_defi[2] == 'suni'){
    trxs =  Candles.FindSwapSuni(id);
  } else if(type_defi[2] == 'ample'){
    trxs =  Candles.FindSwapAmple(id);
  }


  const show = [];
  var reverse = localStorage.getItem('reverse');
  if (!trxs.data) return '.'

  //console.log(trxs.data.swaps);

  if(type_defi[2] == 'uniswapv3') {

    trxs.data.swaps.map((e,i,a) => {

       let date = new Date(e.timestamp * 1000);
       let obj = {};

       obj.date = <Moment format="YYYY/MM/DD h:m:s">{date}</Moment>
       obj.type = <>{(parseFloat(e.amount1) > 0.0) ? <span style={{color:'#17c671'}}>Buy</span> : <span style={{color:'#c4183c'}}>Sell</span>}</>
       obj.price_usd = <> {(parseFloat(e.amount1) > 0.0) ? <span style={{color:'#adffd7'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
       obj.amount = <> {(parseFloat(e.amount1) > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={Math.abs(e.amount0)} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={Math.abs(e.amount0)} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
       //obj.price_eth =   <> {(e.amount1In > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={e.amount0Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1In/e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
       obj.total_eth = <> {(parseFloat(e.amount1) > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={Math.abs(e.amount1)} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={Math.abs(e.amount1)} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
       obj.maker = <> <a href={`https://etherscan.io/address/${e.origin}`} target='_blank' className='table-list-link'>{e.origin}</a></>
       obj.other = <> <a  href={`https://etherscan.io/tx/${e.transaction.id}`} target='_blank'><img src='/images/etherscan.png' width='20' className='table-list-image' /></a></>

       show.push(obj);

    });

  } else {
    trxs.data.swaps.map((e,i,a) => {

       let date = new Date(e.timestamp * 1000);
       let obj = {};

       if(reverse == 1){
           obj.date = <Moment format="YYYY/MM/DD h:m:s">{date}</Moment>
           obj.type = <>{(parseFloat(e.amount1In) > 0.0) ? <span style={{color:'#17c671'}}>Buy</span> : <span style={{color:'#c4183c'}}>Sell</span>}</>
           obj.price_usd = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{color:'#adffd7'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
           obj.amount = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={e.amount0Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
           //obj.price_eth =   <> {(e.amount1In > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={e.amount0Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1In/e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
           obj.total_eth = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={e.amount1In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
           obj.maker = <> <a href={`https://etherscan.io/address/${e.to}`} target='_blank' className='table-list-link'>{e.to}</a></>
           obj.other = <> <a  href={`https://etherscan.io/tx/${e.transaction.id}`} target='_blank'><img src='/images/etherscan.png' width='20' className='table-list-image' /></a></>
       } else {
          obj.date = <Moment format="YYYY/MM/DD">{date}</Moment>
          obj.type = <>{(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#c4183c'}}>Sell</span> : <span style={{color:'#17c671'}}>Buy</span>}</>
          obj.price_usd = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#ffafaf'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#adffd7'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.amount = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#adffd7'}}><NumberFormat value={e.amount1Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.total_eth = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount0Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#adffd7'}}><NumberFormat value={e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.maker = <> <a href={`https://etherscan.io/address/${e.to}`} target='_blank' className='table-list-link'>{e.to}</a></>
          obj.other = <> <a  href={`https://etherscan.io/tx/${e.transaction.id}`} target='_blank'><img src='/images/etherscan.png' width='20' className='table-list-image' /></a></>
       }

       show.push(obj);

    });
  }

  return (
    <>
              <div className="transaction-list">
                <DataTable
                 className="table-striped-rows"
                 columns={columns}
                 data={show}
                 pagination
                 paginationPerPage={15}
                 highlightOnHover={true}
                 customStyles={customStyles}
             />
              </div>
    </>
  );
}


export default Transactions;
