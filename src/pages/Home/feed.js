import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            <h2>Welcome to Ryoshi</h2>
            <p>
            Welcome to our unique decentralized platform in the world, enjoy the benefits and opportunities that blockchain technology offers us, any information or report, contact us
            </p>
          </article>
        </div>


        </Slider>
      </div>
    );
  }
}
