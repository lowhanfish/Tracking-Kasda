const accessUnit = (data)=>{
    if(data == 0){
        return "Sub-Unit Kerja"
    }else if(data == 1){
        return "Unit Kerja"
    }else{
        return "Instansi"
    }
}


function capitalizeWords(str) {

    if(str){
        return str
          .toLowerCase()
          .replace(/\b\w/g, c => c.toUpperCase());
    }
    else{
        return "-"
    }


}


export {accessUnit, capitalizeWords}