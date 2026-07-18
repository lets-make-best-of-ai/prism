export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-prism-navy/50 py-12 sm:py-16">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold mb-4">
              <span className="gradient-text">Prism</span>
              <span className="text-white ml-2">Equity</span>
            </div>
            <p className="text-prism-gray text-sm">Keep What You Earn. Build What You Dream.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-prism-gray text-sm">
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Tax Strategy</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Wealth Planning</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Estate Planning</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Business Optimization</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-prism-gray text-sm">
              <li><a href="#" className="hover:text-prism-emerald transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Insights</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-prism-gray text-sm">
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Disclaimer</a></li>
              <li><a href="#" className="hover:text-prism-emerald transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-prism-gray text-sm">
            <p>&copy; {currentYear} Prism Equity Partners. All rights reserved.</p>
            <p>
              Disclaimer: This website is for informational purposes only and does not constitute financial or legal advice. Always consult with qualified professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
