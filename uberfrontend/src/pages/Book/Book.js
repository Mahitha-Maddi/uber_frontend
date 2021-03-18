import React, { Component } from "react";
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
//import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

class Book extends React.Component {
  constructor() {
    super();
    this.state = {
      source: '',
      destination: '',
      date: '',
      availableBuses: '',
      user: ''
    }
    //this._handleSubmit = this._handleSubmit.bind(this);
  }

  book(item){
    fetch('http://localhost:5000/book', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ source: item.source, destination: item.destination, busnumber: item.busnumber, date: item.date, 
        startTime: item.startTime, endTime: item.endTime,user: this.state.user})
    })
      .then(response =>
        { console.log(response);
          return response.json();
        })
      .then(data => {
       alert("Booked successfully! "+data);

      })
      .catch(error => {
        alert("Booking failed!");
        console.log('Request failed', error)
      });
  }
 
  handleSubmit() {
    fetch('http://localhost:5000/checkAvailability', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ source: this.state.source, destination: this.state.destination, date: this.state.date })
    })
      .then(response =>
        { console.log(response);
          return response.json();
        })
      .then(data => {
        console.log(data)
        this.setState({availableBuses:<tbody>{ data.map((item, index) => (<tr><td key={index}>{item.source}</td><td key={index}>{item.destination}</td><td key={index}>{item.busnumber}</td><td key={index}>{item.date}</td><td key={index}>{item.startTime}</td><td key={index}>{item.endTime}</td>
          <td><input type="button" value="Book" onClick={this.book.bind(this,item)}/></td></tr>))}</tbody>})
        console.log('Request successful', data); 
        //alert(data);

      })
      .catch(error => {
        this.setState({ availableBuses: "This is an error page!!" })
        console.log('Request failed', error)
      });
  }


  render() {
    const availableBuseslist = this.state.availableBuses;
    //const array=availableBuseslist.split(':');
    console.log(availableBuseslist.length)
    console.log(availableBuseslist)
    //console.log(availableBuseslist[0].destination)

    //availableBuseslist.forEach((key) => {console.log(key) });
    //const j=JSON.parse(availableBuseslist);
    //console.log(availableBuseslist);
    //console.log(j[0] +"type:"+j.type);
   // console.log(JSON.parse(JSON.stringify(availableBuseslist)));
  
    
    return (
      <React.Fragment>
        <Paper elevation={6}>
          <div>
          <br></br><br></br> <br></br><br></br>
            <Typography component="h1" variant="h5">
              {''}
            </Typography>
            <TextField
              value={this.state.user}
              onInput={(e) => {
                this.setState({ user: e.target.value });
              }}
              ref={ref => this.textField = ref}
              //onKeyUp={this.handleSourceChange.bind(this)}
              variant="outlined"
              margin="normal"
              required
              id="user"
              label={'UserName'}
              name="user"
            /><br></br>
            <TextField
              value={this.state.source}
              onInput={(e) => {
                this.setState({ source: e.target.value });
              }}
              ref={ref => this.textField = ref}
              //onKeyUp={this.handleSourceChange.bind(this)}
              variant="outlined"
              margin="normal"
              required
              id="source"
              label={'Source'}
              name="source"
            /><br></br>
            <TextField
              value={this.state.destination}
              onInput={(e) => {
                this.setState({ destination: e.target.value });
              }}
              ref={ref => this.textField = ref}
              //onKeyUp={this.handleDestinationChange.bind(this)}
              variant="outlined"
              margin="normal"
              required
              id="destination"
              label={'Destination'}
              name="destination"
            /><br></br>
            <TextField
              value={this.state.date}
              onInput={(e) => {
                this.setState({ date: e.target.value });
              }}
              ref={ref => this.textField = ref}
              //onKeyUp={this.handleDateChange.bind(this)}
              variant="outlined"
              margin="normal"
              required
              label={'Date of travel'}
              name="date"
            />
            <br></br><br></br>
            <input type="button" value="Check Availability" onClick={this.handleSubmit.bind(this)} />
          </div>
          <br></br>
         <table border='1'>
            <thead>
              <tr>
                <th>Source</th>
                <th>Destination</th>
                <th>Bus Number</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Book</th>
              </tr>
            </thead>
            {this.state.availableBuses}
          </table>

        </Paper>
      </React.Fragment>
    )
  }
}


export default Book
