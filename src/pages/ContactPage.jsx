import React from 'react';

const ContactPage = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
        
        <div className="text-gray-700 leading-relaxed mb-8 text-center">
          <p className="mb-4">
            Thank you for your interest in connecting with Conscious Humanity Inc.
            We are looking forward to hearing from you.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">UNITED STATES OFFICE</h2>
              <div className="space-y-2">
                <p className="font-medium">Conscious Humanity Inc.</p>
                <p>P.O. Box 291038</p>
                <p>Los Angeles</p>
                <p>CA 90027</p>
                <p className="mt-4">Tel: 323-800-2566</p>
                <p>Email: <a href="mailto:info@conscioushumanity.com" className="text-blue-600 hover:text-blue-800">info@conscioushumanity.com</a></p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">GHANA OFFICE</h2>
              <div className="space-y-2">
                <p className="font-medium">Etherean Mission</p>
                <p>BOX A.N 8562</p>
                <p>Accra-North, Ghana</p>
                <p className="mt-4">Tel: (233) (302) 326 702</p>
                <p>Tel: (233) (302) 326 701</p>
                <p>Email: <a href="mailto:ethereanlife@gmail.com" className="text-blue-600 hover:text-blue-800">ethereanlife@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-600">
          <p>
            For general inquiries or questions about our initiatives, 
            please contact us using the information above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;