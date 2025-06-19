import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="text-left text-gray-700 leading-relaxed mb-8">
          <p className="italic mb-6">Last updated: 2nd October 2023</p>
          
          <p className="mb-6">
            At <span className="font-bold">Conscious Humanity</span>, your privacy is of utmost importance. 
            This Privacy Policy outlines how we collect, use, and protect your personal information 
            when you interact with our website, including when you subscribe, make donations, or purchase items. 
            By using our website, you agree to the terms outlined in this policy.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">When you use our services, we may collect the following types of personal information:</p>
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2"><span className="font-bold">Personal Identification Information</span>: Name, email address, postal address, phone number, payment details (including credit card information).</li>
            <li className="mb-2"><span className="font-bold">Transactional Information</span>: Records of your donations, purchases, and subscriptions.</li>
            <li className="mb-2"><span className="font-bold">Device and Usage Information</span>: IP address, browser type, operating system, and interactions with our website.</li>
            <li className="mb-2"><span className="font-bold">Cookies</span>: Data collected from cookies and other tracking technologies to personalize your experience and improve our services. You can manage your cookie preferences through your browser settings.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use your personal information for the following purposes:</p>
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2"><span className="font-bold">Subscription Management</span>: To manage your subscriptions and provide you with updates, newsletters, or relevant content.</li>
            <li className="mb-2"><span className="font-bold">Donations and Purchases</span>: To process your donations, purchases, and ensure the secure completion of transactions.</li>
            <li className="mb-2"><span className="font-bold">Communication</span>: To respond to your inquiries, notify you about changes to our services, or provide important information related to your account or donations.</li>
            <li className="mb-2"><span className="font-bold">Improvement of Services</span>: To analyze usage patterns and feedback to improve our services, content, and website experience.</li>
            <li className="mb-2"><span className="font-bold">Legal Compliance</span>: To comply with legal obligations and prevent fraud or misuse of our services.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Share Your Information</h2>
          <p className="mb-4">We do not sell or rent your personal information to third parties. However, we may share your information in the following situations:</p>
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2"><span className="font-bold">Service Providers</span>: With third-party service providers that help us process payments, manage our website, and fulfill orders. These providers are bound by strict confidentiality agreements and may only use your information to perform their services.</li>
            <li className="mb-2"><span className="font-bold">Legal Requirements</span>: If required by law, or if we believe it is necessary to protect the rights, property, or safety of <span className="font-bold">Conscious Humanity</span>, our users, or the public.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How We Protect Your Information</h2>
          <p className="mb-6">
            We implement a variety of security measures to ensure the protection of your personal information. 
            This includes encryption of sensitive information (such as payment details) during transmission 
            and maintaining secure servers. While we strive to protect your data, no transmission method 
            over the internet is 100% secure. We encourage you to take precautions when using our site.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-8 mb-6">
            <li className="mb-2"><span className="font-bold">Access</span>: Request a copy of the personal data we hold about you.</li>
            <li className="mb-2"><span className="font-bold">Correction</span>: Request corrections to any inaccurate or incomplete personal data.</li>
            <li className="mb-2"><span className="font-bold">Deletion</span>: Request the deletion of your personal data, subject to legal obligations or legitimate business interests.</li>
            <li className="mb-2"><span className="font-bold">Opt-Out</span>: You can opt out of receiving our marketing communications by following the unsubscribe instructions included in the emails or contacting us directly.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
          <p className="mb-6">
            Our website uses cookies to enhance your experience. Cookies are small files stored on your device 
            that help us understand how you use our site. You can disable cookies through your browser settings, 
            but please note that this may impact your experience on our website.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, 
            and we will notify you of significant changes via email or through our website. 
            Please check this page regularly to stay informed.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-4">If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
          <div className="mb-6">
            <p className="font-bold">Conscious Humanity</p>
            <p>Email: conscioushumanity@gmail.com</p>
            <p>Phone: +1 323-800-2566</p>
            <p>Address: Los Angeles, CA 90027</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;