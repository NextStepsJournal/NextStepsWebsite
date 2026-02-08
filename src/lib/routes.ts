export const defaultTitle = "NextSteps | Career Exploration & Mentorship for Students";

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
    title: "Team | NextSteps",
    label: "Team",
  },
  "/journal": {
    title: "Journal | NextSteps",
    label: "Journal",
  },
  "/partners": {
    title: "Partners | NextSteps",
    label: "Partners",
  },
  "/get-involved": {
    title: "Get Involved | NextSteps",
    label: "Get Involved",
  },
  "/contact": {
    title: "Contact | NextSteps",
    label: "Contact",
  },
};
