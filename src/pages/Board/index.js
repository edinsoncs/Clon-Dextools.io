import Sidebar from '../Static/sidebar';
import Header from '../Static/header';
import Subheader from '../Static/subheader';
import Footer from '../Static/footer';
import Picker from 'emoji-picker-react';
import Publish from './publish';
import Timeline from './timeline';
import Category from './category';
import { FaHome } from "react-icons/fa";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './board.css'


function BoardFeed() {

  return (
    <>
    <Sidebar />

    <main>
        <Header />

        <section className='board-container'>

            <Category />
            
            <Publish />

            <div className='board-posts'>
              <div className='board-posts-header'>
                <a href='/board'> <FaHome/> Board Home</a>
              </div>

              <Timeline />
                
            </div>

            <div className='board-sidebar'>
            </div>

        </section>


        <Footer/>

    </main>


    </>
  );
}

export default BoardFeed;
