import React, { Component } from 'react'
import "./HomePage.scss"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CrudServices from '../Services/CrudServices';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Creating an instance of CrudServices
const service = new CrudServices();
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      UserId:'',
      UserName: '',
      Age: '',
      DataRecord: [],//Stores fetched record
      UpdateFlag:false // Flag to check if we are updating an existing record
    }
  }

  // Lifecycle method - componentWillMount 
  componentWillMount() {
    console.log("Component Will Mount Calling");
    this.ReadRecord();

  }

  // Function to fetch records from the API
  ReadRecord() {
    service.ReadRecord().then((data) => {
      console.log(data)
      console.log(data.data.readRecordData)
      this.setState({ DataRecord: data.data.readRecordData })// Updating state with fetched data
    }).catch((error) => {
      console.log(error)
    })
  }

  // Handle input changes dynamically for all fields
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  // Handle submit button click
  handleClick = () => {
    if (this.state.UserName === '' || this.state.Age === '') {
      console.log("Input Field Is Empty");
      return;
    }

    console.log("Data : ", this.state)

 if(this.state.UpdateFlag === false){

   // Create new record
    const data = {
      userName: this.state.UserName,
      age: Number(this.state.Age),
    }
    console.log('data : ', data)

    service
      .CreateRecord(data)
      .then((data) => {
        console.log(data)
        this.ReadRecord()// Refresh records after creation
      }).catch((error) => {
        console.log(error)
      })
  }else{
    // Update existing record
    const data = {
      id: Number(this.state.UserId),
      userName: this.state.UserName,
      age: Number(this.state.Age),
    }
    console.log("Sending data to API:", data);

    service.UpdateRecord(data)
    .then((data)=>{
    console.log(data)
    this.ReadRecord() // Refresh records after update
  }).catch((error)=>{
    console.log(error);
  })
  }
   // Reset form fields and update flag after operation
  this.setState({UpdateFlag:false, UserName:'', Age:''})
  }

   // Function to handle edit action
  handleEdit = (data) => {
    this.setState({
      UserName:data.userName,
      Age:data.age,
      UserId:data.id,
      UpdateFlag:true
      
    })
  }

  // Function to handle delete action
  handleDelete = (datas) => {
    const data = {
      id: Number(datas.id),
    }
    service.DeleteRecord(data).then((data)=>{
      console.log(data)
      this.ReadRecord()// Refresh records after deletion
    }).catch((error)=>{
      console.log(error)
    })
  }
  render() {
    let state = this.state;
    let Self = this;
    return (
      <div className='MainContainer'>
        <div className="SubContainer">
          <div className="Box1" >
            <div className="Input-Container">
              <div className="flex-Container">
                <TextField
                  fullWidth
                  label="UserName" name="UserName" size="small" variant="outlined"
                  value={state.UserName}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="flex-Container">
                <TextField fullWidth label="Age" name="Age" size="small" variant="outlined"
                  value={state.Age}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="flex-button">
                <Button variant="contained" color="primary" onClick={this.handleClick}>Submit</Button>
              </div>
            </div>
          </div>
          <div className="Box2">
            {
              Array.isArray(this.state.DataRecord) &&
                this.state.DataRecord.length > 0 ?
                this.state.DataRecord.map(function (data, index) {
                  return (
                    <div key={index} className="data-flex">
                      <div className="UserId">
                        {data.id}</div>
                      <div className="UserName">
                        {data.userName}</div>
                      <div className="Age">
                        {data.age}</div>
                        <div className="Update">
                        <Button variant="outlined" color="primary" onClick={()=>{Self.handleEdit(data)}}>
                      <EditIcon/>
                    </Button>
                    </div>
                    <div className="Delete">
                        <Button variant="outlined"  onClick={()=>{Self.handleDelete(data)}}>
                      <DeleteIcon/>
                    </Button>
                    </div>
                    </div>
                    
                    
                  )
                }) :
                
                <div></div>
            }
          </div>
        </div>

      </div>
    )
  }
}
