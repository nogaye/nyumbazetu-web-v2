"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual contact form submission
    // This could integrate with:
    // - Supabase Edge Function
    // - Email service (SendGrid, Resend, etc.)
    // - Your backend API

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form and close
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
    setIsOpen(false);

    // Show success message (you could use a toast library here)
    alert("Thank you! Your message has been sent. We'll get back to you soon.");
  };

  return (
    <>
      <Button className="w-full" size="lg" onClick={() => setIsOpen(true)}>
        Contact Owner
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetClose onClick={() => setIsOpen(false)} />
          <SheetHeader>
            <SheetTitle>Contact Property Owner</SheetTitle>
            <SheetDescription>
              Send a message about: <strong>{propertyTitle}</strong>
            </SheetDescription>
          </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+254 700 000 000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="I'm interested in viewing this property..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Or contact directly:
            </p>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href="mailto:info@nyumbazetu.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href="tel:+254700000000">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

