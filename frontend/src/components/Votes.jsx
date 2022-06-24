import React, {Component} from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/Votes.css";
export default class Votes extends Component 
{
  constructor(props) 
    {
        super(props);
        this.state = 
        {
          votes : null
        }
    }
    componentDidMount() 
    {
        if(this.state.votes == null)
        {
            this.getVotes();
        }
        console.log(this.state.votes)
    }
    componentDidUpdate() 
    {
      
    }

    async getVotes()
    {
        const memberID = this.props.memberID
        var payload = {'memberID' : memberID}
       
        const params = new URLSearchParams(payload);
  
        let res = await axios.get(
          `http://127.0.0.1:8000/backend/votes?${params}`)
        
        this.setState({votes : res.data.results[0].votes})
    }

    getBillLink(element)
    {
  
      var billID = element.split("-")
      billID = billID[0]


      var x = billID.match(/[^\d]+|\d+/g);
      if(x[0] == 'pn')
      {
   
  
        return 'https://www.congress.gov/nomination/117th-congress/' + x[1];
      }
      else
      {
  
       
        return 'https://www.govtrack.us/congress/bills/117/' + x[0] + x[1];
      }

    }
    
    getVoteStyle(vote)
    {
      if(vote == 'Yes')
      {
        return 'bill-rep-position-yes'
      }
      else if(vote == 'No')
      {
        return 'bill-rep-position-no'
      }
      else
      {
        return 'bill-rep-position'
      }
    }
    votes()
    {
        var result =  this.state.votes.reduce(function (r, a) {
          r[a.date] = r[a.date] || [];
          r[a.date].push(a);
          return r;
      }, Object.create(null));
      console.log('TEST!')
      console.log(result);
      var bills = []
      for(var day in result)
      {
          var billsOnDay = []
          console.log(result[day])
          for(var element in result[day]) 
          {
            element = result[day][element]
            billsOnDay.push(
            <div className='bill'>
             <div className= 'date-row'>
                          
                        </div>
                        <div className='first-row'>
                              <a className='bill-number' href={this.getBillLink(element.bill.bill_id)} target="_blank">{element.bill.number}:</a> 
                              {element.bill.title ? 
                                <p className='bill-title'> {element.bill.title}</p> :
                                <p className='bill-title'> {element.description}</p>
                              
                            }
    
                        </div>
                        <div className='second-row'>
                            <p className='bill-rep-name'>{this.props.name} voted </p>
                            <p className={this.getVoteStyle(element.position)}>{element.position} </p>
                            <p className='bill-question'>{element.question}: </p>
                        </div>
                        <div className='third-row'>
                          <p className='bill-result'>{element.result}, </p>
                          <p className='bill-total'>{element.total.no}-{element.total.yes}</p>
                        </div>  
    
                
                              
                        </div>)
            }
            
          bills.push(
            <div><div><p className='bill-date'>{element.date}</p></div>
          <div className='bill-on-day'>
            {billsOnDay}
            </div></div>)
      }

        console.log(bills);
        return <div className="bills">{bills}</div>;
    }
    render()
    {
        return(<div className="votes">
      {this.state.votes ? this.votes() : ''}</div>)
    }
}