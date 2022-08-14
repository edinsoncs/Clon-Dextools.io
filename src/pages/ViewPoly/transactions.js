import { useParams } from "react-router-dom"
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import Candles from '../../apollo/candles';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from "react";
import Moment from 'react-moment';


const name_token = localStorage.getItem('token');
var incrementRows = 1;
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
    /*{
        name: 'Price BNB',
        selector: row => row.price_bnb,
    },*/
    {
        name: 'Amount Token '+ name_token,
        selector: row => row.amount,
    },
    {
        name: 'Total ETH',
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
          backgroundColor: '#121317',
          color: 'white'
      },
    }
};

function Transactions() {

  var type_defi = window.location.pathname.split('/');

  var name_token = document.getElementById('tokenName');
  if(name_token){
    name_token = name_token.value.split(',');
  } else {
    name_token = '';
  }


  const { id } = useParams()
  var trxs

  if(type_defi[2] == 'quickswap') {
    trxs = Candles.FindSwapQuick(id);
  }

  if(type_defi[2] == 'kyberswap') {
    trxs = Candles.FindSwapKyberPoly(id);
  }

  var show = [];

  var reverse = localStorage.getItem('reverse');

  if (!trxs.data) return '.'

  if(trxs.data) {
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
           obj.maker = <> <a href={`https://polygonscan.com/address/${e.from}`} target='_blank' className='table-list-link'>{e.to}</a></>
           obj.other = <> <a  href={`https://polygonscan.com/tx/${e.transaction.id}`} target='_blank'><img src='/images/polygonscan.svg' width='20' className='table-list-image' /></a></>
       } else {
          obj.date = <Moment format="YYYY/MM/DD">{date}</Moment>
          obj.type = <>{(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#c4183c'}}>Sell</span> : <span style={{color:'#17c671'}}>Buy</span>}</>
          obj.price_usd = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#ffafaf'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#adffd7'}}>$<NumberFormat value={e.amountUSD} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.amount = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#ffafaf'}}><NumberFormat value={e.amount1In} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#adffd7'}}><NumberFormat value={e.amount1Out} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.total_eth = <> {(parseFloat(e.amount0In) == 0.0) ? <span style={{color:'#ffafaf'}}><NumberFormat value={e.amountUSD / global.price_eth} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span> : <span style={{color:'#adffd7'}}><NumberFormat value={e.amountUSD / global.price_eth} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={8} /></span>}</>
          obj.maker = <> <a href={`https://polygonscan.com/address/${e.to}`} target='_blank' className='table-list-link'>{e.from}</a></>
          obj.other = <> <a  href={`https://polygonscan.com/tx/${e.transaction.id}`} target='_blank'><img src='/images/polygonscan.svg' width='20' className='table-list-image' /></a></>
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
