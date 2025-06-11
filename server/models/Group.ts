import{ Schema, model, Model } from "mongoose";

import { GroupInt } from "../utils/types";

type GroupModel = Model<GroupInt>;
const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

});

const Group = model<GroupInt, GroupModel>('Group', groupSchema);

export default Group;