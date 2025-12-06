import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  id: number;
  name: string;
  image: string;
  url: string;
  default?: boolean;
}

export function LegacyPartners() {
  const items: Partner[] = [
    {
      id: 1,
      name: "NCBA",
      image: "/legacy/images/banks/ncba.png",
      url: "https://ke.ncbagroup.com/",
      default: true,
    },
    {
      id: 2,
      name: "Co-op Bank",
      image: "/legacy/images/banks/co-op.png",
      url: "",
    },
    {
      id: 3,
      name: "DTB",
      image: "/legacy/images/banks/dtb.png",
      url: "",
    },
    {
      id: 4,
      name: "Equity Bank",
      image: "/legacy/images/banks/equity.png",
      url: "",
    },
    {
      id: 5,
      name: "KCB",
      image: "/legacy/images/banks/kcb.png",
      url: "",
    },
    {
      id: 6,
      name: "MPESA",
      image: "/legacy/images/banks/mpesa.svg",
      url: "",
    },
    {
      id: 7,
      name: "Stanbic Bank",
      image: "/legacy/images/banks/stanbic.png",
      url: "https://www.stanbicbank.co.ke/",
    },
    {
      id: 8,
      name: "I&M Bank",
      image: "/legacy/images/banks/iandm.png",
      url: "",
    },
    {
      id: 9,
      name: "ABSA Bank",
      image: "/legacy/images/banks/absa.png",
      url: "",
    },
    {
      id: 10,
      name: "Standard Chartered Bank",
      image: "/legacy/images/banks/stanchart.png",
      url: "",
    },
    {
      id: 11,
      name: "Gulf African Bank",
      image: "/legacy/images/banks/gulf.png",
      url: "",
    },
    {
      id: 12,
      name: "Prime Bank",
      image: "/legacy/images/banks/prime.png",
      url: "",
    },
    {
      id: 13,
      name: "Housing Finance",
      image: "/legacy/images/banks/hfc.png",
      url: "",
    },
  ];

  const defaultPartner = items.find((item) => item.default);
  const otherPartners = items.filter((item) => !item.default);

  return (
    <Section className="bg-slate-50 dark:bg-slate-900 py-5">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex mb-5">
          <div className="w-full lg:w-2/3 mx-auto text-center">
            <h3 className="font-bold text-4xl md:text-5xl mb-3 text-slate-900 dark:text-slate-50">
              Banking Partners
            </h3>
            <p className="lead text-lg text-slate-600 dark:text-slate-400">
              Experience smooth, secure transactions and automatic payment reconciliation through our trusted network of local banks and mobile payment platforms.
            </p>
          </div>
        </div>

        {/* Highlighted (Default) Partner */}
        {defaultPartner && (
          <div className="flex justify-center mb-5">
            <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-4">
              <Link
                href={defaultPartner.url || "#"}
                target="_blank"
                className="text-decoration-none"
              >
                <Image
                  className="w-full shadow-lg rounded-3xl p-3 bg-white dark:bg-slate-800"
                  src={defaultPartner.image}
                  alt={defaultPartner.name}
                  width={200}
                  height={180}
                  style={{ maxHeight: "180px", objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>
        )}

        {/* Other Partners */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {otherPartners.map((item) => (
            <div
              key={item.id}
              className="flex justify-center items-center"
            >
              <Link
                href={item.url || "#"}
                target="_blank"
                className="text-decoration-none"
              >
                <Image
                  className="w-full shadow-sm rounded-2xl bg-white dark:bg-slate-800 p-2"
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{ height: "80px", objectFit: "contain" }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

