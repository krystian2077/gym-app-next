import { getPayload } from "payload";
import config from "@payload-config";
import SiteApp from "@/scenes/SiteApp";
import { defaultClasses, defaultSiteContent, SiteClass, SiteContent } from "@/shared/cms";

export const dynamic = "force-dynamic";

const getCMSData = async (): Promise<{
  classes: SiteClass[];
  siteContent: SiteContent;
}> => {
  try {
    const payload = await getPayload({ config });

    const [siteContent, classes] = await Promise.all([
      payload.findGlobal({
        slug: "site-content",
        depth: 1,
      }),
      payload.find({
        collection: "classes",
        depth: 1,
        limit: 100,
        sort: "sortOrder",
      }),
    ]);

    return {
      classes: classes.docs.length ? (classes.docs as SiteClass[]) : defaultClasses,
      siteContent: siteContent as SiteContent,
    };
  } catch (error) {
    console.error("Failed to load Payload content", error);

    return {
      classes: defaultClasses,
      siteContent: defaultSiteContent,
    };
  }
};

export default async function Page() {
  const { classes, siteContent } = await getCMSData();

  return <SiteApp classes={classes} siteContent={siteContent} />;
}
