// config.ts

export enum TestimonialDisplay {
    Hide = "Hide",
    Show = "Show",
    Anon = "Anon",
  }
  
  interface AppConfig {
    testimonials: TestimonialDisplay;
  }
  
  const config: AppConfig = {
    testimonials: TestimonialDisplay.Hide, // Default value
  };
  
  export default config;
  