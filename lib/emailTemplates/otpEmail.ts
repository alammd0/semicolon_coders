export const otpEmailTemplate = (otp: string) => `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="max-width:500px; margin:auto; background:#fff; padding:20px; border-radius:8px;">
            <h2>Email Verification</h2>
            <p>Your OTP is:</p>
            <h1 style="letter-spacing:6px;">${otp}</h1>
            <p>This OTP is valid for 10 minutes.</p>
        </div>
    </body>
    </html>
`;
