import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { Bars } from 'react-loader-spinner';
import { useParams } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";
import { Oval } from 'react-loader-spinner';

const axios = require('axios');



function SocialMedia() {

    const { active, activate, account } = useWeb3React();
    const [post, setPost] = React.useState([]);



    React.useEffect(() => {
        setTimeout(() => {
            let loading_time = document.getElementById('loading-indicator-contain-pair');
            loading_time.style.display = 'none';

            let hashtag = document.getElementsByClassName('symbol-pair');

            if (hashtag.length > 0) {
                let api_get_hastag = 'https://api.ryoshi.pro/board/get/' + hashtag[0].innerHTML + '/post';
                axios.get(api_get_hastag).then((response) => {
                    setPost(response.data.data);
                });
            }


        }, 2000);

    }, []);



    function viewPost(e) {
        window.location.href = '/board/view/' + e._id
    }


    return (<>

        <section className='list-news-pair'>

            <div className='list-news-header'>
                <h2>Timeline Pair</h2>
            </div>

            <div className='list-news-post'>
                <div id='loading-indicator-contain-pair' className='m-top-2'>
                    <Bars height={40} width={40} ariaLabel="loading-indicator" color="#fff" />
                </div>

                {(() => {
                    if (post.length > 0) {
                        return (<>
                            {
                                post.map((e, i) => {
                                    return (<>

                                        <article className="post-item" onClick={() => viewPost(e)} data-id={e._id}>
                                            <div className="post-item-img">
                                                {e.user_address[0]}{e.user_address[1]}{e.user_address[2]}
                                            </div>
                                            <div className="post-item-date">
                                                {e.createdAt}
                                            </div>
                                            <div className="post-item-message">
                                                <div dangerouslySetInnerHTML={{ __html: e.message.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>") }}></div>

                                                {(() => {
                                                    if (e.image) {
                                                        return (<>
                                                            <div className='m-top-2'>
                                                                <img src={e.image} width='100%' />
                                                            </div>
                                                        </>)
                                                    }
                                                })()}


                                            </div>
                                            <div className='post-actions'>
                                                <div className='post-comments'>
                                                    <BiCommentDetail />
                                                </div>
                                            </div>
                                        </article>

                                    </>)
                                })
                            }

                        </>)
                    } else {
                        return (<>

                            <section className='add-post-timeline-pair'>
                                <div className='m-top-2 txt-display'>
                                    There is no post created in this timeline
                                </div>
                                <a className='m-top-5 create-pub' href='/board'>
                                    CREATE PUBLICATION
                                </a>
                            </section>

                        </>)
                    }
                })()}



            </div>

        </section>

    </>)

}

export default SocialMedia;