import { AiTwotoneHome, AiFillTwitterCircle } from "react-icons/ai";
import { BsTelegram, BsLink } from "react-icons/bs";



function ListSponsor() {


    return (<>


        <section className='list__Sponsor--Container'>
            <div className='container-sponsor d-flex justify-content-between'>

                <article className='list__Sponsor--Article'>
                    <figure className='list__Figure'>
                        <img src='/images/ryoshi-updated.png' width='300' />
                    </figure>
                </article>

                <article className='list__Sponsor--Article--Hot'>
                    <div className='list__Sponsor--View'>
                        <span>
                            Live Trading
                        </span>
                    </div>   
                    <div className='list__Sponsor--Header'>
                        <div className='d-flex align-items-center'>
                            <figure className='list__Figure'>
                                <img src='/images/cawtoken.png' width='37' />
                            </figure>
                            <div className=''>
                                <div className='list__Name'>
                                    <span>A Hunters Dream</span>
                                </div>
                                <div className='list__Info d-flex align-items-center'>
                                    <span>CAW TOKEN</span>
                                    <a href='https://coinmarketcap.com/es/currencies/caw/' target='_blank'>
                                        <AiTwotoneHome />
                                    </a>
                                    <a href='#'>
                                        <AiFillTwitterCircle />
                                    </a>
                                    <a href='https://t.me/CAW_official' target='_blank'>
                                        <BsTelegram />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='list__Sponsor--Detail'>
                        <span>
                        A Hunters Dream is a decentralized financial payment network that rebuilds the traditional payment stack 
                        </span>
                    </div>
                    <div className='list__Sponsor--Link'>
                        <a href='#'>
                            More details <BsLink/>
                        </a>
                    </div>
                </article>

                <article className='list__Sponsor--Article--Hot'>
                    <div className='list__Sponsor--View'>
                        <span>
                            Live Trading
                        </span>
                    </div>   
                    <div className='list__Sponsor--Header'>
                        <div className='d-flex align-items-center'>
                            <figure className='list__Figure'>
                                <img src='/images/shiba.png' width='37' />
                            </figure>
                            <div className=''>
                                <div className='list__Name'>
                                    <span>SHIB</span>
                                </div>
                                <div className='list__Info d-flex align-items-center'>
                                    <span>SHIBA INU</span>
                                    <a href='https://shibatoken.com/' target='_blank'>
                                        <AiTwotoneHome />
                                    </a>
                                    <a href='https://twitter.com/shibtoken' target='_blank'>
                                        <AiFillTwitterCircle />
                                    </a>
                                    <a href='https://t.me/ShibaInu_Dogecoinkiller' target='_blank'>
                                        <BsTelegram />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='list__Sponsor--Detail'>
                        <span>
                        SHIB, LEASH, BONE — ShibaSwap — Innovative Reward System — The Shiba Incubator — And more.
                        </span>
                    </div>
                    <div className='list__Sponsor--Link'>
                        <a href='#'>
                            More details <BsLink/>
                        </a>
                    </div>
                </article>

                <article className='list__Sponsor--Article--Hot'>
                    <div className='list__Sponsor--View'>
                        <span>
                            Live Trading
                        </span>
                    </div>   
                    <div className='list__Sponsor--Header'>
                        <div className='d-flex align-items-center'>
                            <figure className='list__Figure'>
                                <img src='/images/bone.png' width='37' />
                            </figure>
                            <div className=''>
                                <div className='list__Name'>
                                    <span>BONE</span>
                                </div>
                                <div className='list__Info d-flex align-items-center'>
                                    <span>BONE SHIBASWAP</span>
                                    <a href='https://shibaswap.com/' target='_blank'>
                                        <AiTwotoneHome />
                                    </a>
                                    <a href='https://twitter.com/ShibaSwapDEX' target='_blank'>
                                        <AiFillTwitterCircle />
                                    </a>
                                    <a href='https://t.me/ShibaInu_Dogecoinkiller' target='_blank'>
                                        <BsTelegram />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='list__Sponsor--Detail'>
                        <span>
                            Skylabs (VSL) presale will be held in August followed by the release of two flagship launchpads.
                        </span>
                    </div>
                    <div className='list__Sponsor--Link'>
                        <a href='#'>
                            More details <BsLink/>
                        </a>
                    </div>
                </article>

                <article className='list__Sponsor--Article--Hot'>
                    <div className='list__Sponsor--View'>
                        <span>
                            Live Trading
                        </span>
                    </div>   
                    <div className='list__Sponsor--Header'>
                        <div className='d-flex align-items-center'>
                            <figure className='list__Figure'>
                                <img src='/images/ohm.png' width='37' />
                            </figure>
                            <div className=''>
                                <div className='list__Name'>
                                    <span>OHM</span>
                                </div>
                                <div className='list__Info d-flex align-items-center'>
                                    <span>OLYMPUS DAO</span>
                                    <a href='https://www.olympusdao.finance/' target='_target'>
                                        <AiTwotoneHome />
                                    </a>
                                    <a href='https://twitter.com/OlympusDAO' target='_target'>
                                        <AiFillTwitterCircle />
                                    </a>
                                    <a href='https://t.me/OlympusTG' target='_target'>
                                        <BsTelegram />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='list__Sponsor--Detail'>
                        <span>
                            Skylabs (VSL) presale will be held in August followed by the release of two flagship launchpads.
                        </span>
                    </div>
                    <div className='list__Sponsor--Link'>
                        <a href='#'>
                            More details <BsLink/>
                        </a>
                    </div>
                </article>

            </div>

        </section>

    </>)


}

export default ListSponsor;