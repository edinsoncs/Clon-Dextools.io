import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import { getAddress } from '@ethersproject/address'

const axios = require('axios');

const APIURL = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2'
const APIURLV3 = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const APIURL_SUSHISWAP = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
const APIURL_PANCAKESWAP = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'
const APIURL_SHIBASWAP = 'https://api.thegraph.com/subgraphs/name/shibaswaparmy/exchange'
const APIURL_SUNI = 'https://api.thegraph.com/subgraphs/name/edinsoncs/suniexchange'



//BSC
const APIURL_BIGSWAP = 'https://api.thegraph.com/subgraphs/name/biswapcom/exchange5'
const APIURL_AMPLE = 'https://api.thegraph.com/subgraphs/name/shrinivasmani/pknew2'
const APIURL_APESWAP = 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph'
const APIURL_BABYSWAP = 'https://api.thegraph.com/subgraphs/name/babyswapgraph/exchange3'


//POLYGON
const APIURL_QUICKSWAP = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03'
const APIURL_KYBERSWAP_POLY = 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dmm-exchange-matic'

const candles = {

  FindSwap: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  },

  FindSwapV3: function (id) {


    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pool: "${id}" }) {
           id
           pool {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0
           amount1
           amountUSD
           recipient
           timestamp
           sender
           origin
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURLV3,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  },

  FindSwapSushi: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_SUSHISWAP,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {


      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });
      //console.log('edinson1');


    }, [rows]);

    return rows;

  },

  FindSwapShiba: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_SHIBASWAP,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  },

  FindSwapSuni: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_SUNI,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  },

  FindSwapPancake: function (id) {

    const [rows, setRows] = React.useState([]);
    let api_get_hastag = 'https://api.ryoshi.pro/trades/bsc/' + id + '/transactions';

    React.useEffect(async () => {

      setInterval(function metadexTransactions() {
        axios.get(api_get_hastag).then((response) => {
          setRows(response.data);
        });
        return metadexTransactions;
      }(), 30000);

    }, []);

    return rows;

  },

  FindSwapBig: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 500, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           token0 {
            derivedBNB
            derivedUSD
           }
           token1 {
              derivedBNB
              derivedUSD
           }
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_BIGSWAP,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);


    return rows;

  },

  FindSwapApe: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 500, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
             }
             token1 {
               symbol
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           pair{
             token0 {
              derivedETH
             }
             token1 {
                derivedETH
             }
           }
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_APESWAP,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);


    return rows;

  },

  FindSwapBaby: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 100, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
               derivedBNB
             }
             token1 {
               symbol
               derivedBNB
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_BABYSWAP,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  },

  FindSwapQuick: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pair: "${id}" }) {
           id
           pair {
             token0 {
               symbol
               derivedETH
             }
             token1 {
               symbol
               derivedETH
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           sender
           from
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_QUICKSWAP,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  },

  FindSwapKyberPoly: function (id) {

    const [rows, setRows] = React.useState([]);

    const tokensQuery = `
    {
        swaps(first: 600, orderBy: timestamp, orderDirection: desc, where:
        { pool: "${id}" }) {
           id
           pair {
             token0 {
               symbol
               derivedETH
             }
             token1 {
               symbol
               derivedETH
             }
           }
           amount0In
           amount0Out
           amount1In
           amount1Out
           amountUSD
           to
           sender
           from
           timestamp
           transaction {
             id
           }
        }
    }

    `

    const client = new ApolloClient({
      uri: APIURL_KYBERSWAP_POLY,
      cache: new InMemoryCache(),
    })

    React.useEffect(async () => {

      client
        .query({
          query: gql(tokensQuery),
        })
        .then(data => setRows(data))
        .catch((err) => {
          console.log('Error fetching data: ', err)
        });

    }, [rows]);

    return rows;

  }

}

export default candles;
