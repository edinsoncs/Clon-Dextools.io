function DailyVolume(exchange, daily) {
  var volumeDaily = 0;

  if(daily){
    if(daily.length){

       if(exchange == 'uniswap'){
          if(Number(daily[0].dailyVolumeUSD)) {
            volumeDaily = Number(daily[0].dailyVolumeUSD);
          } else {
            //Si el ETH en reservas es menor a 70000 ETH
            let verifyAmount = parseFloat(daily[0].dailyVolumeToken0).toFixed(0);
            volumeDaily =  (verifyAmount < 70000) ? Number(daily[0].dailyVolumeToken0) * global.price_eth : Number(daily[0].dailyVolumeToken1) * global.price_eth;
          }
       }

       //En esta condicion agregamos la cantidad de volumen diario en la version 3 de uniswap
       if(exchange == 'uniswapv3') {
         volumeDaily = Number(daily[0].volumeUSD);
       }

       if(exchange == 'sushi' || exchange == 'shiba' || exchange == 'suni'){
         if(Number(daily[0].volumeUSD)) {
           volumeDaily = Number(daily[0].volumeUSD);
         } else {
           //Si el ETH en reservas es menor a 70000 ETH
           let verifyAmount = parseFloat(daily[0].volumeUSD).toFixed(0);
           volumeDaily =  (verifyAmount < 70000) ? Number(daily[0].volumeToken0) * global.price_eth : Number(daily[0].volumeToken1) * global.price_eth;
         }
       }

    }
  }


  return volumeDaily;


}

export default DailyVolume;
