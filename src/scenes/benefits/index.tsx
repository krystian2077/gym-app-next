"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import HText from "@/shared/HText";
import { BenefitType, SelectedPage } from "@/shared/types";
import Benefit from "./Benefit";

import {
  AcademicCapIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ActionButton from "@/shared/ActionButton";
import { defaultSiteContent, getMediaUrl, SiteContent } from "@/shared/cms";

const benefits: Array<BenefitType> = [
  {
    icon: <HomeModernIcon className="h-6 w-6" />,
    title: "State of the Facilities",
    description:
      "Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.",
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "100's of Diverse Classes",
    description:
      "Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.",
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: "Expert and Pro Trainers",
    description:
      "Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  content?: SiteContent["benefits"];
  setSelectedPage: (value: SelectedPage) => void;
};

const getIcon = (icon: string | null | undefined) => {
  if (icon === "group") return <UserGroupIcon className="h-6 w-6" />;
  if (icon === "academic") return <AcademicCapIcon className="h-6 w-6" />;
  return <HomeModernIcon className="h-6 w-6" />;
};

const Benefits = ({
  content = defaultSiteContent.benefits,
  setSelectedPage,
}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1120px)");
  const cards = content?.cards?.length
    ? content.cards.map((card) => ({
        description: card.description || "",
        icon: getIcon(card.icon),
        title: card.title,
      }))
    : benefits;
  const featureParagraphs = content?.featureParagraphs?.length
    ? content.featureParagraphs
    : defaultSiteContent.benefits?.featureParagraphs || [];

  return (
    <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}
      >
        {/* HEADER */}
        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>{content?.heading || "MORE THAN JUST GYM."}</HText>
          <p className="my-5 text-sm">
            {content?.intro || defaultSiteContent.benefits?.intro}
          </p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {cards.map((benefit: BenefitType) => (
            <Benefit
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              ctaLabel={content?.cardCtaLabel || "Learn More"}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>

        {/* GRAPHICS AND DESCRIPTION */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <img
            src={getMediaUrl(
              content?.featureImage,
              "/assets/BenefitsPageGraphic.png"
            )}
            alt="benefits-page-graphic"
            className="mx-auto"
          />

          {/* DESCRIPTION */}
          <div>
            {/* TITLE */}
            <div className="relative">
              <div className=" before:absolute before:-left-20 before:-top-20 before:z-[1] before:content-abstractwaves">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <HText>
                    {content?.featureHeadingBefore ||
                      defaultSiteContent.benefits?.featureHeadingBefore}{" "}
                    <span className="text-primary-500">
                      {content?.featureHeadingHighlight ||
                        defaultSiteContent.benefits?.featureHeadingHighlight}
                    </span>{" "}
                    {content?.featureHeadingAfter ||
                      defaultSiteContent.benefits?.featureHeadingAfter}
                  </HText>
                </motion.div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {featureParagraphs.map((paragraph, index) => (
                <p key={`${paragraph.text}-${index}`} className={index === 0 ? "my-5" : "mb-5"}>
                  {paragraph.text}
                </p>
              ))}
            </motion.div>

            {/* BUTTON */}
            <motion.div
              className="relative mt-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                <ActionButton setSelectedPage={setSelectedPage}>
                  {content?.ctaLabel || "Join Now"}
                </ActionButton>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;
