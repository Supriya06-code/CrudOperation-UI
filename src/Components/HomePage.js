import React, { Component } from 'react'
import "./HomePage.scss"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CrudServices from '../Services/CrudServices';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const service = new CrudServices();
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      UserId:'',
      UserName: '',
      Age: '',
      DataRecord: [],
      UpdateFlag:false
    }
  }

  componentWillMount() {
    console.log("Component Will Mount Calling");
    this.ReadRecord();

  }

  ReadRecord() {
    service.ReadRecord().then((data) => {
      console.log(data)
      console.log(data.data.readRecordData)
      this.setState({ DataRecord: data.data.readRecordData })
    }).catch((error) => {
      console.log(error)
    })
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }
  handleClick = () => {
    if (this.state.UserName === '' || this.state.Age === '') {
      console.log("Input Field Is Empty");
      return;
    }

    console.log("Data : ", this.state)

 if(this.state.UpdateFlag === false){

    const data = {
      userName: this.state.UserName,
      age: Number(this.state.Age),
    }
    console.log('data : ', data)

    service
      .CreateRecord(data)
      .then((data) => {
        console.log(data)
        this.ReadRecord()
      }).catch((error) => {
        console.log(error)
      })
  }else{
    const data = {
      id: Number(this.state.UserId),
      userName: this.state.UserName,
      age: Number(this.state.Age),
    }
    console.log("Sending data to API:", data);

    service.UpdateRecord(data)
    .then((data)=>{
    console.log(data)
    this.ReadRecord()
  }).catch((error)=>{
    console.log(error);
  })
  }
  this.setState({UpdateFlag:false, UserName:'', Age:''})
  }
  handleEdit = (data) => {
    this.setState({
      UserName:data.userName,
      Age:data.age,
      UserId:data.id,
      UpdateFlag:true
      
    })
  }
  handleDelete = (datas) => {
    const data = {
      id: Number(datas.id),
    }
    service.DeleteRecord(data).then((data)=>{
      console.log(data)
      this.ReadRecord()
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
