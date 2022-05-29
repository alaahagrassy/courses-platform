const { Categories, Courses } = require('../Models')
const CategoriesModel = Categories

// add category function
addCategoty = async (req ,res)=>{

    const {name} = req.body
    const NewCategory = await Categories.create({
        name
    })
    NewCategory.save()
    .then(result=>{
        res.status(201).json({
            message:"added successfully",
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}


//get all category

get = async (req , res)=>{
    const categories = CategoriesModel.findAll({
        include : Courses,
        raw : true
    }).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json({
            Error :err
        })
    })
}

////get one category
getOne = async(req ,res)=>{
    const {id} = req.params
    const category = await CategoriesModel.findOne({where:{id : id} , include :Courses }).then(data=>{
        if(!data)
        return res.status(404).json('Not Found')

        return res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json({
            Error : err
        })
    })
}
 // edit Category 
 Edit = async (req , res)=>{
     const { id } = req.params
     const {name} = req.body
     const category = await CategoriesModel.findOne({where :{id:id}})
     if(!category)
     return res.status(404).json("Not Found")

     category.update({name : name})
     res.status(200).json("updated")

 }

 //delete category

 deleteCategory = async (req , res)=>{
     const {id} = req.params
     const category = await CategoriesModel.destroy({where : {id : id}}).then(data=>{
         if(!data)
         return res.status(404).json('Not Found')
         return res.status(200).json({
             message : "Deleted"
         })
     }).catch(err=>{
        res.status(500).json({
            Error:err
        })
     })
 }


module.exports = {addCategoty , get , getOne,Edit , deleteCategory}