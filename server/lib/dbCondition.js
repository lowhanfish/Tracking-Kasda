const dbCondition = (res, err, rows)=>{
    if (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    } else {
        res.status(200);
        res.send(rows);
    }
}


export default dbCondition