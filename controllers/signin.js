const handleSignin = (req,res, db, bcrypt)=>{
    const {email, password} = req.body;
    console.log("------------------------email" + email);
    if (!email || !password ) {
        console.log("duzgun yaz mk")
        return res.status(400).json('incorrect form submission'); 
    }
    console.log("---------------------->>>>>>>>>handle sign in dolu")
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
    .catch(err=>{
        res.status(401).json('timeout hatası')
        console.log(err)})
}

module.exports ={
    handleSignin: handleSignin
}