function DailyVolume(exchange, daily) {
  var volumeDaily = 0;
  if(daily){
    if(daily.length){

       if(exchange == 'quickswap') {
         volumeDaily = Number(daily[0].dailyVolumeUSD);
       }

       if(exchange == 'kyberswap') {
         volumeDaily = Number(daily[0].dailyVolumeUSD);
       }


    }
  }


  return volumeDaily;


}

export default DailyVolume;
