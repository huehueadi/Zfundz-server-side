import Property from "../../models/propertyListing.js";

export const addProperty = async(req, res)=>{
    const {propertyName, propertyType, propertyAddress, marketValue} = req.body
    try {
        // const errors = validationResult(req)
        // if(!errors.isempty()){
        //     return res.status({
        //         message:"Validtion Error",
        //         success:false,
        //         errors: errors.array()
        //     })
        // }
        const isExisting = await Property.findOne({propertyName : req.body.propertyName})

        if(isExisting){
          return res.status(400).json({
            message:"Property is already exists",
            success:false
          })
        }
        const newProperty = new Property({
            propertyName,
            propertyAddress,
            propertyType,
            marketValue,
        })

        await newProperty.save()
        res.status(200).json({
            message:"Property Added Successfully",
            success:true,
        })
        
    } catch (error) {
        console.error("There is server error")
        res.status(404).json({
            message:"Internal Server Error",
            success:false,
            error

        })
        
    }
}
export const updateProperty = async (req, res) => {
    const { propertyId } = req.params;
    const updateData = req.body;
  
    try {
      const updatedProperty = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });
  
      if (!updatedProperty) {
        return res.status(404).json({
          message: "Property not found",
          success: false
        });
      }
  
      res.status(200).json({
        message: "Property updated successfully",
        success: true,
        property: updatedProperty
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message
      });
    }
  };
export const viewAllProperty = async (req, res) => {
    try {
      const allProperty = await Property.find();
      res.status(200).json(allProperty);
    } catch (error) {
      console.error('Error fetching Properties:', error);
      res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message
      });
    }
  };

export const deleteProperty = async (req, res)=>{
     const propertyId = req.params.propertyId

    try {
     const propertyDelete = await Property.findByIdAndDelete(propertyId)
        if(!propertyDelete){
            res.status(400).json({
                message:"Property Not found",
                succes:false
            })
        }
     res.status(200).json({
        message:"Property Deleted Successfully",
        success:false,

     })
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            success:false
        })
        
    }
}

export const viewProperty = async (req, res)=>{
     
    const propertyId = req.params.propertyId

   try {
    const view = await Property.findById(propertyId);
    return res.status(200).json(view);
    
   } catch (error) {
    console.error("Error while fetching Properties", error)
   return res.status(400).json({
        message:"Internal Server Error",
        success:false
    })
    
   }

}

