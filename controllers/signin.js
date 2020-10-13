const handleSignin = (req,res, db, bcrypt)=>{
    const {email, password} = req.body;
    if (!email || !password ) {
        console.log("duzgun yaz mk")
        return res.status(400).json('incorrect form submission'); 
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email )
    .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash)
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user=>{
                console.log("its valid");
                res.json(user[0]);
            })
            .catch(err=>res.status(400).json('unable to get user'))
        }else{
            console.log("email or pasword wrong")
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err=>console.log(err))
}

module.exports ={
    handleSignin: handleSignin
}