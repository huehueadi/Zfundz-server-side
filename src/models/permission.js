import mongoose from "mongoose";

const permissionsSchema = new mongoose.Schema({
    permissionName: { type: String, required: true },
});

const Permission = mongoose.model('Permission', permissionsSchema);

export default Permission;
