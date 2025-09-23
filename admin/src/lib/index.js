const accessUnit = (data)=>{
    if(data == 0){
        return "Sub-Unit Kerja"
    }else if(data == 1){
        return "Unit Kerja"
    }else{
        return "Instansi"
    }
}



export {accessUnit}