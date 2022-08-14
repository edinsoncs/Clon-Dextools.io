import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';

import React, { useEffect, useState } from "react";

function News() {

  const [news, setNews] = React.useState([]);
  const [view, setView] = React.useState([]);


  var defaultNews = {};

  useEffect(() => {

    fetch('https://api.metadex.tools/news')
    .then(response => response.json())
    .then(data => setNews(data))

  }, []);

  function viewNews(id){
    setView(news[id]);
    return function(){

    }

  }

  if(news.length){
    defaultNews.title = news[0].title;
    defaultNews.content = news[0].content;
    defaultNews.link = news[0].link;
  }

  return (
  <>
    <Sidebar />

    <main>

      <Header />

      <div className="content">

         <Subheader />

         <section className="board page-news">
             <div className="board-col col1">
                 <div className="board-block tools-suni">
                     <div className="col-title"><span className="icon"></span> LAST <strong>NEWS</strong><img className="line" src="images/line.svg" /></div>
                     <div className="col-content">
                         <div class="line-list-news">

                         {news.map((e, i, a) => <>
                           <a class="item-news" href="#" onClick={viewNews.bind(this, i)}>
                             <span class="content-details"><b>{i+1}</b> {e.title}</span>
                           </a>
                           </>)}


                         </div>

                     </div>
                 </div>
             </div>

             <div className="board-col col2-news">
                 <div className="board-block tools-suni">
                     <div className="col-title"><span className="icon"></span> PREVIEW <strong>NEWS</strong><img className="line" src="images/line.svg" /></div>
                     <div className="col-content">
                         <div class="line-preview">

                            <div className='title-view-news'>
                                <h2>{(Object.keys(view).length) ? view.title : defaultNews.title}</h2>
                            </div>

                            <div className='description-view-news'  dangerouslySetInnerHTML={{__html: (Object.keys(view).length) ? view.content : defaultNews.content}}>
                            </div>

                            <div className='visit-view-news'>
                              <a href={ (Object.keys(view).length) ? view.link : defaultNews.link } className='link-visit' target='_blank'>
                                See the full news
                              </a>
                            </div>

                         </div>

                     </div>
                 </div>

             </div>

         </section>

      </div>

      <Footer/>

    </main>

  </>
  );
}


export default News;
