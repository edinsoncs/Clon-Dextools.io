import React, { Component, PureComponent  } from 'react';
import NumberFormat from 'react-number-format';

export default class HoldersComponent extends Component {

  constructor(props) {
    super(props);
    this.token = props.token;
    this.pair = props.pair;
    this.price = props.price

    this.state  = {
      tokens: []
    };

    this.post(this.token);
    this.post = this.post.bind(this);

  }

  post(token) {
    fetch('https://api.dexi.tools/coinmarketcap/tokens/'+token)
    .then(response => response.json())
    .then(data => this.setState({ tokens: data }));
  }



  render() {

    let holders = '...';
    let total = '...';
    let cmc_cap = '...';


    if(this.state.tokens){

      if(this.state.tokens.data){
        //Data exist coinmarketcap
        if(this.state.tokens.data[0].data){

          total = this.state.tokens.data[0].data[0].self_reported_circulating_supply
          cmc_cap = this.state.tokens.data[0].data[0].self_reported_market_cap
        }

        console.log('datas', total);
      }

    }


      return(
       <>


       {(() => {
         if (total) {
           return (<>
             <div className="item odd">
                <span className="label">Total Supply:</span><span className="content"><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
             </div>
             </>
           )
         }

         if (cmc_cap) {
           return (
             <div className="item even">
                <span className="label">Diluted Market Cap:</span><span className="content"><NumberFormat value={cmc_cap} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></span>
             </div>
           )
         }

       })()}



       {/*<div className="item odd">
           <span className="label">Holders:</span><span className="content">{holders}</span>
        </div>
       <div className="item odd">
          <span className="label">Total Supply:</span><span className="content"><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
       </div>
       <div className="item even">
          <span className="label">Diluted Market Cap:</span><span className="content"><NumberFormat value={cmc_cap} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></span>
       </div>*/}


       </>
      )
    }

}
