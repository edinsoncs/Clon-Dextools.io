import { useParams } from "react-router-dom"
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from "react";
import { getAddress } from '@ethersproject/address'
import DataTableExtensions from 'react-data-table-component-extensions';
import Moment from 'moment';

import { AiOutlineSecurityScan } from "react-icons/ai";

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
        name: 'Defi',
        selector: row => row.defi,
    },
    {
        name: 'Actions',
        selector: row => row.actions,
    }
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

function Listfav() {

  const show = JSON.parse(localStorage.getItem('likes'));
  const likes = [];
  show.map((e,i,a) => {
      let obj = {};
      obj.date = Moment(e.date).format('Y-M-D hh:mm:ss');
      obj.name = <><a className='favoriteContinue__List' href={`/ether/${e.defi}/pair-explorer/${e.pair}`}> {e.name} </a></>;
      obj.pair = <> <a className='favoriteContinue__List' href={`/ether/${e.defi}/pair-explorer/${e.pair}`}> {e.pair} </a></>;
      obj.defi = <> <img src={`/images/${e.defi}.png`} width={20} title={e.defi} className='imageDefiFavorite' /> </>
      obj.actions = <> <a className='favoriteContinue' href={`/ether/${e.defi}/pair-explorer/${e.pair}`}><AiOutlineSecurityScan/> </a></>
      likes.push(obj);
  });

  return (
    <>
              <div className="transaction-list">

                    <DataTable
                     title={`My favorite tokens from all exchanges`}
                     className="table-striped-rows"
                     columns={columns}
                     paginationServer={true}
                     data={likes}
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


export default Listfav;
