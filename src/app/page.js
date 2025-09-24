import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import OurOffert from "./OurOffert";
import GarageColors from "./GarageColors";
import About from "./About";

function page() {
  return (
    <div>
      <Hero />
      <WhyUs />
      <OurOffert />
      <GarageColors />
      <About />
    </div>
  );
}

export default page;
