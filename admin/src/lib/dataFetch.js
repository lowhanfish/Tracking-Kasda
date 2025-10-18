import useStorex from "../store";
import axios from 'axios'






export const GetDataGroup = async () =>{

    const {url} = useStorex();

    const TOKEN = localStorage.getItem("authToken");
    return new Promise((resolve, reject) => {
        
        axios.get(url.URL_MENU,{
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `kikensbatara ${TOKEN}`
            }
        }).then(response =>{
            console.log(response.data)
            resolve(response.data)
        }).catch(err =>{
            console.log(err)
            resolve(err)
        })
    })
}


export const GetUnitKerja = async (data, token, url)=>{
    
    console.log("TOKENKU : ",token)
    

    return new Promise((resolve, reject) => {

        
        axios.post(url.URL_UNIT_KERJA+"/", JSON.stringify({
            data : data
        }),
        {
            headers: {
                'Authorization': `kikensbatara ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            // console.log(response.data)
            resolve(response.data)
        }).catch(error => {
            console.log(error)
            resolve(error)
        })

    })


}


