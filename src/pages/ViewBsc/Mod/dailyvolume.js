function DailyVolume(exchange, daily) {
  var volumeDaily = 0;
  console.log('edinson', daily);
  if (daily) {
    if (daily.length) {

      if (exchange == 'bigswap') {
        volumeDaily = Number(daily[0].dailyVolumeUSD);
      }

      if (exchange == 'apeswap') {
        volumeDaily = Number(daily[0].dailyVolumeUSD);
      }

      if (exchange == 'babyswap') {
        volumeDaily = Number(daily[0].dailyVolumeUSD);
      }

      if (exchange == 'pancakeswap') {
        volumeDaily = Number(daily[0].dailyVolumeUSD);
      }

    }
  }


  return volumeDaily;


}

export default DailyVolume;
