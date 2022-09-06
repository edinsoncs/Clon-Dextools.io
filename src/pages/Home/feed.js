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
            
            <Player poster="/images/ryoshitv.png">
                        <source src="https://firebasestorage.googleapis.com/v0/b/quickly-fbda0.appspot.com/o/ryo.mp4?alt=media&token=b88d3913-293c-46b0-906c-82deee905a42" />
                        <ControlBar>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={30} order={1.2} />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                            <VolumeMenuButton true />
                        </ControlBar>
                    </Player>
          </article>
        </div>


        </Slider>
      </div>
    );
  }
}
