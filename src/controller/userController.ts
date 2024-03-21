import { Request, Response } from "express";
import { UserSignupInput } from "@/DTO";
import { htmlTemplate } from "@/mailer";
import mailer from "@/mailer/sendMail";
import {
  generatePassword,
  validatePassword,
  generateSignature,
  generateSalt,
  GenerateOtp,
  logger,
  hashedOtpData,
  compareOTP,
} from "@/utills";
import { User } from "@/models";
const fromUser = process.env.FROM as string;
// const loginVerificationCode = process.env.LOGIN_VERIFICATION_CODE as string;
const accountVerificationCode = process.env.ACCOUNT_VERIFICATION_CODE as string;

export const UserSignUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = <
      UserSignupInput
    >req.body;
    const existingEmail = await User.findOne({
      email,
    });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);
    const { otp, otp_expiry } = GenerateOtp();
    const hashedOtp = await hashedOtpData(otp);
    logger.info(hashedOtp);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      salt,
      otp: hashedOtp,
      otp_expiry,
    });
    if (user) {
      const signature = await generateSignature({
        _id: user._id.toString(),
        email: user.email,
        isVerified: user.isVerified || false,
      });
      res.locals.user = user;
      const mailOptions = {
        from: fromUser,
        to: user.email,
        subject: accountVerificationCode,
        html: htmlTemplate(otp),
      };

      await mailer.sendEmail(
        mailOptions.from,
        mailOptions.to,
        mailOptions.subject,
        mailOptions.html,
      );

      return res.status(201).json({
        success: true,
        message:
          "Your has been created successfully.An otp code has been sent to your email address.",
        signature: signature,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const UserVerify = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const user = res.locals.user;

    if (user) {
      const findUserDetails = await User.findById(user._id);
      if (!findUserDetails)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      if (findUserDetails.isVerified)
        return res.status(200).json({
          success: true,
          message: "User already verified, please login",
        });
      const isMatch = await compareOTP(otp, findUserDetails.otp);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      if (user.otp_expiry < new Date()) {
        return res.status(400).json({
          success: false,
          message: "OTP Expired",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { isVerified: true, status: "active" },
      );

      if (!updatedUser) {
        return res.status(400).json({
          success: false,
          message: "Failed to Verify",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Successfully Verified",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const RequestOtp = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (user) {
      const findUser = await User.findById(user._id);
      const { email } = req.body;
      if (!findUser)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      if (findUser !== null && findUser !== undefined) {
        const { otp, otp_expiry } = GenerateOtp();
        const hashedOtp = await hashedOtpData(otp);
        findUser.otp = hashedOtp as string;
        findUser.otp_expiry = otp_expiry;
        if (findUser.email !== email) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid Email" });
        }
        await findUser.save();

        const mailOptions = {
          from: fromUser,
          to: findUser.email,
          subject: accountVerificationCode,
          html: htmlTemplate(otp),
        };

        await mailer.sendEmail(
          mailOptions.from,
          mailOptions.to,
          mailOptions.subject,
          mailOptions.html,
        );
        return res.status(200).json({
          success: true,
          message: "New OTP has been sent to your email address",
        });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, verified: true });
    if (user) {
      const isPasswordValid = await validatePassword(
        password,
        user.salt,
        user.password,
      );
      if (isPasswordValid) {
        const signature = await generateSignature({
          _id: user._id.toString(),
          email: user.email,
          isVerified: user.isVerified || false,
        });
        return res.status(200).json({
          success: true,
          message: "Successfully logged in",
          signature,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
