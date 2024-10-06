import RazorpayCheckout from 'react-native-razorpay';

export const payment = (amount: string,email: string,contact: string,username: string): Boolean => {
  const options = {
    description: 'Coffee Purchase',
    image: 'https://example.com/logo.png',
    currency: 'INR',
    key: 'Lhfm8boZccy8Cm',
    amount: amount + '000', // Amount in paise (5000 paise = ₹50)
    name: 'Coffee Shop',
    prefill: {
      email: email,
      contact: contact,
      name: username,
    },
  };

  RazorpayCheckout.open(options)
    .then(data => {
      // handle success
      console.log(data);
      return true;
    })
    .catch(error => {
      // handle error
      return false;
      console.log(error);
    });
  return true;
};
