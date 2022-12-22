import React, { Component, PureComponent, useEffect, useCallback  } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Navigate, Route } from 'react-router-dom';
import Select, { components } from 'react-select'

import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";



var items = [{id: 0,name: 'Cobol'}]

const options = [
  { value: 'uniswap', label: 'Uniswap', icon: "uniswap.png" },
  { value: 'uniswapv3', label: 'UniswapV3', icon: "uniswap.png" },
  { value: 'sushi', label: 'Sushiswap', icon: "england.svg" },
  { value: 'shiba', label: 'Shibaswap', icon: "england.svg" }
]

const { Option } = components;
const IconOption = props => (
  <Option {...props}>
    <img
      src={'/images/' + props.data.icon}
      style={{ width: 36 }}
      alt={props.data.label}
    />
    {props.data.label}
  </Option>
);


export default class SearchWidget extends Component {


  constructor(props) {
    super(props);
    this.state  = {
      searchList: []
    };
    let urlDefi = window.location.pathname;
    this.defiSelect = (urlDefi.split('/')[2]) ? urlDefi.split('/')[2] : 'uniswap';
    this.getSearch = this.getSearch.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.formatResult = this.formatResult.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalSearch = this.modalSearch.bind(this);
    this.modalSearchClose = this.modalSearchClose.bind(this);


  }

  getSearch(string) {
    fetch('https://api.ryoshi.pro/search/'+this.defiSelect+'/'+string)
    .then(response => response.json())
    .then(data => this.setState({ searchList: data.data }));

  }

  handleOnSearch(string, results){
    const searchQuery = this.getSearch(string);
    //console.log(this.state.searchList);
  }

  formatResult(item){
    //return item
    return (<><p>{item}</p></>); //To format result as html
  }

  handleOnSelect(obj){

    if(obj.pairBase){
      if(obj.pairBase.length) {
        window.location.href = '/ether/uniswap/pair-explorer/' + obj.pairBase[0].id;
      }
    }

    if(obj.basePairs){
      if(obj.basePairs.length) {
        window.location.href = '/ether/'+this.defiSelect+'/pair-explorer/' +  obj.basePairs[0].id;
      }
    }

    //Usaremos para uniswapv3
    if(obj.whitelistPools){
      if(obj.whitelistPools.length) {
        window.location.href = '/ether/'+this.defiSelect+'/pair-explorer/' + obj.whitelistPools[0].id;
      }
    }


    //console.log('item selected', obj.pairBase);
  }

  handleChange(e){
    this.defiSelect = e.target.value;
    switch (this.defiSelect) {
        case 'sushi':
          document.getElementById('defidex').src = '/images/sushiswap.png';
          break;

        case 'shiba':
          document.getElementById('defidex').src = '/images/shiba.png';
          break;

        case 'suni':
          document.getElementById('defidex').src = '/images/suni.png';
          break;
    
      default:
        document.getElementById('defidex').src = '/images/uniswap.png';
        break;
    }
  }

  modalSearch(e){
    document.getElementById('modalMobileSearch').style.display = 'block';
  }

  modalSearchClose(e){
    document.getElementById('modalMobileSearch').style.display = 'none';
  }

  render(){



    const handleOnHover = (result) => {
      // the item hovered
      //console.log(result)
      //alert('ed');
    }



    const handleOnFocus = () => {
      //console.log('Focused')
      //console.log(this.state.searchList);
    }

    



    return (
      <>
        <div className='search'>
            <div className='search-Desktop'>
              
              <img src='/images/uniswap.png' width={18} className='type__Defi__Dex' id='defidex' />
              
              <div className='typeSellect'>
                  <select className='typeDefi' id='selectDefi' onChange={this.handleChange}>

                  {(() => {
                    if (this.defiSelect == 'uniswap') {
                      return (
                        <>
                        <option value='uniswap' selected>uniswap</option>

                        <option value='uniswapv3'>uniswapv3</option>

                        <option value='sushi'>sushi</option>

                        <option value='shiba'>shiba</option>

                        </>
                      )
                    } else if (this.defiSelect == 'sushi') {
                      return (
                        <>
                        <option value='uniswap' >uniswap</option>

                        <option value='uniswapv3'>uniswapv3</option>

                        <option value='sushi' selected>sushi</option>

                        <option value='shiba'>shiba</option>

                        </>
                      )
                    } else if (this.defiSelect == 'shiba') {
                      return (
                        <>
                        <option value='uniswap' >uniswap</option>

                        <option value='uniswapv3'>uniswapv3</option>

                        <option value='sushi' >sushi</option>

                        <option value='shiba' selected>shiba</option>

                        </>
                      )
                    } else if (this.defiSelect == 'suni') {
                      return (
                        <>
                        <option value='uniswap' >uniswap</option>

                        <option value='uniswapv3'>uniswapv3</option>

                        <option value='sushi' >sushi</option>

                        <option value='shiba' >shiba</option>

                        </>
                      )
                    } else if (this.defiSelect == 'uniswapv3') {
                      return (
                        <>
                        <option value='uniswap' >uniswap</option>

                        <option value='uniswapv3' selected>uniswapv3</option>

                        <option value='sushi' >sushi</option>

                        <option value='shiba' >shiba</option>

                        </>
                      )
                    }
                    
                    else {
                      return (
                        <>
                        <option value='uniswap'selected>uniswap</option>

                        <option value='uniswapv3'>uniswapv3</option>

                        <option value='sushi' >sushi</option>

                        <option value='shiba' >shiba</option>

                        <option value='suni'>suni</option>
                        </>
                      )
                    }
                  })()}


                  </select>
              </div>

              <ReactSearchAutocomplete
                  items={this.state.searchList.asSymbol}
                  onSearch={this.handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={this.handleOnSelect}
                  onFocus={handleOnFocus}
                  autoFocus={false}
                  formatResult={this.formatResult}
                  fuseOptions={{ keys: ["name", "symbol"] }}
                  resultStringKeyName="name"
                  inputDebounce={10}
                  maxResults={25}
                  placeholder={'Search pair by symbol, name, contract or token'}
                  styling={{
                    width: "80%",
                    height: "34px",
                    border: "1px solid black",
                    borderRadius: "6px",
                    backgroundColor: "#1b1c22",
                    boxShadow: "none",
                    hoverBackgroundColor: "black",
                    color: "white",
                    fontSize: "12px",
                    iconColor: "#9d9c8f",
                    lineColor: "#9d9c8f",
                    placeholderColor: "darkgreen",
                    clearIconMargin: "3px 8px 0 0",
                    zIndex: "50"
                  }}
                />
            
            </div>
            <div className='search-Mobile'>
                <div className='search-Mobile__Contain' onClick={this.modalSearch}>
                  <FaSearch />
                </div>
                <section className='search-Mobile__Modal' id='modalMobileSearch'>
                    <div className='modalSearch_View'>

                        <div className='type__defi__mobile'>
                            <div className='type_defi_mobile--select'>
                              <img src='/images/uniswap.png' width={18} className='type__Defi__Dex' id='defidex' />
                              <div className='typeSellect'>
                                  <select className='typeDefi' id='selectDefi' onChange={this.handleChange}>

                                  {(() => {
                                    if (this.defiSelect == 'uniswap') {
                                      return (
                                        <>
                                        <option value='uniswap' selected>uniswap</option>

                                        <option value='uniswapv3'>uniswapv3</option>

                                        <option value='sushi'>sushi</option>

                                        <option value='shiba'>shiba</option>

                                        <option value='suni'>suni</option>
                                        </>
                                      )
                                    } else if (this.defiSelect == 'sushi') {
                                      return (
                                        <>
                                        <option value='uniswap' >uniswap</option>

                                        <option value='uniswapv3'>uniswapv3</option>

                                        <option value='sushi' selected>sushi</option>

                                        <option value='shiba'>shiba</option>

                                        <option value='suni'>suni</option>
                                        </>
                                      )
                                    } else if (this.defiSelect == 'shiba') {
                                      return (
                                        <>
                                        <option value='uniswap' >uniswap</option>

                                        <option value='uniswapv3'>uniswapv3</option>

                                        <option value='sushi' >sushi</option>

                                        <option value='shiba' selected>shiba</option>

                                        <option value='suni'>suni</option>
                                        </>
                                      )
                                    } else if (this.defiSelect == 'suni') {
                                      return (
                                        <>
                                        <option value='uniswap' >uniswap</option>

                                        <option value='uniswapv3'>uniswapv3</option>

                                        <option value='sushi' >sushi</option>

                                        <option value='shiba' >shiba</option>

                                        <option value='suni' selected>suni</option>
                                        </>
                                      )
                                    } else {
                                      return (
                                        <>
                                        <option value='uniswap'selected>uniswap</option>

                                        <option value='uniswapv3'>uniswapv3</option>

                                        <option value='sushi' >sushi</option>

                                        <option value='shiba' >shiba</option>

                                        <option value='suni'>suni</option>
                                        </>
                                      )
                                    }
                                  })()}


                                  </select>
                              </div>
                            </div>

                            <div className='defi__mobile__Close' onClick={this.modalSearchClose}>
                              <ImCross/>
                            </div>

                        </div>

                        <ReactSearchAutocomplete
                            items={this.state.searchList.asSymbol}
                            onSearch={this.handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={this.handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus={false}
                            formatResult={this.formatResult}
                            fuseOptions={{ keys: ["name", "symbol"] }}
                            resultStringKeyName="name"
                            inputDebounce={10}
                            maxResults={50}
                            styling={{
                              width: "100%",
                              height: "34px",
                              border: "1px solid black",
                              borderRadius: "6px",
                              backgroundColor: "#23323c",
                              boxShadow: "none",
                              hoverBackgroundColor: "black",
                              color: "white",
                              fontSize: "12px",
                              iconColor: "#9d9c8f",
                              lineColor: "#9d9c8f",
                              placeholderColor: "darkgreen",
                              clearIconMargin: "3px 8px 0 0",
                              zIndex: "50"
                            }}
                          />
                    </div>
                </section>
            </div>
        </div>

        

      

      </>
    );
  }


}
