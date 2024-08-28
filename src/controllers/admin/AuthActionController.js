import Action from "../../models/action.js";
export const addAction = async (req, res) => {
    try {
        const existingAction = await Action.findOne({ actionName: req.body.actionName });
        
        if (existingAction) {
            
            return res.status(400).json({
                message: "This action is already added",
                success: false
            });
        } else {
          
            const newAction = new Action({
                actionName: req.body.actionName,
            });
            await newAction.save();
            return res.status(200).json({
                message: "Action Added Successfully",
                success: true
            });
        }

    } catch (error) {
        console.error("Error in addAction:", error);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false
        });
    }
};

export const viewAction = async(req, res) =>{

    try {
        const allActions = await Action.find({})
        res.status(200).json({
            message:"Successful",
            success:true,
            allActions

        })

        
    } catch (error) {
        res.status(404).json({
            message:"Internal Error",
            success:false,
            error
        })
        
    }

}
