import React, {Component} from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Votes from './Votes';
import "./styles/IndividualRepresentative.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faYoutube, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcons } from '@fortawesome/free-brands-svg-icons'
import { Button, Modal } from 'react-bootstrap';



library.add(fas, faTwitter, faFacebook, faYoutube,faFontAwesome)

export default class IndividualRepresentative extends Component 
{
  constructor(props) 
    {
        super(props);
        this.state = 
        {
          memberID : null,
          info : null,
          show: false
        }
    }

    async getMemberId()
      {
        
        const name = this.props.representative.official.name.split(' ')
        
        const firstname = name[0]
        const lastname = name[name.length -1]

        console.log(firstname, lastname, this.props.representative.ocd_id)
        var chamber = ''
        if(this.props.representative.title == 'U.S. Representative')
        {
          chamber = 'house'
        }
        else
        {
          chamber = 'senate'
        }
        var payload = {'firstname' : firstname, 'lastname' : lastname, 'ocd_id' : this.props.representative.ocd_id, 'chamber': chamber}
       
        var params = new URLSearchParams(payload);
  
        let resMemberID = await axios.get(
          `http://127.0.0.1:8000/backend/memberID?${params}`)
        

        var payload = {'memberID' : resMemberID.data}
        var params = new URLSearchParams(payload);
        let resInfo = await axios.get(`http://127.0.0.1:8000/backend/info?${params}`)
  
    
        this.setState({memberID : resMemberID.data, info : resInfo.data.results[0]})
      }
      getLink()
      {
        return 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/'+ this.state.memberID + '.jpg'
      }
      componentDidMount() 
      {
        if(this.state.memberID == null)
        {
          this.getMemberId();
        }
      }
      componentDidUpdate() 
      {
        //<Votes memberID = {this.state.memberID}></Votes>

        /*  <div className = "info-column">
          <p>{this.props.representative.official.name}</p> 
          <img className = "rep-pic" src={this.getLink()}></img>
        </div> */
      }

    getPartyAndState()
    {
      if(this.props.representative.title == 'U.S. Representative')
      {
        return <p>{this.state.info.current_party}-{this.state.info.roles[0].state}{this.state.info.roles[0].district}</p>
      }
      else
      {
        return <p>{this.state.info.current_party}-{this.state.info.roles[0].state}</p>
      }
    }
    getContactInformation()
    {
      if(this.state.info.roles[0].office == null)
      {
        return <div className ="office-info">
                  <div className = "address">
                    <p>Address</p>
                    <p>Russell Senate Office Building</p>
                    <p>Washington, DC 20515</p>
                  </div>
                  <div className = "phone">
                    <p>Phone: Unknown</p>
                  </div>
              </div>
      }
      else
      {
        return  <div className ="office-info">
                  <div className = "address">
                    <p>Address</p>
                    <p>{this.state.info.roles[0].office}</p>
                    <p>Washington, DC 20515</p>
                  </div>
                  <div className = "phone">
                    <p>Phone: {this.state.info.roles[0].phone}</p>
                  </div>
                </div>
      }
    }
    getLinks()
    {
      var links = []
      links.push(<div className ="rep-website"><a href={this.state.info.url}><FontAwesomeIcon icon="fa-solid fa-globe" /></a></div>)
      if(this.state.info.twitter_account != null)
      {
        const twitterLink = "https://twitter.com/" + this.state.info.twitter_account
        links.push(<div className ="rep-twitter"><a href={twitterLink}> <FontAwesomeIcon icon="fa-brands fa-twitter" /></a></div>)
      }
      if(this.state.info.facebook_account != null)
      {
        const facebookLink = "https://facebook.com/" + this.state.info.facebook_account
        links.push(<div className ="rep-facebook"><a href={facebookLink}><FontAwesomeIcon icon="fa-brands fa-facebook" /></a></div>)
      }
      if(this.state.info.youtube_account != null)
      {
        const youtubeLink = "https://youtube.com/" + this.state.info.youtube_account
        links.push(<div className ="rep-youtube"><a href={youtubeLink}><FontAwesomeIcon icon="fa-brands fa-youtube" /></a></div>)
      }
      return <div className = "links">{links}</div>;
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    render()
    {
    return(

      this.state.memberID ? 
      <div className ="individualRep-box">
          <div className = "rep-name-row">
            <p className = "rep-name-text">{this.props.representative.title} {this.props.representative.official.name}</p> 
          </div>
          <div className = "rep-pic-row">
            <img className = "rep-pic" src={this.getLink()}></img>
          </div>
          <div className ="rep-party-and-state-row">
            {this.getPartyAndState()}
          </div>
          <div className ="rep-next-election-row">
            {<p>Next election in {this.state.info.roles[0].next_election}</p>}
          </div>
          <div className ="rep-contact-row">
            {this.getContactInformation()}
          </div>
          <div className ="rep-links-row">
            {this.getLinks()}
          </div>
          <div className = "rep-votes-row">
          <>
            <Button variant="primary" onClick={this.handleShow}>
              View Most Recent Floor Votes
            </Button>

            <Modal scrollable = "true" size="lg" show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Most Recent Floor Votes</Modal.Title>
              </Modal.Header>
              <Modal.Body><Votes memberID={this.state.memberID} name={this.props.representative.official.name}></Votes></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
    </>


          </div>
      

      </div> : ''
 
  )}

}


