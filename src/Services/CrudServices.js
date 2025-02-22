
import Axios from "./AxiosServices"
import Configuration from "./../Configuration/Configuration";
import axiosService from "./AxiosServices";  // Import the instance correctly
//const axios = new Axios();


//const Config = new Configuration();

// export default class CrudServices   {
//   CreateRecord(data){
//     console.log("data : "+ data+ " Url : "+ Configuration.CreateRecord);
//     return axios.post(Configuration.CreateRecord, data, false)
//   }
// }
export default class CrudServices {
    CreateRecord(data) {
      console.log("Data:", data, "Url:", Configuration.CreateRecord);
      return axiosService.post(Configuration.CreateRecord, data);
    }

    ReadRecord(){
        console.log("Url : ",Configuration.GetRecord)
        return axiosService.get(Configuration.GetRecord,false)
    }

    UpdateRecord(data){
      console.log("Url : ",Configuration.UpdateRecord)
      return axiosService.put(Configuration.UpdateRecord, data, false)
    }
    
    DeleteRecord(data){
      console.log("Url : ",Configuration.DeleteRecord)
      return axiosService.delete(Configuration.DeleteRecord, {data:{id:data.id}}, false)
    }
  }