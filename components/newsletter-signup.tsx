"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { trackFormSubmit } from "@/lib/analytics";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Email address is required");
      setStatus("error");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch("/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Track successful submission
      trackFormSubmit("newsletter", true);

      setStatus("success");
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      trackFormSubmit("newsletter", false);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Label htmlFor="newsletter-email" className="sr-only">
              Email address
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full"
              aria-label="Email address for newsletter subscription"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[140px]"
          >
            {isSubmitting ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <EnvelopeIcon className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {status === "error" && errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {status === "success" && (
          <Alert className="bg-[#36b9a0]/10 border-[#36b9a0] text-[#36b9a0] dark:bg-[#36b9a0]/20 dark:border-[#36b9a0] dark:text-[#36b9a0]">
            <CheckCircleIcon className="h-4 w-4" />
            <AlertDescription>
              Thank you! You've been subscribed to our newsletter.
            </AlertDescription>
          </Alert>
        )}
      </form>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
        We'll never share your email. Unsubscribe at any time.
      </p>
    </div>
  );
}

