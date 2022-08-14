import React, { Component, PureComponent  } from 'react';
import { FcShare, FcLike } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye, AiFillCloseCircle } from "react-icons/ai";

export default class LikeComponent extends Component {

  constructor(props) {
    super(props);

    this.arr = JSON.parse(localStorage.getItem('likes')) || [];

    this.query = props.data;

    //Select favorite view like
    this.select_favorite = this.arr.filter((item, index) => item.pair == this.query.id);

    this.symbol = props.symbol;

    this.classActive = false;


    this.openWidget = 0;

    this.state  = {
      tokens: this.arr
    };


    this.saveToken = this.saveToken.bind(this);

    this.minusWidget = this.minusWidget.bind(this);

    //this.removeTokenFavorite = this.removeTokenFavorite.bind(this);


  }

  saveToken(){
        var type_defi = window.location.pathname.split('/');
        let obj = {date: new Date(), type: type_defi[1] ,name: this.symbol, pair: this.query.id, defi: type_defi[2]};
        let fnd = this.arr.filter((item, index) => item.pair == obj.pair);
        if(fnd.length == 0){
            this.arr.push(obj);
            localStorage.setItem('likes', JSON.stringify(this.arr));
            this.elementDomClass('social-icon-share-like')[0].className = 'social-icon-share-like m-left-1 m-right-1 social-icon-liked';
        } else {
          this.elementDomClass('social-icon-share-like')[0].className = 'social-icon-share-like m-left-1 m-right-1';
          this.findAndRemove(this.arr, 'pair', this.query.id);
          localStorage.setItem('likes', JSON.stringify(this.arr));
        }

        this.setState({ tokens: this.arr });

  }



  findAndRemove(array, property, value) {
    array.forEach(function(result, index) {
      if(result[property] === value) {
        //Remove from array
        array.splice(index, 1);
      }
    });
  }

  elementDomClass(tag){
      return document.getElementsByClassName(tag);
  }

  minusWidget(){
    let getClass = document.getElementsByClassName('likesWidget__Item');
    let getMinusIcon = document.getElementsByClassName('minus-icon-widget');
    let getShowIcon = document.getElementsByClassName('show-icon-widget');

    if(!this.openWidget) {
      getClass[0].style.height = '0px';
      getMinusIcon[0].style.display = 'none';
      getShowIcon[0].style.display = 'block';
      this.openWidget = 1;
    } else {
      getClass[0].style.height = '200px';
      getMinusIcon[0].style.display = 'block';
      getShowIcon[0].style.display = 'none';
      this.openWidget = 0;
    }


  }

  removeTokenFavorite(pair){
    this.findAndRemove(this.arr, 'pair', pair);
    localStorage.setItem('likes', JSON.stringify(this.arr));
    this.elementDomClass('social-icon-share-like')[0].className = 'social-icon-share-like m-left-1 m-right-1';
    this.setState({ tokens: this.arr });
    return function () {
    }
  }




  render() {


      return(
       <>
         <a className={`social-icon-share-like m-left-1 m-right-1 ${(this.select_favorite.length > 0) ? 'social-icon-liked' : ''}`} onClick={this.saveToken}>
           <FcLike  />
         </a>

         <div className="likesWidget">
             <div className='likesWidget__Header'>
               <p>Favorites ({(this.state) ? this.state.tokens.length : '0'})</p>
               <div className='likesWidget__Minus' onClick={this.minusWidget}>
                <AiFillEyeInvisible className='minus-icon-widget'/>
                <AiFillEye className='show-icon-widget'/>
               </div>
             </div>
             <article className='likesWidget__Item'>
             {this.state.tokens.map((e) => <>
               <div className='widget__Item'>
                   <a href={`/${e.type}/${e.defi}/pair-explorer/${e.pair}`}>{e.name}</a>

                    <AiFillCloseCircle onClick={this.removeTokenFavorite.bind(this,e.pair)} />

               </div>
               </>)}
             </article>
         </div>

       </>
      )
    }

}
