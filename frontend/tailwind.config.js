/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      fontSize: {
        "3xl": ["24px", "150%"],
        "2xl": ["22px", "150%"],
        xl: ["20px", "150%"],
        lg: ["18px", "150%"],
        md: ["16px", "150%"],
        sm: ["14px", "150%"],
        xs: ["12px", "150%"],
        xxs: ["11px", "150%"],
        xxxs: ["10px", "150%"],
        xxxxs: ["8px", "150%"],
      },

      colors: {
        lemon: {
          100: "#F5D900",
          90: "#FDDF00",
          80: "#FFE311",
          70: "#FFE523",
          60: "#FFE730",
          50: "#FFE944",
          40: "#FFED65",
          30: "#FFF07C",
          20: "#FFF187",
          10: "#FFF7BA",
          0: "#FFFFFF",
        },

        yellow: {
          100: "#D6AB00",
          90: "#EABC00",
          80: "#F4C400",
          70: "#FFCD00",
          60: "#FFD011",
          50: "#FFD426",
          40: "#FFD93E",
          30: "#FFDC4D",
          20: "#FFE064",
          10: "#FFE786",
          0: "#FFFFFF",
        },

        orange: {
          100: "#E86500",
          90: "#F26900",
          80: "#FF6F00",
          70: "#FF740A",
          60: "#FF7810",
          50: "#FF801E",
          40: "#FF892E",
          30: "#FF923F",
          20: "#FF9D52",
          10: "#FFB67D",
          0: "#FFFFFF",
        },

        grayscale: {
          100: "#333333",
          90: "#474747",
          80: "#5C5C5C",
          70: "#818181",
          60: "#959595",
          50: "#AAAAAA",
          40: "#C3C3C3",
          30: "#CCCCCC",
          20: "#D9D9D9",
          10: "#E7E7E7",
          0: "#FFFFFF",
        },

        goldbrown: {
          100: "#181404",
          90: "#1F1A05",
          80: "#241E07",
          70: "#272106",
          60: "#2B2409",
          50: "#2E2609",
          40: "#332A08",
          30: "#362D0A",
          20: "#39300A",
          10: "#40350A",
          0: "#FFFFFF",
        },
      }
    },
  },
  plugins: [],
}

