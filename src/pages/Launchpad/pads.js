function Pads() {

  return (
    <>

        <div className="board-col col1">
            <div className="board-block tools-suni launchpad">
                <div className="col-title"><span className="icon"></span> #1 MDEX <strong>IDO</strong><img className="line" src="images/line.svg" /></div>
                <div className="col-content">

                    <article className='line-1 launchpad_information'>
                          <div className='image_Launchpad'>
                              <img src='/images/logoxm.png' width={150}/>
                          </div>

                          <div className='details_Launchpad'>
                              <div className='details_Launchpad__List'>
                                  <ul>
                                    <li>
                                        <p>Total Raise</p>
                                        <p>1000 <b>BNB</b></p>
                                    </li>

                                    <li>
                                        <p>Date Start</p>
                                        <p>02 <b>FEB 22</b></p>
                                    </li>
                                  </ul>

                                </div>

                                <div className='details_Launchpad__List'>
                                    <ul>
                                      <li>
                                          <p>Hard Cap</p>
                                          <p>$362,302 <b>USD</b></p>
                                      </li>

                                      <li>
                                          <p>Total End</p>
                                          <p>01 <b>APR 22</b></p>
                                      </li>
                                    </ul>

                                  </div>
                          </div>

                    </article>

                    <div className='details__Lacunhpad__Progress'>
                      <progress id="file" value="1" max="100"> 32% </progress>
                    </div>

                    <div class="details__Launchpad__Action">

                      <div className='network'>
                          Available in BSC <img src='/images/binance.png' width={20} />
                      </div>

                      <a class="item-btn-action active" href="/launchpad/0x05633822A3f6AF31EaDa04e69124d1aEF12012FB">
                        <span class="icon">
                        </span>
                        <span class="content">View Details</span>
                      </a>

                    </div>


                </div>
            </div>
        </div>



    </>
  );
}


export default Pads;
