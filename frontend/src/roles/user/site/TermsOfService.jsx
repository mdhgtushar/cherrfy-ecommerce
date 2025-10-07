import React from 'react';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">Agreement to Terms</h2>
                    <p className="text-gray-700">
                        By accessing and using Cherrfy's services, you agree to be bound by these Terms of Service. 
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Use of Services</h2>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>You must be at least 18 years old to use our services</li>
                        <li>You are responsible for maintaining the security of your account</li>
                        <li>You agree not to use our services for any illegal purposes</li>
                        <li>You must provide accurate and complete information when creating an account</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Purchase and Payment Terms</h2>
                    <p className="text-gray-700">
                        All purchases through our platform are subject to availability and acceptance. 
                        Prices are listed in the applicable currency and may be subject to taxes and shipping fees. 
                        Payment must be made through our approved payment methods.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Shipping and Delivery</h2>
                    <p className="text-gray-700">
                        Delivery times are estimates only. We are not responsible for delays beyond our control. 
                        Risk of loss and title for items purchased pass to you upon delivery to the carrier.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Returns and Refunds</h2>
                    <p className="text-gray-700">
                        Our return and refund policies are subject to specific conditions. Please refer to our 
                        Return Policy for detailed information about the process and eligibility.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
                    <p className="text-gray-700">
                        All content on our platform, including text, graphics, logos, and software, is the property 
                        of Cherrfy or its content suppliers and is protected by copyright and other intellectual property laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
                    <p className="text-gray-700">
                        Cherrfy shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                        arising from your use of our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
                    <p className="text-gray-700">
                        We reserve the right to modify these terms at any time. Changes will be effective immediately 
                        upon posting on our website. Your continued use of our services constitutes acceptance of any modifications.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
                    <p className="text-gray-700">
                        For questions about these Terms of Service, please contact us at:
                        <br />
                        Email: legal@cherrfy.com
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

export default TermsOfService;
