import React from 'react'; 
import { Link } from 'react-router-dom';
import USER_PATHS from '../USER_PATHS';
import logo from "../../../assets/images/cherrfy-logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const paymentMethods = [
        { name: 'Visa', src: 'https://logotyp.us/files/visa.svg' },
        { name: 'Mastercard', src: 'https://logotyp.us/files/mastercard.svg' },
        { name: 'American Express', src: 'https://logotyp.us/files/american-express.svg' },
        { name: 'PayPal', src: 'https://logotyp.us/files/paypal.svg' },
        { name: 'Diners Club', src: 'https://cdn.worldvectorlogo.com/logos/diners-club-logo3.svg' },
        { name: 'Stripe', src: 'https://logotyp.us/files/stripe.svg' },
    ];

    const socialLinks = [
        { name: 'Facebook', href: 'https://facebook.com/cherrfy', src: 'https://logotyp.us/files/facebook.svg' },
        { name: 'X', href: 'https://x.com/cherrfy', src: 'https://logotyp.us/files/twitter-x.svg' },
        { name: 'Instagram', href: 'https://instagram.com/cherrfy', src: 'https://logotyp.us/files/instagram.svg' },
        { name: 'LinkedIn', href: 'https://linkedin.com/company/cherrfy', src: 'https://logotyp.us/files/linkedin.svg' },
    ];

    return (
        <footer className="bg-gray-100 border-t border-gray-200 mt-5">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">

                    {/* Column 1: Logo and Copyright */}
                    <div className="flex flex-col items-center md:items-start row-start-3 md:row-start-1 text-center">
                        <Link to="/" className="mb-2 flex items-center gap-2 hover:opacity-90 transition-opacity mb-5">
                            
                            <span className="font-bold text-xl tracking-tight text-orange-500 h-12">
                                <img src={logo} className='h-full' />
                            </span>
                        </Link>
                        <p className="text-xs text-gray-500">
                            © {currentYear} Cherrfy LLC. All Rights Reserved.
                        </p>
                    </div>

                    {/* Column 2: Social and Legal Links */}
                    <div className="flex flex-col items-center gap-4 row-start-2 md:row-start-1">
                        <div className="flex items-center gap-5">
                            {socialLinks.map(social => (
                                <Link key={social.name} to={social.href} target="_blank" className="text-gray-500 hover:opacity-75 transition-opacity">
                                    <img src={social.src} alt={`${social.name} logo`} className="h-7 w-7" />
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                            <Link to={USER_PATHS.TERMS_OF_SERVICE} className="hover:text-orange-500">Terms of Service</Link>
                            <div className="border-l h-3 border-gray-400"></div>
                            <Link to={USER_PATHS.PRIVACY_POLICY} className="hover:text-orange-500">Privacy Policy</Link>
                        </div>
                    </div>

                    {/* Column 3: Payment Logos */}
                    <div className="flex flex-col items-center md:items-end gap-3 row-start-1 md:row-start-1">
                        <h4 className="font-semibold text-gray-700 text-sm">Secure Payments</h4>
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
                            {paymentMethods.map(method => (
                                <img key={method.name} src={method.src} alt={method.name} className="h-10 object-contain" style={{ maxWidth: '60px' }} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
