import mongoose  from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    profilePicture:{
        type: String,
        default: "",
    },

    // friends: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }],
},{timestamps: true});    

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt= await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.matchPassword=async function (enteredPassword){
    const isMatch= await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

const User = mongoose.model("User", userSchema);

export default User;