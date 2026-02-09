export const defaultTitle = "NextSteps Journal | Career Exploration & Mentorship for Students";

export const routeMeta: Record<
  string,
  {
    title: string;
    label: string;
  }
> = {
  "/": {
    title: defaultTitle,
    label: "Home",
  },
  "/team": {
    title: "Team | NextSteps Journal",
    label: "Team",
  },
  "/journal": {
    title: "Journal | NextSteps Journal",
    label: "Journal",
  },
  "/partners": {
    title: "Partners | NextSteps Journal",
    label: "Partners",
  },
  "/get-involved": {
    title: "Get Involved | NextSteps Journal",
    label: "Get Involved",
  },
  "/contact": {
    title: "Contact | NextSteps Journal",
    label: "Contact",
  },
};
