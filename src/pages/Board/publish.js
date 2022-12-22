import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import moment from 'moment';
import { Oval } from  'react-loader-spinner';
import { BiSmile, BiImageAdd } from "react-icons/bi";
import ReactTooltip from 'react-tooltip';
import { create } from 'ipfs-http-client'
import Alert from '@mui/material/Alert';


const axios = require('axios');
const api_service_save = 'https://api.ryoshi.pro/board/save/post';
const client = create('https://ipfs.infura.io:5001/api/v0');
var status_emoji = 0;


const projectId = '2DUnMY6rngztJIT2mONzDMq1Bjb'
const projectSecret = 'abe158736eec299e0ac04dbdeaf44853'
const projectIdAndSecret = `${projectId}:${projectSecret}`


var datas = [];
function Publish(){

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [posts, setPosts] = useState([]);
    const [fileUrl, updateFileUrl] = useState(``)
    const {active, activate, account} = useWeb3React();
    const [value, setValue] = React.useState('');
    
    const onEmojiClick = (event, emojiObject) => {
        //console.log('edinson', emojiObject);
        setValue(value + ' ' + emojiObject.emoji)
        setChosenEmoji(emojiObject);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const sendPublish = (e) => {
        if(account){
            let obj = {
                post_txt: value,
                user: account,
                date: new Date,
                image: fileUrl
            }

            let date_saved = moment(obj.date);
            let loader = <Oval height={40} width={40} ariaLabel="loading-indicator" />;
            let text_post = obj.post_txt.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<span class='hash_tag'>$2</span>");
            
            var z = document.getElementById('timeline-post');
            var l = document.getElementById('loading-indicator-contain');

            console.log('element is:', z);
            
            z.insertAdjacentHTML('afterbegin', `
            <article class='post-item'>
                <div class='post-item-img'>
                ${userEditAddress(obj.user)}
                </div>
                <div class='post-item-date'>
                    ${date_saved.format('DD-MMM-YYYY HH:mm a')}
                </div>
                <div class='post-item-message'>
                    <div>    
                        ${text_post}
                    </div>
                    ${obj.image ? `<div class='m-top-2'>
                            <img src='${obj.image}' width='100%' />
                        </div>` : ''}
                    
                </div>
            </article>
            `);

            l.style.opacity = 1;
            sendPublishDatabase(obj);
            setTimeout(() => {l.style.opacity = 0;}, 1500);

            setValue('');
        } else {
            alert('To publish content, you must enter with metamask')
        }

    }

    function userEditAddress(str){
        if(str.length > 0){ 
            return `${str[0]}${str[1]}${str[2]}`
        }
    }

    function sendPublishDatabase(obj){
        
        if(account){
            axios.post(api_service_save, {
                user: account,
                message: obj.post_txt,
                image: fileUrl,
                gif: null
            }).then(() => {
                //alert('Enviado');
            }).catch((err) => {
                //alert('An error occurred on the server');
            });
        } else {
            alert('To publish content, you must enter with metamask')
        }
    }

    function activeEmoji(){
        let emoji = document.getElementById('publish-emoji-contain');
        if(status_emoji == 0){
            emoji.style.display = 'block';
            status_emoji = 1;
        } else{
            emoji.style.display = 'none';
            status_emoji = 0;
        }
    }

    async function onChange(e) {
        const file = e.target.files[0]
        try {
          
            const client = create({
                host: 'ipfs.infura.io',
                port: 5001,
                protocol: 'https',
                headers: {
                  authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
                    'base64'
                  )}`,
                },
              })
            

          const added = await client.add(file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log('imagen subida',url);
          updateFileUrl(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

    return(<> 
            
            <div className='board-timeline'>
                    <article className='board-publish'>
                        <div className='board-publish-txtarea'>

                            {(() => {
                                if (account) {
                                    return (<>
                                        <div className='publish-name' data-tip={'My Address Public'}>{account[0]}{account[1]}{account[2]}</div>
                                        <ReactTooltip/>
                                    </>)
                                }
                            })()}
                            
                            {
                                fileUrl && (
                                <> <div><img src={fileUrl} width="30px" height='30px' /></div> </>
                                )
                            }

                            <textarea className='publish-dex' rows='3' placeholder='Share your opinion about the market' onChange={handleChange} value={value}></textarea>
                            <div className='publish-emoji' id='publish-emoji-contain'>
                                <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />
                            </div>
                        </div>
                        <div className='board-publish-actions'>
                            <div id='loading-indicator-contain'>
                                <Oval height={20} width={20} ariaLabel="loading-indicator"/>
                            </div>
                            
                            <div className='actions-contain'>
                                <form className='image-upload'>
                                    <label for='upload-image'><BiImageAdd/></label>
                                    <input
                                        type="file"
                                        id='upload-image'
                                        onChange={onChange}
                                    />
                                </form>
                                <div className='emoji-upload m-right-1 m-left-1' onClick={activeEmoji}>
                                <BiSmile data-tip={`Emoticons`}/>
                                </div>
                                
                                <button onClick={sendPublish} disabled={!value}  data-tip={`To post`} className='m-left-1'>
                                    PUBLISH
                                </button>
                                
                            </div>
                        </div>
                    </article>
                    
            </div>
            
            <ReactTooltip/>

                
    </>)

}

export default Publish;