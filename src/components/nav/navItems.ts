import type { navItem } from "../../types/nav";

export const siteItems: navItem[] = [
  {
    id: "home",
    label: "Home",
    to: "/",
    icon: "lets-icons:home-duotone",
  },
  {
    id: "bio",
    label: "Bio",
    to: "/bio",
    icon: "streamline-logos:about-me-logo-block",
  },
  {
    id: "blog",
    label: "Blog",
    to: "/blog",
    icon: "f7:pencil-outline",
  },
  {
    id: "tags",
    label: "Tags",
    to: "/tags",
    icon: "mdi:tags",
  },
];

export const socialItems: navItem[] = [
  {
    id: "email",
    label: "Email",
    to: "mailto:jagroves95@gmail.com",
    icon: "mdi:email",
  },
  {
    id: "github",
    label: "GitHub",
    to: "https://github.com/justingroves",
    icon: "mdi:github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    to: "https://www.linkedin.com/in/justin-a-groves/",
    icon: "mdi:linkedin",
  },
];
