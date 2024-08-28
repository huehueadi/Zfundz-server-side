import mongoose from 'mongoose';

const rolesSchema = new mongoose.Schema({
    roleName: { 
        type: String, 
        required: true, 
        unique: true 
    },
    permissions: [
        {
          permissionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
            required: true,
          },
          actionIds: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Action',
              required: true,
            },
          ],
        },
      ],
      created_at: { type: Date, default: Date.now },
      
    });

const Role = mongoose.model("Role", rolesSchema);

export default Role;




