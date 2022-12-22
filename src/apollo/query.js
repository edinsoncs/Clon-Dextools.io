import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import { getAddress } from '@ethersproject/address'

const APIURL_UNISWAP = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2'
const APIURL_UNISWAPV3 = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const APIURL_SUSHISWAP = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
const APIURL_SHIBASWAP = 'https://api.thegraph.com/subgraphs/name/shibaswaparmy/exchange'
const APIURL_SUNI = 'https://api.thegraph.com/subgraphs/name/edinsoncs/suniexchange'
//const APIURL_AMPLE = 'https://api.thegraph.com/subgraphs/name/shrinivasmani/pknew2'

//BSC
const APIURL_PANCAKESWAP = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
const APIURL_BIGSWAP = 'https://api.thegraph.com/subgraphs/name/biswapcom/exchange5'
const APIURL_APESWAP = 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph'
const APIURL_BABYSWAP = 'https://api.thegraph.com/subgraphs/name/babyswapgraph/exchange3'

//POLYGON
const APIURL_QUICKSWAP = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03'
const APIURL_KYBERSWAP_POLY = 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dmm-exchange-matic'

const axios = require('axios');

const query = {

  FindPair: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
          volumeUSD
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_UNISWAP,
      cache: new InMemoryCache(),
    })

    useEffect(async () => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairV3: function (id) {

    const tokensQuery = `
      query {
        pool(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
            totalValueLocked
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
            totalValueLocked
          }
          totalValueLockedUSD
          volumeToken0
          volumeToken1
          volumeUSD

        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_UNISWAPV3,
      cache: new InMemoryCache(),
    })

    useEffect(async () => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pool))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairSushi: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_SUSHISWAP,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairShiba: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_SHIBASWAP,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairSuni: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_SUNI,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairPancakeswap: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          totalTransactions
          token0{
            id
            name
            symbol
            totalTransactions
            derivedBNB
          }
          token1{
            id
            name
            symbol
            totalTransactions
            derivedBNB
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_PANCAKESWAP,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindApiPancakeswap: function (id) {

    const [rows, setRows] = React.useState([]);
    let api_get_hastag = 'https://api.ryoshi.pro/information/bsc/' + id + '/pool';

    React.useEffect(async () => {

      setInterval(function metadexInformation() {
        axios.get(api_get_hastag).then((response) => {
          setRows(response.data);
        });
        return metadexInformation;
      }(), 35000);



    }, []);

    return rows;

  },

  FindPairBigswap: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          totalTransactions
          token0{
            id
            name
            symbol
            totalTransactions
            derivedBNB
          }
          token1{
            id
            name
            symbol
            totalTransactions
            derivedBNB
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_BIGSWAP,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairApeswap: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_APESWAP,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairBabyswap: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          totalTransactions
          token0{
            id
            name
            symbol
            totalTransactions
            derivedBNB
          }
          token1{
            id
            name
            symbol
            totalTransactions
            derivedBNB
          }
          reserveUSD
          reserve0
          reserve1
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_BABYSWAP,
      cache: new InMemoryCache(),
    })

    useEffect(() => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairQuickswap: function (id) {

    const tokensQuery = `
      query {
        pair(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
          volumeUSD
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_QUICKSWAP,
      cache: new InMemoryCache(),
    })

    useEffect(async () => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pair))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },

  FindPairKyberPoly: function (id) {

    const tokensQuery = `
      query {
        pool(id: "${id}") {
          id
          txCount
          token0{
            id
            name
            symbol
            txCount
            derivedETH
          }
          token1{
            id
            name
            symbol
            txCount
            derivedETH
          }
          reserveUSD
          reserve0
          reserve1
          volumeUSD
        }
      }
    `
    const [data, setData] = useState([]);

    var client = new ApolloClient({
      uri: APIURL_KYBERSWAP_POLY,
      cache: new InMemoryCache(),
    })

    useEffect(async () => {
      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setData(data.data.pool))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
    }, []);

    return data;

  },


}

export default query;
