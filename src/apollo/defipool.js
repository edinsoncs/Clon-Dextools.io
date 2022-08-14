import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import Loaderlist from '../Utils/loaderlist';
const APIURL_UNISWAP = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2'
const APIURL_UNISWAPV3 = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const APIURL_SUSHISWAP = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
const APIURL_SHIBASWAP = 'https://api.thegraph.com/subgraphs/name/shibaswaparmy/exchange'
const APIURL_SUNI = 'https://api.thegraph.com/subgraphs/name/edinsoncs/suniexchange'


//NETWORK BSC
const APIURL_BISWAP = 'https://api.thegraph.com/subgraphs/name/biswapcom/exchange5'
const APIURL_APESWAP = 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph'
const APIURL_BABYSWAP = 'https://api.thegraph.com/subgraphs/name/babyswapgraph/exchange3'

//POLYGON
const APIURL_QUICKSWAP = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03'

var minutesConfig = new Date( Date.now() - 1000000000 * 60 );
const backTime = parseInt(minutesConfig.getTime() / 1000).toFixed(0);
//console.log(backTime);

const DefiPool = {

  UniSwap: function(){

    const tokensQuery = `
      query {
        pairs(where: {createdAtTimestamp_gt: ${backTime}, reserveUSD_gt: "100"}, first: 900,  orderBy: createdAtTimestamp, orderDirection: desc) {
          id
          createdAtTimestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          reserveUSD
          txCount

        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_UNISWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

  UniSwapv3: function(){

    const tokensQuery = `
      query {
        pools(where: {createdAtTimestamp_gt: ${backTime}, totalValueLockedUSD_gte: "100"}, first: 900,  orderBy: createdAtTimestamp, orderDirection: desc) {
          id
          createdAtTimestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          totalValueLockedUSD
          txCount

        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_UNISWAPV3,
        cache: new InMemoryCache(),
    })

    const [data, setData] = useState([]);

    useEffect(async () => {
        client
           .query({
             query: gql(tokensQuery),
           })
           .then(data => setData(data.data.pools))
           .catch((err) => {
             console.log('Error fetching data: ', err)
        });
     }, []);

     return data;

  },

  SushiSwap: function(){

    const tokensQuery = `
      query {
        pairs(where: {timestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 900,  orderBy: timestamp, orderDirection: desc) {
          id
          timestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          reserveUSD
          txCount

        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_SUSHISWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },


  ShibaSwap: function(){

    const tokensQuery = `
      query {
        pairs(where: {timestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 900,  orderBy: timestamp, orderDirection: desc) {
          id
          timestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          reserveUSD
          txCount
        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_SHIBASWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

  SuniExchange: function(){

    const tokensQuery = `
      query {
        pairs(where: {timestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 900,  orderBy: timestamp, orderDirection: desc) {
          id
          timestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          reserveUSD
          txCount

        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_SUNI,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

  Biswap: function(){

    const tokensQuery = `
      query {
        pairs(where: {timestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 850,  orderBy: timestamp, orderDirection: desc) {
          id
          timestamp
          token0 {
            id
            name
            symbol
            derivedBNB
          }
          token1 {
            id
            name
            symbol
            derivedBNB
          }
          reserveUSD
          totalTransactions
        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_BISWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

  Apeswap: function(){

    const tokensQuery = `
      query {
        pairs(where: {createdAtTimestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 850,  orderBy: createdAtTimestamp, orderDirection: desc) {
          id
          createdAtTimestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          reserveUSD
          txCount
        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_APESWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

  Babyswap: function(){

    const tokensQuery = `
      query {
        pairs(where: {timestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 850,  orderBy: timestamp, orderDirection: desc) {
          id
          timestamp
          token0 {
            id
            name
            symbol
            derivedBNB
          }
          token1 {
            id
            name
            symbol
            derivedBNB
          }
          reserveUSD
          totalTransactions
        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_BABYSWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

  Quickswap: function(){

    const tokensQuery = `
      query {
        pairs(where: {createdAtTimestamp_gt: ${backTime}, reserveUSD_gt: "100"}, first: 900,  orderBy: createdAtTimestamp, orderDirection: desc) {
          id
          createdAtTimestamp
          token0 {
            id
            name
            symbol
            derivedETH
          }
          token1 {
            id
            name
            symbol
            derivedETH
          }
          reserveUSD
          txCount

        }
      }
    `

    const client = new ApolloClient({
        uri: APIURL_QUICKSWAP,
        cache: new InMemoryCache(),
    })


      const [data, setData] = useState([]);

      useEffect(async () => {
          client
             .query({
               query: gql(tokensQuery),
             })
             .then(data => setData(data.data.pairs))
             .catch((err) => {
               console.log('Error fetching data: ', err)
          });
       }, []);

       return data;
  },

}




export default DefiPool;
