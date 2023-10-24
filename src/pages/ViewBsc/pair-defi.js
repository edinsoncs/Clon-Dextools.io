import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useSWR from 'swr'
import ReactTooltip from 'react-tooltip';
import Query from '../../apollo/query';
import Daily from '../../apollo/daily';
import token from '../../modules/getToken';
import GetInfo from '../../modules/GetInfo';
import NumberFormat from 'react-number-format';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { FcShare, FcLike } from "react-icons/fc";
import Modal from 'react-modal';
import { ShareSocial } from 'react-share-social'
import LikeComponent from '../Component/LikeComponent';
import InformationComponent from './Component/InformationComponent';
import HoldersComponent from './Component/HoldersComponent';
import DailyVolume from './Mod/dailyvolume';
import VotesComponent from './Component/VotesComponent';
import { useWeb3React } from '@web3-react/core';
import { Helmet } from "react-helmet";
import { TVChartContainer } from '../Component/TVChartContainer/index';
import Transactions from './transactions';
import SocialMedia from '../Static/socialmedia'
import TemplateLoading from '../Static/templateloading'

import { getAddress } from '@ethersproject/address'

const isAddress = (value: any) => {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}



const checkChars = (str) => {
    var max = 15
    return str.length > max ? str.substring(0, max) + '...' : str
}

function titleCase(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const get_url = window.location.href;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#121317'
    },
};

const style = {
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '0 30px',
};

function hot(pair, defi, name, network) {
    fetch("https://api.dexi.tools/hot", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pair: pair,
            defi: defi,
            name: name,
            network: network
        })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } {
                throw new Error("Post Failed")
            }
        }).then(function (data) {
            if (data.status) {
                this.setState({ votes: data })
            }
        })
        .catch(function (error) {
            console.log("Request failed", error);
        });



}

function Pairdefi() {

    var type_defi = window.location.pathname.split('/');

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const { exchange = 'pancakeswap', id } = useParams()
    const { account } = useWeb3React();

    let arr = JSON.parse(localStorage.getItem('likes')) || [];
    let arr_token = [];

    //Transacciones totales variable
    let txsTotal, daily;

    if (type_defi[2] == 'pancakeswap') {
        var query = Query.FindApiPancakeswap(id);
        daily = [];
        txsTotal = [];
    }

    //Obtenemos el volumen diario de cualquier token en distintos DEFI
    let volumeDaily = DailyVolume(exchange, daily);
    let volDay0 = daily.length ? daily[0].dailyVolumeUSD : 0;

    //if (true) return <TemplateLoading/>
    if (!query.status) return <TemplateLoading />

    const token_single = token(query);
    let line_name_format = '';
    let line_name_token = '';
    let line_smybol_token = '';
    let line_smybol_token_b = '';
    let tokensAB = [];
    var price_token;
    var totaltx = 0;
    var pool_a = 0;
    var pool_b = 0;
    var daily_txs = 0;
    var daily_vol = 0;


    if (token_single == isAddress(query.data[0].quoteCurrency.address)) {
        line_name_format = <><b className='symbol-pair'>{query.data[0].quoteCurrency.symbol}</b> /  {query.data[0].baseCurrency.symbol}</>;
        line_name_token = query.data[0].quoteCurrency.name;
        line_smybol_token = query.data[0].quoteCurrency.symbol;
        line_smybol_token_b = query.data[0].baseCurrency.symbol;
        price_token = Number(query.data[0].quotePrice);
        tokensAB = [query.data[0].quoteCurrency.address, query.data[0].baseCurrency.address]
        localStorage.setItem('reverse', 1)
    }

    if (token_single == isAddress(query.data[0].baseCurrency.address)) {
        line_name_format = <><b className='symbol-pair'>{query.data[0].baseCurrency.symbol}</b> /  {query.data[0].quoteCurrency.symbol}</>;
        line_name_token = query.data[0].baseCurrency.name;
        line_smybol_token = query.data[0].baseCurrency.symbol;
        line_smybol_token_b = query.data[0].quoteCurrency.symbol;
        price_token = Number(query.data[0].quotePrice);//Number(query.data[0].quotePrice) * Number(global.price_bnb);
        tokensAB = [query.data[0].baseCurrency.address, query.data[0].quoteCurrency.address]
        localStorage.setItem('reverse', 0)
    }


    var balances = query.pool[0].balances;
    //console.log(balances);
    if (balances) {
        balances.map((e, i, a) => {
            if (e.currency.symbol == line_smybol_token) {
                pool_a = [e.currency.symbol, e.value];
            }

            if (e.currency.symbol == line_smybol_token_b) {
                pool_b = [e.currency.symbol, e.value];
            }
        });
    }
    //if(pool_b[0] == 'BUSD'){
    //price_token = Number(query.data[0].quotePrice);
    //}


    var total_reserves_usd = (pool_b[0] == 'BUSD') ? (Number(pool_b[1]) * 2) : (pool_b[1] * global.price_bnb) * 2;
    if (query.smart) {
        totaltx = query.smart[0].count;
    }

    if (query.info) {
        daily_txs = query.info[0].count;
        daily_vol = query.info[0].tradeAmount;
    }




    const sendHot = hot(id, exchange, line_smybol_token, type_defi[1]);

    var onCopy = () => {
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }


    var title = line_smybol_token + ' $' + price_token;
    var desMeta = 'Real-time price, charts, daily trades, 24-hour volumes and crypto analysis of ' + title + ' ' + ' Pair Explorer - METADex';

    return (
        <>

            <Helmet>
                <title>{title} - Pair Explorer - METADex</title>
                <meta name="description" content={`${desMeta}`} />
            </Helmet>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Share on Social Media</h2>

                <ShareSocial
                    style={style}
                    url={get_url}
                    socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
                />

                <button onClick={closeModal} className='close-modal'>close</button>

            </Modal>

            <section className="chart">
                <div className="pair-chart">
                    <div className="pair-chart-content">
                        <div className="pair-title">

                            <GetInfo address={token_single} name={line_name_token} />

                            <div className="pair-section">
                                <div className="pair-name">
                                    <div className="text">
                                        {line_name_format}
                                        {type_defi[2] == 'pancakeswap' ?
                                            <span className='version-pancakeswap'>v2</span> :
                                            ''
                                        }
                                    </div>
                                    <div className="icons">

                                        <a href={`https://bscscan.com/token/${token_single}`} target="_blank" rel="noreferrer" data-tip={`Bscscan Contract `}>
                                            <img src="/images/bsc-scan.svg" width='20' alt="" />
                                        </a>


                                        {(() => {
                                            if (type_defi[2] == 'pancakeswap') {
                                                return (
                                                    <a href={`https://pancakeswap.finance/swap?outputCurrency=${token_single}`} target="_blank" rel="noreferrer" data-tip={`${exchange}`}>
                                                        <img src="/images/pancakeswap.png" alt="" width='20' height='20' />
                                                    </a>
                                                )
                                            }

                                        })()}

                                        <InformationComponent token={token_single} pair={id} />

                                    </div>
                                    <ReactTooltip />
                                </div>
                                <div className="pair-details">
                                    <small className='m-right-1 first-line-token'>({line_name_token}) </small>

                                    <small id="token-contract" data-token={token_single}>Token contract: {checkChars(token_single)}

                                        <CopyToClipboard onCopy={onCopy} text={token_single} className='m-left-1' id="first-click">
                                            <FaCopy data-tip={`Copy to clipboard `} />
                                        </CopyToClipboard>
                                    </small>
                                    <small className="m-left-1 m-right-1">-</small>
                                    <small className="">
                                        Pair:
                                        <CopyToClipboard onCopy={onCopy} text={id} className='m-left-1' id="second-click">
                                            <FaCopy data-tip={`Copy to clipboard `} />
                                        </CopyToClipboard>
                                    </small>
                                </div>
                            </div>


                        </div>
                        <div className="row">
                            <div className="col1">
                                <div className="col-title social-pairs-links">
                                    <a rel="noreferrer" onClick={openModal} className='social-icon-share'>
                                        <FcShare />
                                    </a>


                                    <LikeComponent symbol={line_smybol_token} data={query} />


                                    {(() => {
                                        if (type_defi[2] == 'pancakeswap') {
                                            return (
                                                <a href={`https://pancakeswap.finance/swap?inputCurrency=${token_single}`} target="_blank" rel="noreferrer" className='social-icon-trade'>
                                                    Trade
                                                </a>
                                            )
                                        }
                                    })()}



                                </div>
                                <div className="col-body pair-info">
                                    <div className="item item-price even">
                                        <span className="label">Price:</span>
                                        {(() => {
                                            if (parseInt(price_token) > 0) {
                                                return (
                                                    <span className="content price"><NumberFormat value={price_token} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></span>
                                                )
                                            } else {
                                                return (
                                                    <span className="content price"><NumberFormat value={price_token} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={10} /></span>
                                                )
                                            }
                                        })()}


                                    </div>
                                    <div className="item odd">
                                        <span className="label">Total Liquidity:</span><span className="content"><NumberFormat value={total_reserves_usd} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /></span>
                                    </div>

                                    <div className="item even">
                                        <span className="label">Daily Volume:</span><span className="content"><NumberFormat value={daily_vol} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /></span>
                                    </div>

                                    <div className="item odd">
                                        <span className="label">Daily tx:</span><span className="content"><NumberFormat value={daily_txs} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                    </div>

                                    <div className="item even">
                                        <span className="label">Total tx:</span><span className="content">{totaltx}</span>
                                    </div>

                                    <div className="item odd">
                                        <span className="label">Pooled {pool_a[0]}:</span><span className="content pooled"><NumberFormat value={pool_a[1]} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                    </div>

                                    <div className="item even">
                                        <span className="label">Pooled {pool_b[0]}:</span><span className="content pooled"><NumberFormat value={pool_b[1]} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                    </div>

                                    {/* <HoldersComponent token={token_single} data={daily} pair={query.id} /> 

                                        {(() => {
                                            if (exchange == 'pancakeswap') {
                                                return (
                                                    <>

                                                        <div className="item odd">
                                                            <span className="label">Pooled a:</span><span className="content pooled"><NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                                        </div>

                                                        <div className="item even">
                                                            <span className="label">Pooled b:</span><span className="content pooled"><NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                                        </div>

                                                    </>
                                                )
                                            } else {
                                                return (
                                                    <>
                                                        <div className="item odd">
                                                            <span className="label">Pooled {query.token0.symbol}:</span><span className="content pooled"><NumberFormat value={query.reserve0} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                                        </div>

                                                        <div className="item even">
                                                            <span className="label">Pooled {query.token1.symbol}:</span><span className="content pooled"><NumberFormat value={query.reserve1} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        })()}

                                        */}



                                </div>
                                <VotesComponent name={line_name_token} pair={id} account={account} />
                            </div>

                            <div className="col2">
                                <input type='hidden' name='tokenA' value={tokensAB} id='tokenAB' />
                                <input type='hidden' name='tokenName' value={[line_smybol_token, line_smybol_token_b]} id='tokenName' />
                                <TVChartContainer query={query} defi={exchange} pair={id} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pair-list-actions'>
                    <Transactions tokenBase={token_single} />
                    <SocialMedia />
                </div>

            </section>


        </>
    );

}

export default Pairdefi;