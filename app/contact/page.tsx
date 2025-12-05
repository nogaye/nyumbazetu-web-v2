"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white pt-24">
        <SectionHeader
          title="Talk to our team"
          description="Request a demo, ask questions, or learn how Nyumba Zetu can help your property operations."
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <p className="text-lg text-slate-700 mb-8">
              Fill out the form and our team will get back to you within 24 hours. We'll schedule
              a demo tailored to your portfolio and answer any questions you have.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <a href="mailto:hello@nyumbazetu.com" className="text-[#b98036] hover:underline">
                  hello@nyumbazetu.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                <a href="tel:+254700000000" className="text-[#b98036] hover:underline">
                  +254 700 000 000
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                <p className="text-slate-600">We typically respond within 24 hours during business days.</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request a Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                className="space-y-6" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  setIsSubmitting(true);
                  // Handle form submission here
                  setTimeout(() => setIsSubmitting(false), 1000);
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-900 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-900 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-slate-900 mb-2">
                    Portfolio Size
                  </label>
                  <select
                    id="portfolio"
                    name="portfolio"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1-10 units</option>
                    <option value="11-50">11-50 units</option>
                    <option value="51-100">51-100 units</option>
                    <option value="100+">100+ units</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-slate-900 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    name="source"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="search">Search Engine</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="event">Event/Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}

