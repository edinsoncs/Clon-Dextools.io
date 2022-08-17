import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useSWR from 'swr'
import ReactTooltip from 'react-tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { FcShare, FcLike } from "react-icons/fc";
import NumberFormat from 'react-number-format';
import ContentLoader from "react-content-loader"

const LoaderIcons = (props) => (
    <ContentLoader
        speed={2}
        width={50}
        height={50}
        viewBox="0 0 50 50"
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="2" y="0" rx="30" ry="30" width="43" height="43" />
    </ContentLoader>
)

const LoaderInfoTop1 = (props) => (
    <ContentLoader
        speed={2}
        width={330}
        height={36}
        viewBox="0 0 330 20"
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="2" y="0" rx="10" ry="10" width="330" height="20" />
    </ContentLoader>
)

const LoaderInfoTop2 = (props) => (
    <ContentLoader
        speed={2}
        width={330}
        height={36}
        viewBox="0 0 330 10"
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="2" y="0" rx="10" ry="10" width="330" height="10" />
    </ContentLoader>
)

const LoaderLineInfo = (props) => (
    <ContentLoader
        speed={2}
        width={346}
        height={36}
        viewBox="0 0 346 10"
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="2" y="0" rx="10" ry="10" width="330" height="10" />
    </ContentLoader>
)

const LoaderButtonsActions = (props) => (
    <ContentLoader
        speed={2}
        width={70}
        height={37}
        viewBox="0 0 70 37"
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="2" y="0" rx="10" ry="10" width="70" height="37" />
    </ContentLoader>
)


const LoaderListingPair = (props) => (
    <ContentLoader
        height={400}
        width={250}
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
        <rect x="102" y="152" rx="3" ry="3" width="171" height="6" />
        <circle cx="44" cy="42" r="38" />
        <circle cx="44" cy="147" r="38" />
        <circle cx="44" cy="251" r="38" />
        <rect x="105" y="117" rx="3" ry="3" width="123" height="7" />
        <rect x="104" y="222" rx="3" ry="3" width="123" height="7" />
        <rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
        <rect x="104" y="257" rx="3" ry="3" width="171" height="6" />
    </ContentLoader>
)

const LoaderTable = (props) => (
    <ContentLoader
        width={1050}
        height={400}
        viewBox="0 0 1100 400"
        backgroundColor="#1f2128"
        foregroundColor="#6b6b6b"
        {...props}
    >
        <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
        <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
        <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
        <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
        <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
        <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
        <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />
        <rect x="1424" y="137" rx="10" ry="10" width="68" height="19" />
        <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
        <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
        <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
        <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
        <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
        <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
        <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />
        <circle cx="1456" cy="203" r="12" />
        <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
        <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
        <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
        <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
        <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
        <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
        <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />
        <circle cx="1456" cy="265" r="12" />
        <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
        <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
        <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
        <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
        <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
        <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
        <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />
        <circle cx="1456" cy="323" r="12" />
        <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
        <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
        <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
        <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
        <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
        <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
        <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />
        <circle cx="1456" cy="386" r="12" />
        <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
        <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
        <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
        <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
        <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />
        <rect x="1183" y="139" rx="10" ry="10" width="85" height="19" />
        <rect x="1182" y="196" rx="10" ry="10" width="85" height="19" />
        <rect x="1182" y="258" rx="10" ry="10" width="85" height="19" />
        <rect x="1182" y="316" rx="10" ry="10" width="85" height="19" />
        <rect x="1182" y="379" rx="10" ry="10" width="85" height="19" />
        <rect x="1305" y="137" rx="10" ry="10" width="85" height="19" />
        <rect x="1304" y="194" rx="10" ry="10" width="85" height="19" />
        <rect x="1304" y="256" rx="10" ry="10" width="85" height="19" />
        <rect x="1304" y="314" rx="10" ry="10" width="85" height="19" />
        <rect x="1304" y="377" rx="10" ry="10" width="85" height="19" />
        <circle cx="37" cy="97" r="11" />
        <rect x="26" y="23" rx="5" ry="5" width="153" height="30" />
        <circle cx="1316" cy="88" r="11" />
        <rect x="1337" y="94" rx="0" ry="0" width="134" height="3" />
        <circle cx="77" cy="96" r="11" />
    </ContentLoader>
)

const LoaderChartPair = (props) => (
    <ContentLoader width={250} backgroundColor="#1f2128"
    foregroundColor="#6b6b6b" height={250} viewBox="0 0 200 200" {...props}>
      <rect x="0" y="160" rx="0" ry="0" width="25" height="40" />
      <rect x="30" y="145" rx="0" ry="0" width="25" height="55" />
      <rect x="60" y="126" rx="0" ry="0" width="25" height="74" />
      <rect x="90" y="80" rx="0" ry="0" width="25" height="120" />
      <rect x="120" y="142" rx="0" ry="0" width="25" height="58" />
    </ContentLoader>
)

function TemplateLoading() {

    var onCopy = () => {
    };

    return (<>

        <section className="chart">
            <div className="pair-chart">
                <div className="pair-chart-content">
                    <div className="pair-title">

                        <LoaderIcons />

                        <div className="pair-section">
                            <div className="pair-name">
                                <LoaderInfoTop1 />
                            </div>
                            <div className="pair-details">
                                <LoaderInfoTop2 />
                            </div>
                        </div>


                    </div>
                    <div className="row">
                        <div className="col1">
                            <div className="col-title social-pairs-links">

                                <LoaderButtonsActions />

                                <LoaderButtonsActions />

                                <LoaderButtonsActions />
                            </div>
                            <div className="col-body pair-info pair-template-info">
                                <div className="item item-price even">
                                    <LoaderLineInfo />
                                </div>
                                <div className="item odd">
                                    <LoaderLineInfo />
                                </div>

                                <div className="item even">
                                    <LoaderLineInfo />
                                </div>

                                <div className="item odd">
                                    <LoaderLineInfo />
                                </div>

                                <div className="item even">
                                    <LoaderLineInfo />
                                </div>

                                <div className="item odd">
                                    <LoaderLineInfo />
                                </div>

                                <div className="item even">
                                    <LoaderLineInfo />
                                </div>

                            </div>
                        </div>

                        <div className="col2">
                            <div className='chart-loader-template'>
                                <LoaderChartPair/>
                                <h2>RYOSHI</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pair-list-actions'>
                <div className="transaction-list template-list-trx">
                    <LoaderTable />
                </div>
                <div className='list-news-pair'>
                    <LoaderListingPair />
                </div>
            </div>

        </section>


    </>)

}

export default TemplateLoading;