import orderData from "../../../Order/types/orderData";

export const orderConfirmation = (data: orderData) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          /* Add your custom styles here */
          body {
              font-family: Arial, sans-serif;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
              background-color: #007BFF;
              color: #fff;
              text-align: center;
              padding: 20px 0;
          }
          .order-summary {
              background-color: #f4f4f4;
              padding: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Talabat</h1>
          </div>
  
          <div class="order-summary">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${data.id}</p>
              <p><strong>Order Date:</strong> ${data.createdAt}</p>
              <p><strong>Shipping Address:</strong> ${data.location}</p>
              <p><strong>Phone number:</strong> ${data.phoneNumber}</p>
              <p><strong>Notes:</strong> ${data.notes}</p>
  
  
              <p><strong>Total Amount:</strong> $${data.totalPrice}</p>
          </div>
  
          <p>Thank you for your order! If you have any questions or need further assistance, please don't hesitate to contact our customer support.</p>
  
          <div class="footer">
              <p>&copy; 2023 Talabat</p>
          </div>
      </div>
  </body>
  </html>
  `;
};

export default orderConfirmation;
