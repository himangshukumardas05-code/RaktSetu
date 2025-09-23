import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Heart,Phone, Search, UserPlus, Building, Shield, Clock, MapPin,Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerImage from '../public/banner.jpg';
import logo from '../public/logo.png';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Find Blood Fast',
      description: 'Quickly search for available blood units by type and location'
    },
    {
      icon: UserPlus,
      title: 'Easy Donor Registration',
      description: 'Simple signup process for donors with eligibility checking'
    },
    {
      icon: Building,
      title: 'Hospital Management',
      description: 'Comprehensive tools for hospitals to manage blood requests'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Advanced security measures to protect sensitive data'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Live inventory updates and request status tracking'
    },
    {
      icon: MapPin,
      title: 'Location-based',
      description: 'Find nearest donors, blood banks, and hospitals'
    }
  ];
  const tabs = [
    { id: "donation", label: "Blood Donation" },
    { id: "bank", label: "Blood Bank" },
    { id: "health", label: "Health Check" },
  ];

  type TabKey = 'donation' | 'bank' | 'health';

  type TabContent = {
    title: string;
    description: string;
    points: string[];
    image: string;
  };

  const [activeTab, setActiveTab] = useState<TabKey>("donation");

  const content: Record<TabKey, TabContent> = {
    donation: {
      title: "Blood Donation",
      description:
        "At RaktSetu, we make blood donation simple, safe, and impactful. Every donation can save multiple lives and ensures patients receive timely treatment.",
      points: [
        "Faucibus ante lectus arcu feugiat.",
        "Pellentesque diam varius vulputate.",
        "Ipsum magnis habitasse consequat.",
        "Massa habitant hac dis ac efficitur.",
      ],
      image: bannerImage,
    },
    bank: {
      title: "Blood Bank",
      description:
        "Our integrated blood bank system ensures traceability and transparency. Hospitals can manage inventory in real-time, reducing shortages and wastage.",
      points: [
        "Realtime tracking of blood units.",
        "Verified donor-recipient matching.",
        "Fraud prevention via digital records.",
        "Seamless hospital collaboration.",
      ],
      image: bannerImage,
    },
    health: {
      title: "Health Check",
      description:
        "Donor safety is our top priority. Every donor undergoes essential health checks to ensure safe transfusions and to promote long-term wellness.",
      points: [
        "Basic vitals and medical history check.",
        "Free health reports for donors.",
        "Awareness about nutrition & recovery.",
        "Confidential and ethical process.",
      ],
      image: bannerImage,
    },
  };


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
   {/* Hero Section */}
<section
     className="relative h-[650px] bg-cover bg-center pt-20"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
          Donate Blood, Keep the World Beating
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Join our community of life-savers. Every donation can save up to three lives. 
          Your contribution matters more than you know.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/seeker/search"
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:text-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Find Blood Now
          </Link>
          <Link
            to="/donor/register"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
          >
            Become a Donor
          </Link>
        </div>
      </div>
    </section>


     {/* Portal Links Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Column */}
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "75+", label: "Partner Hospitals" },
            { value: "90+", label: "Expert Staff" },
            { value: "320+", label: "Successful Donations" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why We Do It */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-red-700 text-white rounded-lg p-8"
        >
          <h3 className="text-xl font-semibold mb-3">Why We Do It</h3>
          <div className="w-16 h-0.5 bg-white mb-4"></div>
          <p className="text-sm leading-relaxed">
            Every second counts in saving lives. Yet, delays, misinformation,
            and fraudulent requests often prevent blood from reaching those who
            need it. RaktSetu was built to connect donors, seekers, hospitals,
            and administrators on one trusted platform — ensuring safe, verified,
            and timely blood availability.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={bannerImage}
            alt="Blood Donation"
            className="w-full h-[200px] object-cover"
          />
        </motion.div>
      </div>

      {/* Right Column */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-red-600 font-semibold">Our Story</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Dedicated to Life — The Story of RaktSetu
          </h2>
          <p className="mt-4 text-gray-600">
            RaktSetu is not just a portal, but a lifesaving bridge. We connect
            donors who want to give, seekers who need urgent support, hospitals
            managing critical inventories, and administrators who ensure
            transparency. This integrated system helps prevent fraud, reduce
            delays, and make sure every drop of blood reaches the right person
            at the right time.
          </p>
        </motion.div>

        {/* Contact + Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          {/* Contact Box */}
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 p-4 rounded-lg">
              <Phone className="text-white w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Need Help?</h4>
              <p className="text-gray-600 text-sm">
                Call Us +91 98765 43210
              </p>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <Heart className="text-red-600 w-4 h-4 mt-0.5" />
              <span>
                <strong>Donor Portal:</strong> Track donations and ensure eligibility.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="text-red-600 w-4 h-4 mt-0.5" />
              <span>
                <strong>Seeker Portal:</strong> Request verified blood units quickly.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="text-red-600 w-4 h-4 mt-0.5" />
              <span>
                <strong>Hospital Portal:</strong> Manage inventories and requests.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Heart className="text-red-600 w-4 h-4 mt-0.5" />
              <span>
                <strong>Admin Portal:</strong> Monitor fraud and maintain transparency.
              </span>
            </li>
          </ul>

          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition">
            Discover More
          </button>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RaktSetu?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced platform makes blood management efficient, secure, and accessible for everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div>
            <span className="text-red-600 font-semibold">What We Do</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 leading-snug">
              The Lifesaving Work We Do for Communities in Need
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            We are dedicated to connecting donors, seekers, and hospitals through
            one secure platform. Our goal is to make blood donation and access
            faster, safer, and transparent for everyone.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`px-6 py-3 rounded-md font-medium transition ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 rounded-lg shadow"
        >
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {content[activeTab].title}
            </h3>
            <p className="text-gray-600 mb-6">{content[activeTab].description}</p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {content[activeTab].points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
           
          </div>

          {/* Right */}
          <div>
            <img
              src={content[activeTab].image}
              alt={content[activeTab].title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>


<section
  className="relative h-[400px] bg-cover bg-center bg-fixed flex items-center justify-center"
  style={{ backgroundImage: `url(${bannerImage})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0  bg-black bg-opacity-40"></div>

  {/* Content */}
  <div className="relative z-10 text-center max-w-3xl px-6">
    <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 leading-snug">
      Every drop matters! Join us at our next <br /> blood drive & Be a Lifesaver!
    </h2>
    <p className="text-gray-200 mb-6 text-lg">
      Blood donation is a gift of life. Your small step can make a huge
      difference for accident victims, cancer patients, and those in urgent
      need of transfusions.
    </p>
    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition duration-300">
      Find Donation Center
    </button>
  </div>
</section>

<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-12 items-center">
    
    {/* Left Image with Overlay */}
    <div className="relative">
      <img
        src={bannerImage}
        alt="Blood Donation"
        className="rounded-xl w-full h-[400px] object-cover"
      />
      {/* Overlay Card */}
      <div className="absolute bottom-6 left-6 bg-white/90 shadow-md rounded-lg flex items-center gap-3 p-4">
        <img
          src={logo}
          alt="Community"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-sm text-gray-700">
          Join <span className="text-red-600 font-semibold">50,000+</span>{" "}
          donors and become a lifesaver for someone in need
        </p>
        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">
          +
        </div>
      </div>
    </div>

    {/* Right Content */}
    <div>
      <h4 className="text-red-600 font-semibold mb-2">Why Donate?</h4>
      <h2 className="text-4xl font-bold text-gray-900 leading-snug mb-4">
        The Life You Save Could Be Someone You Love
      </h2>
      <p className="text-gray-600 mb-6">
        Every 2 seconds, someone in India needs blood. Your single donation can
        provide a lifeline to accident victims, cancer patients, mothers during
        childbirth, and children fighting critical illnesses. Donating blood is
        safe, simple, and takes only a few minutes — but its impact lasts a
        lifetime.
      </p>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Droplet className="text-red-600 w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Your Blood, Their Second Chance
          </h3>
          <p className="text-gray-600 text-sm">
            One pint of blood can save up to 3 lives and give patients a chance
            to recover.
          </p>
        </div>

        <div>
          <Heart className="text-red-600 w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Urgent Need, Every Day
          </h3>
          <p className="text-gray-600 text-sm">
            Hospitals require blood daily for surgeries, emergencies, and
            treatments of critical illnesses.
          </p>
        </div>

        <div>
          <UserPlus className="text-red-600 w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Save Lives in Minutes
          </h3>
          <p className="text-gray-600 text-sm">
            The donation process takes less than 30 minutes, but the hope you
            give lasts forever.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>







      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of heroes making a difference every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donor/register"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Register as Donor
              </Link>
              <Link
                to="/hospital/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Register Hospital
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};