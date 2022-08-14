import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import { getAddress } from '@ethersproject/address'

const APIURL_UNISWAP = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2'
const APIURLV3 = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const APIURL_SUSHISWAP = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
const APIURL_SHIBASWAP = 'https://api.thegraph.com/subgraphs/name/shibaswaparmy/exchange'
const APIURL_PANCAKESWAP = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
const APIURL_SUNI = 'https://api.thegraph.com/subgraphs/name/edinsoncs/suniexchange'


// NETWORK BSC
const APIURL_AMPLE = 'https://api.thegraph.com/subgraphs/name/shrinivasmani/pknew2'
const APIURL_BIGSWAP = 'https://api.thegraph.com/subgraphs/name/biswapcom/exchange5'
const APIURL_APESWAP = 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph'
const APIURL_BABYSWAP = 'https://api.thegraph.com/subgraphs/name/babyswapgraph/exchange3'


// NETWORK POLYGON
const APIURL_QUICKSWAP = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06'
const APIURL_KYBERSWAP_POLY = 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dmm-exchange-matic'

var ts = Math.round(new Date().getTime() / 1000);
var tsYesterday = ts - (24 * 3600);


const daily = {

  UniPair: function(id){
    const tokensQuery = `
      query {
        pairDayDatas(where: {pairAddress: "${id}", date_gt: ${tsYesterday}}) {
            id
            dailyVolumeUSD
            dailyVolumeToken0
            dailyVolumeToken1
            date
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
            dailyTxns
          }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_UNISWAP,
        cache: new InMemoryCache(),
    })

    useEffect(async () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  UniPair3: function(id){
    const tokensQuery = `
      query {
        poolDayDatas(where: {pool: "${id}", date_gt: ${tsYesterday}}) {
            id
            volumeUSD
            volumeToken0
            volumeToken1
            date
            pool{
              token0 {
                id
                name
              }
              token1 {
                id
                name
              }
            }
            txCount
          }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURLV3,
        cache: new InMemoryCache(),
    })

    useEffect(async () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.poolDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  SushiPair: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pair: "${id}", date_gt: ${tsYesterday}}) {
            id
            volumeUSD
            volumeToken0
            volumeToken1
            date
            txCount
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
          }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_SUSHISWAP,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);
     return data;

  },

  ShibaPair: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pair: "${id}", date_gt: ${tsYesterday}}) {
            id
            volumeUSD
            volumeToken0
            volumeToken1
            date
            txCount
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
          }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_SHIBASWAP,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);


     return data;

  },

  SuniPair: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pair: "${id}", date_gt: ${tsYesterday}}) {
            id
            volumeUSD
            volumeToken0
            volumeToken1
            date
            txCount
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_SUNI,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  Biswap: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pairAddress: "${id}", date_gt: ${tsYesterday}}) {
          id
          dailyVolumeUSD
          dailyVolumeToken0
          dailyVolumeToken1
          date
          dailyTxns
          token0 {
            id
            name
          }
          token1 {
            id
            name
          }
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_BIGSWAP,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  Pancakeswap: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pairAddress: "${id}", date_gt: ${tsYesterday}}) {
          id
          dailyVolumeUSD
          dailyVolumeToken0
          dailyVolumeToken1
          date
          dailyTxns
          token0 {
            id
            name
          }
          token1 {
            id
            name
          }
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_PANCAKESWAP,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;


  },

  Apeswap: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pairAddress: "${id}", date_gt: ${tsYesterday}}) {
          id
          dailyVolumeUSD
          dailyVolumeToken0
          dailyVolumeToken1
          date
          dailyTxns
          token0 {
            id
            name
          }
          token1 {
            id
            name
          }
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_APESWAP,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  Babyswap: function(id){

    const tokensQuery = `
      query {
        pairDayDatas(where: {pairAddress: "${id}", date_gt: ${tsYesterday}}) {
          id
          dailyVolumeUSD
          dailyVolumeToken0
          dailyVolumeToken1
          date
          dailyTxns
          token0 {
            id
            name
          }
          token1 {
            id
            name
          }
        }
      }
    `

    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_BABYSWAP,
        cache: new InMemoryCache(),
    })

    useEffect( () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  Quickswap: function(id){
    const tokensQuery = `
      query {
        pairDayDatas(where: {pairAddress: "${id}", date_gt: ${tsYesterday}}) {
            id
            dailyVolumeUSD
            dailyVolumeToken0
            dailyVolumeToken1
            date
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
            dailyTxns
          }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_QUICKSWAP,
        cache: new InMemoryCache(),
    })

    useEffect(async () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pairDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  KyberPoly: function(id){
    const tokensQuery = `
      query {
        poolDayDatas(where: {poolAddress: "${id}", date_gt: ${tsYesterday}}) {
            id
            dailyVolumeUSD
            dailyVolumeToken0
            dailyVolumeToken1
            date
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
            dailyTxns
          }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
        uri:  APIURL_KYBERSWAP_POLY,
        cache: new InMemoryCache(),
    })

    useEffect(async () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.poolDayDatas))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     console.log(tsYesterday);

     return data;

  }

}

export default daily;
