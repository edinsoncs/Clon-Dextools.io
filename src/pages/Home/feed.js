import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';


export default class Feed extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>

        <div>
          <article className='feedArticle'>
            
            
            <ul className='listFeed'>
              <li>
                <a href='https://www.iproup.com/economia-digital/33721-asi-funciona-ryoshi-la-nueva-plataforma-para-inversores-cripto' target='_blank'>
                How does Ryoshi work, the new platform developed for crypto investors?
                </a>
              </li>
              <li>
                <a href='https://www.diariobitcoin.com/notas-de-prensa/conozca-ryoshi-la-herramienta-para-tener-a-la-mano-todos-los-datos-sobre-defi-en-un-solo-lugar/' target='_blank'>
                Get to know RYOSHI, the tool to have all the data about DeFi at hand in one place
                </a>
              </li>
            </ul>
          </article>
        </div>


        </Slider>
      </div>
    );
  }
}
