import mongoose from 'mongoose';
import Ticket from '../../models/ticket.js';

export const getPortfolio = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from the middleware

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid User ID",
                success: false
            });
        }

       
        const tickets = await Ticket.find({ user_id: userId }).populate('property_id');

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({
                message: "No tickets found for this user",
                success: false
            });
        }

        // Map the tickets to the desired format
        const portfolio = tickets.map(ticket => {
            const property = ticket.property_id;
            return {
                propertyName: property ? property.property_name : null,
                propertyLocation: property ? property.property_address : null,
                anticipatedCost: property ? property.property_cost : null,
                totalInvestment: ticket.ticket_price * ticket.quantity,
                numberOfTickets: ticket.quantity,
                ticketPrice: ticket.ticket_price,
                purchaseTime: ticket.purchase_date
            };
        });

        res.status(200).json({
            message: "Fetched portfolio details",
            success: true,
            portfolio
        });
    } catch (error) {
        console.error('Error fetching portfolio by user ID:', error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};
