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

const indexingPage = (page_first, page_limit, index)=>{
    console.log(page_first)
    var idx = ((page_first-1)*page_limit)+index
    return idx+1;
}




export {accessUnit, capitalizeWords, indexingPage}