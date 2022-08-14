import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import { getAddress } from '@ethersproject/address'
const APIURL = 'https://api.thegraph.com/subgraphs/id/QmPQfcovYgjF2vyGBE4LwXaSYj7Bgfvbny8MBpgLSBVKjB'



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
    pairs(where: {createdAtTimestamp_gte: ${backTime}, reserveUSD_gt: "100"}, first: 10,  orderBy: createdAtTimestamp, orderDirection: desc) {
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
      reserveUSD
    }
  }
`

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


function Knightswap() {

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
                            <div className="col-title"><span className="icon icon-home-pancakeswap"><img src="/images/knight.png" alt="" /></span> KNIGHTSWAP <strong>NEW PAIRS</strong><img className="line" src="/images/line.svg" /></div>
                            <div className="col-content">

                            {data.map(function(object, i){
                                return <div className="pair-item">
                                    <a className="left" href={`#`}>
                                        <div className="pair-logo">
                                            #{i + 1}
                                        </div>
                                        <div className="pair-name"><div>{object.token0.symbol} - {object.token1.symbol} <span class="version">v2</span> </div></div>
                                    </a>
                                    <div className="right"><NumberFormat value={object.reserveUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /> <small className='total_home_lp'>Total liquidity</small></div>
                                </div>
                            })}

                            </div>
                        </div>
                    </div>
        </>
      )

}

export default Knightswap;
