import express from "express";

const app = express();

app.use(express.json());

const validateOtp: Record<string, string> = {};

app.post("/generate-otp", (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(Math.random() * 1000000);

    // Store OTP
    validateOtp[email] = otp.toString();

    console.log(`OTP for ${email} is ${otp}`);

    res.json({
        message: "OTP generated successfully",
        otp: otp
    });
});

app.post("/verify-otp", (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (
        validateOtp[email] !== undefined &&
        validateOtp[email] === otp.toString()
    ) {
        console.log(
            `OTP for ${email} is ${otp}, Password changed to ${newPassword}`
        );

        // Delete OTP after successful verification
        delete validateOtp[email];

        return res.json({
            message: "OTP verified successfully, Password changed"
        });
    }

    return res.json({});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});