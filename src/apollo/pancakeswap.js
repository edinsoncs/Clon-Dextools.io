import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import { getAddress } from '@ethersproject/address'
const APIURL = 'https://api.thegraph.com/subgraphs/name/pancakeswap/pairs'



var minutesConfig = new Date( Date.now() - 1000000000 * 60 );
const backTime = parseInt(minutesConfig.getTime() / 1000).toFixed(0);
console.log(backTime);
const isAddress = (value: any) => {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

const tokensQuery = `
  query {
    pairs(where: {timestamp_gte: ${backTime}}, first: 10,  orderBy: timestamp, orderDirection: desc) {
      id
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }

    }
  }
`

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


function Ampleswap() {

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

   console.log(data);

      return (
        <>
                    <div className="board-col col2 pancakeswap ample">
                        <div className="board-block hot-pairs">
                            <div className="col-title"><span className="icon icon-home-pancakeswap"><img src="/images/pancakeswap.png" alt="" /></span> PANCAKESWAP <strong>NEW PAIRS</strong><img className="line" src="/images/line.svg" /></div>
                            <div className="col-content">

                            {data.map(function(object, i){
                                return <div className="pair-item">
                                    <a className="left" href={`/bsc/pancakeswap/pair-explorer/${object.id}`}>
                                        <div className="pair-logo">
                                            #{i + 1}
                                        </div>
                                        <div className="pair-name"><div>{object.token0.symbol} - {object.token1.symbol} <span class="version">v2</span> </div></div>
                                    </a>
                                    
                                </div>
                            })}

                            </div>
                        </div>
                    </div>
        </>
      )

}

export default Ampleswap;
