import Hero from '../components/Hero'
import FeatureMarquee from '../components/FeatureMarquee'
import WhatWeDo from '../components/WhatWeDo'
import About from '../components/About'
import ProductBridge from '../components/ProductBridge'
import AgencyCTA from '../components/AgencyCTA'

/* ----------------------------------------------------------------------------
 *  ROUTE "/" — ACCURATE SCALING, THE COMPANY.
 *
 *  Company content only. Deliberately absent from this page:
 *    · the ECG / heartbeat pulse   → belongs to the clinic, lives on /clinicos
 *    · every Calendly booking CTA  → booking is a product conversation
 *    · pillars, packages, pricing  → product detail, lives on /clinicos
 *
 *  The single bridge to the product is <ProductBridge />, which routes.
 * --------------------------------------------------------------------------*/

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureMarquee />
      <WhatWeDo />
      <About />
      <ProductBridge />
      <AgencyCTA />
    </>
  )
}
