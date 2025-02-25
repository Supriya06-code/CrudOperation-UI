
import axios from 'axios';

class AxiosServices {
  //Post request method
  post(url, data, headers = {}) {
    return axios.post(url, data, { headers });
  }

  //get request method
  get(url, IsRequired=false, Header){
    return axios.get(url, IsRequired && Header)
  }

  //put request method
  put(url, data, IsRequired = false, Header){
    return axios.put(url, data, IsRequired && Header)
  }

  //delete request method
  delete(url, data, IsRequired = false, Header){
    return axios.delete(url, data, IsRequired && Header)
  }
}

export default new AxiosServices();
