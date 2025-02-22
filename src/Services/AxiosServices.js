// import React, { Component } from 'react'
// const Axios = require('axios').defaults
// export default class AxiosServices {
// post(url, data, Header){
//     return Axios.post(url, data, Header);
// }
// }
import axios from 'axios';

class AxiosServices {
  post(url, data, headers = {}) {
    return axios.post(url, data, { headers });
  }

  get(url, IsRequired=false, Header){
    return axios.get(url, IsRequired && Header)
  }

  put(url, data, IsRequired = false, Header){
    return axios.put(url, data, IsRequired && Header)
  }
  delete(url, data, IsRequired = false, Header){
    return axios.delete(url, data, IsRequired && Header)
  }
}

export default new AxiosServices();
