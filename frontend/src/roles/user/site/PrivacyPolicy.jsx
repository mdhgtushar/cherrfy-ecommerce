import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = 'Privacy Policy - Cherrfy';
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                    <p className="text-gray-700">
                        We collect information that you provide directly to us, including name, email address, 
                        shipping address, payment information, and any other information you choose to provide.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>To process your orders and payments</li>
                        <li>To communicate with you about your orders and account</li>
                        <li>To send you marketing communications (with your consent)</li>
                        <li>To improve our services and user experience</li>
                        <li>To protect against fraud and unauthorized transactions</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Information Sharing</h2>
                    <p className="text-gray-700">
                        We do not sell or rent your personal information to third parties. We may share your 
                        information with service providers who assist in our operations, such as payment 
                        processing and order fulfillment.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Security</h2>
                    <p className="text-gray-700">
                        We implement appropriate security measures to protect your personal information. 
                        However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
                    <p className="text-gray-700">
                        We use cookies and similar technologies to enhance your browsing experience, 
                        analyze site traffic, and personalize content.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
                    <p className="text-gray-700">
                        You have the right to access, correct, or delete your personal information. 
                        You can also opt out of marketing communications at any time.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                    <p className="text-gray-700">
                        If you have any questions about our Privacy Policy, please contact us at:
                        <br />
                        Email: privacy@cherrfy.com
                        <br />
                        Address: 123 Cherrfy Street, Tech City, TC 12345
                    </p>
                </section>

                <section>
                    <p className="text-sm text-gray-600">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
