export const resetPasswordEmail = (token: string, userId: string) => {
  return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #333; font-size: 24px;">Password Reset</h1>
                <p style="color: #555; font-size: 16px;">You requested to reset your password. Here is the code: </p>
                <p style="color: #555; font-size: 16px;">${token}</p>
                <a href="http://127.0.0.1:4000/api/auth/verify-token?token=${token}&id=${userId}"
                    style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 4px;">Reset
                    Password</a>
                <p style="color: #555; font-size: 16px; margin-top: 20px;">If you didn't request a password reset, you
                    can safely ignore this email.</p>
            </td>
        </tr>
    </table>
</body>

</html>`;
};
export default resetPasswordEmail;
