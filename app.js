const user=require('express')();
const fs =require('fs')
const PORT=3000
user.listen(PORT,()=>console.log(`Server Run ON ${PORT}`))


let data=JSON.parse(fs.readFileSync('./Data/UserData.json'))

user.post('/users',)
user.get('/users',(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            users:data
        }
    })
})
user.get('/users/:id',(req,res)=>{
    const newId=user
})
user.put('/users/:id')
user.delete('/users/:id')