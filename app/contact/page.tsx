"use client";

/**
 * Contact page: general enquiries, feedback, and company contact details.
 * Provides a contact form plus office address, phone, and email. For booking
 * a product demo, users are directed to /request-demo.
 */

import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { trackFormSubmit } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO,
  CONTACT_PHONE_PRIMARY_TEL,
  CONTACT_PHONE_SECONDARY_TEL,
  CONTACT_PHONE_PRIMARY_DISPLAY,
  CONTACT_PHONE_SECONDARY_DISPLAY,
  CONTACT_BUSINESS_HOURS,
} from "@/lib/constants/contact";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitStatus("success");
      trackFormSubmit("contact", true);
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
    } catch (_error) {
      setSubmitStatus("error");
      trackFormSubmit("contact", false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title="Get in touch"
          description="Ask questions, share feedback, or learn how Nyumba Zetu can help your property operations. We'll respond within 24 hours."
        />
      </Section>

      <Section className="bg-gradient-to-b from-white to-slate-50/60 dark:from-slate-950 dark:to-slate-900/40">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          <Card className="shadow-xl shadow-primary/10 w-full rounded-2xl border-primary/20 bg-white/95 dark:bg-slate-950/85 backdrop-blur">
            <CardHeader className="space-y-2 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <CardTitle className="text-2xl font-bold">Get in touch</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Fill out the form and our team will get back to you within 24
                hours. Want to book a product demo?{" "}
                <Link
                  href="/request-demo"
                  className="text-primary font-medium hover:underline"
                >
                  Request a demo
                </Link>
                .
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/15">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      Find us at the office
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Zetu Innovations
                      <br />
                      90 JGO, James Gichuru Road,
                      <br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/15">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      Give us a ring
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 space-y-1">
                      <a
                        href={CONTACT_PHONE_PRIMARY_TEL}
                        className="block text-primary hover:underline transition-colors"
                      >
                        {CONTACT_PHONE_PRIMARY_DISPLAY}
                      </a>
                      <a
                        href={CONTACT_PHONE_SECONDARY_TEL}
                        className="block text-primary hover:underline transition-colors"
                      >
                        {CONTACT_PHONE_SECONDARY_DISPLAY}
                      </a>
                      <span className="block text-sm mt-2">
                        {CONTACT_BUSINESS_HOURS}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/15">
                    <EnvelopeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      Email us
                    </h3>
                    <a
                      href={CONTACT_EMAIL_MAILTO}
                      className="text-primary hover:underline transition-colors block"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/15">
                    <InformationCircleIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                      Response Time
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Our team typically responds within 12 hours during business
                      days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send a message form */}
          <Card className="shadow-xl shadow-primary/10 w-full rounded-2xl border-primary/20 bg-white/95 dark:bg-slate-950/85 backdrop-blur">
            <CardHeader className="space-y-2 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <CardTitle className="text-2xl font-bold">
                Send a message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you within 12
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                  <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className={cn(
                          errors.name &&
                            "border-red-500 dark:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          role="alert"
                        >
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={cn(
                          errors.email &&
                            "border-red-500 dark:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          role="alert"
                        >
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={CONTACT_PHONE_PRIMARY_DISPLAY}
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                        className={cn(
                          errors.phone &&
                            "border-red-500 dark:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                          role="alert"
                        >
                          <ExclamationCircleIcon className="h-4 w-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                  <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Company Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="company">Company Name</Label>
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
                      <Label htmlFor="role">Your Role</Label>
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
                      <Label htmlFor="portfolio">Portfolio Size</Label>
                      <Select
                        value={formData.portfolio}
                        onValueChange={(value) =>
                          handleSelectChange("portfolio", value)
                        }
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

                <div className="space-y-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/30 p-4">
                  <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Additional Information
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
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
                      <Label htmlFor="source">How did you hear about us?</Label>
                      <Select
                        value={formData.source}
                        onValueChange={(value) =>
                          handleSelectChange("source", value)
                        }
                      >
                        <SelectTrigger id="source">
                          <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="event">
                            Event/Conference
                          </SelectItem>
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
                  {submitStatus === "success" && (
                    <Alert className="mt-4 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <AlertTitle className="text-green-800 dark:text-green-200">
                        Thank you for your message!
                      </AlertTitle>
                      <AlertDescription className="text-green-700 dark:text-green-300">
                        Our team typically gets back to you within 12 hours.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert className="mt-4" variant="destructive">
                      <ExclamationCircleIcon className="h-5 w-5" />
                      <AlertTitle>Something went wrong</AlertTitle>
                      <AlertDescription>
                        Please try again or contact us directly at{" "}
                        {CONTACT_EMAIL}
                      </AlertDescription>
                    </Alert>
                  )}
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
