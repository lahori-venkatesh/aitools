import React from "react";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/">
                <a className="flex items-center mb-4">
                  <span className="text-white text-2xl font-bold mr-2"><i className="ri-robot-line"></i></span>
                  <span className="font-bold text-xl">AI Tool Hub</span>
                </a>
              </Link>
              <p className="text-gray-400 text-sm mb-4">
                Discover and compare the best AI tools for your needs. Our platform helps you find the perfect AI solution.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-twitter-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-instagram-fill text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#text-generation"><a className="hover:text-white transition-colors">Text Generation</a></Link></li>
                <li><Link href="/#image-creation"><a className="hover:text-white transition-colors">Image Creation</a></Link></li>
                <li><Link href="/#data-analysis"><a className="hover:text-white transition-colors">Data Analysis</a></Link></li>
                <li><Link href="/#video-tools"><a className="hover:text-white transition-colors">Video Tools</a></Link></li>
                <li><Link href="/#audio-tools"><a className="hover:text-white transition-colors">Audio Tools</a></Link></li>
                <li><Link href="/#productivity"><a className="hover:text-white transition-colors">Productivity</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog"><a className="hover:text-white transition-colors">Blog</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">AI Guides</a></Link></li>
                <li><Link href="/submit"><a className="hover:text-white transition-colors">Submit a Tool</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">Advertise with Us</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">API Documentation</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/admin"><a className="hover:text-white transition-colors font-semibold text-primary">Admin Dashboard</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">About Us</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">Contact</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">Privacy Policy</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">Terms of Service</a></Link></li>
                <li><Link href="#"><a className="hover:text-white transition-colors">Affiliate Disclosure</a></Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Tool Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
