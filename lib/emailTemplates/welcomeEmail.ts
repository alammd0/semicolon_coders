
export const html = `

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>

      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
      }
      .header {
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #333;
      }
      .content {
        margin-top: 15px;
        font-size: 16px;
        color: #555;
        line-height: 1.6;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">Welcome to Our Platform</div>

      <div class="content">
        <p>Hello,</p>
        <p>
          Thank you for joining our platform. We're excited to have you onboard.
        </p>
        <p>
          If you have any questions, feel free to reply to this email.
        </p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} Semicolon Coders
      </div>
    </div>
  </body>
</html>
`;
