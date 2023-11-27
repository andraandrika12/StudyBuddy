// import base64 from 'base-64';

// const serverKey = "SB-Mid-server-URxMqzU3S_iC-bNO8nW_BilM:";
// const base64Key = base64.encode(serverKey);

// const getPaymentGatewayUrl = async (parameter, orderDetails) => {
//   try {
//     const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${base64Key}`,
//       },
//       body: JSON.stringify(parameter),
//     });

//     const data = await response.json();
//     console.log(data, "<<<<<<<<<<<<<<???????dajsh")

//     return { redirect_url: data.redirect_url, orderDetails };
//   } catch (error) {
//     console.error('Error getting payment gateway URL:', error);
//     throw error;
//   }
// };

// export default getPaymentGatewayUrl;
