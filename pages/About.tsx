import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Target, ArrowRight, Heart, Zap, Globe, Clock, BookOpen, Mountain, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const stats = [
    { label: "Cars Sold", value: "2,500+" },
    { label: "Happy Customers", value: "99%" },
    { label: "Dealer Partners", value: "150+" },
    { label: "Years of Trust", value: "1+" },
  ];

  const team = [
    { name: "Tanveer Khan", role: "Founder", img: "https://ui-avatars.com/api/?name=Tanveer+Khan&background=0D8ABC&color=fff&size=400&bold=true&font-size=0.4" },
    { name: "Mohomaad Sgakib", role: "Co-Founder", img: "https://ui-avatars.com/api/?name=Mohomaad+Sgakib&background=6366F1&color=fff&size=400&bold=true&font-size=0.4" },
    { name: "Sumayla Ali", role: "Co-Founder", img: "https://ui-avatars.com/api/?name=Sumayla+Ali&background=EC4899&color=fff&size=400&bold=true&font-size=0.4" },
    { name: "Shoeb Raj", role: "CTO (Chief Technology Officer)", img: "https://ui-avatars.com/api/?name=Shoeb+Raj&background=10B981&color=fff&size=400&bold=true&font-size=0.4" },
  ];

  const values = [
    { title: "Transparency First", desc: "No hidden fees, no manipulated meters. We believe in brutal honesty about every car's condition.", icon: <Shield className="w-8 h-8 text-blue-500" /> },
    { title: "Customer Obsession", desc: "We don't just sell cars; we build relationships. Our 7-day money-back guarantee proves it.", icon: <Heart className="w-8 h-8 text-red-500" /> },
    { title: "Tech Driven", desc: "Using market data for fair valuation and blockchain for secure document transfer.", icon: <Zap className="w-8 h-8 text-yellow-500" /> },
    { title: "Sustainability", desc: "Promoting circular economy by extending the life of quality vehicles.", icon: <Globe className="w-8 h-8 text-green-500" /> },
  ];

  const milestones = [
    { year: "2025", title: "Inception & Launch", desc: "Trusted Vehicles launched in January 2025 with a mission to digitize the auto market. We introduced our digital valuation tool and opened our first inspection hub." },
    { year: "2025", title: "Rapid Expansion", desc: "By mid-2025, we expanded to 5 major metro cities and onboarded our first 100 trusted dealer partners, crossing 1000 cars sold." },
    { year: "2026", title: "The Road Ahead", desc: "Now celebrating over a year of trust! We are integrating EV-specific health checks and launching our premium auction marketplace." },
  ];

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <SEO
        title="About Us - Our Story"
        description="Learn about Trusted Vehicles, our mission to democratize trust in the automotive industry, and the team driving our innovation."
        keywords="about trusted vehicles, car startup India, automotive team, company values"
        canonicalUrl="/about"
      />
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80"
            alt="Office meeting"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-400 font-semibold mb-6 border border-green-500/30">About Trusted Vehicles</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Driving Trust since 2025</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are revolutionizing the pre-owned car market with transparency, technology, and a customer-first approach.
          </p>
        </div>
      </section>

      {/* Expanded Mission & Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mission Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-green-600 font-bold mb-4 uppercase tracking-wider text-sm">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Democratizing Trust in the Automotive World</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We are on a mission to build India's most transparent and efficient automotive ecosystem, where buying a car is as simple and safe as ordering a pizza.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: The Narrative */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-indigo-600" /> Our Story
              </h3>
              <div className="prose prose-lg text-gray-600 space-y-6 text-justify">
                <p>
                  It began with a vision to transform the used car market in India. Our founders faced a nightmare when trying to buy and sell vehicles: lowball offers, endless calls from aggressive brokers, and a complete lack of trust. They realized the market was fundamentally broken—opaque, inefficient, and intimidating for the average consumer.
                </p>
                <p>
                  That frustration sparked a revolutionary idea. What if technology could replace the middleman? What if data analytics could value a car more fairly than a human? Thus, <strong>Trusted Vehicles</strong> was born.
                </p>

                <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm my-6">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center"><Mountain className="w-5 h-5 mr-2 text-indigo-500" /> The Early Challenges</h4>
                  <p className="text-sm">
                    The road wasn't smooth. In the early days, convincing traditional dealers to adopt our digital Inventory Management System (IMS) was a battle. Building a pricing model that understood the nuances of Indian road conditions took months of data collection. We physically inspected our first 500 cars ourselves to refine our pricing engine.
                  </p>
                </div>

                <p>
                  But we persisted. We operated on a simple premise: <strong>Data beats opinion.</strong> Today, that persistence pays off in every transaction on our platform, bridging the gap between skeptical buyers and honest sellers.
                </p>
              </div>
            </div>

            {/* Right Column: Visuals & Principles */}
            <div className="space-y-8">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                  alt="Team brainstorming"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/30"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-lg">Nagpur HQ</p>
                  <p className="text-sm opacity-90">Where it all started.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-6 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" /> Founding Principles
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900">Radical Transparency</strong>
                      <p className="text-sm text-gray-500 mt-1">No hidden faults. If a car has a scratch, we highlight it, not hide it.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900">Tech-First Trust</strong>
                      <p className="text-sm text-gray-500 mt-1">Using analytics for pricing and blockchain for document security to eliminate fraud.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-900">Empowerment</strong>
                      <p className="text-sm text-gray-500 mt-1">Giving both buyers and sellers the data they need to make informed decisions independently.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide our every decision and interaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 hover:shadow-lg">
                <div className="mb-6 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey (Timeline) */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Journey So Far</h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center justify-between ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-5/12"></div>
                  <div className="z-10 bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white mb-4 md:mb-0">
                    <Clock size={20} />
                  </div>
                  <div className="w-full md:w-5/12 bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                    <span className="text-green-600 font-bold text-lg mb-2 block">{m.year}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{m.title}</h3>
                    <p className="text-gray-600">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Meet the Minds Behind the Wheel</h2>
            <p className="mt-4 text-gray-600">Our leadership team driving innovation in the automotive industry.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-green-500 transition-colors shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Social icons placeholder */}
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white cursor-pointer transition-colors">in</div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white cursor-pointer transition-colors">tw</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Experience the Future?</h2>
          <p className="text-gray-600 mb-10 text-xl max-w-2xl mx-auto">Join thousands of satisfied customers who have found their perfect ride with Trusted Vehicles.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/buy" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Browse Inventory <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/contact" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;