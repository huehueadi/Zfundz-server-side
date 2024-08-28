import Permission from "../../models/permission.js";
export const addPermission = async ( req, res)=>{
    try {
        const isExistingPermission = await Permission.findOne({permissionName: req.body.permissionName});

        if(isExistingPermission){
            res.status(401).json({
                message:"Permission already Exists",
                success:false
            })
        }
        const newPermission = await new Permission({
            permissionName: req.body.permissionName,
        })
        await newPermission.save()
       res.status(200).json({
        message:"Permission Added Successfully",
        Success:true,
        
       })
    } catch (error) {
        res.status(404).json({
            error:"Internal Server Error", error,
            success:false
        })
    }
}
export const viewPermission = async(req, res)=>{
    try {
        const viewAll =  await Permission.find({})
        res.json(viewAll);
        
    } catch (error) {
        res.status(200).json({
            message:"Internal Server Error",
            success:false
        })
        
    }
}
