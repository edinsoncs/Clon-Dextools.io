function chart(id){

  const tokensQuery = `
  {
    pairDayDatas(first: 1000, orderBy: date, orderDirection: asc, where: { pairAddress: "${id}" }) {
        id
        date
        dailyVolumeToken0
        dailyVolumeToken1
        dailyVolumeUSD
        reserveUSD
    }
  }
  `
  return tokensQuery;

}

export default chart;
