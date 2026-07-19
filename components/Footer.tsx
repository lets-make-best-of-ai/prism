'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Services: [
      { label: 'Tax Strategy', href: '#' },
      { label: 'Wealth Planning', href: '#' },
      { label: 'Estate Planning', href: '#' },
      { label: 'Business Optimization', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Our Team', href: '#' },
      { label: 'Insights', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Disclaimer', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="relative w-full border-t border-fintech-border bg-fintech-surface/50 py-20 sm:py-28">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-5 gap-12 sm:gap-16 mb-20 sm:mb-28"
        >
          {/* Brand section */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <div className="text-2xl font-bold tracking-tight mb-4">
                <span className="gradient-text">Prism</span>
                <span className="text-text-primary ml-2">Equity</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed font-light max-w-xs">
                Keep What You Earn. Build What You Dream. Premium tax strategy for high-net-worth individuals.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <p className="text-text-muted font-medium uppercase tracking-wider text-xs mb-3">
                Contact
              </p>
              <a
                href="tel:+1-555-0100"
                className="text-text-secondary hover:text-emerald-primary transition-colors text-base font-semibold"
              >
                1 (555) 0100
              </a>
              <p className="text-text-secondary leading-relaxed">
                hello@prismequity.com
              </p>
            </div>
          </motion.div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={itemVariants}>
              <h4 className="font-semibold mb-6 text-text-primary uppercase tracking-wider text-xs">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-text-secondary hover:text-emerald-primary transition-colors text-sm font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pt-20 sm:pt-28 border-t border-fintech-border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 text-text-muted text-xs sm:text-sm leading-relaxed font-light">
            <p>
              &copy; {currentYear} Prism Equity Partners. All rights reserved.
            </p>
            <p className="max-w-lg text-right sm:text-right">
              Disclaimer: This website is for informational purposes only and does not constitute financial or legal advice. Always consult with qualified professionals.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
