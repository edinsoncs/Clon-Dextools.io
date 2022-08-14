import React, { Component, PureComponent  } from 'react';
import { FcShare, FcLike } from "react-icons/fc";
import { FaTelegram, FaTwitter, FaDesktop  } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import ReactTooltip from 'react-tooltip';
export default class InformationComponent extends Component {

  constructor(props) {
    super(props);

    this.token = props.token;
    this.pair = props.pair;

    this.state  = {
      tokens: []
    };

    this.openWidget = 0;

    this.post(this.token);

    this.post = this.post.bind(this);
  }

  post(token) {

    fetch('https://api.metadex.tools/coinmarketcap/tokens/'+token)
    .then(response => response.json())
    .then(data => this.setState({ tokens: data }));

  }

  elementDomClass(tag){
      return document.getElementsByClassName(tag);
  }

  openWidgetDetails(th, state){
    if(!this.openWidget){
      this.elementDomClass('add-details-list')[0].style.display = 'flex';
      this.openWidget = 1;
    } else {
      this.elementDomClass('add-details-list')[0].style.display = 'none';
      this.openWidget = 0;
    }
    return function () {
    }
  }

  render() {

    var add_tg = '';
    var add_tw = '';
    var add_wb = '';
    var add_cmc = '';
    var add_cgk = '';

    if(this.state.tokens){

      if(this.state.tokens.data){
        //Data exist coinmarketcap
        if(this.state.tokens.data[0].data){

          //Change logo default
          document.getElementById('logo_crypto').src = this.state.tokens.data[0].data[0].logo;

          if(this.state.tokens.data[0].data[0].urls){

            //Chat Telegram
            if(this.state.tokens.data[0].data[0].urls.chat){
              add_tg = <>
                  <a className='addItem-information-details' href={this.state.tokens.data[0].data[0].urls.chat[0]} target='_blank' data-tip={`Telegram `}>  <FaTelegram /> </a>
                  <ReactTooltip/>
              </>
            }

            //Social network twitter
            if(this.state.tokens.data[0].data[0].urls.twitter){
              add_tw = <>
                  <a className='addItem-information-details' href={`${this.state.tokens.data[0].data[0].urls.twitter[0]}`} target='_blank'  data-tip={`Twitter `}>  <FaTwitter /> </a>
                  <ReactTooltip/>
              </>
            }

            //Website
            if(this.state.tokens.data[0].data[0].urls.website){
              add_wb = <>
                  <a className='addItem-information-details' href={`${this.state.tokens.data[0].data[0].urls.website[0]}`} target='_blank' data-tip={`Web `}>  <FaDesktop /> </a>
                  <ReactTooltip/>
              </>
            }

          }

          if(this.state.tokens.data[0].data[0].slug){
            add_cmc = <>
                <a className='' href={`https://coinmarketcap.com/currencies/${this.state.tokens.data[0].data[0].slug}`} target='_blank' data-tip={`See in Coinmarketcap `}>
                  <img src='/images/cmc-icon-blue.jpeg' />
                 </a>
                 <ReactTooltip/>
            </>

          }

        }

        //console.log('datas', this.state.tokens.data[0].data[0]);
      }

    }



      return(
       <>

        {add_tg} {add_tw} {add_wb}

        <a  className='addItem-information-details add-details' onClick={this.openWidgetDetails.bind(this, true)} data-tip={`More token links `}>
          <GrAddCircle />
        </a>

        <div className={`add-details-list ${(add_tg && add_tw && add_wb) ? 'active-list' : 'no-active-list'} `}>
          <div className='block-details-list'>
            <small>Lock</small>
            <a href={`https://app.unicrypt.network/amm/uni-v2/pair/${this.pair}`} target='_blank'  data-tip={`Check Locked Liquidity `}>
              <img src='/images/unicrypt_v3.svg' />
            </a>
            <a href={`https://www.team.finance/view-coin/${this.token}`} target='_blank' data-tip={`Team Locked `}>
              <img src='/images/team-bright.png' className='m-left-1' height='50px' />
            </a>

            <small>Token</small>

            {add_cmc}

            {add_cgk}

          </div>
        </div>

        <ReactTooltip/>

       </>
      )
    }

}
