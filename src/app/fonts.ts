  
  
  import localFont from "next/font/local";

  export const pixelify = localFont({
    src: [
      {
        path: "../../public/assets/fonts/pixelify-sans-regular.woff2",
        weight: "400",
      },
  
      {
        path: "../../public/assets/fonts/pixelify-sans-medium.woff2",
        weight: "500",
      },
  
      {
        path: "../../public/assets/fonts/pixelify-sans-semi-bold.woff2",
        weight: "600",
      },
      {
        path: "../../public/assets/fonts/pixelify-sans-bold.woff2",
        weight: "700",
      },
    ],
    variable: "--font-pixelify",
  });
