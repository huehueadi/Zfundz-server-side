import Ticket from "../../models/ticket.js";
export const purchaseTicket = async(req, res)=>{
    try {
       const { property_id, ticket_price, user_id, quantity} = req.body
        const isExisting = await Ticket.findOne();
        
        if(isExisting){
            res.status(400).json({
                message:"Ticket already found",
                success:false
            })
        }
       const createTicket = new Ticket({
        property_id, 
        ticket_price, 
        user_id, 
        quantity

       })
       await createTicket.save()
        
       res.status(200).json({
        message:"Ticket create successfully",
        success:true,
        createTicket
       })

    } catch (error) {
        res.status(404).json({
            message:"Internal Server Error",
            success:false,
            error 

        })
    }
}