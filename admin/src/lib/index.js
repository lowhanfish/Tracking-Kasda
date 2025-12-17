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

const formatDate = (date) => {
    if (!date) return '-';
    
    try {
        const dateObj = new Date(date);
        
        if (isNaN(dateObj.getTime())) return '-';
        
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        
        return `${day}-${month}-${year} (${hours}:${minutes}:${seconds} WITA)`;
    } catch (error) {
        return '-';
    }
}




export {accessUnit, capitalizeWords, indexingPage, formatDate}