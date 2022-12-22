var rp = require('request-promise').defaults({ json: true })

const history = {}

const stables = [
	'0x6b175474e89094c44da98b954eedeac495271d0f',
	'0xdac17f958d2ee523a2206206994597c13d831ec7',
	'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	'0x8e870d67f660d95d5be530380d0ec0bd388289e1',
	'0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
	'0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
	'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
	'0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
	'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
];

const networkSelect = window.location.pathname.split('/')[1];

var price_chart = 0;

function timeStamp(str) {
	return (new Date(str).getTime())
}


export default {
	history: history,

	getBars: function (symbolInfo, resolution, from, to, first, limit, onHistoryCallback) {

		var tokens = document.getElementById('tokenAB');
		var token = tokens.value.split(',');

		let pathName = window.location.pathname;
		let query = pathName.split('/');
		let query_res = `https://api.ryoshi.pro/candles/${query[2]}/${token[0]}/${token[1]}?frame=${resolution}`
		//alert(resolution);
		//console.log(query_res);

		// find stables coin multiply
		const found = stables.find(element => element == token[1]);
		//alert(global.price_eth);

		function resultChart(price) {


			if (networkSelect == 'ether') {
				if (found) {
					return price;
				} else {
					return (global.price_eth * price);
				}
			}

			if (networkSelect == 'bsc') {
				if (found) {
					return price;
				} else {
					if(localStorage.getItem('reverse')) {
						//console.log('aqui estoy', price);
						//return (global.price_bnb / price);
						return price;
					} else {
						return (global.price_bnb * price);
					}
					
				}
			}

			if (networkSelect == 'polygon') {
				//console.log(found);
				if (found) {
					return price;
				} else {
					return (global.price_polygon * price);
				}
			}
		}




		//alert(networkSelect);

		return rp({
			url: `${query_res}`,
		})
			.then(data => {
				if (!data) {
					return []
				}
				if (data.data.length) {
					//alert(resultChart(Number(data.data[data.data.length - 1].open)));
					//console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
					var bars = [data.data.map(el => {
						return {
							time: timeStamp((el.timeInterval.hour) ? el.timeInterval.hour : el.timeInterval.minute), //TradingView requires bar time in ms
							open: resultChart(Number(el.open)),
							high: resultChart(Number(el.high)),
							low: resultChart(Number(el.low)),
							close: resultChart(Number(el.close)),
							volume: resultChart(Number(el.volume)),
							//id: el.id
						}
					})]

					if (first) {
						var lastBar = bars[bars.length - 1];
						//console.log('dsa',lastBar);
						history[symbolInfo.name] = { lastBar: lastBar }
					}
					return bars
				} else {
					return []
				}

			})

	}

}
