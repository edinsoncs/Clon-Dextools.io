import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import Loaderlist from '../Utils/loaderlist';
const APIURL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'

var minutesConfig = new Date( Date.now() - 10000000 * 60 );
const backTime = parseInt(minutesConfig.getTime() / 1000).toFixed(0);
//console.log(backTime);


const tokensQuery = `
  query {
    pools(where: {createdAtTimestamp_gt: ${backTime}, totalValueLockedUSD_gte: "100"}, first: 10,  orderBy: createdAtTimestamp, orderDirection: desc) {
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
      totalValueLockedUSD
    }
  }
`

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


function Uniswapv3(obj) {
  const [data, setData] = useState([]);

  var viewPools;


  if(obj.view){
      viewPools = <> <a href='/pools-list/uniswapv3' className='see-more'> See More  </a> </>
  }

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



      return (
        <>
                    <div className="board-col col2">
                        <div className="board-block hot-pairs">
                            <div className="col-title">
                                <span className="icon icon-home-uniswap">
                                  <img src="images/uniswap.png" alt="" />
                                </span> UNISWAP V3
                                <strong>NEW PAIRS</strong>
                                <img className="line" src="images/line.svg" />
                                {viewPools}
                            </div>
                            <div className="col-content">

                            {data.map(function(object, i){
                                return <div className="pair-item">
                                    <a className="left" href={`/ether/uniswapv3/pair-explorer/${object.id}`}>
                                        <div className="pair-logo">
                                            #{i + 1}
                                        </div>
                                          <div className="pair-name">
                                            <div>
                                              {object.token0.symbol} - {object.token1.symbol}
                                              <span class="version">v3</span>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="right">
                                      <NumberFormat value={object.totalValueLockedUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /> <small className='total_home_lp'>Total liquidity</small>
                                      </div>
                                </div>
                            })}

                            </div>
                        </div>
                    </div>
        </>
      )

}

export default Uniswapv3;
