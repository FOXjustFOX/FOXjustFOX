'use client';

import { motion } from 'framer-motion';
import { CONTENT } from '../lib/constants';
import { SectionWrapper } from './ui/SectionWrapper';
import { GlowText } from './ui/GlowText';
import { Button } from './ui/Button';
import { Mail, ExternalLink, Download } from 'lucide-react';

export const Contact = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen flex items-center">
      <div className="w-full text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlowText color="emerald">{CONTENT.contact.title}</GlowText>
        </motion.h2>

        <motion.p
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {CONTENT.contact.description}
        </motion.p>

        {/* Email */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" onClick={() => window.location.href = `mailto:${CONTENT.contact.email}`}>
            <Mail className="w-5 h-5 mr-2" />
            Get in Touch
          </Button>
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {CONTENT.contact.links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CV Download */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            size="md"
            onClick={() => window.open(CONTENT.contact.cvUrl, '_blank')}
          >
            <Download className="w-4 h-4 mr-2" />
            Download CV
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Igor Lis. Built with Next.js, GSAP & ❤️
          </p>
        </motion.footer>
      </div>
    </SectionWrapper>
  );
};
