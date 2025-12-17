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
            // console.log(response.data)
            resolve(response.data)
        }).catch(err =>{
            console.log(err)
            resolve(err)
        })
    })
}

export const GetUnitKerja = async (data, token, url)=>{
    
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
            resolve(response.data)
        }).catch(error => {
            console.log(error)
            resolve(error)
        })

    })
}

export const getAllUserGroup = async (token, url) =>{

    return new Promise ((resove, reject)=>{
        console.log(url.URL_GROUP+'/')
        // console.log(url.URL_GROUP)
        axios.get(url.URL_GROUP+'/', {
            headers : {
                Authorization : `kikensbatara ${token}`,
                "Content-Type" : 'application/json'
            }
        }).then(result => {
            resove(result.data)
        }).catch(error => {
            reject(error)
            console.log(error)
        })

    })


}

export const getTahapan = async (token, url, data)=>{
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(data), {
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : `kikensbatara ${token}`
            }
        }).then(result => {
            // console.log(result.data)
            resolve(result.data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

export const getPOST = async (token, url, data)=>{
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(data), {
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : `kikensbatara ${token}`
            }
        }).then(result => {
            // console.log(result.data)
            resolve(result.data)
        }).catch(error => {
            console.log(error)
            reject(error)
        })
    })
}

