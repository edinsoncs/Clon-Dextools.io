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

    fetch('https://api.ryoshi.pro/etherscan/token/'+token)
    .then(response => response.json())
    .then(data => this.setState({ tokens: data }));

  }


  render() {

    let holders = '...';
    let total = '...';
    //console.log('edinson', this.state.tokens.data);
    if(this.state.tokens){

      if(this.state.tokens.data){
          holders = this.state.tokens.data.holdersCount;
      }

      if(this.state.tokens.data){
          let decimals = this.state.tokens.data.decimals
          total = this.state.tokens.data.totalSupply / (1.0 * 10 ** Number(decimals));
      }
    }




      return(
       <>
         <div className="item odd">
            <span className="label">Holders:</span><span className="content">{holders}</span>
         </div>
         <div className="item even">
            <span className="label">Total Supply:</span><span className="content"><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={0} /></span>
         </div>
         <div className="item odd">
            <span className="label">Diluted Market Cap:</span><span className="content"><NumberFormat value={this.price * total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /></span>
         </div>
       </>
      )
    }

}
