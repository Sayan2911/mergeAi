import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req,res)=>{
      const { email, password } = req.body;

    try {
        const user= await User.findOne({email})
        if(!user) return  res.status(400).json({ message: "Invalid Credential"});
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return  res.status(400).json({ message: "Invalid Credential"});

        const token =jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({token,user:{id: user._id, name: user.name, email: user.email}})



    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}