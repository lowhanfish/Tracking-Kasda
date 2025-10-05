import useStorex from "../store";
import axios from axios






export const getDataGroup = async () =>{

    const {url} = useStorex();

    const TOKEN = localStorage.getItem("authToken");
    return new Promise((resolve, reject) => {
        
        axios.get(url.URL_MENU,{
            headers : {
                'Content-Type' : 'application/json',
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


export const getUnitKerja = async (data)=>{
    const TOKEN = localStorage.getItem("authToken");

    return new Promise((resolve, reject) => {
        
        axios.post(url.URL_UNIT_KERJA, JSON.stringify({data : data}),{
            Headers : {
                'Authorization' : `kikensbatara ${TOKEN}`,
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            console.log(response.data)
            resolve(response.data)
        }).catch(error => {
            console.log(error)
            resolve(error)
        })

    })


}


