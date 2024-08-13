import mongoose from 'mongoose';
import User from './user.model.js';

const adminSchema = new mongoose.Schema({
    Permissions:{
        type: [String],
        default: [],
    },
});

const Admin = User.discriminator('Admin', adminSchema);

export default Admin;