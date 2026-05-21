"use client";

import { SelectedPage } from "@/shared/types";
import React from "react";
import SmoothLink from "@/shared/SmoothLink";

type Props = {
  page: string;
  pageId?: SelectedPage;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({ page, pageId, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage =
    pageId || (page.toLowerCase().replace(/ /g, "") as SelectedPage);
  return (
    <SmoothLink
      className={`${selectedPage === lowerCasePage ? "text-primary-500" : ""}
      transition duration-500 hover:text-primary-300`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </SmoothLink>
  );
};

export default Link;
