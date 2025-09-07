const resolveCondition = (resolve)=>{
    if (err) {
                console.log(err);
                resolve({
                    status :400,
                    message : err
                })
            } else {
                resolve({
                    status :201,
                    message : rows.insertId
                })
            }
}


export default resolveCondition