"use client";
import { TypewriterEffectSmooth } from "@/components/accernity-ui/TypeWriterEffect";
import { Button } from "@/components/ui/button";
import { pricingPlans, typeWriterWords } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { FeaturesSection } from "./_components/Feature";
import { FeaturesGradient } from "./_components/FeaturesGradient";

import { HoverEffect } from "@/components/accernity-ui/CardHover";
import Link from "next/link";
import Navbar from "./_components/Navbar";

export default function HomeLandingPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4 selection:bg-primary selection:text-white dark bg-[#0C0A09]">
      <Navbar />
      <SectionWrapper className="h-[35rem]">
        <TypewriterEffectSmooth
          words={typeWriterWords}
          className="mb-0 space-y-0"
          cursorClassName="bg-primary"
        />
        <p className="text-muted-foreground text-xl">
          Create, automate, and scale your web scraping projects with ease. No
          coding required.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Button
            className="w-40 h-10 rounded-xl text-sm border-primary text-primary hover:text-white hover:bg-primary"
            variant={"outline"}
          >
            Get Started
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-primary">
          New users get 200 credits for free upon first login
        </p>
      </SectionWrapper>
      <SectionWrapper id="howItWorks">
        <div className="text-6xl text-foreground">
          <span className="text-primary">How</span>{" "}
          <span className="">It Works</span>
        </div>
        <FeaturesGradient />
      </SectionWrapper>
      <SectionWrapper id="scrapingFeatures">
        <div className="text-6xl text-foreground">
          <span className="text-primary">Scraping</span>{" "}
          <span className="">Features</span>
        </div>
        <FeaturesSection />
      </SectionWrapper>
      <SectionWrapper id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="text-6xl text-foreground">
          <span className="text-primary">Simple</span>{" "}
          <span className="">Pricing</span>
        </div>
        <div className="flex gap-5 w-full mt-10">
          <HoverEffect items={[...pricingPlans]} />
        </div>
      </SectionWrapper>
      <SectionWrapper className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#22C55E] to-green-600">
          Start Scraping Today
        </h2>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Join thousands of users who are already leveraging our powerful web
          scraping platform.
        </p>
        <Link
          className="w-max bg-[#22C55E] text-white hover:bg-[#22C55E]/90 transition-colors flex px-4 py-2 rounded-sm items-center"
          href={"/sign-in"}
        >
          Sign Up Now
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No credit card required. Start with 200 free credits.
        </p>
      </SectionWrapper>
    </div>
  );
}

function SectionWrapper({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-10 box-border max-w-screen-xl mx-auto scroll-mt-[80px]",
        className
      )}
      id={id}
    >
      {children}
    </section>
  );
}
