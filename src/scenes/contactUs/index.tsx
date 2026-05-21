"use client";

import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import HText from "@/shared/HText";
import { defaultSiteContent, getMediaUrl, SiteContent } from "@/shared/cms";

type Props = {
  content?: SiteContent["contact"];
  setSelectedPage: (value: SelectedPage) => void;
};

const ContactUs = ({
  content = defaultSiteContent.contact,
  setSelectedPage,
}: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <section id="contactus" className="mx-auto w-5/6 pb-32 pt-24">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        {/* HEADER */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            {content?.headingBefore}{" "}
            <span className="text-primary-500">
              {content?.headingHighlight || "JOIN NOW"}
            </span>{" "}
            {content?.headingAfter || "TO GET IN SHAPE"}
          </HText>
          <p className="my-5">
            {content?.intro || defaultSiteContent.contact?.intro}
          </p>
        </motion.div>

        {/* FORM AND IMAGE */}
        <div className="mt-10 justify-between gap-8 md:flex">
          <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <form
              target="_blank"
              onSubmit={onSubmit}
              action={
                content?.formAction ||
                "https://formsubmit.co/69d1759bf43ed044a3b955b8ebe1723d"
              }
              method="POST"
            >
              <input
                className={inputStyles}
                type="text"
                placeholder={content?.namePlaceholder || "NAME"}
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.name && (
                <p className="mt-1 text-primary-500">
                  {errors.name.type === "required" &&
                    (content?.requiredMessage || "This field is required.")}
                  {errors.name.type === "maxLength" &&
                    (content?.nameMaxLengthMessage ||
                      "Max length is 100 char.")}
                </p>
              )}

              <input
                className={inputStyles}
                type="text"
                placeholder={content?.emailPlaceholder || "EMAIL"}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-primary-500">
                  {errors.email.type === "required" &&
                    (content?.requiredMessage || "This field is required.")}
                  {errors.email.type === "pattern" &&
                    (content?.invalidEmailMessage || "Invalid email address.")}
                </p>
              )}

              <textarea
                className={inputStyles}
                placeholder={content?.messagePlaceholder || "MESSAGE"}
                rows={4}
                cols={50}
                {...register("message", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errors.message && (
                <p className="mt-1 text-primary-500">
                  {errors.message.type === "required" &&
                    (content?.requiredMessage || "This field is required.")}
                  {errors.message.type === "maxLength" &&
                    (content?.messageMaxLengthMessage ||
                      "Max length is 2000 char.")}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
              >
                {content?.submitLabel || "SUBMIT"}
              </button>
            </form>
          </motion.div>

          <motion.div
            className="relative mt-16 basis-2/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext">
              <img
                className="w-full"
                alt="contact-us-page-graphic"
                src={getMediaUrl(
                  content?.image,
                  "/assets/ContactUsPageGraphic.png"
                )}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
