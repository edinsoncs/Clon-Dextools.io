import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import NumberFormat from 'react-number-format';
import Loaderlist from '../Utils/loaderlist';
const APIURL = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2'

var minutesConfig = new Date( Date.now() - 1000000 * 60 );
const backTime = parseInt(minutesConfig.getTime() / 1000).toFixed(0);
//console.log(backTime);


const tokensQuery = `
  query {
    pairs(where: {createdAtTimestamp_gt: ${backTime}, reserveUSD_gt: "100"}, first: 15,  orderBy: createdAtTimestamp, orderDirection: desc) {
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


function Uniswap(obj) {
  const [data, setData] = useState([]);

  var viewPools;


  if(obj.view){
      viewPools = <> <a href='/pools-list/uniswap' className='see-more'> See More  </a> </>
  }

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



      return (
        <>
                    <div className="board-col col2">
                        <div className="board-block hot-pairs">
                            <div className="col-title">
                                <span className="icon icon-home-uniswap">
                                  <img src="images/uniswap.png" alt="" />
                                </span> UNISWAP
                                <strong>NEW PAIRS</strong>
                                {viewPools}
                            </div>
                            <div className="col-content">

                            {data.map(function(object, i){
                                return <div className="pair-item">
                                    <a className="left" href={`/ether/uniswap/pair-explorer/${object.id}`}>
                                        <div className="pair-logo">
                                            #{i + 1}
                                        </div>
                                          <div className="pair-name">
                                            <div>
                                              {object.token0.symbol} - {object.token1.symbol}
                                              <span class="version">v2</span>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="right">
                                      <NumberFormat value={object.reserveUSD} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /> <small className='total_home_lp'>Total liquidity</small>
                                      </div>
                                </div>
                            })}

                            </div>
                        </div>
                    </div>
        </>
      )

}

export default Uniswap;
