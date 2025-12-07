"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  PaperAirplaneIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { trackFormSubmit } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
      trackFormSubmit("contact", false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Talk to our team"
          description="Request a demo, ask questions, or learn how Nyumba Zetu can help your property operations."
        />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Get in Touch</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours. We'll schedule
                a demo tailored to your portfolio and answer any questions you have.
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                      <BuildingOfficeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Find us at the office</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Zetu Innovations<br />
                        90 JGO, James Gichuru Road,<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                      <PhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Give us a ring</h3>
                      <p className="text-slate-600 dark:text-slate-400 space-y-1">
                        <a href="tel:+254741382063" className="block text-primary hover:underline transition-colors">
                          +254 741 382063
                        </a>
                        <a href="tel:+16143904422" className="block text-primary hover:underline transition-colors">
                          +1 614 390 4422
                        </a>
                        <span className="block text-sm mt-2">Mon - Fri, 8:00 - 17:00</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                      <EnvelopeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Email us</h3>
                      <a 
                        href="mailto:admin@nyumbazetu.com" 
                        className="text-primary hover:underline transition-colors block"
                      >
                        admin@nyumbazetu.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                      <InformationCircleIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Response Time</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        We typically respond within 24 hours during business days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-2xl font-bold">Request a Demo</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitStatus === "success" && (
                <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
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
                <Alert variant="destructive">
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
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Personal Information
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="name">
                        Full Name *
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(
                          errors.name && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address *
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                          errors.email && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number *
                      </Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+254 700 000 000"
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={cn(
                          errors.phone && "border-red-500 dark:border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Company Information Section */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Company Information
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="company">
                        Company Name
                      </Label>
                      <Input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company Ltd"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        Your Role
                      </Label>
                      <Input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Property Manager"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">
                        Portfolio Size
                      </Label>
                      <Select
                        value={formData.portfolio}
                        onValueChange={(value) => handleSelectChange("portfolio", value)}
                      >
                        <SelectTrigger id="portfolio">
                          <SelectValue placeholder="Select portfolio size..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 units</SelectItem>
                          <SelectItem value="11-50">11-50 units</SelectItem>
                          <SelectItem value="51-100">51-100 units</SelectItem>
                          <SelectItem value="100+">100+ units</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Additional Information
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your property management needs..."
                        className="resize-none"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Optional: Share any specific questions or requirements
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="source">
                        How did you hear about us?
                      </Label>
                      <Select
                        value={formData.source}
                        onValueChange={(value) => handleSelectChange("source", value)}
                      >
                        <SelectTrigger id="source">
                          <SelectValue placeholder="Select an option..." />
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
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full flex items-center justify-center gap-2 h-12 text-base font-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <PaperAirplaneIcon className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3">
                    * Required fields
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}

