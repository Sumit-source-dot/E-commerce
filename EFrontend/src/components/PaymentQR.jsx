const PaymentQR = ({ amount, upiId = 'your-shop@upi', merchantName = 'Regional Crafts' }) => {
  const qrValue = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <img 
            src={qrImageUrl} 
            alt="UPI QR Code" 
            className="w-48 h-48 mx-auto border border-gray-200 p-2 rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Scan QR Code</h3>
              <p className="text-sm text-gray-500">Use any UPI app to scan and pay</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Or Pay Manually</h3>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="font-mono text-sm break-all">{upiId}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Amount to Pay</h3>
              <p className="text-2xl font-bold text-[#E86C3B]">₹{amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
        <p className="text-sm text-yellow-700">
          <span className="font-medium">Note:</span> Please upload payment screenshot after completing the transaction
        </p>
      </div>
    </div>
  );
};

export default PaymentQR;