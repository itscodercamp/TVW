import React, { useState } from 'react';
import { Shield, Lock, FileText, ChevronDown, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <div className="text-gray-600 leading-relaxed space-y-3 text-justify">
      {children}
    </div>
  </div>
);

export const Terms: React.FC = () => (
  <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
    <SEO 
      title="Terms and Conditions" 
      description="Read the Terms and Conditions for using Trusted Vehicles platform, including buying, selling, and dealer services."
      canonicalUrl="/terms"
    />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="border-b border-gray-100 pb-8 mb-8 text-center">
          <FileText className="w-16 h-16 text-slate-900 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Terms and Conditions</h1>
          <p className="text-gray-500">Last Updated: March 15, 2026</p>
        </div>

        <Section title="1. Introduction">
          <p>Welcome to Trusted Vehicles. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, you must discontinue use of our services immediately.</p>
          <p>Trusted Vehicles ("we", "us", "our") provides an online automotive marketplace connecting buyers and sellers, along with value-added services such as insurance, financing, and inspections.</p>
        </Section>

        <Section title="2. Eligibility and Account Registration">
          <p>You must be at least 18 years old and capable of entering into a legally binding contract to use our services. When you create an account, you agree to provide accurate, current, and complete information.</p>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that provide false information or violate these terms.</p>
        </Section>

        <Section title="3. Buying Vehicles">
          <p><strong>3.1 Listings:</strong> We strive to ensure the accuracy of vehicle listings. However, we do not guarantee that all descriptions, prices, or other content are error-free.</p>
          <p><strong>3.2 Inspections:</strong> All "Trusted Certified" vehicles undergo a 200-point inspection. We recommend buyers review the inspection report thoroughly before purchase. Third-party inspections are welcomed at the buyer's expense.</p>
          <p><strong>3.3 Payments:</strong> Payments for vehicle reservations or full purchases must be made through our approved secure payment gateways. A token amount is refundable if the vehicle fails to meet the described condition upon physical inspection.</p>
        </Section>

        <Section title="4. Selling Vehicles">
          <p><strong>4.1 Ownership:</strong> By listing a vehicle, you represent that you are the legal owner and have the full authority to sell the vehicle.</p>
          <p><strong>4.2 Accurate Representation:</strong> You agree to provide honest and accurate information regarding the vehicle's condition, history, and mileage. Misrepresentation may result in legal action and a permanent ban from our platform.</p>
          <p><strong>4.3 Fees:</strong> We charge a service fee upon the successful sale of a vehicle. This fee is transparently displayed during the listing process.</p>
        </Section>

        <Section title="5. Intellectual Property">
          <p>All content on this website, including text, graphics, logos, images, and software, is the property of Trusted Vehicles or its content suppliers and is protected by international copyright laws.</p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>Trusted Vehicles shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
        </Section>

        <Section title="7. Dispute Resolution">
          <p>Any disputes arising out of or relating to these Terms shall be resolved through binding arbitration in accordance with the laws of India, with the venue in New Delhi.</p>
        </Section>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Questions about the Terms of Service should be sent to us at <a href="mailto:legal@trustedvehicles.com" className="text-green-600 hover:underline">legal@trustedvehicles.com</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
    <SEO 
      title="Privacy Policy" 
      description="We value your privacy. Learn how Trusted Vehicles collects, uses, and protects your personal and financial data."
      canonicalUrl="/privacy"
    />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="border-b border-gray-100 pb-8 mb-8 text-center">
          <Lock className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500">Effective Date: January 1, 2025</p>
        </div>

        <Section title="1. Information We Collect">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address when you register or make a transaction.</li>
            <li><strong>Vehicle Information:</strong> Registration numbers, VIN, service history, and photos when you list a car.</li>
            <li><strong>Financial Information:</strong> Payment details are processed securely by third-party providers; we do not store full credit card numbers.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, and device information.</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the collected data for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>To provide, maintain, and improve our services.</li>
            <li>To process transactions and send related notifications.</li>
            <li>To verify your identity and prevent fraud.</li>
            <li>To communicate with you about updates, promotions, and news (you can opt-out at any time).</li>
            <li>To generate data-driven valuations and market insights.</li>
          </ul>
        </Section>

        <Section title="3. Data Sharing and Disclosure">
          <p>We do not sell your personal data. We may share information with:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Service Providers:</strong> Third parties who assist in payment processing, inspection services, and insurance issuance.</li>
            <li><strong>Legal Requirements:</strong> If required by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale of assets, or acquisition of all or a portion of our business.</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>We implement robust security measures, including SSL encryption, secure servers, and strict access controls, to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </Section>

        <Section title="5. Your Data Rights">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your account and data ("Right to be Forgotten").</li>
            <li>Object to the processing of your data for marketing purposes.</li>
          </ul>
        </Section>

        <Section title="6. Cookies and Tracking">
          <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.</p>
        </Section>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            For privacy-related concerns, please contact our Data Protection Officer at <a href="mailto:privacy@trustedvehicles.com" className="text-green-600 hover:underline">privacy@trustedvehicles.com</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors group"
      >
        <span className="font-bold text-slate-900 text-lg pr-4">{question}</span>
        <ChevronDown 
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-green-600' : 'text-gray-400 group-hover:text-gray-600'
          }`} 
        />
      </button>
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-gray-600 bg-gray-50 border-t border-gray-100 leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqCategories = [
    {
      title: "Buying a Car",
      items: [
        { q: "How does the 7-day money-back guarantee work?", a: "If you're not completely satisfied with your Trusted Vehicle purchase, you can return it within 7 days or 250km, whichever comes first, for a full refund. No questions asked." },
        { q: "Are the prices negotiable?", a: "Our prices are fixed and based on real-time market data to ensure fairness and transparency. We offer the best price upfront, eliminating the need for haggling." },
        { q: "Can I take a test drive?", a: "Absolutely! You can book a test drive online for any car in our inventory. We can even bring the car to your doorstep for a small convenience fee." }
      ]
    },
    {
      title: "Selling a Car",
      items: [
        { q: "How is my car's value calculated?", a: "We use a proprietary calculation system that analyzes real-time market data, demand trends, and your car's specific condition to generate an instant, fair offer." },
        { q: "Do you handle the paperwork?", a: "Yes, we handle all the RTO transfer paperwork, insurance transfer, and legal documentation. You just need to sign the documents." },
        { q: "Is the inspection fee refundable?", a: "Yes! If you choose to sell your car to us or list it on our marketplace after the inspection, the inspection fee is fully refunded or adjusted in the final price." }
      ]
    },
    {
      title: "Finance & Insurance",
      items: [
        { q: "What interest rates do you offer on loans?", a: "Our partner banks offer competitive interest rates starting from 8.99%, depending on your credit score and the vehicle's age." },
        { q: "Do you provide insurance renewal?", a: "Yes, we are a licensed corporate agent and partner with top insurers to provide instant policy issuance and renewals at discounted rates." }
      ]
    }
  ];

  // Construct FAQPage Schema for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => cat.items.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    })))
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
      <SEO 
        title="Frequently Asked Questions (FAQ)" 
        description="Find answers to common questions about buying, selling, financing, and insuring cars with Trusted Vehicles."
        keywords="car buying faq, sell car faq, trusted vehicles help, car loan questions"
        canonicalUrl="/faq"
        schema={faqSchema}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-slate-900 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about buying, selling, and trading with Trusted Vehicles.
          </p>
        </div>

        <div className="space-y-10">
          {faqCategories.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-300 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="#/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};