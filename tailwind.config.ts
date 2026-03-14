import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: "#00C2FF",
            hover: "#00A6DB",
            foreground: "#001018",
            soft: "#E6F9FF",
            ring: "#7DD3FC",
            disabled: "#7DD3FC",
          },
          success: {
            DEFAULT: "#16A34A",
            hover: "#15803D",
            foreground: "#FFFFFF",
            soft: "#DCFCE7",
            ring: "#86EFAC",
            disabled: "#86EFAC",
          },
          danger: {
            DEFAULT: "#E11D48",
            hover: "#BE123C",
            foreground: "#FFFFFF",
            soft: "#FFE4E6",
            ring: "#FDA4AF",
            disabled: "#FDA4AF",
          },
          neutral: {
            DEFAULT: "#111827",
            hover: "#1F2937",
            foreground: "#FFFFFF",
            soft: "#F3F4F6",
            ring: "#9CA3AF",
            disabled: "#9CA3AF",
          },
        },
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        full: "9999px",
      },

      spacing: {
        "btn-sm-x": "0.75rem",   // px-3
        "btn-sm-y": "0.375rem",  // py-1.5
        "btn-md-x": "1rem",      // px-4
        "btn-md-y": "0.5rem",    // py-2
        "btn-lg-x": "1.5rem",    // px-6
        "btn-lg-y": "0.75rem",   // py-3
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },

      boxShadow: {
        brand: "0 4px 14px 0 rgba(0, 194, 255, 0.25)",
        success: "0 4px 14px 0 rgba(22, 163, 74, 0.25)",
        danger: "0 4px 14px 0 rgba(225, 29, 72, 0.25)",
        subtle: "0 1px 2px 0 rgba(0,0,0,0.05)",
      },

      transitionTimingFunction: {
        "brand-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },

  plugins: [],
};

export default config;