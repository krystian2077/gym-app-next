"use client";

import { ClassType, SelectedPage } from "@/shared/types";
import HText from "@/shared/HText";
import Class from "./Class";
import { motion } from "framer-motion";
import {
  defaultClasses,
  defaultSiteContent,
  getMediaUrl,
  getPlainText,
  SiteClass,
  SiteContent,
} from "@/shared/cms";

const classes: Array<ClassType> = [
  {
    name: "Weight Training Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image1.png",
  },
  {
    name: "Yoga Classes",
    image: "/assets/image2.png",
  },
  {
    name: "Ab Core Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image3.png",
  },
  {
    name: "Adventure Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image4.png",
  },
  {
    name: "Fitness Classes",
    image: "/assets/image5.png",
  },
  {
    name: "Training Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image6.png",
  },
];

type Props = {
  classes?: SiteClass[];
  content?: SiteContent["classesSection"];
  setSelectedPage: (value: SelectedPage) => void;
};

const OurClasses = ({
  classes: cmsClasses,
  content = defaultSiteContent.classesSection,
  setSelectedPage,
}: Props) => {
  const classItems = cmsClasses?.length ? cmsClasses : defaultClasses;

  return (
    <section id="ourclasses" className="w-full bg-primary-100 py-40">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.OurClasses)}
      >
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="md:w-3/5">
            <HText>{content?.heading || "OUR CLASSES"}</HText>
            <p className="py-5">
              {content?.intro || defaultSiteContent.classesSection?.intro}
            </p>
          </div>
        </motion.div>

        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[2800px] whitespace-nowrap">
            {classItems.map((item: ClassType | SiteClass, index) => (
              <Class
                key={`${item.name}-${index}`}
                name={item.name}
                description={
                  "excerpt" in item
                    ? item.excerpt || getPlainText(item.description)
                    : String(item.description || "")
                }
                image={getMediaUrl(item.image, "/assets/image1.png")}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default OurClasses;
