import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { Bars } from  'react-loader-spinner';
import { useParams } from "react-router-dom";
import { GoHeart, GoReply } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";

import { Link } from 'react-router-dom';


const axios = require('axios');
const api_service_save = 'https://api.dexi.tools/board/get/post';
const api_service_comment_save = 'https://api.dexi.tools/board/new/comment/save';


function Timeline(){

    const {active, activate, account} = useWeb3React();
    const [post, setPost] = React.useState([]);
    const [ comments, setComments] = React.useState([]);
    const [ commentValue, setCommentValue] = React.useState('');
    const { hastag, id } = useParams()

    React.useEffect(() => {
        if(hastag){
            let api_get_hastag = 'https://api.dexi.tools/board/get/'+ hastag +'/post';
            axios.get(api_get_hastag).then((response) => {
                setPost(response.data.data);
            });

        } else {

            if(id){
                const api_service_get_id = 'https://api.dexi.tools/board/id/'+id+'/post';
                axios.get(api_service_get_id).then((response) => {
                    setPost(response.data.data);
                });

                const api_service_get_comments_id = 'https://api.dexi.tools/board/comments/'+id+'/post';
                axios.get(api_service_get_comments_id).then((response) => {
                    setComments(response.data.data);
                });

            } else {
                axios.get(api_service_save).then((response) => {
                    setPost(response.data.data);
                });
            }
            
        }
        
    }, []);


    function handleComment(e){
        setCommentValue(e.target.value);
    }

    function userEditAddress(str){
        if(str.length > 0){ 
            return `${str[0]}${str[1]}${str[2]}`
        }
    }

    function saveComment(){
        if(account){
            var z = document.getElementById('list-post-comments');
            let date_saved = moment(new Date);

            axios.post(api_service_comment_save, {
                user_address: account,
                message:  commentValue,
                post_id: id,
            }).then(() => {
                setCommentValue('');

                z.insertAdjacentHTML('afterbegin', `
                    <article class='subcomment-item m-bottom-2'>
                        <div class='post-item-img'>
                        ${userEditAddress(account)}
                        </div>
                        <div class='post-item-date'>
                            ${date_saved.format('DD-MMM-YYYY HH:mm a')}
                        </div>
                        <div class='post-item-message'>
                            <div>    
                                ${commentValue}
                            </div>
                        </div>
                    </article>
                    `);

                //alert('Enviado');
            }).catch((err) => {
                //alert('An error occurred on the server');
            });
        } else {
            alert('To publish content, you must enter with metamask')
        }
    }


    function viewPost(e){
        window.location.href = '/board/view/'+e._id
    }


    if (post.length == 0) return <section className='loadingTimeline'><Bars height={40} width={40} ariaLabel="loading-indicator" color="#fff" /></section>

    return(<> 

        <section id='timeline-post'>

        {(() => {
              if (id) {
                return (<>
                        <article className="post-item" data-id={post.id}>
                            <div className="post-item-img">
                                                {post.user_address[0]}{post.user_address[1]}{post.user_address[2]}
                                                </div>
                                                <div className="post-item-date">
                                                {post.createdAt}
                                                </div>
                                                <div className="post-item-message">
                                                    <div dangerouslySetInnerHTML={{ __html: post.message.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>") }}></div>
                                                    
                                                    {(() => {
                                                        if (post.image) {
                                                            return (<>
                                                                <div className='m-top-2'>
                                                                    <img src={post.image} width='100%' />
                                                                </div>
                                                            </>)
                                                        } 
                                                    })()}
                                                    
                                                    
                                                </div>
                                                <div className='post-actions'>
                                                    <div className='post-comments'>
                                                        <span>{comments.length}</span>
                                                        <BiCommentDetail />
                                                    </div>
                            </div>

                            <div className='post-comment-list' id='list-post-comments'>
                            {
                                comments.map((e, i) => {     
                                    return(<> 
                                        <article className='subcomment-item m-bottom-2'>
                                            <div className='post-item-img'>
                                            {userEditAddress(e.user_address)}
                                            </div>
                                            <div className='post-item-date'>
                                                {moment(e.createdAt).format('DD-MMM-YYYY HH:mm a')}
                                            </div>
                                            <div className='post-item-message'>
                                                <div>    
                                                    {e.message}
                                                </div>
                                            </div>
                                        </article>
                                    </>)
                                })
                            }
                            </div>                   

                        </article>

                        <section className='post-comments'>
                            <article className='post-comments-container'>
                                <input className='post-comments-input' placeholder='Add comment' value={commentValue} onChange={handleComment} />
                                <button onClick={saveComment}>
                                    SEND
                                </button>
                            </article>

                        </section>
                </>)
              } else {
                return(<> 
                    {
                        post.map((e, i) => {     
                            return(<> 

                                <article className="post-item" onClick={ () => viewPost(e) } data-id={e._id}>
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
                                                        <span>{e.comments}</span>
                                                        <BiCommentDetail />
                                                    </div>
                                                </div>
                               </article>
                                
                            </>)
                        })
                    }
                </>)
              } 

        })()}   

        </section>

        
    </>)

}

export default Timeline;