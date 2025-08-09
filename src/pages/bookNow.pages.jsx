import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Search01Icon,
  SearchAreaIcon,
  ArrowDataTransferHorizontalIcon,
  AirplaneTakeOff01Icon,
  ArrowRight04Icon,
  Calendar03Icon,
  UserIcon,
  CircleArrowUpRightIcon,
  ArrowUpRight01Icon,
  QuoteUpIcon,
  Add01Icon,
  MinusSignIcon,
} from "@hugeicons/core-free-icons";

import clsx from "clsx";

import { SlideWrapper } from "./slideWrapper";
import { ResponsiveModal } from "../layouts";
import { EditProfile, WritePostReviewRecom } from "./modal";
import Who from "./who.section";
import What from "./what.section";
import Where from "./where.section";
import When from "./when.section";
import LightweightSpaceshipGame from "./LightweightSpaceshipGame";
import TestimonialCard from "../layouts/testimonial.section";
import VisualMastermindCard from "../layouts/visualMastermindCard";
import DataPathAnimation from "../layouts/dataPathAnimation";

export default function BookNow() {
  const tabs = [
    {
      label: "What",
      primaryIcon: SearchAreaIcon,
      primaryText: "Round",
      secondaryIcon: ArrowDataTransferHorizontalIcon,
      secondaryText: "Economy",
    },
    {
      label: "Where",
      primaryIcon: AirplaneTakeOff01Icon,
      primaryText: "From",
      secondaryIcon: ArrowRight04Icon,
      secondaryText: "To",
    },
    {
      label: "When",
      primaryIcon: Calendar03Icon,
      primaryText: "Departure",
      secondaryIcon: ArrowRight04Icon,
      secondaryText: "Return",
    },
    {
      label: "Who",
      primaryIcon: UserIcon,
      primaryText: "Number of Persons",
    },
  ];

  const cities = [
    {
      name: "New York",
      country: "USA",
      image:
        "https://images.unsplash.com/photo-1639775722393-6bd891bae010?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
    {
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sydney",
      country: "Australia",
      image:
        "https://images.unsplash.com/photo-1734007929985-ced7bdd53843?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "London",
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Dubai",
      country: "United Arab Emirates",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Rome",
      country: "Italy",
      image:
        "https://images.unsplash.com/photo-1575540668264-4485aacd78c3?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Barcelona",
      country: "Spain",
      image:
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Singapore",
      country: "Singapore",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2104&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bangkok",
      country: "Thailand",
      image:
        "https://images.unsplash.com/photo-1668107710159-10fbbab2a9dd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Cape Town",
      country: "South Africa",
      image:
        "https://images.unsplash.com/photo-1591742708307-ce49d19450d4?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Istanbul",
      country: "Turkey",
      image:
        "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const firstColumnCities = cities.slice(0, 3);
  const secondColumnCities = cities.slice(3, 6);
  const thirdColumnCities = cities.slice(6, 9);
  const fourColumnCities = cities.slice(9, 12);

  const testimonials = [
    {
      name: "Sarah L.",
      text: "Booking my flights was so easy and hassle-free! The platform gave me the best prices and smooth checkout experience. I’ll definitely use it for all my future trips!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      url: "https://www.facebook.com/",
      social: "@fb/touript",
    },
    {
      name: "Michael B.",
      text: "Thanks to this service, I found the perfect flight at an unbeatable price. Customer support was super helpful when I had questions. Highly recommend!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      url: "https://twitter.com/",
      social: "@twitter/touript",
    },
    {
      name: "Priya S.",
      text: "I loved how fast and intuitive the booking process was. The flight options and flexible dates helped me plan my trip exactly how I wanted.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      url: "https://www.linkedin.com/",
      social: "@linkedin/touript",
    },
    {
      name: "Carlos T.",
      text: "From searching to booking, everything was seamless. The alerts and travel tips made my journey stress-free. This is my go-to flight booking site now!",
      image: "https://randomuser.me/api/portraits/men/74.jpg",
      url: "https://www.instagram.com/",
      social: "@instagram/touript",
    },
    {
      name: "Linda M.",
      text: "Best flight booking experience ever! Easy to compare prices, clear options, and super fast checkout. I recommended it to all my friends.",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      url: "https://www.facebook.com/",
      social: "@fb/touript",
    },
    {
      name: "David K.",
      text: "Reliable and user-friendly platform. Found last-minute flights without any hassle. The mobile app is very convenient when traveling.",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
      url: "https://twitter.com/",
      social: "@twitter/touript",
    },
    {
      name: "Sofia R.",
      text: "Excellent customer service and smooth booking experience. The best place to get affordable flights with great options.",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      url: "https://www.linkedin.com/",
      social: "@linkedin/touript",
    },
    {
      name: "James W.",
      text: "I appreciate the detailed flight info and flexible cancellation policies. Made me confident to book flights even during uncertain times.",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
      url: "https://www.instagram.com/",
      social: "@instagram/touript",
    },
    {
      name: "Emma F.",
      text: "A simple and efficient flight booking platform. Saved me time and money, and the UI is really pleasant to use.",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
      url: "https://www.facebook.com/",
      social: "@fb/touript",
    },
    {
      name: "Liam P.",
      text: "Great deals, intuitive interface, and responsive support. It took the stress out of planning my business trip.",
      image: "https://randomuser.me/api/portraits/men/28.jpg",
      url: "https://twitter.com/",
      social: "@twitter/touript",
    },
    {
      name: "Isabella N.",
      text: "Highly recommend for anyone who wants quick and affordable flight bookings. The search filters are very helpful.",
      image: "https://randomuser.me/api/portraits/women/60.jpg",
      url: "https://www.linkedin.com/",
      social: "@linkedin/touript",
    },
    {
      name: "Ethan G.",
      text: "Found my flights in minutes, with great prices and flexible options. Will definitely book here again for future travel!",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      url: "https://www.instagram.com/",
      social: "@instagram/touript",
    },
    {
      name: "Olivia H.",
      text: "The best flight booking experience I’ve had! Quick, reliable, and affordable options. Customer service was super friendly too.",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      url: "https://www.facebook.com/",
      social: "@fb/touript",
    },
    {
      name: "Noah D.",
      text: "Easy to navigate website and great prices. The booking confirmation was instant and I felt confident throughout the process.",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      url: "https://twitter.com/",
      social: "@twitter/touript",
    },
    {
      name: "Mia K.",
      text: "I loved the personalized flight suggestions based on my travel history. Made planning my trip fun and simple!",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      url: "https://www.linkedin.com/",
      social: "@linkedin/touript",
    },
    {
      name: "Lucas F.",
      text: "Found the cheapest flights in no time! The filters helped me customize everything exactly how I wanted. Highly recommended.",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      url: "https://www.instagram.com/",
      social: "@instagram/touript",
    },
    {
      name: "Amelia V.",
      text: "Super convenient mobile booking and instant notifications. Made traveling during busy seasons so much easier!",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      url: "https://www.facebook.com/",
      social: "@fb/touript",
    },
    {
      name: "Ethan L.",
      text: "I appreciate how transparent the pricing was—no hidden fees. Smooth experience from search to booking confirmation.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      url: "https://twitter.com/",
      social: "@twitter/touript",
    },
  ];

  const firstSixTestimonials = testimonials.slice(0, 6);
  const secondSixTestimonials = testimonials.slice(6, 12);
  const thirdSixTestimonials = testimonials.slice(12, 18);

  const faqData = [
    {
      id: 1,
      question: "What is Farfable and how does it work?",
      answer:
        "Farfable is a global travel community and flight booking platform designed to connect travelers, share authentic experiences, and help you book affordable flights with ease. You can search for flights from hundreds of airlines, find the best deals, and also join our community to connect with other travelers, share tips, and discover hidden gems at your destination. Our goal is to make your journey as memorable as your destination.",
    },
    {
      id: 2,
      question: "How do I book a flight through Farfable?",
      answer:
        "Booking a flight is simple. Just enter your departure city, destination, and travel dates in our search bar. We’ll compare prices across multiple airlines and travel partners to bring you the best available fares. Once you select your preferred option, you’ll be redirected to our trusted partner or airline’s booking page to securely complete your purchase. We never charge hidden booking fees — the price you see is the price you pay.",
    },
    {
      id: 3,
      question: "Can I also book hotels or other travel services?",
      answer:
        "Yes! While flights are our specialty, Farfable partners with leading accommodation providers, car rental companies, and activity booking platforms. This means you can book hotels, vacation homes, car rentals, and even tours — all from one place. Our goal is to provide a one-stop solution for all your travel needs so you can focus on enjoying your trip rather than juggling multiple bookings.",
    },
    {
      id: 4,
      question: "Do you offer travel guides and tips?",
      answer:
        "Absolutely! Our travel community thrives on sharing experiences. You can browse our destination guides for insider tips, must-visit attractions, cultural advice, and food recommendations. Community members post reviews, travel stories, and itineraries to help others plan their trips. Whether it’s learning how to navigate Tokyo’s train system or finding the best street food in Bangkok, our guides are packed with real traveler insights.",
    },
    {
      id: 5,
      question: "Can I connect with other travelers through Farfable?",
      answer:
        "Yes, that’s one of our most loved features. Farfable allows you to join community discussions, follow like-minded travelers, and even organize meetups or group trips. Many travelers use the platform to find companions for certain legs of their journey or simply to share a meal abroad. We believe travel is more fun — and safer — when it’s shared.",
    },
    {
      id: 6,
      question: "Do you offer group discounts for flights?",
      answer:
        "Yes. If you’re traveling with a group of 8 or more people, we can help arrange special group fares through our airline partners. Group bookings often include perks such as flexible name changes, a single payment plan, and sometimes even extra baggage allowance. Simply contact our group booking team with your details, and we’ll find the best available deals.",
    },
    {
      id: 7,
      question: "How do I track my flight booking?",
      answer:
        "Once you complete your booking through our partner, you’ll receive a confirmation email with your booking reference number and airline PNR code. You can use this to check your booking status directly on the airline’s website or mobile app. Additionally, you can log into your Farfable account to store your trip details, get updates, and set reminders for check-in and boarding times.",
    },
    {
      id: 8,
      question: "What if my flight gets delayed or canceled?",
      answer:
        "Flight delays and cancellations are handled by the airline you booked with. However, we make it easy to access the right information quickly. Log into your Farfable account or check your confirmation email for the airline’s contact details and policies. In many cases, airlines will offer alternative flights or refunds. We also provide travel insurance options during booking that can protect you against such disruptions and cover related expenses.",
    },
    {
      id: 9,
      question: "Do you offer travel insurance?",
      answer:
        "Yes, we partner with trusted travel insurance providers so you can protect your trip against unexpected events like medical emergencies, lost luggage, trip cancellations, or delays. Insurance can be added during your flight booking process or purchased separately through your Farfable profile. We strongly recommend it, especially for international travel, as it offers peace of mind for a small cost.",
    },
    {
      id: 10,
      question: "Can I change or cancel my booking?",
      answer:
        "Change and cancellation policies vary depending on the airline and fare type you select. Many low-cost tickets are non-refundable, while flexible fares allow changes with minimal or no fees. We always recommend reading the fare rules before confirming your booking. If you need to make changes, you can contact the airline directly or, in some cases, reach out to our support team for assistance.",
    },
    {
      id: 11,
      question: "Do you support multi-city or open-jaw bookings?",
      answer:
        "Yes! Our advanced search lets you create custom itineraries with multiple stops or different arrival and departure airports. This is perfect for travelers who want to explore multiple cities in one trip. You can mix and match destinations, compare prices instantly, and find routes that make the most sense for your travel plans.",
    },
    {
      id: 12,
      question: "Is it safe to book through Farfable?",
      answer:
        "Yes. All payments are processed securely through our airline and travel partners, who use industry-standard encryption to protect your data. We never store your payment details on our servers. Farfable only works with trusted, verified travel providers so you can book with confidence knowing you’re in safe hands.",
    },
    {
      id: 13,
      question: "How can I join the Farfable travel community?",
      answer:
        "Joining is free! Simply sign up on our website or app, create your profile, and start exploring. You can share posts, comment on discussions, follow other travelers, and contribute to our destination guides. Our community is a great place to get inspired, ask questions, and connect with people who share your passion for travel.",
    },
    {
      id: 14,
      question: "Do you offer eco-friendly travel options?",
      answer:
        "Yes, we are committed to promoting responsible travel. Our search tool highlights flights with lower CO₂ emissions, and we partner with carbon offset programs to help travelers reduce their footprint. We also encourage community members to share sustainable travel tips, eco-friendly accommodations, and green travel experiences.",
    },
    {
      id: 15,
      question: "How can I get notified about flight deals?",
      answer:
        "You can set up personalized fare alerts in your Farfable account. Simply choose your route and preferred travel dates, and we’ll notify you via email or app push notification when prices drop. Our system monitors hundreds of sources daily to ensure you get the best deals before they’re gone.",
    },
    {
      id: 16,
      question: "What makes Farfable different from other travel sites?",
      answer:
        "Unlike traditional booking sites, Farfable combines a powerful flight search engine with a vibrant travel community. We don’t just help you get from point A to point B — we help you connect with people, discover unique experiences, and make the most of your journey. It’s not just about tickets and hotels; it’s about making travel more human, social, and memorable.",
    },
  ];

  const firstFAQColumn = faqData.slice(0, 8);
  const secondFAQColumn = faqData.slice(8, 16);

  // Define widths for each menu when active (in pixels)
  const menuWidths = {
    0: 672, // What ( Route & Coach )
    1: 900, // Where ( From & To )
    2: 900, // When ( Departure & Arrival )
    3: 448, // Who ( Adult & Children )
  };

  const [active, setActive] = useState(null);
  const [hoverRect, setHoverRect] = useState({
    highlightLeft: 0,
    highlightWidth: 0,
    menuLeft: 0,
    // menuWidth: 600,
  });
  const [popoverHeight, setPopoverHeight] = useState(0);

  const tabRefs = useRef([]);
  const menuRefs = useRef([]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tabRefs.current.every((ref) => !ref?.contains(e.target)) &&
        !e.target.closest(".popover-content")
      ) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Observe height changes
  useEffect(() => {
    if (active === null) return;
    const el = menuRefs.current[active];
    if (!el) return;

    const observer = new ResizeObserver(() =>
      setPopoverHeight(el.offsetHeight),
    );
    observer.observe(el);
    setPopoverHeight(el.offsetHeight);

    return () => observer.disconnect();
  }, [active]);

  const handleTabClick = (idx) => {
    const tabEl = tabRefs.current[idx];
    const parentRect = tabEl?.parentNode.getBoundingClientRect();
    const tabRect = tabEl?.getBoundingClientRect();

    if (!tabRect || !parentRect) return;

    const desiredWidth = menuWidths[idx] || parentRect.width;
    const maxWidth = parentRect.width; // prevent overflow
    const menuWidth = Math.min(desiredWidth, maxWidth);

    // Calculate center position
    const tabCenter = tabRect.left - parentRect.left + tabRect.width / 2;
    let menuLeft = tabCenter - menuWidth / 2;

    // Clamp so it stays inside parent
    const minLeft = 0; // parent left edge
    const maxLeft = parentRect.width - menuWidth; // parent right edge
    menuLeft = Math.max(minLeft, Math.min(menuLeft, maxLeft));

    setHoverRect({
      highlightLeft: tabRect.left - parentRect.left,
      highlightWidth: tabRect.width,
      menuLeft,
      menuWidth,
    });

    setActive(idx);
  };

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex w-full flex-col items-center justify-center bg-gray-50 pt-30"

        // style={{ backgroundImage: "url('../../public/images/booknowBackground.jpg')" }}
      >
        <h1 className="font-poppins w-xl text-center text-6xl leading-18 font-extrabold text-gray-900">
          Visit the places with your <span className="">comfort</span>
        </h1>
        <div className="flex items-center justify-center pt-11 pb-16">
          <div
            className={clsx(
              "relative flex h-22 max-w-5xl items-center justify-center rounded-lg px-1 py-1",
              active !== null
                ? "border border-gray-200 bg-gray-100 shadow-none"
                : "border border-white bg-white shadow-xl shadow-gray-200",
            )}
          >
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => handleTabClick(idx)}
                ref={(el) => (tabRefs.current[idx] = el)}
                className={clsx(
                  "font-poppins relative z-1 flex h-full min-w-57 cursor-pointer items-center rounded-lg px-4 hover:bg-gray-100",
                  idx === 3 ? "pr-20" : "",
                  active === idx && "hover:bg-transparent",
                )}
              >
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={tab.primaryIcon}
                    size={24}
                    strokeWidth={2}
                    className="text-gray-400"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-gray-700">
                      {tab.label}
                    </span>
                    <div className="flex items-center gap-1 text-base font-medium text-gray-900">
                      <span className="font-normal text-gray-700">
                        {tab.primaryText}
                      </span>
                      {tab.secondaryIcon && (
                        <>
                          <HugeiconsIcon
                            icon={tab.secondaryIcon}
                            size={16}
                            strokeWidth={2}
                            className="text-gray-400"
                          />
                          <span className="font-normal text-gray-700">
                            {tab.secondaryText}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Highlight background */}
            {active !== null && (
              <div
                // className="absolute z-0 h-20 rounded-lg bg-white shadow-xl shadow-gray-200 transition-all duration-300"
                className={clsx(
                  "absolute z-0 h-20 rounded-lg bg-white shadow-xl shadow-gray-200 transition-all duration-300", // smooth morph for movement
                  popoverHeight === 0
                    ? "scale-50 opacity-0"
                    : "scale-100 opacity-100", // pop-in only
                )}
                style={{
                  left: `${hoverRect.highlightLeft}px`,
                  width: `${hoverRect.highlightWidth}px`,
                }}
              />
            )}

            {/* Popover Menu */}
            {/* Popover Menu */}
            {active !== null && (
              <div
                className={`popover-content absolute top-20 pt-6 transition-all duration-300 ${popoverHeight === 0 ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
                style={{
                  left: `${hoverRect.menuLeft}px`,
                  width: `${hoverRect.menuWidth}px`,
                }}
              >
                <div
                  className="rounded-lg bg-white shadow-2xl shadow-gray-200 transition-all duration-300"
                  style={{
                    height: popoverHeight || "auto",
                  }}
                >
                  <SlideWrapper index={0} active={active}>
                    <What ref={(el) => (menuRefs.current[0] = el)} />
                  </SlideWrapper>
                  <SlideWrapper index={1} active={active}>
                    <Where ref={(el) => (menuRefs.current[1] = el)} />
                  </SlideWrapper>
                  <SlideWrapper index={2} active={active}>
                    <When ref={(el) => (menuRefs.current[2] = el)} />
                  </SlideWrapper>
                  <SlideWrapper index={3} active={active}>
                    <Who ref={(el) => (menuRefs.current[3] = el)} />
                  </SlideWrapper>
                </div>
              </div>
            )}

            {/* Search Button */}
            <button className="absolute right-4 z-10 cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={24}
                  strokeWidth={2}
                  className="text-white"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <section className="my-40 flex h-screen w-7xl flex-col items-center justify-center">
        {/* FarFable Header */}
        <div className="flex w-full items-end justify-between">
          <h3 className="font-poppins flex flex-col items-start gap-4 text-start font-bold">
            <div className="flex flex-col items-start justify-start gap-1 text-2xl font-normal text-gray-400 lowercase">
              <span>Connecting with</span>
              <span>Travelers Like Never Before</span>
            </div>

            <span className="text-6xl font-extrabold text-gray-900">
              - Farfable
            </span>
          </h3>
          <button className="h-14 cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-xl hover:shadow-gray-200">
            <span className="font-medium">Join The Farfable Community </span>
          </button>
        </div>

        {/* Bento Grid */}

        <div className="mt-16 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="h-160 w-full rounded-lg bg-gray-100 sm:w-140"></div>

          <div className="flex h-160 w-full flex-col items-center gap-4 rounded-lg border-gray-200">
            <div className="flex h-full w-full items-center justify-between gap-4 rounded-lg border-gray-200">
              <div className="h-full w-full rounded-lg border-gray-200 bg-gray-100"></div>
              <div className="h-full w-full rounded-lg border-gray-200 bg-gray-100"></div>
            </div>
            <div className="h-full w-full rounded-lg border-gray-200 bg-gray-50"></div>
          </div>
        </div>
      </section>

      {/* <section className="flex w-full items-center justify-center bg-neutral-950 py-50"> */}
      <section className="my-40 flex h-screen w-full items-center justify-center bg-white">
        <div className="flex w-7xl flex-col items-center justify-center">
          {/* FarFable Header */}

          <h3 className="font-poppins flex flex-col items-center justify-center gap-4 text-center font-bold">
            <span className="text-2xl font-normal text-gray-400 lowercase">
              Top Cities to
            </span>
            {/* <span className="text-6xl font-extrabold text-white capitalize"> */}
            <span className="text-6xl font-extrabold text-gray-900 capitalize">
              Fly to Right Now
            </span>
          </h3>

          {/* City Grid */}
          <div className="mt-16 flex h-176 w-full flex-col items-center justify-between gap-4 sm:flex-row">
            {/* <div className="flex h-full w-full flex-col items-center justify-end gap-4">
              {leftCities.map((city, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-4"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="h-18 w-18 rounded-lg"
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-lg font-medium text-gray-900">
                        {city.name}
                      </span>
                      <span className="text-sm font-normal text-gray-400">
                        {city.country}
                      </span>
                    </div>
                  </div>

                  <button className="cursor-pointer text-gray-400 hover:text-gray-900">
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={24}
                      strokeWidth={2}
                    />
                  </button>
                </div>
              ))}
            </div> */}

            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex h-full w-full flex-col items-center justify-end gap-4">
                {firstColumnCities.map((city, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex w-full flex-col items-center justify-between rounded-lg px-4 py-4",
                      index % 2 == 0 ? "bg-white" : "bg-gray-50",
                    )}
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="h-24 w-full rounded-lg object-cover shadow-xl shadow-gray-200"
                      />
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-lg font-medium text-gray-900">
                            {city.name}
                          </span>
                          <span className="w-32 truncate text-sm font-normal text-gray-400">
                            {city.country}
                          </span>
                        </div>

                        <button className="cursor-pointer text-gray-400 hover:text-gray-900">
                          <HugeiconsIcon
                            icon={CircleArrowUpRightIcon}
                            size={24}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex h-full w-full flex-col items-center justify-end gap-4">
                {secondColumnCities.map((city, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex w-full flex-col items-center justify-between rounded-lg px-4 py-4",
                      index % 2 == 0 ? "bg-gray-50" : "bg-white",
                    )}
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="h-24 w-full rounded-lg object-cover shadow-xl shadow-gray-200"
                      />
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-lg font-medium text-gray-900">
                            {city.name}
                          </span>
                          <span className="w-32 truncate text-sm font-normal text-gray-400">
                            {city.country}
                          </span>
                        </div>

                        <button className="cursor-pointer text-gray-400 hover:text-gray-900">
                          <HugeiconsIcon
                            icon={CircleArrowUpRightIcon}
                            size={24}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-gray-100 px-8 py-8">
              <div className="flex w-sm items-center justify-start gap-4 overflow-x-auto">
                {/* <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-lg bg-white px-8 py-8">
                  <img
                    src="https://images.unsplash.com/photo-1583743220494-3da91330c2fd?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="card Image"
                    className="h-100 w-sm rounded-lg shadow-2xl shadow-gray-400 object-cover"
                  />
                  <div className="flex w-full flex-col items-start gap-1 pt-4">
                    <span className="text-xl font-medium text-gray-900">
                      San Francisco
                    </span>
                    <span className="text-base font-normal text-gray-400">
                      California, United States of America
                    </span>
                  </div>
                </div> */}

                <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-lg bg-white px-8 py-8">
                  <img
                    src="https://images.unsplash.com/photo-1515983206477-c0df29b37a27?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VG9yb250b3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="card Image"
                    className="h-100 w-full rounded-lg object-cover shadow-2xl shadow-gray-400"
                  />
                  <div className="flex w-full flex-col items-start gap-1 pt-4">
                    <span className="text-xl font-medium text-gray-900">
                      Toronto
                    </span>
                    <span className="text-base font-normal text-gray-400">
                      Ontario, Canada
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-white">
                <button className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-gray-900">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={24}
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>

            {/* <div className="flex h-full w-full flex-col items-center justify-end gap-4">
              {rightCities.map((city, index) => (
                <div
                  key={index}
                  className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-4"
                >
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="h-18 w-18 rounded-lg"
                    />
                    <div className="flex flex-col items-start justify-center gap-2">
                      <span className="text-lg font-medium text-gray-900">
                        {city.name}
                      </span>
                      <span className="text-sm font-normal text-gray-400">
                        {city.country}
                      </span>
                    </div>
                  </div>

                  <button className="cursor-pointer text-gray-400 hover:text-gray-900">
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={24}
                      strokeWidth={2}
                    />
                  </button>
                </div>
              ))}
            </div> */}
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex h-full w-full flex-col items-center justify-end gap-4">
                {thirdColumnCities.map((city, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex w-full flex-col items-center justify-between rounded-lg px-4 py-4",
                      index % 2 == 0 ? "bg-gray-50" : "bg-white",
                    )}
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="h-24 w-full rounded-lg object-cover shadow-xl shadow-gray-200"
                      />
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-lg font-medium text-gray-900">
                            {city.name}
                          </span>
                          <span className="w-32 truncate text-sm font-normal text-gray-400">
                            {city.country}
                          </span>
                        </div>

                        <button className="cursor-pointer text-gray-400 hover:text-gray-900">
                          <HugeiconsIcon
                            icon={CircleArrowUpRightIcon}
                            size={24}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex h-full w-full flex-col items-center justify-end gap-4">
                {fourColumnCities.map((city, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex w-full flex-col items-center justify-between rounded-lg px-4 py-4",
                      index % 2 == 0 ? "bg-white" : "bg-gray-50",
                    )}
                  >
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="h-24 w-full rounded-lg object-cover shadow-xl shadow-gray-200"
                      />
                      <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col items-start justify-center gap-1">
                          <span className="text-lg font-medium text-gray-900">
                            {city.name}
                          </span>
                          <span className="w-32 truncate text-sm font-normal text-gray-400">
                            {city.country}
                          </span>
                        </div>

                        <button className="cursor-pointer text-gray-400 hover:text-gray-900">
                          <HugeiconsIcon
                            icon={CircleArrowUpRightIcon}
                            size={24}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative my-40 flex h-screen w-full items-center justify-center bg-gray-50">
        {/* Fixed Center Heading */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center font-bold">
          <span className="w-sm text-2xl font-normal text-gray-900/30 lowercase">
            Here’s the journey they took with us
          </span>
          <span className="text-6xl font-extrabold text-gray-900 capitalize">
            - User Stories
          </span>
        </div>

        {/* Scrollable Cards */}
        <div className="absolute inset-0 z-20 flex w-full justify-center overflow-y-scroll py-10">
          <div className="max-auto flex w-7xl gap-16">
            <div className="flex w-full flex-col gap-16">
              {firstSixTestimonials.map(
                ({ name, text, image, url, social }, id) => (
                  <TestimonialCard
                    key={id}
                    name={name}
                    text={text}
                    image={image}
                    url={url}
                    social={social}
                  />
                ),
              )}
            </div>
            <div className="flex w-full flex-col gap-16">
              {secondSixTestimonials.map(
                ({ name, text, image, url, social }, id) => (
                  <TestimonialCard
                    key={id}
                    name={name}
                    text={text}
                    image={image}
                    url={url}
                    social={social}
                  />
                ),
              )}
            </div>
            <div className="flex w-full flex-col gap-16">
              {thirdSixTestimonials.map(
                ({ name, text, image, url, social }, id) => (
                  <TestimonialCard
                    key={id}
                    name={name}
                    text={text}
                    image={image}
                    url={url}
                    social={social}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="my-40 flex h-screen w-full items-center justify-center bg-white">
        <div className="flex w-7xl flex-col items-center justify-center">
          {/* FarFable Header */}

          <div className="flex w-full items-end justify-between">
            <h3 className="font-poppins flex flex-col items-start gap-4 text-start font-bold">
              <span className="text-2xl font-normal text-gray-400 lowercase">
                we're here to answer all
              </span>

              <span className="text-6xl font-extrabold text-gray-900">
                - Your Questions
              </span>
            </h3>
            <div className="flex flex-col items-end justify-end gap-4">
              <span className="font-poppins text-gray-400">
                have more questions?
              </span>
              <button className="h-14 cursor-pointer rounded-lg bg-gray-900 px-4 text-white transition-all duration-300 hover:shadow-xl hover:shadow-gray-200">
                <span className="font-medium">Send Us Email</span>
              </button>
            </div>
          </div>

          <div className="mt-16 flex h-176 w-full items-center justify-between gap-16 sm:flex-row">
            <div className="flex h-full w-full flex-col items-start gap-4">
              {firstFAQColumn.map((item) => (
                <div
                  key={item.id}
                  className="relative h-full w-full rounded-lg bg-gray-50"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={clsx(
                      "flex h-full min-h-14 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-8 text-left transition-all duration-300",
                      openItems[item.id]
                        ? "border-white bg-white shadow-2xl shadow-gray-900/10"
                        : "",
                    )}
                  >
                    <h3 className="pr-18 text-base font-medium text-gray-900">
                      {item.question}
                    </h3>
                    <div
                      className={clsx(
                        "flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-300",
                        openItems[item.id]
                          ? "bg-gray-900 text-white"
                          : "text-gray-400 hover:bg-gray-100",
                      )}
                    >
                      {openItems[item.id] ? (
                        <HugeiconsIcon
                          icon={MinusSignIcon}
                          size={24}
                          strokeWidth={2}
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={Add01Icon}
                          size={24}
                          strokeWidth={2}
                        />
                      )}
                    </div>
                  </button>

                  {openItems[item.id] && (
                    // <div className="animate-in fade-in slide-in-from-top-2 absolute top-full right-0 left-0 z-10 rounded-b-lg border border-gray-200 bg-white shadow-lg duration-200">
                    <div className="absolute top-full right-0 left-0 z-10 mt-4 rounded-lg bg-white shadow-2xl shadow-gray-900/10 transition-all duration-300">
                      <div className="w-full px-8 py-8">
                        <p className="font-poppins text-base/8 text-gray-900">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex h-full w-full flex-col items-start gap-4">
              {secondFAQColumn.map((item) => (
                <div
                  key={item.id}
                  className="relative h-full w-full rounded-lg bg-gray-50"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={clsx(
                      "flex h-full min-h-14 w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-8 text-left transition-all duration-300",
                      openItems[item.id]
                        ? "border-white bg-white shadow-2xl shadow-gray-900/10"
                        : "",
                    )}
                  >
                    <h3 className="pr-18 text-base font-medium text-gray-900">
                      {item.question}
                    </h3>
                    <div
                      className={clsx(
                        "flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-300",
                        openItems[item.id]
                          ? "bg-gray-900 text-white"
                          : "text-gray-400 hover:bg-gray-100",
                      )}
                    >
                      {openItems[item.id] ? (
                        <HugeiconsIcon
                          icon={MinusSignIcon}
                          size={24}
                          strokeWidth={2}
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={Add01Icon}
                          size={24}
                          strokeWidth={2}
                        />
                      )}
                    </div>
                  </button>

                  {openItems[item.id] && (
                    // <div className="animate-in fade-in slide-in-from-top-2 absolute top-full right-0 left-0 z-10 rounded-b-lg border border-gray-200 bg-white shadow-lg duration-200">
                    <div className="absolute top-full right-0 left-0 z-10 mt-4 rounded-lg bg-white shadow-2xl shadow-gray-900/10 transition-all duration-300">
                      <div className="w-full px-8 py-8">
                        <p className="font-poppins text-base/8 text-gray-900">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-40 flex h-screen w-full items-center justify-center bg-neutral-950">
        <div className="flex w-7xl max-w-full flex-col items-center justify-center space-y-12 px-6">
          {/* First column: Touript title */}
          <div className="flex w-full justify-center">
            <h1 className="text-4xl font-bold text-white">touript</h1>
          </div>

          {/* Second column: three-part row */}
          <div className="flex w-full max-w-7xl justify-between text-gray-300">
            {/* About Touript */}
            <div className="flex max-w-xs flex-col space-y-2">
              <h2 className="mb-2 text-xl font-semibold text-white">
                About Touript
              </h2>
              <p className="text-sm leading-relaxed">
                Touript is a community-driven platform dedicated to travelers
                who seek authentic experiences, insider tips, and great deals
                worldwide.
              </p>
            </div>

            {/* Quick Nav Links */}
            <div className="flex max-w-xs flex-col space-y-2">
              <h2 className="mb-2 text-xl font-semibold text-white">
                Quick Nav
              </h2>
              <nav className="flex flex-col space-y-1 text-sm">
                <a href="#home" className="hover:text-white">
                  Home
                </a>
                <a href="#destinations" className="hover:text-white">
                  Destinations
                </a>
                <a href="#community" className="hover:text-white">
                  Community
                </a>
                <a href="#blog" className="hover:text-white">
                  Blog
                </a>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex max-w-xs flex-col space-y-2">
              <h2 className="mb-2 text-xl font-semibold text-white">
                Social Links
              </h2>
              <nav className="flex flex-col space-y-1 text-sm">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  LinkedIn
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* <LightweightSpaceshipGame /> */}
    </div>
  );
}
