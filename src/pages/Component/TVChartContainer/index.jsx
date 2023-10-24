import "./index.css";
import { widget } from "../../../charting_library";
import chart from "../../../apollo/chart";
import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Datafeed from "../../../api/datafeed";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: "Uniswap:WETH/USDT",
    description: "dale",
    interval: "720",
    timeframe: "720",
    containerId: "tv_chart_container",
    datafeedUrl: "https://api.dexi.tools/uniswap/candles",
    libraryPath: "/charting_library/",
    //chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
    debug: true,
  };

  tvWidget = null;

  constructor(props) {
    super(props);
    this.query = this.props.query;
    this.tokens = this.props.tokens;
    
	//Solamente para pancakeswap
	if(this.props.defi == 'pancakeswap'){
		this.namePair = this.props.query.data[0].quoteCurrency.symbol + "/" + this.props.query.data[0].baseCurrency.symbol;
	} 
	//Exclusivo para todo los defi
	else {
		this.namePair = this.props.query.token0.symbol + "/" + this.props.query.token1.symbol;
	}
	
    
	//this.apollo = chart(this.query.id);
    //this.post(this.token);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const widgetOptions = {
      symbol: this.namePair,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      debug: true,
      locale: "en",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      toolbar_bg: "#000",
      loading_screen: { backgroundColor: "#000" },
      time_frames: [
        { text: "1m", resolution: "D", description: "1 Minute" },
        { text: "3m", resolution: "W", description: "3 Meses" },
        { text: "1y", resolution: "M", description: "1 Ano" },
      ],
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "header_compare",
        "timezone_menu",
      ],
      overrides: {
        "paneProperties.background": "#000000",
        "scalesProperties.textColor": "#AAA",
        "paneProperties.horzGridProperties.color": "#131722",
        "scalesProperties.bgColor": "#131722",
        "paneProperties.crossHairProperties.color": "#000000",
        "scalesProperties.backgroundColor": "#000",
        "mainSeriesProperties.barStyle.upColor": "#fff",
        "mainSeriesProperties.barStyle.downColor": "#fff",
        "mainSeriesProperties.lineStyle.color": "#000000",
        "mainSeriesProperties.areaStyle.color2": "#000000",
        "mainSeriesProperties.areaStyle.linecolor": "#000000",
        volumePaneSize: "tiny",
      },
      studies_overrides: {
        "volume.volume.color.0": "#000000",
        "volume.volume.color.1": "#0000FF",
        "volume.volume.transparency": 70,
        "volume.volume ma.color": "#FF0000",
        "volume.volume ma.transparency": 30,
        "volume.volume ma.linewidth": 5,
        "volume.volume ma.visible": true,
        "bollinger bands.median.color": "#33FF88",
        "bollinger bands.upper.linewidth": 7,
      },
      locale: getLanguageFromURL() || "en",
      //disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ["cl_feed_return_all_data"],
      //charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,

      //disabled features https://github.com/tradingview/charting_library/issues/6227

      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      theme: "Dark",
      studies_overrides: this.props.studiesOverrides,
      custom_css_url: "/chart.css",
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        //button.innerHTML = 'Check API';
      });
    });
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return <div id={this.props.containerId} className={"TVChartContainer"} />;
  }
}
