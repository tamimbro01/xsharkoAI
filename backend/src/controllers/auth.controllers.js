const User = require("../models/user.models");

const jwt = require("jsonwebtoken");

const googleAuth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_Secret_Key, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000, 
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "User Login Successfully ",
      user,
    });
  } catch (error) {
    console.log("Internal Server Error :", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const logoutUser = async (req, res) => {
  try {

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User Logout Successfully",
    });

  } catch (error) {
    console.log("Internal Server Error :", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Internal Server Error :", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { googleAuth, logoutUser, getProfile }
