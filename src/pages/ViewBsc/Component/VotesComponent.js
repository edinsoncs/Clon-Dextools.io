import React, { Component, PureComponent, useEffect, useCallback  } from 'react';
import NumberFormat from 'react-number-format';


export default class VotesComponent extends Component {

  constructor(props) {
    super(props);

    this.state  = {
      votes: [],
      votesPossitive: 0,
      votesNegative: 0,
    };

    this.total_votes = 0;
    this.total_score = 0;
    this.pair = props.pair
    this.account = props.account
    this.messageVoted = true;
    this.line_name_token = props.name;

    this.readVotes(this.pair);
    this.readVotes.bind(this);

    this.votes.bind(this)

  }



  votes(type){
    //console.log(this.state.votes);

    if(this.account){
      fetch("https://api.metadex.tools/votes/", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pair: this.pair,
            type: type,
            account: this.account.toLowerCase()
          })
      })
      .then(function(response) {
          if(response.ok){
              return response.json();
          }{
              throw new Error("Post Failed")
          }
      }).then(function(data){
          if(data.status){
            this.setState({ votes: data })
          }
      })
      .catch(function(error) {
          console.log("Request failed", error);
      });
    } else {
      alert('To vote, you need to enter with your wallet');
    }





    return function(){

    }

  }

  readVotes(pair){
    fetch('https://api.metadex.tools/votes/'+pair)
    .then(response => response.json())
    .then(data => this.setState({ votes: data }));

  }




  render() {



      if(this.state.votes){
        if(this.state.votes.data){

            let votes_add = this.state.votes.data;
            this.total_votes = this.state.votes.data.length;


            votes_add.map((e,i,a)=> {
                if(e.type){
                  this.state.votesPossitive+=1;
                } else {
                  this.state.votesNegative+=1;
                }
            });

            if(this.state.votesPossitive && this.state.votesNegative) {
              this.total_score = (this.state.votes.data.length > 0 ) ? this.state.votesPossitive / this.state.votesNegative : 0;
            } else if(this.state.votesPossitive && !this.state.votesNegative) {
              this.total_score = (this.state.votes.data.length > 0 ) ? this.state.votesPossitive / 1 : 0;
            } else if(!this.state.votesPossitive && this.state.votesNegative) {
              this.total_score = (this.state.votes.data.length > 0 ) ? 1 / this.state.votesNegative : 0;
            } else {
              this.total_score =  1;
            }


        } else {
          this.total_votes = 0;
        }
      }


      return(
       <>


       <div className="community-vote">

          <div className="title">Community trust ({this.total_votes} votes)</div>
          <div className="row-line">
             <div className="vote-line">
                <div className="side left" style={{width: this.state.votesPossitive + "%"}}></div>
                <div className="side right" style={{width: this.state.votesNegative + "%"}}></div>
             </div>
          </div>

          <div className="row-vote">
             <div className="vote-up" onClick={this.votes.bind(this, 1)}>
                <span role="img" aria-label="like" className="anticon anticon-like">
                   <svg viewBox="64 64 896 896" focusable="false" data-icon="like" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path>
                   </svg>
                </span>
                <div className="percent">{this.state.votesPossitive}%</div>
             </div>
             <div className="vote-down" onClick={this.votes.bind(this, 0)}>
                <span role="img" aria-label="dislike" className="anticon anticon-dislike">
                   <svg viewBox="64 64 896 896" focusable="false" data-icon="dislike" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z"></path>
                   </svg>
                </span>
                <div className="percent">{this.state.votesNegative}%</div>
             </div>
          </div>

          <div className="item">
               <div className='dex-score'>
                 <div className="title">{this.line_name_token} Score</div>
                 <div className="score">{this.total_score}</div>
               </div>
          </div>


       </div>

       </>
      )
    }

}
