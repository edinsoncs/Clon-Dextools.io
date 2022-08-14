import historyProvider from './historyProvider'
//import stream from './stream'
const supportedResolutions = ['1', '3', '5', '15', '30', '60', '120', '720', '1440']
const config = {
	supported_resolutions: supportedResolutions,
	supports_marks: false,
	supports_group_request: false,
	supports_timescale_marks: false,
	supports_time: true,
	supports_search: false,
	debug: true,
};

export default {
	onReady: cb => {
		//console.log('=====onReady running')
		setTimeout(() => cb(config), 0)

	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		//console.log('====Search Symbols running')
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		//console.log('======resolveSymbol running')
		// console.log('resolveSymbol:',{symbolName})
		var split_data = symbolName.split(/[:/]/)
		// console.log({split_data})
		var symbol_stub = {
			name: symbolName,
			description: '',
			type: 'crypto',
			format: 'price',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: 'RYOSHI',
			minmov: 100,
			pricescale: 100000000000000,
			//activar o no los dias y minutos
			has_intraday: true,
			has_empty_bars: false,
			//has_no_volume: true,
			//has_daily: true,
			has_weekly_and_monthly: false,
			supported_resolutions: supportedResolutions,
			volume_precision: 0,
			data_status: 'streaming',
			expired: false,
			force_session_rebuild: false,
			loading_screen: { backgroundColor: "#161825", foregroundColor: "#161825" },
			disabled_features: ["save_chart_properties_to_local_storage", "use_localstorage_for_settings", "header_symbol_search", "symbol_search_hot_key"],
		}


		setTimeout(function () {
			onSymbolResolvedCallback(symbol_stub)
			//console.log('Resolving that symbol....', symbol_stub)
		}, 0)


		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		//console.log('=====getBars running')
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
			.then(bars => {
				//console.log('zapo', bars)

				if (bars.length) {

					//console.log('Ryoshi: ', bars[0])
					onHistoryCallback(bars[0], { noData: false })
				} else {
					onHistoryCallback(bars, { noData: true })
				}

			}).catch(err => {
				//console.log('okok');
				//console.log('error', err)
				//onErrorCallback(err)
			})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		//console.log('=====subscribeBars runnning')
		//stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
	},
	unsubscribeBars: subscriberUID => {
		//console.log('=====unsubscribeBars running')

		//stream.unsubscribeBars(subscriberUID)
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		//console.log('=====calculateHistoryDepth running')
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? { resolutionBack: 'D', intervalBack: '1' } : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		//console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		//console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		//console.log('=====getServerTime running')
	}
}
