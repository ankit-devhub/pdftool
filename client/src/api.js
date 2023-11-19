import axios from "axios";

const convertpdf = ({uploadedFileName,pageArray})=>{
    return axios.get("http://localhost:5000/convertpdf",
        {
            fileName:uploadedFileName,
            selectedPages:pageArray
        }
    ).then((response)=>{
        console.log(response.data);
        // return response.data;
    }).catch((error)=>{
        return error;
    })
}

