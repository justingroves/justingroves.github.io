// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        "text-h": "var(--text-h)",
        bg: "var(--bg)",
        border: "var(--border)",
        banner: "var(--banner)",
        link: "var(--link)",
        "link-hover": "var(--link-hover)",
      },

      fontFamily: {
        sans: ["var(--sans)"],
        heading: ["var(--heading)"],
        mono: ["var(--mono)"],
        logo: ["var(--logo)"],
        callout: ["var(--callout)"],
      },
    },
  },
};
