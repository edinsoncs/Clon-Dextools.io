import { useParams } from "react-router-dom"
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import Candles from '../../apollo/candles';
import Query from '../../apollo/query';
import TokenVerify from '../../modules/getToken';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from "react";
import Moment from 'react-moment';


const name_token = localStorage.getItem('token');
const single_token = localStorage.getItem('token_single');
var incrementRows = 1;




const customStyles = {
  rows: {
    when: row => row.completed,
    style: {
      minHeight: '40px', // override the row
      backgroundColor: '#121317',
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
      backgroundColor: '#121317',
      color: 'white',
      fontWeight: '800'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#121317',
      color: 'white'
    },
  }
};

function Transactions({tokenBase}) {

  var type_defi = window.location.pathname.split('/');
  var name_token = document.getElementById('tokenName');
  if (name_token) {
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
      name: 'Price BUSD',
      selector: row => row.price_usd,
    },
    /*{
        name: 'Price BNB',
        selector: row => row.price_bnb,
    },*/
    {
      name: 'Amount Token ' + name_token,
      selector: row => row.amount,
    },
    {
      name: 'Total BNB',
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


  const { id } = useParams()
  var trxs, query;

  
  if (type_defi[2] == 'pancakeswap') {
    trxs = Candles.FindSwapPancake(tokenBase);
  } else if (type_defi[2] == 'biswap') {
    trxs = Candles.FindSwapBig(id);
  } else if (type_defi[2] == 'apeswap') {
    trxs = Candles.FindSwapApe(id);
  } else if (type_defi[2] == 'babyswap') {
    trxs = Candles.FindSwapBaby(id);
  }

  var show = [];
  var reverse = localStorage.getItem('reverse');

  if (!trxs.data) return '.'

  if (trxs.data) {

    if (type_defi[2] == 'apeswap' || type_defi[2] == 'babyswap') {

      trxs.data.swaps.map((e, i, a) => {

        let date = new Date(e.timestamp * 1000);
        let obj = {};

        if (reverse == 1) {
          obj.date = <Moment format="YYYY/MM/DD h:m:s">{date}</Moment>
          obj.type = <>{(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#17c671' }}>Buy</span> : <span style={{ color: '#c4183c' }}>Sell</span>}</>
          obj.price_usd = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#adffd7' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.amount = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount0Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          //obj.price_bnb =   <> {(e.amount1In > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={e.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1In/e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.total_eth = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount0Out * (e.pair.token0.derivedETH) ? e.pair.token0.derivedETH : e.amount0Out * e.pair.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount0In * (e.pair.token0.derivedETH) ? e.pair.token0.derivedETH : e.amount0In * e.pair.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.maker = <> <a href={`https://bscscan.com/address/${e.to}`} target='_blank' className='table-list-link'>{e.to}</a></>
          obj.other = <> <a href={`https://bscscan.com/tx/${e.transaction.id}`} target='_blank'><img src='/images/bsc-scan.svg' width='20' className='table-list-image' /></a></>
        } else {
          obj.date = <Moment format="YYYY/MM/DD h:m:s">{date}</Moment>
          obj.type = <>{(parseFloat(e.amount0In) == 0.0) ? <span style={{ color: '#c4183c' }}>Sell</span> : <span style={{ color: '#17c671' }}>Buy</span>}</>
          obj.price_usd = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{ color: '#ffafaf' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#adffd7' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.amount = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount1In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount1Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>

          obj.total_eth = <> {(parseFloat(e.amount0In) > 0.0) ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount0In * (e.pair.token0.derivedETH) ? e.pair.token0.derivedETH : e.amount0In * e.pair.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount0Out * (e.pair.token0.derivedETH) ? e.pair.token0.derivedETH : e.amount0In * e.pair.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>

          obj.maker = <> <a href={`https://bscscan.com/address/${e.to}`} target='_blank' className='table-list-link'>{e.to}</a></>
          obj.other = <> <a href={`https://bscscan.com/tx/${e.transaction.id}`} target='_blank'><img src='/images/bsc-scan.svg' width='20' className='table-list-image' /></a></>
        }

        show.push(obj);

      });

    } 
    else if(type_defi[2] == 'pancakeswap'){
      trxs.data.map((e, i, a) => {
        console.log(e.side);
        let obj = {};
        obj.date = <Moment format="YYYY/MM/DD h:m:s">{e.block.timestamp.time}</Moment>
        obj.type = <>{(e.side == 'BUY') ? <span style={{ color: '#c4183c' }}>Sell</span> : <span style={{ color: '#17c671' }}>Buy</span>}</>
        
        obj.price_usd = <> {(e.side == 'BUY') ? <span style={{ color: '#ffafaf' }}>$<NumberFormat value={e.sellAmountInUsd} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#adffd7' }}>$<NumberFormat value={e.buyAmountInUsd} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
        obj.amount = <> {(e.side == 'BUY') ? <span style={{ color: '#ffafaf' }}><NumberFormat value={e.buyAmount} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#adffd7' }}><NumberFormat value={e.sellAmount} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
        obj.total_eth = <> {(e.side == 'SELL') ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.buyAmount} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.sellAmount} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
        obj.maker = <> <a href={`https://bscscan.com/address/${e.transaction.txFrom.address}`} target='_blank' className='table-list-link'>{e.transaction.txFrom.address}</a></>
        obj.other = <> <a href={`https://bscscan.com/tx/${e.transaction.hash}`} target='_blank'><img src='/images/bsc-scan.svg' width='20' className='table-list-image' /></a></>

        console.log(e);
        show.push(obj);
      })
    }
    else {
      trxs.data.swaps.map((e, i, a) => {

        let date = new Date(e.timestamp * 1000);
        let obj = {};

        if (reverse == 1) {
          obj.date = <Moment format="YYYY/MM/DD h:m:s">{date}</Moment>
          obj.type = <>{(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#17c671' }}>Buy</span> : <span style={{ color: '#c4183c' }}>Sell</span>}</>
          obj.price_usd = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#adffd7' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.amount = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount0Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          //obj.price_bnb =   <> {(e.amount1In > 0.0) ? <span style={{color:'#adffd7'}}><NumberFormat value={e.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1In/e.amount0In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.total_eth = <> {(parseFloat(e.amount1In) > 0.0) ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount0Out * e.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount0In * e.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.maker = <> <a href={`https://bscscan.com/address/${e.to}`} target='_blank' className='table-list-link'>{e.to}</a></>
          obj.other = <> <a href={`https://bscscan.com/tx/${e.transaction.id}`} target='_blank'><img src='/images/bsc-scan.svg' width='20' className='table-list-image' /></a></>
        } else {
          obj.date = <Moment format="YYYY/MM/DD h:m:s">{date}</Moment>
          obj.type = <>{(parseFloat(e.amount0In) == 0.0) ? <span style={{ color: '#c4183c' }}>Sell</span> : <span style={{ color: '#17c671' }}>Buy</span>}</>
          obj.price_usd = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{ color: '#ffafaf' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#adffd7' }}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.amount = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount1In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount1Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>

          obj.total_eth = <> {(parseFloat(e.amount0In) > 0.0) ? <span style={{ color: '#adffd7' }}><NumberFormat value={e.amount0In * e.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{ color: '#ffafaf' }}><NumberFormat value={e.amount0Out * e.token0.derivedBNB} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>

          obj.maker = <> <a href={`https://bscscan.com/address/${e.to}`} target='_blank' className='table-list-link'>{e.to}</a></>
          obj.other = <> <a href={`https://bscscan.com/tx/${e.transaction.id}`} target='_blank'><img src='/images/bsc-scan.svg' width='20' className='table-list-image' /></a></>
        }

        show.push(obj);

      });
    }

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
