import { motion } from 'framer-motion'
import { Check, CheckCheck, Mic } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import Reveal from '../ui/Reveal'
import { useLang } from '../../i18n/context'
import { fromLeft, fromRight, viewport } from '../../lib/motion'

/* A short reconstruction of the flow described in the defense deck: voice note
 * in Arabic → transcription → confirmation → written to the database.
 * The thread stays Arabic in both languages — that IS the product. */
const THREAD = [
  { from: 'doctor', kind: 'voice', label: '0:06' },
  {
    from: 'bot',
    kind: 'text',
    ar: 'سمعتك 👇 حجز موعد للمريض أحمد حسن، بكرا الساعة ١٠:٠٠ صباحاً. أأكد؟',
  },
  { from: 'doctor', kind: 'text', ar: 'أكد' },
  {
    from: 'bot',
    kind: 'done',
    ar: 'تم الحفظ ✅ الموعد ظهر عند الاستقبال، والتذكير رح يوصل المريض تلقائياً.',
  },
]

export default function DoctorChat() {
  const { t, lang } = useLang()
  const c = t.clinicos.doctorChat

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
      {/* ── copy ─────────────────────────────────────────────────────────── */}
      <Reveal variants={fromLeft}>
        <div>
          <span className="font-mono text-[11px] tracking-[0.24em] text-brand-300/70 uppercase">
            {c.label}
          </span>
          <h3 className="mt-4 font-display text-2xl leading-tight font-bold text-balance sm:text-4xl">
            {c.headline}
          </h3>

          <ul className="mt-8 space-y-5">
            {c.points.map((p, i) => (
              <motion.li
                key={`${lang}-${p.title}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="flex gap-4"
              >
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-brand-300/22 bg-brand-400/10 font-mono text-[10px] font-bold text-brand-300">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-[15px] font-semibold text-paper">{p.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ── chat mock ────────────────────────────────────────────────────── */}
      <Reveal variants={fromRight}>
        <GlowCard className="mx-auto w-full max-w-sm p-5 sm:p-6" lift={false}>
          {/* chat header */}
          <div className="flex items-center gap-3 border-b border-brand-300/10 pb-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-400/15 font-mono text-[10px] font-bold text-brand-200">
              OS
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold">{c.mock.botName}</p>
              <p className="flex items-center gap-1.5 text-[10px] text-brand-300/70">
                <span className="size-1 animate-pulse rounded-full bg-brand-300" />
                {c.mock.status}
              </p>
            </div>
          </div>

          {/* thread — always RTL, it's an Arabic conversation */}
          <ul className="space-y-3 pt-5" dir="rtl" lang="ar">
            {THREAD.map((m, i) => {
              const mine = m.from === 'doctor'
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewport}
                  transition={{ delay: 0.3 + i * 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${mine ? 'justify-start' : 'justify-end'}`}
                >
                  {m.kind === 'voice' ? (
                    /* voice note bubble */
                    <div className="flex max-w-[85%] items-center gap-3 rounded-2xl rounded-bl-md bg-gradient-to-br from-brand-500/90 to-brand-600/90 px-3.5 py-2.5 text-on-brand">
                      <Mic className="size-4 shrink-0" />
                      <span className="flex items-end gap-[3px]">
                        {[7, 12, 9, 16, 11, 18, 8, 14, 6, 13, 9, 5].map((h, k) => (
                          <motion.span
                            key={k}
                            className="w-[2.5px] rounded-full bg-on-brand/60"
                            initial={{ height: 3 }}
                            whileInView={{ height: h }}
                            viewport={viewport}
                            transition={{ delay: 0.5 + k * 0.035, duration: 0.3 }}
                          />
                        ))}
                      </span>
                      <span className="font-mono text-[10px] font-bold">{m.label}</span>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 font-arabic text-[12.5px] leading-relaxed ${
                        mine
                          ? 'rounded-bl-md bg-gradient-to-br from-brand-500/90 to-brand-600/90 text-on-brand'
                          : m.kind === 'done'
                            ? 'rounded-br-md border border-brand-300/25 bg-brand-400/12 text-brand-100'
                            : 'rounded-br-md border border-brand-300/10 bg-white/[0.04] text-paper/85'
                      }`}
                    >
                      {m.ar}
                      <span
                        className={`mt-1.5 flex items-center gap-1 ${mine ? 'justify-start' : 'justify-end'}`}
                      >
                        {mine ? (
                          <CheckCheck className="size-3 opacity-60" />
                        ) : (
                          <Check className="size-3 opacity-40" />
                        )}
                      </span>
                    </div>
                  )}
                </motion.li>
              )
            })}
          </ul>

          <p className="mt-5 border-t border-brand-300/10 pt-4 text-center text-[10.5px] leading-relaxed text-faint">
            {c.mock.footer}
          </p>
        </GlowCard>
      </Reveal>
    </div>
  )
}
