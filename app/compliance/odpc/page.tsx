"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon, ShieldCheckIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";

export default function ODPCPage() {
  const [pdfUrl] = useState("/legacy/docs/odpc.pdf");
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "odpc-certification.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Data Protection Compliance"
          description="Nyumba Zetu is certified by the Office of the Data Protection Commissioner (ODPC) in Kenya, ensuring your data is handled with the highest standards of security and privacy."
        />
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Certification Details Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheckIcon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">ODPC Certification</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    About the Certification
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Nyumba Zetu is registered and compliant with the Office of the Data Protection Commissioner (ODPC) 
                    in Kenya. This certification demonstrates our commitment to protecting personal data and ensuring 
                    compliance with the Data Protection Act, 2019.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    What This Means for You
                  </h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Your personal data is processed in accordance with Kenyan data protection laws</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>We maintain strict security measures to protect your information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>You have rights regarding your personal data, including access and correction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>We are transparent about how we collect, use, and store your data</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button onClick={handleDownload} size="lg" className="w-full sm:w-auto">
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download Certification
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700">
                  {pageUrl && (
                    <QRCodeSVG
                      value={pageUrl}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  )}
                </div>
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                  Scan to view this page on your mobile device
                </p>
              </CardContent>
            </Card>
          </div>

          {/* PDF Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-6 w-6 text-primary" />
                <CardTitle>Certification Document Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-[600px] md:h-[800px]"
                  title="ODPC Certification Document"
                />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1"
                >
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    Open in New Tab
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Data Protection Commitment
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                At Nyumba Zetu, we take data protection seriously. Our ODPC certification is just one part of our 
                comprehensive approach to data security and privacy. We implement industry-standard security measures, 
                regular audits, and staff training to ensure your data remains safe and secure.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                For more information about our data protection practices, please review our{" "}
                <a href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}

