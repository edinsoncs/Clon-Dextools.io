import { getAddress } from '@ethersproject/address'

const isAddress = (value: any) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}




const list_address = [
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  //USDT => BSC 0x55d398326f99059fF775485246999027B3197955
  '0x55d398326f99059fF775485246999027B3197955',
  '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  // NETWORK IN POLYGON
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619']

function getToken(data) {
  if (data) {

    //Verificamos si tenemos bitquery o thegraph
    
    //Esto significa nuestra api.
    if(data.status){


      let tokenA = isAddress(data.data[0].baseCurrency.address);
      let tokenB = isAddress(data.data[0].quoteCurrency.address);
      
      let is_A = list_address.includes(tokenA);
      let is_B = list_address.includes(tokenB);

      if (!is_A) {
        return tokenA;
      }

      if (!is_B) {
        return tokenB;
      }


    } 
    //Esto significa nuestro thegraph
    else {

      let tokenA = isAddress(data.token0.id);
      let tokenB = isAddress(data.token1.id);

      let is_A = list_address.includes(tokenA);
      let is_B = list_address.includes(tokenB);

      if (!is_A) {
        return tokenA;
      }

      if (!is_B) {
        return tokenB;
      }
      
    }

    

  }

}



export default getToken;
