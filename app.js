const user=require('express')();
const { json } = require('express');
const fs =require('fs')
const PORT=3000
user.listen(PORT,()=>console.log(`Server Run ON ${PORT}`))


let data=JSON.parse(fs.readFileSync('./Data/UserData.json'))

user.post('/users',(req,res)=>{
    const NewId=data[data.length-1].id+1
    const NewUser=Object.assign({id:NewId},req.body);
    data.push(NewUser)

    fs.writeFile('./Data/UserData.json',JSON.stringify(data),(err)=>err?res.status(500).json({status:'error',message:"Inernal Server Eroor"}):res.status(200).json({status:'succes',data:{user:NewUser}}))
})
user.get('/users',(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            users:data
        }
    })
})
user.get('/users/:id',(req,res)=>{
    const Id=+req.params.id;
    const user=data.find((id)=>id.id===Id);
    if(!user){
        res.status(404).json({
            status:'error',
            messge:'User Not Found !'
        });
        return
    }
    res.status(200).json({
        status:'Succes',
        data:{
            user:user
        },
    });
});
user.patch('/users/:id',(req,res)=>{
    const Id=+req.params.id
    let updateUser=data.find((id)=>id.id===Id)

    if(!updateUser){
        res.status(404).json({
            status:"error",
            message:'User Not Found !'
        });
        return 
    }
    Object.assign(updateUser,req.body)
    fs.writeFile('./Data/UserData.json',JSON.stringify(data),(err)=>{
        if(err){
            res.status(500).json({
                status:"error",
                message:'Internal Server Error'
            });
        }else{
            res.status(200).json({
                status:'succes',
                data:{
                    user:updateUser
                },
            });
        }
    });
})
user.delete('/users/:id',(req,res)=>{
    const Id=+req.params.id;
    const delUser=data.find((id)=>id.id===Id);

    if(!delUser){
        res.status(404).json({
            status:'Error',
            message:'User Not Found !'
        })
        return;
    }
    const index=data.indexOf(delUser);
    data.splice(index,1);
    fs.writeFile('./Data/UserData.json',JSON.stringify(data),(err)=>{
        if(err){
            res.status(500).json({
                status:'error',
                message:'Internal Server Error'
            });

        }else{
            res.status(200).json({
                status:'succes',
                data:{
                    user:null
                }
            })
        }
    })
})