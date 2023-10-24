import React, { Component, PureComponent  } from 'react';
import { FcShare, FcLike } from "react-icons/fc";
import { FaTelegram, FaTwitter, FaDesktop, FaDiscord, FaMedium, FaReddit  } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import ReactTooltip from 'react-tooltip';
export default class InformationComponent extends Component {

  constructor(props) {
    super(props);

    this.token = props.token;
    this.pair = props.pair;

    this.state  = {
      tokens: [],
      cmc: []
    };

    this.openWidget = 0;

    this.post(this.token);
    this.post = this.post.bind(this);

    this.cmc(this.token);
    this.cmc = this.cmc.bind(this);
  }

  cmc(token) {

    fetch('https://api.dexi.tools/coinmarketcap/tokens/'+token)
    .then(response => response.json())
    .then(data => this.setState({ cmc: data }));

  }

  post(token) {

    fetch('https://api.dexi.tools/etherscan/token/'+token)
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
    var add_disc = '';
    var add_md = '';
    var add_rdt = '';

    //console.log('ok',this.state.cmc)
    if(this.state.cmc){

      if(this.state.cmc.data){
        //Data exist coinmarketcap
          if(this.state.cmc.data[0]){
            if(this.state.cmc.data[0].data){
              //Change logo default
              document.getElementById('logo_crypto').src = this.state.cmc.data[0].data[0].logo;
            }
          }

          if(this.state.cmc.data[0]){
            if(this.state.cmc.data[0].data){

              var chats = this.state.cmc.data[0].data[0].urls.chat;

              console.log('urls', this.state.cmc.data[0].data[0].urls);

              add_tw = <>
                  <a className='addItem-information-details' href={`${this.state.cmc.data[0].data[0].urls.twitter[0]}`} target='_blank'  data-tip={`Twitter `}>  <FaTwitter /> </a>
                  <ReactTooltip/>
              </>

              add_wb = <>
                <a className='addItem-information-details' href={this.state.cmc.data[0].data[0].urls.website[0]} target='_blank' data-tip={`Web `}>  <FaDesktop /> </a>
                <ReactTooltip/>
              </>

              add_md = <>
                <a className='addItem-information-details' href={`${this.state.cmc.data[0].data[0].urls.message_board[0]}`} target='_blank'  data-tip={`Medium `}>  <FaMedium /> </a>
                <ReactTooltip/>
              </>

              add_rdt = <>
              <a className='addItem-information-details' href={`${this.state.cmc.data[0].data[0].urls.reddit[0]}`} target='_blank'  data-tip={`Reddit `}>  <FaReddit /> </a>
              <ReactTooltip/>
            </>

              if(chats.length > 0){
                
                chats.map((e, i, a) => {
                 
                  if(e.split('/')[2] == 't.me'){
                    add_tg = <>
                      <a className='addItem-information-details' href={e} target='_blank' data-tip={`Telegram `}>  <FaTelegram /> </a>
                      <ReactTooltip/>
                    </>
                  } else {


                    add_disc = <>
                        <a className='addItem-information-details' href={e} target='_blank' data-tip={`Discord `}>  <FaDiscord/> </a>
                        <ReactTooltip/>
                    </>

                  }
                  

                });
                
                
              }
              
            }
          }
        //console.log('datas', this.state.cmc.data[0].data[0]);
      }

    }

    

    if(this.state.tokens){
      if(this.state.tokens.data){
        
        if(this.state.tokens.data.telegram){
          add_tg = <>
              <a className='addItem-information-details' href={this.state.tokens.data.telegram} target='_blank' data-tip={`Telegram `}>  <FaTelegram /> </a>
              <ReactTooltip/>
          </>
        }

        if(this.state.tokens.data.twitter){
          add_tw = <>
              <a className='addItem-information-details' href={`https://twitter.com/${this.state.tokens.data.twitter}`} target='_blank'  data-tip={`Twitter `}>  <FaTwitter /> </a>
              <ReactTooltip/>
          </>
        }

        if(this.state.tokens.data.website){
          add_wb = <>
              <a className='addItem-information-details' href={this.state.tokens.data.website} target='_blank' data-tip={`Web `}>  <FaDesktop /> </a>
              <ReactTooltip/>
          </>
        }

        if(this.state.tokens.data.coingecko){
          add_cgk = <>
              <a className='' href={`https://www.coingecko.com/${this.state.tokens.data.coingecko}`} target='_blank' data-tip={`See in Coingecko `}>
                <img src='/images/coingecko.png' />
               </a>
               <ReactTooltip/>
          </>
        }


      }


    }




      return(
       <>

        {add_md} {add_tg} {add_disc} {add_tw} {add_wb} {add_rdt}

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
