"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export function LegacyReferral() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Section className="py-5 bg-slate-900 dark:bg-slate-950 position-relative overflow-hidden">
        <div className="container mx-auto px-4 position-relative">
          <div className="flex">
            <div className="w-full lg:w-2/3 md:w-2/3 mx-auto text-center">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Refer & Earn Up to $200
              </h2>

              <h3 className="text-white h6 text-lg">
                Refer someone and you could earn up to $200 when they sign up.
                <span className="text-sm text-white opacity-80"> *Terms apply.</span>
              </h3>

              <div className="flex mt-3">
                <div className="mx-auto">
                  <Button size="lg" onClick={() => setSubmitted(true)}>
                    Refer & Earn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {submitted && (
        <div className="container mx-auto px-4 mt-3">
          <div className="flex">
            <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-200">
                Thank you!
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300">
                We have received your referral. Someone from our team will contact you.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}

