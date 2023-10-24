import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import React, { Component, PureComponent, useEffect, useCallback, useState  } from 'react';
import NumberFormat from 'react-number-format';
import Web3 from 'web3'
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';

const axios = require('axios');
const api_service_save = 'https://api.dexi.tools/launchpad/transaction/create';
const api_service_get = 'https://api.dexi.tools/launchpad/transaction/';


function PadsView() {
  const [input, setInput] = useState('');
  const [post, setPost] = useState(null);

  const {active, activate, account, library, error } = useWeb3React();
  const web3 = new Web3(window.ethereum);
  const poolAddress = '0x4da38DC158491decdb88e220d67FF5b00103845c';

  const time_finish = calcTimeDelta('2022-04-02T01:02:03');
  let amount_mdex = (((Number(global.price_bnb) * input).toFixed(2)) / 9).toFixed(2);

  const token_address = window.location.pathname.split('/')[2];

  React.useEffect(() => {
     axios.get(api_service_get + '0x05633822A3f6AF31EaDa04e69124d1aEF12012FB').then((response) => {
       setPost(response.data);
     });
  }, []);

  if (!post) return '...';


  const buyToken = async() => {
      if(account){

            if(input >= 0.1){
              const amountWei = web3.toWei(input, 'ether');
              web3.eth.getTransactionCount(account, (error, txCount) => {
                   if (error) {
                    alert('An error occurred, try again in a few minutes');
                   }
                   web3.eth.sendTransaction({
                     nonce: txCount,
                     from: account,
                     to: poolAddress,
                     value: amountWei,
                     gas: 21000,
                     gasPrice: web3.toWei(5, 'gwei')
                   }, (err, transactionId) => {
                     if (err) {
                       alert(err.message);
                     } else {

                       axios.post(api_service_save, {
                          address: account,
                          transaction_id: transactionId,
                          transaction_type: 'Deposit',
                          amount_mdex: amount_mdex,
                          amount_bnb: amountWei,
                          token_address: token_address
                        }).then(() => {
                          alert('Congratulations, your purchase was made, you will soon receive your tokens');
                        }).catch((err) => {
                           alert('An error occurred on the server');
                        });

                     }
                   });
              });

            } else{
              alert('Try again entering correct amounts');
            }

      } else {
        alert('Please connect your wallet and use the Binance Smart Chain Network');
      }
  }

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div>
     <span className='TimePad'>{zeroPad(days)}</span>
      <span className='TimePad'>{zeroPad(hours)}</span>
      <span className='TimePad'>{zeroPad(minutes)}</span>
      <span className='TimePad'>{zeroPad(seconds)}</span>
    </div>
  );


  return (
    <>
      <section className="board launchpad__main">
          <div className="launchpad__container">
              <div className="board-block tools-suni launchpad-view">
                  <div className="col-title"><span className="icon"></span> #1 MDEX <strong>IDO #1</strong><img className="line" src="/images/line.svg" /></div>
                  <div className="col-content">

                      <article className='launchpad_view_header'>
                            <div className='image_Launchpad'>
                                <img src='/images/logoxm.png' width={150}/>
                            </div>

                            <div className='details_Launchpad'>
                                <article className='list_Launchpad'>
                                    <h2>METADEX</h2>
                                    <div>
                                    Metadex is a DEFI 2.0 tool that allows us to track more than 50 defi exchanges,
                                    tracks transactions, charts, news in real time and allows us to have a stake performance
                                    </div>
                                </article>
                            </div>
                      </article>

                      <div class="table-container">
                         <table>
                            <tbody>

                               <tr>
                                  <td>Token Name</td>
                                  <td class="has-text-right">MetaDex</td>
                               </tr>
                               <tr>
                                  <td>Token Symbol</td>
                                  <td class="has-text-right">MDEX</td>
                               </tr>
                               <tr>
                                  <td>Token Decimals</td>
                                  <td class="has-text-right">9</td>
                               </tr>
                               <tr>
                                  <td>Token Address</td>
                                  <td class="has-text-right">
                                     <a class="mr-1" href="https://bscscan.com/address/0x05633822A3f6AF31EaDa04e69124d1aEF12012FB" target="_blank" rel="noreferrer nofollow">0x05633822A3f6AF31EaDa04e69124d1aEF12012FB</a>
                                     <p class="help is-info">(Do not send BNB to the token address!)</p>
                                  </td>
                               </tr>
                               <tr>
                                  <td>Total Supply</td>
                                  <td class="has-text-right">330,000 MDEX</td>
                               </tr>
                               <tr>
                                  <td>Tokens For Presale</td>
                                  <td class="has-text-right">40,255 MDEX</td>
                               </tr>
                               <tr>
                                  <td>Tokens For Liquidity</td>
                                  <td class="has-text-right">34,700 MDEX</td>
                               </tr>
                               <tr>
                                  <td>Presale Rate</td>
                                  <td class="has-text-right">1 BNB = { ((Number(global.price_bnb) * 1) / 9).toFixed(2)} MDEX</td>
                               </tr>
                               <tr>
                                  <td>Listing Rate</td>
                                  <td class="has-text-right">1 BNB = { ((Number(global.price_bnb) * 1) / 9).toFixed(2) - 5} MDEX</td>
                               </tr>
                               <tr>
                                  <td>Initial Market Cap (estimate)</td>
                                  <td class="has-text-right">$3,300,000</td>
                               </tr>
                               <tr>
                                  <td>Soft Cap</td>
                                  <td class="has-text-right">800 BNB</td>
                               </tr>
                               <tr>
                                  <td>Hard Cap</td>
                                  <td class="has-text-right">1000 BNB</td>
                               </tr>
                               <tr>
                                  <td>Unsold Tokens</td>
                                  <td class="has-text-right">Refund</td>
                               </tr>
                               <tr>
                                  <td>Presale Start Time</td>
                                  <td class="has-text-right">2022.02.02 00:00 (UTC)</td>
                               </tr>
                               <tr>
                                  <td>Presale End Time</td>
                                  <td class="has-text-right">2022.04.01 00:00 (UTC)</td>
                               </tr>
                               <tr>
                                  <td>Listing On</td>
                                  <td class="has-text-right"><a class="mr-1" href="https://pancakeswap.finance/swap?outputCurrency=0x05633822A3f6AF31EaDa04e69124d1aEF12012FB" target="_blank" rel="noreferrer nofollow">Pancakeswap</a></td>
                               </tr>
                               <tr>
                                  <td>Liquidity Percent</td>
                                  <td class="has-text-right">75%</td>
                               </tr>
                               <tr>
                                  <td>Liquidity Lockup Time</td>
                                  <td class="has-text-right">45 days after pool ends</td>
                               </tr>
                            </tbody>
                         </table>
                      </div>




                  </div>
              </div>
              <div className="board-block tools-suni launchpad-buy">

                <div className="col-title"><span className="icon"></span> BUY <strong>MDEX</strong><img className="line" src="/images/line.svg" /></div>
                <div className="col-content">


                <div className='details__Launchpad__Time'>
                  <strong className='title'>Presale Ends In</strong>
                  <Countdown
                    date={Date.now() + 5500000000}
                    renderer={renderer}
                    zeroPadTime={2}
                  />
                </div>

                <div className='details__Lacunhpad__Progress'>
                  <progress id="file" value="1" max="100"> 1% </progress>
                </div>

                  <article className='buy-widget'>
                      <div className='buy-input'>
                        <label>Amount to buy</label>
                        <input type='number' className='input' placeholder='Insert Number' onInput={e => setInput(e.target.value)} step="0.01"  />
                        <img src='/images/default-token.png' width={40 }/>
                      </div>

                      <div className='buy-input'>
                        <label>Amount to receive</label>
                        <input type='number' className='input' placeholder='Insert Number MDEX' value={amount_mdex} disabled/>
                      <img src='/images/logoxm.png' width={40}/>
                      </div>

                      <div className='buy-input'>
                        <button className='buy-metamask' onClick={buyToken}>
                          <img src='/images/metamask.svg' width={20} />
                          BUY $MDEX
                        </button>
                      </div>

                      {(() => {
                        if (!account) {
                          return (
                            <div className='alert-container'>
                              <span>Connect your wallet to make the purchase of the IDO</span>
                            </div>
                          )
                        }
                      })()}



                  </article>

                  <div className='launchpad__information'>
                      <table>
                          <tbody>
                            <tr>
                               <td>Status</td>
                               <td class="has-text-right has-text-primary"><b className='active'></b>Active</td>
                            </tr>
                            <tr>
                               <td>Sale type</td>
                               <td class="has-text-right has-text-primary">Public</td>
                            </tr>
                            <tr>
                               <td>Minimum Buy</td>
                               <td class="has-text-right">0.1 BNB</td>
                            </tr>
                            <tr>
                               <td>Maximum Buy</td>
                               <td class="has-text-right">5 BNB</td>
                            </tr>
                            <tr>
                               <td>Total Contributors</td>
                               <td class="has-text-right">{ (post.status) ? (post.data.length + 1) : 0}</td>
                            </tr>
                          </tbody>
                          </table>
                  </div>

                </div>

              </div>
          </div>

      </section>


    </>
  );
}


export default PadsView;
