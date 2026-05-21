"use client";

import { defaultSiteContent, getMediaUrl, SiteContent } from "@/shared/cms";

type Props = {
  content?: SiteContent["footer"];
};

const Footer = ({ content = defaultSiteContent.footer }: Props) => {
  const links = content?.links?.length
    ? content.links
    : defaultSiteContent.footer?.links || [];

  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img src={getMediaUrl(content?.logo, "/assets/Logo.png")} alt="logo" />
          <p className="my-5">
            {content?.description || defaultSiteContent.footer?.description}
          </p>
          <p>{content?.copyright || defaultSiteContent.footer?.copyright}</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">{content?.linksHeading || "Links"}</h4>
          {links.map((link, index) => (
            <p key={link.label} className={index < links.length - 1 ? "my-5" : ""}>
              {link.label}
            </p>
          ))}
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">{content?.contactHeading || "Contact Us"}</h4>
          <p className="my-5">
            {content?.contactText || defaultSiteContent.footer?.contactText}
          </p>
          <p>{content?.phone || defaultSiteContent.footer?.phone}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
