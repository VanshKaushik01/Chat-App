import cloudinary from "../lib/cloudinary.js";
// import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/user.js";
import JWT from "jsonwebtoken";

export async function signup(req, res) {
  const { email, password, fullname } = req.body;

  try {
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists, please use a diffrent one" });
    }

    const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullname,
      password,
      profilePicture: randomAvatar,
    });

    // try {
    //   await upsertStreamUser({
    //     id: newUser._id.toString(),
    //     name: newUser.fullname,
    //     image: newUser.profilePicture || "",  
    //   });
    //   console.log(`Stream user created for ${newUser.fullname}`);
    // } catch (error) {
    //   console.log("Error creating Stream user:", error);
    // }

    const jwtSecret = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";
    const token = JWT.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
    const {email, password} = req.body;
    try {
        if( !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const user =await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const isPasswordValid = await user.matchPassword(password);
        if( !isPasswordValid) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const jwtSecret = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";
         const token=JWT.sign(
        {userId: user._id},
        jwtSecret,
        {expiresIn: '7d'},
    )

    res.cookie('token',token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
        res.status(200).json({success: true, user});

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

export async function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out successfully'}); 
};

export const updateProfile = async (req, res) => {
  try {
    const {profilePicture}=req.body;
    const userId= req.user._id;

    if(!profilePicture){
      return res.status(400).json({message: "Profile pic is required"});
    }

    const uploaResponse=await cloudinary.uploader.upload(profilePicture);
    const updatedUser=await User.findByIdAndUpdate(userId, {profilePicture:uploaResponse.secure_url},{new:true});

    res.status(200).json({message: "User Updated"});
  } catch (error) {
    console.error('error in update profile:', error);
        res.status(500).json({message: 'Internal server error'});
  }
}

export const checkAuth = async( req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error('Error during authentication:', error);
        res.status(500).json({message: 'Internal server error'});
  }
}


// export async function onboard(req, res) {
//   try {
//     const userId = req.user._id;
//     const { fullname, bio, nativeLanguage, learningLanguage, location } = req.body;

//     if (!fullname || !bio || !nativeLanguage || !learningLanguage || !location) {
//       return res.status(400).json({
//         message: "All fields are required",
//         missingFields: [
//           !fullname && "fullname",
//           !bio && "bio",
//           !nativeLanguage && "nativeLanguage",
//           !learningLanguage && "learningLanguage",
//           !location && "location",
//         ].filter(Boolean), // 👈 important to remove false/nulls
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         fullname,
//         bio,
//         nativeLanguage,
//         learningLanguage,
//         location,
//         isOnboarded: true,
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     try {
//           await upsertStreamUser({
//         id: updatedUser._id.toString(),
//         name: updatedUser.fullname,
//         image: updatedUser.profilePicture || "",
//         })

//         console.log(`Stream user updated for ${updatedUser.fullname}`);
//     } catch (streamError) {
//         console.error("Error updating Stream user:", streamError);
//         return res.status(500).json({ message: "Failed to update Stream user" });
//     }

//     return res.status(200).json({
//       success: true,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error during onboarding:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
