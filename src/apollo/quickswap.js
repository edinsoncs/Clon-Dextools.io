import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import { getAddress } from '@ethersproject/address'
const APIURL = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06'



var minutesConfig = new Date( Date.now() - 10000000 * 60 );
const backTime = parseInt(minutesConfig.getTime() / 1000).toFixed(0);

const isAddress = (value: any) => {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

const tokensQuery = `
  query {
    pairs(where: {createdAtTimestamp_gte: ${backTime}, reserveUSD_gt: "1"}, first: 10,  orderBy: createdAtTimestamp, orderDirection: desc) {
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
      trackedReserveETH
    }
  }
`

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


function Quickswap(obj) {

  const [data, setData] = useState([]);

  var viewPools;

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

   if(obj.view){
       viewPools = <> <a href='/pools-list/quickswap' className='see-more'> See More  </a> </>
   }

   //console.log('panca',data);

      return (
        <>
                    <div className="board-col col2 pancakeswap">
                        <div className="board-block hot-pairs">
                            <div className="col-title"><span className="icon icon-home-pancakeswap"><img src="/images/quick.png" alt="" /></span> QUICKSWAP <strong>NEW PAIRS</strong><img className="line" src="/images/line.svg" /> {viewPools}</div>
                            <div className="col-content">

                            {data.map(function(object, i){
                                return <div className="pair-item">
                                    <a className="left" href={`/polygon/quickswap/pair-explorer/${object.id}`}>
                                        <div className="pair-logo">
                                            #{i + 1}
                                        </div>
                                        <div className="pair-name"><div>{object.token0.symbol} - {object.token1.symbol} <span class="version">v2</span> </div></div>
                                    </a>
                                    <div className="right"><NumberFormat value={(object.trackedReserveETH > 0.00030) ? object.reserveUSD : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /> <small className='total_home_lp'>Total liquidity</small></div>
                                </div>
                            })}

                            </div>
                        </div>
                    </div>
        </>
      )

}

export default Quickswap;
