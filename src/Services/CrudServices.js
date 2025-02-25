
import Configuration from "./../Configuration/Configuration";// Importing configuration for API endpoints
import axiosService from "./AxiosServices";  // Importing the Axios instance

// Class to handle CRUD operations using Axios service
export default class CrudServices {
  // Method to create a new record
    CreateRecord(data) {
      console.log("Data:", data, "Url:", Configuration.CreateRecord);
      return axiosService.post(Configuration.CreateRecord, data);
    }

    // Method to read records from the API
    ReadRecord(){
        console.log("Url : ",Configuration.GetRecord)
        return axiosService.get(Configuration.GetRecord,false)
    }

     // Method to update an existing record
    UpdateRecord(data){
      console.log("Url : ",Configuration.UpdateRecord)
      return axiosService.put(Configuration.UpdateRecord, data, false)
    }
    
     // Method to delete a record based on ID
    DeleteRecord(data){
      console.log("Url : ",Configuration.DeleteRecord)
      return axiosService.delete(Configuration.DeleteRecord, {data:{id:data.id}}, false)
    }
  }