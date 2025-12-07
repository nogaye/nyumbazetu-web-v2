"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ContactOwnerButtonProps {
  propertyTitle: string;
  propertyId: string;
}

export function ContactOwnerButton({
  propertyTitle,
  propertyId,
}: ContactOwnerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
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
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Implement actual contact form submission
      // This could integrate with:
      // - Supabase Edge Function
      // - Email service (SendGrid, Resend, etc.)
      // - Your backend API

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
      
      // Close sheet after 2 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button className="w-full" size="lg" onClick={() => setIsOpen(true)}>
        Contact Owner
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="overflow-y-auto">
          <div className="p-6">
            <SheetHeader className="space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <SheetTitle className="text-2xl font-bold">Contact Property Owner</SheetTitle>
            <SheetDescription className="text-base">
              Send a message about: <strong className="text-slate-900 dark:text-slate-50">{propertyTitle}</strong>
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
            {submitStatus === "success" && (
              <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-200">
                  Message sent successfully!
                </AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  We'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}
            
            {submitStatus === "error" && (
              <Alert variant="destructive">
                <ExclamationCircleIcon className="h-5 w-5" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                  Please try again or contact us directly.
                </AlertDescription>
              </Alert>
            )}

            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Your Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
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
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Optional: Help us reach you faster
                  </p>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Your Message
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I'm interested in viewing this property. Please let me know when would be a good time to schedule a viewing..."
                  className="resize-none"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-3">
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
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                * Required fields
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Or contact directly:
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-11"
                  asChild
                >
                  <a href="mailto:info@nyumbazetu.com" className="flex items-center">
                    <EnvelopeIcon className="mr-2 h-5 w-5" />
                    Email Us
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-11"
                  asChild
                >
                  <a href="tel:+254700000000" className="flex items-center">
                    <PhoneIcon className="mr-2 h-5 w-5" />
                    Call Us
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start h-11"
                  asChild
                >
                  <a
                    href="https://wa.me/254700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <ChatBubbleLeftRightIcon className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

