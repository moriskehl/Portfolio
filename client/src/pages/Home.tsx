import { useEffect } from "react";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import SkiingSummary from "@/components/SkiingSummary";
import CodingSummary from "@/components/CodingSummary";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {

  return (
    <div style={{ background: "#000000", minHeight: "100dvh" }}>
      <Hero />
      <Intro />
      <SkiingSummary />
      <CodingSummary />
      <ContactFooter />
    </div>
  );
}
