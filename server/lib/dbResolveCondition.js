const dbResolveCondition = (resolve, err, rows)=>{
    if (err) {
        console.log(err);
        resolve({
            status :500,
            message : err
        })
    } else {
        resolve({
            status :200,
            message : rows
        })
    }
}


export default dbResolveCondition