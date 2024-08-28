import Properties from "../../models/RegisterProperty.js";

export const register = async ( req, res) =>{
    try {
        const {property_name,property_address,property_description, property_type,space,property_cost,maintainence_cost,total_investment,annual_returns,maximum_roi} = req.body

        const isExistingProperty = await Properties.findOne()

        if(isExistingProperty){
           return res.status(400).json({
                message:"Property is already Regsitered",
                success: false
            })
        }
        const newProperty =  new Properties({
            property_name,
            property_address,
            property_description,
            property_type,
            space,
            property_cost,
            maintainence_cost,
            total_investment,
            annual_returns,
            maximum_roi
        })

        await newProperty.save()
        
        return res.status(200).json({
            message:"Property is regsitered Successfully",
            success:true,
            newProperty
        })
    } catch (error) {
       res.status(404).json({
            message:"Internal Server Error",
            success:false,
            error:[]
        })
        
    }
}

export const propertyListings = async (req, res) =>{
    try {
        
        const allListings = await Properties.find()

        return res.status(200).json({
            message:"Properties fetch successfully",
            success:true,
            allListings
        })        
    } catch (error) {
     res.status(200).json({
        message:"Internal Server Error",
        success:false,
        error
     })
    }
}

