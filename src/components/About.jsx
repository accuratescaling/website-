import { motion } from 'framer-motion'
import { Check, Lock, Sparkles } from 'lucide-react'
import Aurora from './ui/Aurora'
import GlowCard from './ui/GlowCard'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { LogoMark } from './ui/Logo'
import { useLang } from '../i18n/context'
import { fromLeft, fromRight, viewport } from '../lib/motion'

export default function About() {
  const { t, lang } = useLang()
  const a = t.about

  return (
    <section id="about" className="relative isolate section overflow-hidden">
      <Aurora />

      <div className="container-x relative">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} lede={a.lede} />

        {/* ---------------------------------------------- Branded House model */}
        <div className="mt-16 grid items-start gap-6 lg:mt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <Reveal variants={fromLeft}>
            <div className="lg:pt-4">
              <span className="font-mono text-[11px] tracking-[0.24em] text-brand-300/70 uppercase">
                {a.vision.label}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight font-bold sm:text-3xl">
                {a.vision.title}
              </h3>
              <p className="mt-5 leading-relaxed text-muted">{a.vision.body}</p>

              <ul className="mt-7 space-y-3">
                {a.vision.bullets.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-paper/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-400/15 text-brand-300">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* the tree diagram */}
          <Reveal variants={fromRight}>
            <GlowCard className="p-6 sm:p-8" lift={false}>
              {/* parent brand node */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-brand-300/22 bg-brand-400/[0.07] p-4">
                <LogoMark className="size-11 shrink-0" />
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-bold">{t.brand.name}</p>
                  <p className="text-[11px] tracking-[0.16em] text-brand-300/70 uppercase">
                    {a.parentBrand}
                  </p>
                </div>
              </div>

              {/* branch spine */}
              <div className="relative mt-1 ps-6">
                <motion.div
                  className="absolute top-0 start-6 w-px origin-top bg-gradient-to-b from-brand-300/60 via-brand-400/35 to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  style={{ bottom: '2.2rem' }}
                />

                <ul className="space-y-3 pt-3">
                  {a.tree.map((node, i) => (
                    <motion.li
                      key={`${lang}-${node.name}`}
                      className="relative ps-8"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewport}
                      transition={{ delay: 0.35 + i * 0.13, duration: 0.55 }}
                    >
                      {/* elbow connector */}
                      <span
                        aria-hidden
                        className="absolute top-1/2 start-0 h-px w-6 bg-gradient-to-r from-brand-300/50 to-brand-300/15"
                      />
                      <div
                        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                          node.live
                            ? 'border-brand-300/25 bg-brand-400/[0.08]'
                            : 'border-brand-300/10 bg-brand-300/[0.02]'
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className={`font-display text-sm font-bold ${
                              node.live ? 'text-paper' : 'text-muted/70'
                            }`}
                          >
                            {node.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-faint">{node.detail}</p>
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.14em] ${
                            node.live
                              ? 'bg-brand-400/18 text-brand-200'
                              : 'bg-black/[0.045] text-faint'
                          }`}
                        >
                          {node.live ? (
                            <Sparkles className="size-2.5" />
                          ) : (
                            <Lock className="size-2.5" />
                          )}
                          {node.status}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 border-t border-brand-300/10 pt-5 text-[12px] leading-relaxed text-faint">
                {a.treeNote}
              </p>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
