"use client";

import { useEffect, useState } from "react";
import Benefits from "@/scenes/benefits";
import ContactUs from "@/scenes/contactUs";
import Footer from "@/scenes/footer";
import Home from "@/scenes/home";
import Navbar from "@/scenes/navbar";
import OurClasses from "@/scenes/ourClasses";
import { SiteClass, SiteContent } from "@/shared/cms";
import { SelectedPage } from "@/shared/types";

type Props = {
  classes: SiteClass[];
  siteContent: SiteContent;
};

export default function SiteApp({ classes, siteContent }: Props) {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-20">
      <Navbar
        content={siteContent.navbar}
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home content={siteContent.home} setSelectedPage={setSelectedPage} />
      <Benefits
        content={siteContent.benefits}
        setSelectedPage={setSelectedPage}
      />
      <OurClasses
        classes={classes}
        content={siteContent.classesSection}
        setSelectedPage={setSelectedPage}
      />
      <ContactUs
        content={siteContent.contact}
        setSelectedPage={setSelectedPage}
      />
      <Footer content={siteContent.footer} />
    </div>
  );
}
