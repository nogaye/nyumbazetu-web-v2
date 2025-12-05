"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    portfolio: "",
    phone: "",
    email: "",
    message: "",
    source: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // if (!response.ok) throw new Error("Submission failed");
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        company: "",
        role: "",
        portfolio: "",
        phone: "",
        email: "",
        message: "",
        source: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Get in Touch</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
              Fill out the form and our team will get back to you within 24 hours. We'll schedule
              a demo tailored to your portfolio and answer any questions you have.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Email</h3>
                <a href="mailto:hello@nyumbazetu.com" className="text-[#b98036] hover:underline">
                  hello@nyumbazetu.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Phone</h3>
                <a href="tel:+254700000000" className="text-[#b98036] hover:underline">
                  +254 700 000 000
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Response Time</h3>
                <p className="text-slate-600 dark:text-slate-400">We typically respond within 24 hours during business days.</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request a Demo</CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Thank you for your message!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      Something went wrong
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      Please try again or contact us directly at hello@nyumbazetu.com
                    </p>
                  </div>
                </div>
              )}
              
              <form 
                className="space-y-6" 
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent ${
                      errors.name 
                        ? "border-red-500 dark:border-red-500" 
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Portfolio Size
                  </label>
                  <select
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1-10 units</option>
                    <option value="11-50">11-50 units</option>
                    <option value="51-100">51-100 units</option>
                    <option value="100+">100+ units</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent ${
                      errors.phone 
                        ? "border-red-500 dark:border-red-500" 
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent ${
                      errors.email 
                        ? "border-red-500 dark:border-red-500" 
                        : "border-slate-300 dark:border-slate-700"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-slate-900 dark:text-slate-50 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:ring-2 focus:ring-[#b98036] focus:border-transparent"
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

