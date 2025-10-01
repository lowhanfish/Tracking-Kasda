import axios from axios

export const getDataGroup = async () =>{

    const TOKEN = ``
    return new Promise((resolve, reject) => {
        
        axios.get(URLX,{
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `kikensbatara ${TOKEN}`
            }
        }).then(response =>{
            console.log(response)
            resolve(response.data)
        }).catch(err =>{
            console.log(err)
            resolve(err)
        })
    })


}


