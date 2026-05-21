"use client";

import React from "react";

type Props = {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const SmoothLink = ({ href, className, onClick, children }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.startsWith("#") ? href.slice(1) : href;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (onClick) onClick();
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default SmoothLink;
