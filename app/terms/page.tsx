"use client";

import { Section } from "@/components/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("terms");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="row">
            <div className="col-lg-3 mb-lg-0 mb-3">
              <Card className="bg-white dark:bg-slate-800 border-radius-lg p-3 position-sticky top-4">
                <nav className="flex flex-col space-y-2">
                  {[
                    { id: "terms", label: "General Terms", icon: "📚" },
                    { id: "support", label: "Support", icon: "📦" },
                    { id: "restrictions", label: "Restrictions", icon: "📦" },
                    { id: "confidentiality", label: "Confidentiality", icon: "📦" },
                    { id: "fees", label: "Fees", icon: "📦" },
                    { id: "duration", label: "Termination", icon: "📦" },
                    { id: "disclaimer", label: "Disclaimer", icon: "📦" },
                    { id: "limitation", label: "Limitation", icon: "📦" },
                    { id: "miscellaneous", label: "Miscellaneous", icon: "📦" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        activeSection === item.id
                          ? "bg-primary text-white dark:bg-primary"
                          : "text-dark dark:text-slate-300"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>
            <div className="col-lg-9">
              <Card className="mb-5">
                <CardHeader className="bg-gradient-primary p-5 position-relative">
                  <h3 className="text-white mb-0 text-2xl font-bold">Terms & conditions</h3>
                  <p className="text-white opacity-80 mb-0">Last modified: July 23 2023</p>
                </CardHeader>

                <CardContent className="p-5">
                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="terms">
                    TERMS OF USE
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    By using the [www.nyumbazetu.com] website ("Site" or "Platform") or any of the services provided by Nyumba Zetu, ("Nyumba Zetu", "we", "us", or "our"), including, but not limited to any of the services offered by Nyumba Zetu (collectively the Site and services herein referred to as the "Services"), you, on behalf of yourself as an individual as well as on behalf of the party who has entered into a subscription agreement with Nyumba Zetu, to grant you access to the Services, are agreeing to be bound by the following terms and conditions ("Terms of Use"). If you do not wish to be bound by these Terms of Use, please exit the Site now and do not use any of the Services. Your agreement with us regarding compliance with these Terms of Use becomes effective immediately upon commencement of your use of the Site or Services. We expressly reserve the right to change these Terms of Use from time to time upon reasonable notice to you (including without limitation via electronic notification or notification on the Site). You agree that it is your responsibility to review these Terms of Use from time to time and to familiarize yourself with any modifications. Your continued use of this Site or any Services after notification of such modifications will constitute acknowledgement of the modifications and agreement to abide and be bound by the revised Terms of Use. The use of any services, which require payment to access, as well as any free trials ("Paid Services") shall be subject to the Paid Services section of this agreement. Violation of any of the terms below will result in the suspension or termination of your account without a right to any refund if you have subscribed to any paid Services.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="support">
                    1. SERVICES AND SUPPORT
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    1.1 The Company has developed a software known as Nyumba Zetu Property Management System for the management of properties (the "Software").
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    1.2 Subject to the terms hereof, Company will provide Client with reasonable technical support during regular business hours.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="restrictions">
                    2. RESTRICTIONS AND RESPONSIBILITIES
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    2.1 Client represents, covenants, and warrants that Client will use the Services only in compliance with Company's standard published policies then in effect (the "Policy") and all applicable laws and regulations. Client hereby agrees to indemnify and hold harmless Company against any damages, losses, liabilities, settlements and expenses (including without limitation costs and attorneys' fees) in connection with any claim or action that arises from an alleged violation of the foregoing or otherwise from Client's use of Services.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    2.2 Client shall not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the Services or any software, documentation or data related to the Services ("Software"); copy, republish, replicate, modify, translate, or create derivative works based on the Services or any Software (except to the extent expressly permitted by Company or authorized within the Services); use the Services or any Software for time sharing or service bureau purposes or otherwise for the benefit of a third; or remove any proprietary notices or labels.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    2.3 Client shall be responsible for obtaining and maintaining any equipment and ancillary services needed to connect to, access or otherwise use the Services, including, without limitation, modems, hardware, servers, software, operating systems, networking, web servers and the like (collectively, "Equipment"). Client shall also be responsible for maintaining the security of the Equipment, Client account, passwords (including but not limited to administrative and user passwords) and files, and for all uses of Client account or the Equipment with or without Client's knowledge or consent.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="confidentiality">
                    3. CONFIDENTIALITY; PROPRIETARY RIGHTS
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    3.1 Each party (the "Receiving Party") understands that the other party (the "Disclosing Party") has disclosed or may disclose business, technical or financial information relating to the Disclosing Party's business (hereinafter referred to as "Proprietary Information" of the Disclosing Party). Proprietary Information of Company includes non-public information regarding features, functionality and performance of the Service. Proprietary Information of Client includes non-public data provided by Client to Company to enable the provision of the Services ("Client Data"). The Receiving Party agrees: (i) to take reasonable precautions to protect such Proprietary Information, and (ii) not to use (except in performance of the Services or as otherwise permitted herein) or divulge to any third person any such Proprietary Information. The Disclosing Party agrees that the foregoing shall not apply with respect to any information after five (5) years following the disclosure thereof or any information that the Receiving Party can document (a) is or becomes generally available to the public, or (b) was in its possession or known by it prior to receipt from the Disclosing Party, or (c) was rightfully disclosed to it without restriction by a third party, or (d) was independently developed without use of any Proprietary Information of the Disclosing Party or (e) is required to be disclosed by law.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    3.2 Client shall own all right, title and interest in and to the Client Data. Company shall own and retain all right, title and interest in and to (a) the Services and Software, all improvements, enhancements or modifications thereto, (b) any software, applications, inventions or other technology developed in connection with Implementation Services or support, any data that is based on or derived from the Client data and provided to Client as part of the Services, and (c) all intellectual property rights related to any of the foregoing.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    3.3 Notwithstanding anything to the contrary, Company shall have the right to collect and analyze data and other information relating to the provision, use and performance of various aspects of the Services and related systems and technologies (including, without limitation, information concerning Client Data and data derived therefrom), and Company will be free (during and after the term hereof) to (i) use such information and data to improve and enhance the Services and for other development, diagnostic and corrective purposes in connection with the Services and other Company offerings, and (ii) disclose such data solely in aggregate or other de-identified form in connection with its business. The Company acknowledges its responsibility to protect the confidentiality, integrity, and security of the data collected, stored, processed and handled as per the provisions of the Data Protection Act or any applicable data protection laws. No rights or licenses are granted except as expressly set forth herein.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="fees">
                    4. FEES AND PAYMENT
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    4.1 The Client shall pay Company the then applicable fees described in this Agreement and Implementation Services in accordance with the terms therein (the "Fees''). If Client's use of the Services requires the payment of additional fees (per the terms of this Agreement), Client shall be billed for such usage and Client agrees to pay the additional fees in the manner provided herein. The first month's fee will be due upon acceptance of this Agreement. Company reserves the right to change the Fees or applicable charges and to institute new charges and Fees at the end of the Initial Service Term or then current renewal term, upon thirty (30) days prior notice to Client (which may be sent by email). If Client believes that Company has billed Client incorrectly, Client must contact Company no later than 60 days after the closing date on the first billing statement in which the error or problem appeared, in order to receive an adjustment or credit. Inquiries should be directed to the Company's Client support department.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    4.2 Company may choose to bill through an invoice, in which case, full payment for invoices issued in any given month must be received by Company thirty (30) days after the mailing date of the invoice. Unpaid amounts are subject to a finance charge of 5% per month on any outstanding balance, or the maximum permitted by law, whichever is lower, plus all expenses of collection and may result in immediate termination of Service. The Client shall be responsible for all taxes associated with Services.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="duration">
                    5. DURATION AND TERMINATION
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    5.1 Subject to earlier termination as provided below, this Agreement is for the Initial Service Term as specified in the Agreement and shall be automatically renewed for additional periods of the same duration as the Initial Service Term (collectively, the "Term"), unless either party requests termination at least thirty (30) days prior to the end of the then-current term.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    5.2 In addition to any other remedies it may have, either party may also terminate this Agreement upon thirty (30) days' notice (or without notice in the case of nonpayment), if the other party materially breaches any of the terms or conditions of this Agreement. The Client will pay in full for the Services up to and including the last day on which the Services are provided. Upon any termination, Company will make all Client Data available to Client for electronic retrieval for a period of thirty (30) days, but thereafter Company may, but is not obligated to, delete stored Client Data. All sections of this Agreement which by their nature should survive termination will survive termination, including, without limitation, accrued rights to payment, confidentiality obligations, warranty disclaimers, and limitations of liability.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="disclaimer">
                    6. DISCLAIMER AND WARRANTIES
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    6.1 The Company shall use reasonable efforts consistent with prevailing industry standards to maintain the Services in a manner which minimizes errors and interruptions in the Services and shall perform the Implementation Services in a professional and workmanlike manner. Services may be temporarily unavailable for scheduled maintenance or for unscheduled emergency maintenance, either by Company or by third-party providers, or because of other causes beyond Company's reasonable control, but Company shall use reasonable efforts to provide advance notice in writing or by e-mail of any scheduled service disruption. HOWEVER, COMPANY DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR FREE; NOR DOES IT MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES. EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION, THE SERVICES AND IMPLEMENTATION SERVICES ARE PROVIDED "AS IS" AND COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="limitation">
                    7. LIMITATION AND LIABILITY
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    7.1 The Company will not be liable for any damages, including but not limited to, direct, indirect, special, incidental, or consequential damages, arising out of or in connection with the use or inability to use the Software. NOTWITHSTANDING ANYTHING TO THE CONTRARY, COMPANY AND ITS SUPPLIERS (INCLUDING BUT NOT LIMITED TO ALL EQUIPMENT AND TECHNOLOGY SUPPLIERS), OFFICERS, AFFILIATES, REPRESENTATIVES, CONTRACTORS AND EMPLOYEES SHALL NOT BE RESPONSIBLE OR LIABLE WITH RESPECT TO ANY SUBJECT MATTER OF THIS AGREEMENT OR TERMS AND CONDITIONS RELATED THERETO UNDER ANY CONTRACT, NEGLIGENCE, STRICT LIABILITY OR OTHER THEORY: (A) FOR ERROR OR INTERRUPTION OF USE OR FOR LOSS OR INACCURACY OR CORRUPTION OF DATA OR COST OF PROCUREMENT OF SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY OR LOSS OF BUSINESS; (B) FOR ANY INDIRECT, EXEMPLARY, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES; (C) FOR ANY MATTER BEYOND COMPANY'S REASONABLE CONTROL; OR (D) FOR ANY AMOUNTS THAT, TOGETHER WITH AMOUNTS ASSOCIATED WITH ALL OTHER CLAIMS, EXCEED THE FEES PAID BY CLIENT TO COMPANY FOR THE SERVICES UNDER THIS AGREEMENT IN THE 12 MONTHS PRIOR TO THE ACT THAT GAVE RISE TO THE LIABILITY, IN EACH CASE, WHETHER OR NOT COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>

                  <h3 className="mt-5 mb-3 text-2xl font-bold text-slate-900 dark:text-slate-50" id="miscellaneous">
                    8. MISCELLANEOUS
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    8.1 If any provision of this Agreement is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that this Agreement will otherwise remain in full force and effect and enforceable. This Agreement is not assignable, transferable or sub-licensable by Client except with Company's prior written consent. Company may transfer and assign any of its rights and obligations under this Agreement without consent. This Agreement is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements, communications and other understandings relating to the subject matter of this Agreement, and that all waivers and modifications must be in a writing signed by both parties, except as otherwise provided herein. No agency, partnership, joint venture, or employment is created as a result of this Agreement and the Client does not have any authority of any kind to bind the Company in any respect whatsoever. In any action or proceeding to enforce rights under this Agreement, the prevailing party will be entitled to recover costs and attorneys' fees. All notices under this Agreement will be in writing and will be deemed to have been duly given when received, if personally delivered; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; the day after it is sent, if sent for next day delivery by recognized overnight delivery service; and upon receipt, if sent by certified or registered mail, return receipt requested. This Agreement shall be governed by the laws of Kenya without regard to its conflict of laws provisions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


