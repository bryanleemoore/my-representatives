import React, { Component } from 'react'
import backIcon from '../images/Back-Icon.png'
import axios from 'axios'
import IndividualRepresentative from './IndividualRepresentative';
import "./styles/Representatives.css";
export default class Representatives extends Component 
{
  constructor(props) 
    {
        super(props);

        this.state = 
        {
            senator1 : null,
            senator2 : null,
            houserep : null,   
        };
    
 
 
      } 
  async GetRepNames()
  {

 
    let payload = {'address': this.props.constituent}

    const params = new URLSearchParams(payload);
    console.log('bing4523523')
    let res = await axios.get(
      `https://my-representatives.herokuapp.com/representatives?${params}`)
  console.log(res);
      this.setState({houserep : {
        district: res.data.house.district, 
        official: res.data.house.officials[0],
        title: res.data.house.title,
        ocd_id: res.data.house.ocd_id
      }, senator1 : {
        district: res.data.senators.district, 
        official: res.data.senators.officials[0],
        title: res.data.senators.title,
        ocd_id: res.data.senators.ocd_id
      },senator2 : {
        district: res.data.senators.district, 
        official: res.data.senators.officials[1],
        title: res.data.senators.title,
        ocd_id: res.data.senators.ocd_id
      }})


      console.log(this.state.houserep)
      console.log(this.state.senator1)
      console.log(this.state.senator2)
  
    
  }
  componentDidMount() 
  {
    console.log('bing')
    this.GetRepNames() 
  }
  componentDidUpdate() 
  {
    /*       <div>Representatives Page
      <button><img src={backIcon} alt="my image" onClick={() => this.props.setConstituent(null)} /></button>
      <div> Address
            <p>
                {this.props.constituent.street} St. {this.props.constituent.city} {this.props.constituent.zipcode}
          </p>
      </div> */
  }
  render() 
  {
    return (

        
        this.state.houserep ?  
          <div className="allRep-box">
           
            <IndividualRepresentative representative = {this.state.houserep}></IndividualRepresentative>
            <IndividualRepresentative representative = {this.state.senator1}></IndividualRepresentative>
            <IndividualRepresentative representative = {this.state.senator2}></IndividualRepresentative>
          </div> 
          : <div>{console.log(this.props.constituent)}</div>
      

 
   
    )
  }
}
