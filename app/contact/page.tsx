"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user selects
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
                <Alert className="mb-6 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-200">
                    Thank you for your message!
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    We'll get back to you within 24 hours.
                  </AlertDescription>
                </Alert>
              )}
              
              {submitStatus === "error" && (
                <Alert variant="destructive" className="mb-6">
                  <ExclamationCircleIcon className="h-5 w-5" />
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription>
                    Please try again or contact us directly at hello@nyumbazetu.com
                  </AlertDescription>
                </Alert>
              )}
              
              <form 
                className="space-y-6" 
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name *
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={errors.name ? "border-red-500 dark:border-red-500" : ""}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Size</Label>
                  <Select
                    value={formData.portfolio}
                    onValueChange={(value) => handleSelectChange("portfolio", value)}
                  >
                    <SelectTrigger id="portfolio">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 units</SelectItem>
                      <SelectItem value="11-50">11-50 units</SelectItem>
                      <SelectItem value="51-100">51-100 units</SelectItem>
                      <SelectItem value="100+">100+ units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone *
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={errors.phone ? "border-red-500 dark:border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={errors.email ? "border-red-500 dark:border-red-500" : ""}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">How did you hear about us?</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => handleSelectChange("source", value)}
                  >
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="event">Event/Conference</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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

