"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ITestimonial {
  id: number;
  name: string;
  workTitle?: string;
  title: string;
  description: string;
  default?: boolean;
}

export function LegacyTestimonials() {
  const [longTestimonials, setLongTestimonials] = useState<ITestimonial[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials: ITestimonial[] = [
    {
      id: 1,
      name: "Grace Nyambura",
      workTitle: "Property Manager, Gatma Ltd, Nairobi",
      default: true,
      title: "Great Customer Support",
      description: `Our experience with your customer support and training has been outstanding, deserving a perfect 10/10 score. Your team has shown exceptional reliability, patience, and understanding throughout our interactions. While we encountered occasional challenges with suspense accounts, particularly in reflecting reverted payments, these instances were rare.`,
    },
    {
      id: 2,
      name: "Olivia Ogola",
      title: "Easy to use",
      description: `The system's comprehensive features have significantly simplified our management and planning processes. Its user-friendliness is commendable, standing at 100%. Notably, the system has streamlined our ability to manage tenant payment progress and gain a comprehensive understanding of our property's performance. We appreciate your diligent follow-up and are grateful for the positive impact your service has had on our operations.`,
      workTitle: "Care-taker, Kiambu",
    },
    {
      id: 3,
      name: "Shallen Muthoni",
      workTitle: "Property Manager, Nairobi",
      title: "Great!!",
      description: `Since adopting Nyumba Zetu, managing our properties in Nairobi have transformed dramatically. The ease of tracking rent payments and maintenance requests is unparalleled. I've noticed other property managers in Nairobi are curious about our newfound efficiency. If you're not using this software, you're truly missing out on a game-changer!`,
    },
    {
      id: 4,
      name: "Aisha Mwangi",
      workTitle: "Landlord",
      title: "Efficient Invoicing and Payments Reconciliation",
      description: `Managing properties across Mombasa, Nakuru, and Nairobi with Nyumba Zetu has been a game-changer for our business. The invoicing and payment reconciliation features are incredibly efficient and accurate. Plus, the WhatsApp chatbot is a brilliant touch for instant communication. It's clear that those not using Nyumba Zetu are missing out on peak efficiency`,
    },
    {
      id: 5,
      name: "James Nganga",
      workTitle: "Property Manager, Nairobi",
      title: `Seamless Management in Nairobi's Heart!`,
      description: `Nyumba Zetu has transformed our property management in Lavington. The user-friendly interface makes invoicing a breeze, and the payments reconciliation process is flawless. What's more, the customer support is always ready to help. `,
    },
    {
      id: 6,
      name: "Kamau Njoroge",
      workTitle: "Landlord, Nairobi",
      title: "Easy To Communicate With Tenants!",
      description: `Ever since we started using Nyumba Zetu for our Students Housing in Juja our efficiency has skyrocketed. The software's WhatsApp chatbot has revolutionized how we communicate with tenants, making everything more streamlined. With top-notch customer support, it's a complete package for property management in Nairobi.`,
    },
    {
      id: 7,
      name: "Omari Nyaga",
      workTitle: "Property Manager",
      title: "Staying Ahead in Nairobi's Real Estate Race with Nyumba Zetu",
      description: `In the competitive Nairobi real estate market, Nyumba Zetu gives us an edge. Its real-time financial reporting and easy payments reconciliation have made a significant difference. Our competitors are trying to catch up, but Nyumba Zetu puts us ahead effortlessly.`,
    },
    {
      id: 8,
      name: "Njeri Chege",
      workTitle: "Property Manager, Nairobi",
      title: "Innovative Invoicing and Communication",
      description: `Nyumba Zetu has been a vital tool for managing our properties. Its invoicing system is unmatched, and the WhatsApp chatbot adds a level of convenience we never knew we needed. I'm always recommending it to fellow property managers in Nairobi who don't want to fall behind in the tech curve.`,
    },
  ];

  useEffect(() => {
    // Get 3 random testimonials
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    setLongTestimonials(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Section className="bg-slate-900 dark:bg-slate-950 py-5 position-relative overflow-hidden">
      <div className="container mx-auto px-4 position-relative">
        <div className="flex">
          <div className="w-full md:w-2/3 mx-auto text-center">
            <h2 className="text-white mb-3 text-3xl font-bold">
              See why others are making the switch
            </h2>
            <h3 className="text-white font-light text-lg mb-4">
              We are rated 4.9 star in Google and top-rated by landlords and property managers
            </h3>

            <div className="text-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>
            <hr className="text-white horizontal text-center opacity-20" />
          </div>
        </div>

        {/* Detailed testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {longTestimonials.map((item) => (
            <div key={item.id} className="mb-4 md:mb-0">
              <Card className="mb-6">
                <CardContent className="text-center pb-0 pt-6">
                  <h4 className="mb-0 text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {item.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">{item.workTitle}</p>

                  <h5 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mt-2">
                    {item.title}
                  </h5>
                  <p className="mt-2 text-dark dark:text-slate-300 text-start text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="text-center pt-1">
                  <div className="mx-auto opacity-20">
                    <svg
                      width="60px"
                      height="60px"
                      viewBox="0 0 270 270"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path
                          d="M107.000381,49.033238 C111.792099,48.01429 115.761022,48.6892564 116.625294,50.9407629 C117.72393,53.8028077 113.174473,58.3219079 107.017635,60.982801 C107.011653,60.9853863 107.00567,60.9879683 106.999688,60.990547 C106.939902,61.0219589 106.879913,61.0439426 106.820031,61.0659514 C106.355389,61.2618887 105.888177,61.4371549 105.421944,61.5929594 C88.3985192,68.1467602 80.3242628,76.9161885 70.3525495,90.6906738 C60.0774843,104.884196 54.9399518,119.643717 54.9399518,134.969238 C54.9399518,138.278158 55.4624127,140.716309 56.5073346,142.283691 C57.2039492,143.328613 57.9876406,143.851074 58.8584088,143.851074 C59.7291771,143.851074 61.0353294,143.241536 62.7768659,142.022461 C68.3497825,138.016927 75.4030052,136.01416 83.9365338,136.01416 C93.8632916,136.01416 102.658051,140.063232 110.320811,148.161377 C117.983572,156.259521 121.814952,165.88151 121.814952,177.027344 C121.814952,188.695638 117.417572,198.970703 108.622813,207.852539 C99.828054,216.734375 89.1611432,221.175293 76.6220807,221.175293 C61.9931745,221.175293 49.3670351,215.166992 38.7436627,203.150391 C28.1202903,191.133789 22.8086041,175.024577 22.8086041,154.822754 C22.8086041,131.312012 30.0359804,110.239421 44.490733,91.6049805 C58.2196377,73.906272 74.3541002,59.8074126 102.443135,50.4450748 C102.615406,50.3748509 102.790055,50.3058192 102.966282,50.2381719 C104.199241,49.7648833 105.420135,49.3936487 106.596148,49.1227802 L107,49 Z M233.000381,49.033238 C237.792099,48.01429 241.761022,48.6892564 242.625294,50.9407629 C243.72393,53.8028077 239.174473,58.3219079 233.017635,60.982801 C233.011653,60.9853863 233.00567,60.9879683 232.999688,60.990547 C232.939902,61.0219589 232.879913,61.0439426 232.820031,61.0659514 C232.355389,61.2618887 231.888177,61.4371549 231.421944,61.5929594 C214.398519,68.1467602 206.324263,76.9161885 196.352549,90.6906738 C186.077484,104.884196 180.939952,119.643717 180.939952,134.969238 C180.939952,138.278158 181.462413,140.716309 182.507335,142.283691 C183.203949,143.328613 183.987641,143.851074 184.858409,143.851074 C185.729177,143.851074 187.035329,143.241536 188.776866,142.022461 C194.349783,138.016927 201.403005,136.01416 209.936534,136.01416 C219.863292,136.01416 228.658051,140.063232 236.320811,148.161377 C243.983572,156.259521 247.814952,165.88151 247.814952,177.027344 C247.814952,188.695638 243.417572,198.970703 234.622813,207.852539 C225.828054,216.734375 215.161143,221.175293 202.622081,221.175293 C187.993174,221.175293 175.367035,215.166992 164.743663,203.150391 C154.12029,191.133789 148.808604,175.024577 148.808604,154.822754 C148.808604,131.312012 156.03598,110.239421 170.490733,91.6049805 C184.219638,73.906272 200.3541,59.8074126 228.443135,50.4450748 C228.615406,50.3748509 228.790055,50.3058192 228.966282,50.2381719 C230.199241,49.7648833 231.420135,49.3936487 232.596148,49.1227802 L233,49 Z"
                          fill="#48484A"
                          fillRule="nonzero"
                          transform="translate(135.311778, 134.872794) scale(-1, -1) translate(-135.311778, -134.872794)"
                        />
                      </g>
                    </svg>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Slides */}
        <div className="flex mt-8">
          <div className="w-full flex justify-center text-center flex-col">
            <div className="carousel-container">
              <div className="carousel-inner">
                <div className="text-center mb-4">
                  <h5 className="text-white text-xl font-semibold mb-2">
                    {testimonials[currentSlide].title}
                  </h5>
                  <p className="text-white text-start max-w-3xl mx-auto">
                    {testimonials[currentSlide].description}
                  </p>
                  <div className="author flex justify-center text-center mt-4">
                    <div className="name">
                      <span className="text-white font-semibold">
                        {testimonials[currentSlide].name}
                      </span>
                      <div className="stats">
                        <small className="text-white opacity-80">
                          {testimonials[currentSlide].workTitle}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? "bg-white" : "bg-white opacity-30"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

