import { useState, useRef } from "react"

// ─── Screen navigation ───────────────────────────────────────────────────────

type Screen = "welcome" | "intro" | "marae" | "story1" | "story2" | "phrase" | "words" | "word-muriwai" | "word-mataatua" | "word-kakahoroa" | "word-manuka" | "activities" | "quiz1" | "quiz2" | "quiz3" | "finish"

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome")
  const [runKey, setRunKey] = useState(0)
  const [wordsReturn, setWordsReturn] = useState<Screen>("story1")
  const [detailReturn, setDetailReturn] = useState<Screen>("words")
  const [reviewReturn, setReviewReturn] = useState<Screen | null>(null)
  const [explored, setExplored] = useState<Set<string>>(new Set())

  function navigate(to: Screen) {
    setScreen(to)
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }

  function openWords(returnTo: Screen) {
    setWordsReturn(returnTo)
    navigate("words")
  }

  function openDetail(target: Screen, returnTo: Screen, key: string) {
    setDetailReturn(returnTo)
    setExplored((prev) => {
      const next = new Set(prev)
      next.add(key)
      return next
    })
    navigate(target)
  }

  function openReview(target: "story2" | "words", returnTo: Screen) {
    setReviewReturn(returnTo)
    if (target === "words") setWordsReturn(returnTo)
    navigate(target)
  }

  function backFromReview() {
    const target = reviewReturn ?? "quiz1"
    setReviewReturn(null)
    navigate(target)
  }

  function restartActivities() {
    setRunKey((k) => k + 1)
    setReviewReturn(null)
    navigate("quiz1")
  }

  function readAgain() {
    setRunKey((k) => k + 1)
    setReviewReturn(null)
    navigate("welcome")
  }

  return (
    <div style={{ backgroundColor: "#FFF5DE", minHeight: "100vh" }}>
      <SiteHeader currentScreen={screen} onNavigate={navigate} />
      <main>
      {screen === "welcome" && (
        <WelcomeScreen
          onStart={() => navigate("story1")}
          onNavigate={navigate}
        />
      )}
      {screen === "intro" && (
        <IntroScreen
          onMarae={() => navigate("marae")}
          onStart={() => navigate("story1")}
        />
      )}
      {screen === "marae" && (
        <MaraeScreen
          onBack={() => navigate("intro")}
          onContinue={() => navigate("story1")}
        />
      )}
      {screen === "story1" && (
        <Story1Screen
          onNext={() => navigate("story2")}
          onWords={() => openWords("story1")}
          onKakahoroa={() =>
            openDetail("word-kakahoroa", "story1", "kakahoroa")
          }
          onMuriwai={() => openDetail("word-muriwai", "story1", "muriwai")}
        />
      )}
      {screen === "story2" && (
        <Story2Screen
          reviewMode={reviewReturn !== null}
          onBack={() => navigate("story1")}
          onBackToQuiz={backFromReview}
          onWords={() => openWords("story2")}
          onContinue={() => navigate("activities")}
          onPhrase={() => openDetail("phrase", "story2", "phrase")}
          onMuriwai={() => openDetail("word-muriwai", "story2", "muriwai")}
          onWaka={() => openDetail("word-mataatua", "story2", "mataatua")}
        />
      )}
      {screen === "phrase" && (
        <PhraseScreen
          returnTo={detailReturn}
          onBack={() => navigate(detailReturn)}
          onWords={() => openWords("phrase")}
        />
      )}
      {screen === "words" && (
        <WordsScreen
          explored={explored}
          reviewMode={reviewReturn !== null}
          onBack={
            reviewReturn !== null ? backFromReview : () => navigate(wordsReturn)
          }
          onOpen={(target, key) => openDetail(target, "words", key)}
        />
      )}
      {screen === "word-muriwai" && (
        <MuriwaiCard onBack={() => navigate(detailReturn)} />
      )}
      {screen === "word-mataatua" && (
        <MataatuaCard onBack={() => navigate(detailReturn)} />
      )}
      {screen === "word-kakahoroa" && (
        <KakahoroaCard
          returnTo={detailReturn}
          onBack={() => navigate(detailReturn)}
          onWords={() => openWords("word-kakahoroa")}
        />
      )}
      {screen === "word-manuka" && (
        <ManukaCard onBack={() => navigate(detailReturn)} />
      )}
      {screen === "activities" && (
        <ActivitiesIntroScreen
          onBack={() => navigate("story2")}
          onStart={() => navigate("quiz1")}
        />
      )}
      {screen === "quiz1" && (
        <Quiz1Screen
          key={`q1-${runKey}`}
          onNext={() => navigate("quiz2")}
          onReviewStory={() => openReview("story2", "quiz1")}
        />
      )}
      {screen === "quiz2" && (
        <Quiz2Screen
          key={`q2-${runKey}`}
          onNext={() => navigate("quiz3")}
          onReviewStory={() => openReview("story2", "quiz2")}
        />
      )}
      {screen === "quiz3" && (
        <Quiz3Screen
          key={`q3-${runKey}`}
          onNext={() => navigate("finish")}
          onReviewWords={() => openReview("words", "quiz3")}
        />
      )}
      {screen === "finish" && (
        <FinishScreen
          onReadAgain={readAgain}
          onWords={() => openWords("finish")}
          onRestart={restartActivities}
        />
      )}
      </main>
    </div>
  )
}

function SiteHeader({
  currentScreen,
  onNavigate,
}: {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}) {
  const items: Array<{ label: string; target: Screen; match: (screen: Screen) => boolean }> = [
    { label: "Home", target: "welcome", match: (s) => s === "welcome" },
    { label: "Te Muriwai", target: "word-muriwai", match: (s) => s === "word-muriwai" },
    { label: "Story", target: "story1", match: (s) => s === "story1" || s === "story2" },
    { label: "Words", target: "words", match: (s) => s === "words" || s === "word-mataatua" || s === "word-kakahoroa" || s === "word-manuka" || s === "phrase" },
    { label: "Quiz", target: "quiz1", match: (s) => s === "activities" || s === "quiz1" || s === "quiz2" || s === "quiz3" || s === "finish" },
  ]

  return (
    <header
      className="sticky top-0 z-50 px-3 sm:px-5 py-3"
      style={{
        backgroundColor: "rgba(255,245,222,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "2px solid #E8DCC8",
      }}
    >
      <div
        className="mx-auto max-w-6xl rounded-2xl px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-5"
        style={{
          backgroundColor: "#D9EEF7",
          border: "2px solid #BFCBF4",
          boxShadow: "0 6px 18px rgba(78,74,74,0.08)",
        }}
      >
        <button
          type="button"
          onClick={() => onNavigate("welcome")}
          className="flex items-center gap-2.5 shrink-0"
          style={{ background: "transparent", border: 0, cursor: "pointer" }}
          aria-label="Go to Kōrero Muriwai home"
        >
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
          >
            ✦
          </span>
          <span
            className="font-black text-lg sm:text-xl"
            style={{ fontFamily: "Fraunces, Georgia, serif", color: "#4E4A4A" }}
          >
            Kōrero Muriwai
          </span>
        </button>

        <nav
          className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap sm:ml-auto"
          aria-label="Main navigation"
        >
          {items.map((item) => {
            const active = item.match(currentScreen)
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.target)}
                className="px-3.5 py-2 rounded-full text-sm font-black transition-transform active:scale-[0.97]"
                style={{
                  backgroundColor: active ? "#FFD95A" : "rgba(255,255,255,0.72)",
                  color: "#4E4A4A",
                  border: active ? "2px solid #E8C830" : "2px solid transparent",
                  cursor: "pointer",
                  boxShadow: active ? "0 2px 7px rgba(78,74,74,0.08)" : "none",
                }}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

// ─── Shared visual components ─────────────────────────────────────────────────

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-3">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? 28 : 10,
            height: 10,
            borderRadius: 999,
            backgroundColor:
              i + 1 === current
                ? "#6F9FE8"
                : i + 1 < current
                  ? "#BFCBF4"
                  : "#E0D8C8",
            transition: "all 0.2s",
          }}
        />
      ))}
    </div>
  )
}

function QuizFrame({
  children,
  badge,
  title,
  subtitle,
  progress,
}: {
  children: React.ReactNode
  badge: string
  title: string
  subtitle: string
  progress?: { current: number; total: number }
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-4"
      style={{ backgroundColor: "#FFF5DE" }}
    >
      <div
        className="w-full max-w-2xl relative"
        style={{
          backgroundColor: "#D9EEF7",
          borderRadius: "2rem",
          border: "3px solid #BFCBF4",
          padding: "2rem 2rem 2rem",
        }}
      >
        <YellowCorner pos="top-left" />
        <YellowCorner pos="top-right" />
        <YellowCorner pos="bottom-left" />
        <YellowCorner pos="bottom-right" />

        <div className="text-center mb-5 relative z-10">
          {progress && (
            <ProgressDots current={progress.current} total={progress.total} />
          )}
          <div
            className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
          >
            {badge}
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-2"
            style={{ fontFamily: "Fraunces, Georgia, serif", color: "#4E4A4A" }}
          >
            {title}
          </h1>
          <p className="text-base font-semibold" style={{ color: "#6F7B8A" }}>
            {subtitle}
          </p>
        </div>

        <div
          className="relative z-10 rounded-2xl px-5 py-5"
          style={{ backgroundColor: "#FFF5DE" }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function YellowCorner({
  pos,
}: {
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const s: React.CSSProperties = {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: "#FFD95A",
    zIndex: 20,
  }
  if (pos === "top-left") {
    s.top = 10
    s.left = 10
  }
  if (pos === "top-right") {
    s.top = 10
    s.right = 10
  }
  if (pos === "bottom-left") {
    s.bottom = 10
    s.left = 10
  }
  if (pos === "bottom-right") {
    s.bottom = 10
    s.right = 10
  }
  return <div style={s} />
}

function PrimaryBtn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#D8D0C4" : "#6F9FE8",
        color: disabled ? "#A09080" : "#ffffff",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 4px 14px rgba(111,159,232,0.4)",
        borderRadius: "1rem",
        padding: "0.875rem 2.25rem",
        fontWeight: 800,
        fontSize: "1rem",
        border: "none",
        transition: "all 0.15s",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  )
}

function SecondaryBtn({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#FFF5DE",
        color: "#4E4A4A",
        border: "2px solid #D4C4A8",
        borderRadius: "0.875rem",
        padding: "0.75rem 1.5rem",
        fontWeight: 700,
        fontSize: "0.95rem",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  )
}

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ backgroundColor: "rgba(78,74,74,0.5)" }}
    >
      {children}
    </div>
  )
}

function FeedbackCard({
  correct,
  children,
}: {
  correct: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl mx-auto"
      style={{
        backgroundColor: "#FFF5DE",
        border: `3px solid ${correct ? "#3A9A60" : "#E8924A"}`,
      }}
    >
      <div
        className="h-3 w-full"
        style={{ backgroundColor: correct ? "#D3EBD8" : "#FFE0C4" }}
      />
      <div className="p-7 text-center">{children}</div>
    </div>
  )
}

// ─── Storybook shared components ──────────────────────────────────────────────

function StorybookFrame({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section
      className="min-h-[calc(100vh-80px)] w-full"
      style={{ backgroundColor: "#FFF5DE" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="text-center mb-8 relative">
          <div
            className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
          >
            {badge}
          </div>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-2"
            style={{ fontFamily: "Fraunces, Georgia, serif", color: "#4E4A4A" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-base font-semibold" style={{ color: "#6F7B8A" }}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  )
}

function IllustrationPlaceholder({ text }: { text: string }) {
  return (
    <div
      className="w-full rounded-2xl min-h-[190px] flex flex-col items-center justify-center text-center px-5 mb-5"
      style={{
        backgroundColor: "#EEF7FF",
        border: "2px dashed #BFCBF4",
        color: "#6F7B8A",
      }}
    >
      <div className="text-3xl mb-2">✦</div>
      <div className="font-bold text-sm">{text}</div>
      <div className="text-xs font-semibold mt-2">
        Client-approved visual placeholder
      </div>
    </div>
  )
}

function StoryLine({
  children,
  accent = false,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className="rounded-xl px-4 py-3 font-semibold leading-relaxed"
      style={{
        backgroundColor: accent ? "#D9D1F5" : "#ffffff",
        border: `2px solid ${accent ? "#BFCBF4" : "#E8DCC8"}`,
        color: "#4E4A4A",
      }}
    >
      {children}
    </div>
  )
}

function InlineLearn({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        color: "#507FC8",
        fontWeight: 800,
        textDecoration: "underline",
        textDecorationThickness: "2px",
        textUnderlineOffset: "3px",
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
      }}
    >
      {children}
    </button>
  )
}

function SmallPill({
  children,
  tone = "yellow",
}: {
  children: React.ReactNode
  tone?: "yellow" | "lavender" | "mint" | "blue"
}) {
  const bg =
    tone === "yellow"
      ? "#FFD95A"
      : tone === "lavender"
        ? "#D9D1F5"
        : tone === "mint"
          ? "#D3EBD8"
          : "#D9EEF7"
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
      style={{ backgroundColor: bg, color: "#4E4A4A" }}
    >
      {children}
    </span>
  )
}

function AudioListenButton({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  async function toggleAudio() {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.onended = () => setPlaying(false)
      audioRef.current.onerror = () => setPlaying(false)
    }

    if (playing) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
      return
    }

    try {
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black transition-transform active:scale-[0.98]"
      style={{
        backgroundColor: "#D9EEF7",
        border: "2px solid #BFCBF4",
        color: "#4E4A4A",
        cursor: "pointer",
      }}
      aria-label={playing ? "Stop pronunciation" : "Listen to pronunciation"}
    >
      <span aria-hidden="true">{playing ? "⏸" : "🔊"}</span>
      {playing ? "Playing…" : "Listen"}
    </button>
  )
}


function WelcomeScreen({ onStart, onNavigate }: { onStart: () => void; onNavigate: (screen: Screen) => void }) {
  return (
    <div className="min-h-[calc(100vh-88px)] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <section
          className="relative overflow-hidden rounded-[2rem] p-5 sm:p-8 md:p-10"
          style={{
            backgroundColor: "#D9EEF7",
            border: "3px solid #BFCBF4",
            boxShadow: "0 14px 36px rgba(78,74,74,0.10)",
          }}
        >
          <YellowCorner pos="top-left" />
          <YellowCorner pos="top-right" />
          <YellowCorner pos="bottom-left" />
          <YellowCorner pos="bottom-right" />

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-7 md:gap-10 items-center relative z-10">
            <div>
              <SmallPill tone="yellow">Digital Storybook</SmallPill>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] mt-4 mb-4"
                style={{ fontFamily: "Fraunces, Georgia, serif", color: "#4E4A4A" }}
              >
                Kōrero Muriwai
              </h1>
              <p
                className="text-lg md:text-xl font-bold leading-relaxed max-w-2xl mb-5"
                style={{ color: "#6F7B8A" }}
              >
                Discover the story of Te Muriwai and the Mātaatua waka through an
                interactive, child-friendly journey.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <PrimaryBtn onClick={onStart}>Start the Story →</PrimaryBtn>
                <a
                  href="#home-explore"
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 font-black text-sm no-underline"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#4E4A4A",
                    border: "2px solid #BFCBF4",
                  }}
                >
                  Explore the Book ↓
                </a>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-black" style={{ color: "#6F7B8A" }}>
                <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FFF5DE" }}>📖 Two story chapters</span>
                <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FFF5DE" }}>🔊 Māori pronunciation</span>
                <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FFF5DE" }}>✨ Interactive quiz</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 items-end">
              <div
                className="col-span-2 rounded-3xl overflow-hidden"
                style={{ backgroundColor: "#FFF5DE", border: "3px solid #ffffff" }}
              >
                <img
                  src="/images/waka_true_motion_fixed.gif"
                  alt="Mātaatua waka"
                  className="block w-full h-auto object-contain"
                />
              </div>
              <div
                className="rounded-2xl overflow-hidden h-44 sm:h-52"
                style={{ backgroundColor: "#FFF5DE", border: "3px solid #ffffff" }}
              >
                <img
                  src="/images/muriwai.png"
                  alt="Te Muriwai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="rounded-2xl p-4 sm:p-5 h-44 sm:h-52 flex flex-col justify-end"
                style={{ backgroundColor: "#D9D1F5", border: "3px solid #ffffff" }}
              >
                <div className="text-3xl mb-auto">🌿</div>
                <div className="font-black text-lg" style={{ color: "#4E4A4A" }}>
                  Learn as you explore
                </div>
                <div className="text-sm font-semibold mt-1" style={{ color: "#6F7B8A" }}>
                  Words, places, sounds and activities.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="home-explore" className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: "🌿", title: "Meet Te Muriwai", text: "Learn about Muriwai and hear her name pronounced.", target: "word-muriwai" as Screen },
            { icon: "📖", title: "Read the Story", text: "Follow the two story pages and explore highlighted words.", target: "story1" as Screen },
            { icon: "🔤", title: "Words & Places", text: "Explore Māori words, names and places from the story.", target: "words" as Screen },
          ].map((item) => (
            <HomeFeatureCard key={item.title} {...item} onNavigate={onNavigate} />
          ))}
        </section>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-black"
            style={{ color: "#507FC8", background: "transparent", border: 0, cursor: "pointer" }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </div>
  )
}

function HomeFeatureCard({
  icon,
  title,
  text,
  target,
  onNavigate,
}: {
  icon: string
  title: string
  text: string
  target: Screen
  onNavigate: (screen: Screen) => void
}) {
  const targetAction = () => onNavigate(target)

  return (
    <button
      type="button"
      onClick={targetAction}
      className="rounded-3xl p-5 text-left transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
      style={{
        backgroundColor: "#ffffff",
        border: "2px solid #E8DCC8",
        cursor: "pointer",
        boxShadow: "0 6px 16px rgba(78,74,74,0.06)",
      }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h2 className="font-black text-xl mb-1" style={{ color: "#4E4A4A" }}>{title}</h2>
      <p className="text-sm font-semibold leading-relaxed" style={{ color: "#6F7B8A" }}>{text}</p>
      <div className="mt-4 text-sm font-black" style={{ color: "#507FC8" }}>Explore →</div>
    </button>
  )
}

function IntroScreen({
  onMarae,
  onStart,
}: {
  onMarae: () => void
  onStart: () => void
}) {
  return (
    <StorybookFrame
      badge="Preparation"
      title="Ready for the Story?"
    >
      <div className="space-y-6">
        {/* Welcome / Introduction */}
        <section
          className="rounded-3xl p-6 md:p-8"
          style={{
            background:
              "linear-gradient(135deg, #F4F9FF 0%, #EEF7FF 100%)",
            border: "1px solid #C8D8F5",
            boxShadow: "0 8px 24px rgba(82, 113, 155, 0.08)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl"
              style={{
                backgroundColor: "#FFF4A8",
                border: "2px solid #E8C830",
              }}
            >
              📖
            </div>

            <div>
              <h2
                className="text-xl md:text-2xl font-black mb-2"
                style={{ color: "#403B3B" }}
              >
                Welcome to Kōrero Muriwai
              </h2>

              <p
                className="text-sm md:text-base font-semibold leading-relaxed"
                style={{ color: "#687587" }}
              >
                This story is about Te Muriwai and the Mātaatua waka.
                Get ready to explore the story, discover Māori words and
                places, and learn about courage and leadership.
              </p>
            </div>
          </div>
        </section>

        {/* How the story works */}
        <section>
          <div className="mb-3">
            <h2
              className="text-lg md:text-xl font-black"
              style={{ color: "#403B3B" }}
            >
              Your story journey
            </h2>

            <p
              className="text-sm font-semibold mt-1"
              style={{ color: "#7A8491" }}
            >
              Follow these simple steps as you explore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                number: "1",
                icon: "📖",
                title: "Read",
                text: "Read the story pages.",
              },
              {
                number: "2",
                icon: "🔎",
                title: "Discover",
                text: "Tap words to learn more.",
              },
              {
                number: "3",
                icon: "🌿",
                title: "Explore",
                text: "Discover Words & Places.",
              },
              {
                number: "4",
                icon: "⭐",
                title: "Try",
                text: "Have a go at the activities.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E3DCCF",
                  boxShadow: "0 4px 12px rgba(60, 60, 60, 0.05)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl font-black"
                    style={{
                      backgroundColor: "#FFF4A8",
                      color: "#5B5130",
                      border: "1px solid #E8C830",
                    }}
                  >
                    {step.number}
                  </div>

                  <span className="text-xl">{step.icon}</span>
                </div>

                <h3
                  className="font-black mb-1"
                  style={{ color: "#403B3B" }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-sm font-semibold leading-relaxed"
                  style={{ color: "#7A8491" }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Marae knowledge card */}
        <button
          onClick={onMarae}
          className="group w-full rounded-3xl p-5 md:p-6 text-left transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, #FFF9D8 0%, #FFF4C4 100%)",
            border: "1px solid #E8C830",
            boxShadow: "0 6px 18px rgba(190, 158, 40, 0.10)",
            cursor: "pointer",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8C830",
                }}
              >
                🌿
              </div>

              <div>
                <SmallPill tone="lavender">Knowledge</SmallPill>

                <h2
                  className="font-black text-lg md:text-xl mt-2 mb-1"
                  style={{ color: "#403B3B" }}
                >
                  What Is a Marae?
                </h2>

                <p
                  className="text-sm font-semibold"
                  style={{ color: "#72705F" }}
                >
                  Tap here to discover more before you begin.
                </p>
              </div>
            </div>

            <div
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8C830",
                color: "#5B5130",
              }}
            >
              →
            </div>
          </div>
        </button>

        {/* Start section */}
        <div
          className="rounded-3xl p-6 md:p-7 text-center"
          style={{
            backgroundColor: "#DDF2FA",
            border: "1px solid #BFD9E8",
          }}
        >
          <h2
            className="text-xl md:text-2xl font-black mb-2"
            style={{ color: "#403B3B" }}
          >
            Ready to begin?
          </h2>

          <p
            className="text-sm font-semibold mb-5"
            style={{ color: "#6C7C89" }}
          >
            Turn the page and discover the story of Te Muriwai.
          </p>

          <PrimaryBtn onClick={onStart}>
            Start Reading →
          </PrimaryBtn>
        </div>
      </div>
    </StorybookFrame>
  )
}

function MaraeScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <StorybookFrame badge="Knowledge Share" title="What Is a Marae?">
      <IllustrationPlaceholder text="Marae image" />
      <div
        className="space-y-3 text-sm md:text-base font-semibold leading-relaxed mb-6"
        style={{ color: "#4E4A4A" }}
      >
        <StoryLine>
          A marae is a special meeting place where Māori gather, share stories,
          celebrate, and connect with their ancestors and culture.
        </StoryLine>
        <StoryLine>
          Stories like Muriwai's can be shared there, helping children learn
          about Te Whakatōhea history and remember her courage and leadership.
        </StoryLine>
      </div>
      <div className="flex gap-3 justify-between flex-wrap">
        <SecondaryBtn onClick={onBack}>← Back</SecondaryBtn>
        <PrimaryBtn onClick={onContinue}>Continue to Story →</PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

function Story1Screen({
  onNext,
  onWords,
  onKakahoroa,
  onMuriwai,
}: {
  onNext: () => void
  onWords: () => void
  onKakahoroa: () => void
  onMuriwai: () => void
}) {
  return (
    <StorybookFrame
      badge="Story Part 1"
      title="The Waka Drifts Away!"
      subtitle="Story 1 of 2"
    >
      {/* FULL-WIDTH STORY IMAGE — preserves the complete image without cropping */}
      <div className="mb-6 rounded-2xl overflow-hidden bg-[#EEF7FF]">
        <img
          src="/images/waka_true_motion_fixed.gif"
          alt="Mātaatua waka"
          className="block w-full h-auto object-contain"
        />
      </div>

      {/* STORY POINTS — nine points below the image */}
      <div className="space-y-2">
        <StoryLine>
          Te Muriwai travelled to Aotearoa on the Mātaatua waka.
        </StoryLine>

        <StoryLine>
          The Mātaatua waka arrived at{" "}
          <InlineLearn onClick={onKakahoroa}>Kākahoroa</InlineLearn>.
        </StoryLine>

        <StoryLine>The people came ashore.</StoryLine>

        <StoryLine>
          The men went inland to look around and learn about the land.
        </StoryLine>

        <StoryLine>The Mātaatua waka was left near the shore.</StoryLine>

        <StoryLine>
          Then, the waka began to drift away from the shore.
        </StoryLine>

        <StoryLine>
          The people watched as the waka moved farther out to sea.
        </StoryLine>

        <StoryLine>
          Te <InlineLearn onClick={onMuriwai}>Muriwai</InlineLearn> saw what
          was happening.
        </StoryLine>

        <StoryLine>She realised that someone needed to help.</StoryLine>
      </div>

      <br />
      <p
        className="text-center text-sm font-semibold mb-5"
        style={{ color: "#6F7B8A" }}
      >
        Tap an underlined word to learn more.
      </p>
      <div className="flex gap-3 justify-between flex-wrap">
        <SecondaryBtn onClick={onWords}>
          Explore Words &amp; Places
        </SecondaryBtn>
        <PrimaryBtn onClick={onNext}>Next →</PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

function Story2Screen({
  reviewMode,
  onBack,
  onBackToQuiz,
  onWords,
  onContinue,
  onPhrase,
  onMuriwai,
  onWaka,
}: {
  reviewMode: boolean
  onBack: () => void
  onBackToQuiz: () => void
  onWords: () => void
  onContinue: () => void
  onPhrase: () => void
  onMuriwai: () => void
  onWaka: () => void
}) {
  return (
    <StorybookFrame
      badge="Story Part 2"
      title="Te Muriwai Steps Forward!"
      subtitle="Story 2 of 2"
    >
      {/* FULL-WIDTH STORY IMAGE — preserves the complete image without cropping */}
      <div className="mb-6 rounded-2xl overflow-hidden bg-[#EEF7FF]">
        <img
          src="/images/muriwai_smooth_animated.gif"
          alt="Te Muriwai and the Mātaatua waka"
          className="block w-full h-auto object-contain"
        />
      </div>

      {/* STORY POINTS — nine points below the image */}
      <div className="space-y-2">
        <StoryLine>
          <InlineLearn onClick={onMuriwai}>Te Muriwai</InlineLearn> stepped
          forward and said,{" "}
          <InlineLearn onClick={onPhrase}>
            “Kia whakatāne au i ahau.”
          </InlineLearn>
        </StoryLine>

        <StoryLine accent>
          Her words showed that she was ready to act.
        </StoryLine>

        <StoryLine>Te Muriwai led the people towards the waka.</StoryLine>

        <StoryLine>
          Together, they worked to bring the{" "}
          <InlineLearn onClick={onWaka}>Mātaatua waka</InlineLearn> back to
          shore.
        </StoryLine>

        <StoryLine>
          The waka was brought safely back under Te Muriwai’s instruction.
        </StoryLine>

        <StoryLine>The Mātaatua waka was safe once again.</StoryLine>

        <StoryLine accent>
          Te Muriwai showed great courage and leadership.
        </StoryLine>

        <StoryLine>
          People remembered Te Muriwai for her courage and leadership.
        </StoryLine>

        <StoryLine>
          She became an important ancestor of Te Whakatōhea.
        </StoryLine>
      </div>

      <br />
      {reviewMode ? (
        <div className="flex justify-center">
          <PrimaryBtn onClick={onBackToQuiz}>Back to Quiz →</PrimaryBtn>
        </div>
      ) : (
        <div className="flex gap-3 justify-between flex-wrap">
          <SecondaryBtn onClick={onBack}>← Back</SecondaryBtn>
          <div className="flex gap-3 flex-wrap">
            <SecondaryBtn onClick={onWords}>
              Explore Words &amp; Places
            </SecondaryBtn>
            <PrimaryBtn onClick={onContinue}>Continue →</PrimaryBtn>
          </div>
        </div>
      )}
    </StorybookFrame>
  )
}

function PhraseScreen({
  returnTo,
  onBack,
  onWords,
}: {
  returnTo: Screen
  onBack: () => void
  onWords: () => void
}) {
  const backLabel =
    returnTo === "words" ? "Back to Words & Places" : "Back to Story"
  return (
    <StorybookFrame badge="Words & Phrases" title="What Does This Phrase Mean?">
      <div
        className="rounded-2xl p-5 mb-4 text-center"
        style={{ backgroundColor: "#D9D1F5", border: "2px solid #BFCBF4" }}
      >
        <div
          className="text-2xl md:text-3xl font-black mb-2"
          style={{ color: "#4E4A4A" }}
        >
          Kia whakatāne au i ahau
        </div>
        <AudioListenButton src="/audio/kiawhakatane.mp3" />
      </div>

      <div className="space-y-3 mb-5">
        <StoryLine>
          <div
            className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: "#6F7B8A" }}
          >
            Translation / Meaning
          </div>
          <div className="text-lg font-black">Let me behave as a man.</div>
        </StoryLine>
        <StoryLine>
          <div className="font-black mb-2">Why Is This Phrase Special?</div>
          <div className="space-y-2">
            <p>
              Muriwai says this phrase when she steps forward because the people need help.
            </p>
            <p>
              In the story, her words are followed by action: she leads the people towards the waka.
            </p>
            <p>It helps children understand the courage and leadership shown in the story.</p>
          </div>
        </StoryLine>
        <StoryLine accent>
          Example: Muriwai stepped forward and said, “Kia whakatāne au i ahau.”
        </StoryLine>
      </div>

      <IllustrationPlaceholder text="Approved visual" />

      <div className="flex gap-3 justify-between flex-wrap">
        <SecondaryBtn onClick={onBack}>{backLabel}</SecondaryBtn>
        <PrimaryBtn onClick={onWords}>Explore Words &amp; Places</PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

type WordTarget = "word-muriwai" | "word-mataatua" | "word-kakahoroa" | "word-manuka" | "phrase"

const WORDS = [
  {
    key: "muriwai",
    n: "1",
    title: "Muriwai",
    summary: "An important ancestor of Te Whakatōhea and the person at the centre of this story.",
    target: "word-muriwai" as WordTarget,
  },
  {
    key: "mataatua",
    n: "2",
    title: "Mātaatua waka",
    summary: "The waka that carried Muriwai and the people to Aotearoa.",
    target: "word-mataatua" as WordTarget,
  },
  {
    key: "kakahoroa",
    n: "3",
    title: "Kākahoroa",
    summary: "An older accepted name for the place now known as Whakatāne.",
    target: "word-kakahoroa" as WordTarget,
  },
  {
    key: "manuka",
    n: "4",
    title: "Te Mānuka Tūtahi",
    summary: "A traditional name for Whakatāne, kept as supporting place information.",
    target: "word-manuka" as WordTarget,
  },
  {
    key: "phrase",
    n: "5",
    title: "Kia whakatāne au i ahau",
    summary: "The phrase Muriwai says when she steps forward to help.",
    target: "phrase" as WordTarget,
  },
]

function WordsScreen({
  explored,
  reviewMode,
  onBack,
  onOpen,
}: {
  explored: Set<string>
  reviewMode: boolean
  onBack: () => void
  onOpen: (target: Screen, key: string) => void
}) {
  return (
    <StorybookFrame
      badge="Vocabulary Hub"
      title="Explore Words & Places!"
      subtitle="Tap a word, name or place to learn more."
    >
      <div
        className="rounded-2xl px-5 py-4 mb-5 flex items-center justify-between gap-4 flex-wrap"
        style={{ backgroundColor: "#EEF7FF", border: "2px solid #BFCBF4" }}
      >
        <div className="font-black" style={{ color: "#4E4A4A" }}>
          Words explored: {explored.size} / 5
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="w-8 h-2 rounded-full"
              style={{
                backgroundColor: i < explored.size ? "#6F9FE8" : "#E0D8C8",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {WORDS.map((w) => {
          const done = explored.has(w.key)
          return (
            <button
              key={w.key}
              onClick={() => onOpen(w.target, w.key)}
              className="rounded-2xl p-4 text-left transition-transform active:scale-[0.99]"
              style={{
                backgroundColor: done ? "#D3EBD8" : "#ffffff",
                border: `2px solid ${done ? "#7CB891" : "#BFCBF4"}`,
                cursor: "pointer",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0"
                  style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
                >
                  {w.n}
                </div>
                <div>
                  <div
                    className="font-black text-base mb-1"
                    style={{ color: "#4E4A4A" }}
                  >
                    {w.title}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#6F7B8A" }}
                  >
                    {w.summary}
                  </div>
                  {done && (
                    <div
                      className="text-xs font-black mt-2"
                      style={{ color: "#3A7A52" }}
                    >
                      ✓ Explored
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-center">
        <PrimaryBtn onClick={onBack}>
          {reviewMode ? "Back to Quiz" : "Back"}
        </PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

function LearningCard({
  badge,
  title,
  pronunciation,
  meaning,
  note,
  example,
  imageText,
  imageSrc,
  audioSrc,
  onBack,
}: {
  badge: string
  title: string
  pronunciation: string
  meaning: string
  note: string
  example: string
  imageText: string
  imageSrc?: string
  audioSrc: string
  onBack: () => void
}) {
  return (
    <StorybookFrame badge={badge} title={title}>
      <div
        className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-3"
        style={{ backgroundColor: "#D9D1F5", border: "2px solid #BFCBF4" }}
      >
        <div className="font-black" style={{ color: "#4E4A4A" }}>
          {pronunciation}
        </div>
        <AudioListenButton src={audioSrc} />
      </div>
      <div className="space-y-3 mb-5">
        <StoryLine>
          <div
            className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: "#6F7B8A" }}
          >
            Meaning
          </div>
          <div>{meaning}</div>
        </StoryLine>
        <StoryLine>
          <div
            className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: "#6F7B8A" }}
          >
            Story Note
          </div>
          <div>{note}</div>
        </StoryLine>
        <StoryLine accent>
          <div
            className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: "#6F7B8A" }}
          >
            Example Sentence
          </div>
          <div>{example}</div>
        </StoryLine>
      </div>
      {imageSrc ? (
        <div className="flex justify-center items-center py-2 mb-5">
          <img
            src={imageSrc}
            alt={imageText}
            className="w-auto max-w-full max-h-[260px] object-contain rounded-xl"
          />
        </div>
      ) : (
        <IllustrationPlaceholder text={imageText} />
      )}
      <div className="flex justify-center">
        <PrimaryBtn onClick={onBack}>Back →</PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

function MuriwaiCard({ onBack }: { onBack: () => void }) {
  return (
    <LearningCard
      badge="Explore"
      title="Meet Muriwai"
      pronunciation="Listen: Moo-ree-wai"
      meaning="An important ancestor of Te Whakatōhea and the person at the centre of this story."
      note="She noticed the waka drifting away and stepped forward when help was needed."
      example="“Muriwai saw what was happening.”"
      imageText="Muriwai portrait"
      imageSrc="/images/muriwai.png"
      audioSrc="/audio/Muriwai.mp3"
      onBack={onBack}
    />
  )
}

function MataatuaCard({ onBack }: { onBack: () => void }) {
  return (
    <LearningCard
      badge="Explore"
      title="Meet the Mātaatua Waka"
      pronunciation="Listen: Mā-taa-tu-a wah-ka"
      meaning="The waka that carried Muriwai and the people to Aotearoa."
      note="It arrived at Kākahoroa. Later, it began to drift away from the shore."
      example="“The Mātaatua waka arrived at Kākahoroa.”"
      imageText="Mātaatua waka"
      imageSrc="/images/MataatuaWaka.jpg"
      audioSrc="/audio/mataatuawaka.mp3"
      onBack={onBack}
    />
  )
}

function KakahoroaCard({
  returnTo,
  onBack,
  onWords,
}: {
  returnTo: Screen
  onBack: () => void
  onWords: () => void
}) {
  return (
    <StorybookFrame badge="Explore" title="Discover Kākahoroa">
      <div
        className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-3"
        style={{ backgroundColor: "#D9D1F5", border: "2px solid #BFCBF4" }}
      >
        <div className="font-black" style={{ color: "#4E4A4A" }}>
          Listen: KAH-kah-hoh-roh-ah
        </div>
        <AudioListenButton src="/audio/Kakahoroa.mp3" />
      </div>
      <div className="space-y-3 mb-5">
        <StoryLine>
          <b>Meaning</b>
          <br />
          An older accepted name for the place now known as Whakatāne.
        </StoryLine>
        <StoryLine>
          <b>Story Note</b>
          <br />
          Te Mānuka Tūtahi is also kept as supporting place information.
        </StoryLine>
        <StoryLine accent>
          <b>Example Sentence</b>
          <br />
          “The Mātaatua waka arrived at Kākahoroa.”
        </StoryLine>
      </div>
      <div className="flex justify-center items-center py-2 mb-5">
        <img
          src="/images/Kakahoroa.jpeg"
          alt="Kākahoroa landscape"
          className="w-auto max-w-full max-h-[260px] object-contain rounded-xl"
        />
      </div>
      <div className="flex gap-3 justify-between flex-wrap">
        <SecondaryBtn onClick={onBack}>
          {returnTo === "story1" ? "Back to Story" : "Back"}
        </SecondaryBtn>
        <PrimaryBtn onClick={onWords}>Explore Words &amp; Places</PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

function ManukaCard({ onBack }: { onBack: () => void }) {
  return (
    <LearningCard
      badge="Explore"
      title="Discover Te Mānuka Tūtahi"
      pronunciation="Listen: te MAH-noo-kah TOO-tah-hee"
      meaning="A traditional name for Whakatāne, kept as supporting place information."
      note="It is presented alongside Kākahoroa in the Words & Places section."
      example="“Te Mānuka Tūtahi is another accepted name for the place.”"
      imageText="Historic site / Te Mānuka Tūtahi"
      imageSrc="/images/ManukaTutahi.jpeg"
      audioSrc="/audio/TeManukaTutahi.mp3"
      onBack={onBack}
    />
  )
}

function ActivitiesIntroScreen({
  onBack,
  onStart,
}: {
  onBack: () => void
  onStart: () => void
}) {
  return (
    <StorybookFrame badge="Activities" title="Ready for Some Activities?">
      <div
        className="rounded-2xl p-6 mb-6 text-center"
        style={{ backgroundColor: "#ffffff", border: "2px solid #E8DCC8" }}
      >
        <SmallPill tone="mint">Story complete</SmallPill>
        <p className="mt-4 text-lg font-black" style={{ color: "#4E4A4A" }}>
          Let’s see what you remember from Muriwai’s story!
        </p>
      </div>
      <div className="flex gap-3 justify-between flex-wrap">
        <SecondaryBtn onClick={onBack}>← Back to Story</SecondaryBtn>
        <PrimaryBtn onClick={onStart}>Start Activities →</PrimaryBtn>
      </div>
    </StorybookFrame>
  )
}

// ─── Quiz 1 ───────────────────────────────────────────────────────────────────

const Q1_OPTIONS = [
  { id: "a", text: "Courage and leadership" },
  { id: "b", text: "Fear and silence" },
  { id: "c", text: "Leaving the waka" },
]
const Q1_CORRECT = "a"

function Quiz1Screen({
  onNext,
  onReviewStory,
}: {
  onNext: () => void
  onReviewStory: () => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [showReview, setShowReview] = useState(false)

  function handleCheck() {
    if (!selected) return
    setFeedback(selected === Q1_CORRECT ? "correct" : "incorrect")
  }

  return (
    <QuizFrame
      badge="Quiz 1"
      title="What Did Muriwai Show?"
      subtitle="Tap the best answer."
      progress={{ current: 1, total: 3 }}
    >
      <p
        className="text-center font-bold text-base mb-5"
        style={{ color: "#4E4A4A" }}
      >
        Which two qualities are named in the story?
      </p>

      {/* Answer options */}
      <div className="flex flex-col gap-3 mb-6">
        {Q1_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => {
                setSelected(opt.id)
                setFeedback(null)
              }}
              className="w-full text-left rounded-xl px-5 py-4 font-bold text-sm transition-all duration-150 active:scale-[0.98]"
              style={{
                backgroundColor: isSelected ? "#D9EEF7" : "#ffffff",
                color: "#4E4A4A",
                border: isSelected
                  ? "2.5px solid #6F9FE8"
                  : "2px solid #BFCBF4",
                boxShadow: isSelected
                  ? "0 0 0 4px rgba(111,159,232,0.15)"
                  : "0 1px 4px rgba(0,0,0,0.06)",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    flexShrink: 0,
                    border: isSelected
                      ? "6px solid #6F9FE8"
                      : "2px solid #BFCBF4",
                    backgroundColor: isSelected ? "#fff" : "#EEF7FF",
                    transition: "all 0.15s",
                  }}
                />
                {opt.text}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-center">
        <PrimaryBtn onClick={handleCheck} disabled={!selected}>
          Check My Answer
        </PrimaryBtn>
      </div>

      {/* Correct feedback */}
      {feedback === "correct" && (
        <Backdrop>
          <FeedbackCard correct>
            <div className="text-5xl mb-3">🎉</div>
            <h2
              className="font-bold text-2xl mb-1"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "#4E4A4A",
              }}
            >
              You Got It!
            </h2>
            <div
              className="text-sm font-semibold leading-relaxed mb-6"
              style={{ color: "#6F7B8A" }}
            >
              <p className="mb-1">Great job!</p>
              <p className="mb-1">Muriwai showed courage and leadership.</p>
              <p className="mb-1">
                She stepped forward when someone needed to help.
              </p>
              <p>This is why her story is important to remember.</p>
            </div>
            <PrimaryBtn onClick={onNext}>Next Activity →</PrimaryBtn>
          </FeedbackCard>
        </Backdrop>
      )}

      {/* Incorrect feedback */}
      {feedback === "incorrect" && !showReview && (
        <Backdrop>
          <FeedbackCard correct={false}>
            <div className="text-5xl mb-3">🤔</div>
            <h2
              className="font-bold text-2xl mb-1"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "#4E4A4A",
              }}
            >
              Almost! Try Again
            </h2>
            <div
              className="text-sm font-semibold leading-relaxed mb-1"
              style={{ color: "#6F7B8A" }}
            >
              <p className="mb-1">Not quite.</p>
              <p className="mb-1">Think about what Muriwai showed.</p>
              <p className="mb-3">
                Look back at the end of the story. Muriwai stepped forward, led
                the people, and helped bring the waka safely back to shore.
              </p>
            </div>
            <div
              className="rounded-xl px-4 py-3 mb-6 text-sm font-semibold italic"
              style={{ backgroundColor: "#D9EEF7", color: "#1A5A8A" }}
            >
              Think about how Muriwai acted and how she helped the people.
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <SecondaryBtn
                onClick={() => {
                  setFeedback(null)
                  setSelected(null)
                }}
              >
                Try Again
              </SecondaryBtn>
              <PrimaryBtn onClick={onReviewStory}>Review Story</PrimaryBtn>
            </div>
          </FeedbackCard>
        </Backdrop>
      )}

      {/* Story review panel */}
      {showReview && (
        <Backdrop>
          <div
            className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#FFF5DE", border: "3px solid #BFCBF4" }}
          >
            <div
              className="px-7 pt-6 pb-4"
              style={{
                backgroundColor: "#D9EEF7",
                borderBottom: "2px solid #BFCBF4",
              }}
            >
              <div
                className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
              >
                Story
              </div>
              <h3
                className="font-bold text-xl"
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  color: "#4E4A4A",
                }}
              >
                Kōrero Muriwai
              </h3>
            </div>
            <div className="px-7 py-5 flex flex-col gap-3">
              {[
                "Muriwai stepped forward and said:",
                '"Kia whakatāne au i ahau."',
                "Muriwai led the people.",
                "Together, they brought the Mātaatua waka safely back to shore under Muriwai's instruction.",
                "Muriwai showed courage and leadership.",
              ].map((line, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 text-sm font-semibold leading-relaxed"
                  style={{
                    backgroundColor:
                      i === 4 ? "#D3EBD8" : i === 1 ? "#D9D1F5" : "#EEF7FF",
                    color: "#4E4A4A",
                    fontStyle: i === 1 ? "italic" : "normal",
                    fontWeight: i === 1 || i === 4 ? 800 : 600,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            <div
              className="px-7 pb-6 pt-3 flex justify-center"
              style={{ borderTop: "2px solid #E8DCC8" }}
            >
              <PrimaryBtn
                onClick={() => {
                  setShowReview(false)
                  setFeedback(null)
                  setSelected(null)
                }}
              >
                Back to Quiz
              </PrimaryBtn>
            </div>
          </div>
        </Backdrop>
      )}
    </QuizFrame>
  )
}

// ─── Quiz 2 data ──────────────────────────────────────────────────────────────

const CORRECT_ORDER = [
  { id: "c1", text: "Waka arrived at Kākahoroa." },
  { id: "c2", text: "Muriwai saw what was happening." },
  {
    id: "c3",
    text: 'Muriwai stepped forward and said, "Kia whakatāne au i ahau."',
  },
  { id: "c4", text: "Muriwai led the people." },
  {
    id: "c5",
    text: "Together, they brought the Mātaatua waka safely back to shore under Muriwai's instruction.",
  },
]
const SHUFFLED_INITIAL = ["c4", "c1", "c5", "c3", "c2"]
const ZONE_LABELS = ["First", "Second", "Third", "Fourth", "Fifth"]

function getCard(id: string) {
  return CORRECT_ORDER.find((c) => c.id === id)!
}

// ─── Quiz 2 ───────────────────────────────────────────────────────────────────

function Quiz2Screen({
  onNext,
  onReviewStory,
}: {
  onNext: () => void
  onReviewStory: () => void
}) {
  const [bank, setBank] = useState<string[]>(SHUFFLED_INITIAL)
  const [slots, setSlots] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ])
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)

  const dragSource = useRef<{ from: "bank" | "slot"; index: number } | null>(
    null,
  )
  const dragCardId = useRef<string | null>(null)

  function handleDragStart(
    cardId: string,
    from: "bank" | "slot",
    index: number,
  ) {
    dragCardId.current = cardId
    dragSource.current = { from, index }
  }

  function handleDropOnSlot(slotIndex: number, e: React.DragEvent) {
    e.preventDefault()
    const card = dragCardId.current
    const src = dragSource.current
    if (!card || !src) return
    const newSlots = [...slots]
    const newBank = [...bank]
    const existingInSlot = newSlots[slotIndex]
    if (src.from === "bank") {
      const bankIdx = newBank.indexOf(card)
      if (bankIdx !== -1) newBank.splice(bankIdx, 1)
      if (existingInSlot) newBank.push(existingInSlot)
      newSlots[slotIndex] = card
    } else {
      const srcSlot = src.index
      if (srcSlot === slotIndex) return
      newSlots[srcSlot] = existingInSlot
      newSlots[slotIndex] = card
    }
    setSlots(newSlots)
    setBank(newBank)
    dragCardId.current = null
    dragSource.current = null
  }

  function handleDropOnBank(e: React.DragEvent) {
    e.preventDefault()
    const card = dragCardId.current
    const src = dragSource.current
    if (!card || !src) return
    if (src.from === "slot") {
      const newSlots = [...slots]
      const newBank = [...bank]
      newSlots[src.index] = null
      if (!newBank.includes(card)) newBank.push(card)
      setSlots(newSlots)
      setBank(newBank)
    }
    dragCardId.current = null
    dragSource.current = null
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  function handleCheck() {
    if (!slots.every((s) => s !== null)) return
    const isCorrect = CORRECT_ORDER.every((card, i) => slots[i] === card.id)
    setFeedback(isCorrect ? "correct" : "incorrect")
  }

  function handleReset() {
    setBank(SHUFFLED_INITIAL)
    setSlots([null, null, null, null, null])
    setFeedback(null)
  }

  const allFilled = slots.every((s) => s !== null)

  return (
    <QuizFrame
      badge="Quiz 2"
      title="Can You Put the Story in Order?"
      subtitle="Drag each story event into the correct place."
      progress={{ current: 2, total: 3 }}
    >
      {/* Card bank */}
      <div
        className="w-full mb-5 min-h-[80px] p-4 flex flex-wrap gap-3 justify-center rounded-xl"
        style={{ backgroundColor: "#EEF7FF", border: "2px dashed #BFCBF4" }}
        onDrop={handleDropOnBank}
        onDragOver={handleDragOver}
      >
        {bank.length === 0 ? (
          <p
            className="text-sm font-semibold self-center"
            style={{ color: "#B0A888" }}
          >
            All cards placed — drag one back here to move it
          </p>
        ) : (
          bank.map((cardId) => (
            <StoryCard
              key={cardId}
              cardId={cardId}
              draggable
              onDragStart={() =>
                handleDragStart(cardId, "bank", bank.indexOf(cardId))
              }
            />
          ))
        )}
      </div>

      {/* Drop zones */}
      <div className="w-full flex flex-col gap-2 mb-6">
        {slots.map((cardId, i) => (
          <div key={i} className="flex items-stretch gap-2.5">
            <div
              className="flex-shrink-0 w-20 flex items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#FFD95A",
                border: "2px solid #E8C830",
              }}
            >
              <span
                className="font-black text-xs uppercase tracking-wide text-center px-1"
                style={{ color: "#4E4A4A" }}
              >
                {ZONE_LABELS[i]}
              </span>
            </div>
            <div
              className="drop-zone flex-1 min-h-[64px] rounded-xl border-2 border-dashed transition-all duration-150 flex items-center"
              style={{
                borderColor: cardId ? "#6F9FE8" : "#BFCBF4",
                backgroundColor: cardId ? "#EEF4FF" : "#FAFAF5",
              }}
              onDrop={(e) => handleDropOnSlot(i, e)}
              onDragOver={handleDragOver}
              onDragEnter={(e) =>
                (e.currentTarget as HTMLDivElement).classList.add("drag-over")
              }
              onDragLeave={(e) =>
                (e.currentTarget as HTMLDivElement).classList.remove(
                  "drag-over",
                )
              }
            >
              {cardId ? (
                <StoryCard
                  cardId={cardId}
                  draggable
                  inSlot
                  onDragStart={() => handleDragStart(cardId, "slot", i)}
                />
              ) : (
                <span
                  className="text-sm font-semibold px-4"
                  style={{ color: "#C0B8A8" }}
                >
                  Drop here…
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <PrimaryBtn onClick={handleCheck} disabled={!allFilled}>
          Check My Order
        </PrimaryBtn>
      </div>

      {/* Correct */}
      {feedback === "correct" && (
        <Backdrop>
          <FeedbackCard correct>
            <div className="text-5xl mb-3">🎉</div>
            <h2
              className="font-bold text-2xl mb-1"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "#4E4A4A",
              }}
            >
              You Got It!
            </h2>
            <p
              className="text-sm font-semibold mb-6"
              style={{ color: "#6F7B8A" }}
            >
              Great job! You put the story in the correct order.
            </p>
            <PrimaryBtn onClick={onNext}>Next Activity →</PrimaryBtn>
          </FeedbackCard>
        </Backdrop>
      )}

      {/* Incorrect */}
      {feedback === "incorrect" && (
        <Backdrop>
          <FeedbackCard correct={false}>
            <div className="text-5xl mb-3">🤔</div>
            <h2
              className="font-bold text-2xl mb-1"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "#4E4A4A",
              }}
            >
              Almost! Try Again
            </h2>
            <p
              className="text-sm font-semibold mb-6"
              style={{ color: "#6F7B8A" }}
            >
              Not quite. Have another look at the story and try again.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <SecondaryBtn onClick={() => setFeedback(null)}>
                Try Again
              </SecondaryBtn>
              <PrimaryBtn onClick={onReviewStory}>Review Story</PrimaryBtn>
            </div>
          </FeedbackCard>
        </Backdrop>
      )}
    </QuizFrame>
  )
}

function StoryCard({
  cardId,
  draggable,
  inSlot,
  onDragStart,
}: {
  cardId: string
  draggable?: boolean
  inSlot?: boolean
  onDragStart?: () => void
}) {
  const card = getCard(cardId)
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      className="drag-card rounded-xl px-4 py-3 font-semibold text-sm leading-snug select-none transition-shadow duration-150 hover:shadow-md active:opacity-60"
      style={{
        backgroundColor: inSlot ? "#EEF4FF" : "#ffffff",
        color: "#4E4A4A",
        border: inSlot ? "2px solid #6F9FE8" : "2px solid #BFCBF4",
        boxShadow: "0 2px 6px rgba(111,159,232,0.1)",
        flex: inSlot ? "1" : undefined,
        maxWidth: inSlot ? "unset" : "260px",
      }}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex flex-col gap-1 pt-0.5 flex-shrink-0 opacity-40">
          <div className="flex gap-0.5">
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#6F9FE8" }}
            />
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#6F9FE8" }}
            />
          </div>
          <div className="flex gap-0.5">
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#6F9FE8" }}
            />
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#6F9FE8" }}
            />
          </div>
        </div>
        <span>{card.text}</span>
      </div>
    </div>
  )
}

// ─── Quiz 3 data ──────────────────────────────────────────────────────────────

const LEFT_ITEMS = [
  { id: "l1", text: "Muriwai" },
  { id: "l2", text: "Mātaatua waka" },
  { id: "l3", text: "Kākahoroa" },
  { id: "l4", text: "Te Mānuka Tūtahi" },
  { id: "l5", text: "Kia whakatāne au i ahau" },
]
const RIGHT_ITEMS = [
  { id: "r3", text: "An older accepted name for the place now known as Whakatāne." },
  { id: "r1", text: "An important ancestor of Te Whakatōhea and the person at the centre of this story." },
  { id: "r5", text: "Let me behave as a man." },
  { id: "r2", text: "The waka that carried Muriwai and the people to Aotearoa." },
  { id: "r4", text: "A traditional name for Whakatāne, kept as supporting place information." },
]
const CORRECT_MATCHES: Record<string, string> = {
  l1: "r1",
  l2: "r2",
  l3: "r3",
  l4: "r4",
  l5: "r5",
}

const PAIR_COLORS = [
  { bg: "#FFF8CC", border: "#E8B800", text: "#5C4000" },
  { bg: "#D3EBD8", border: "#3A9A60", text: "#1A4A2A" },
  { bg: "#D9EEF7", border: "#4A88C8", text: "#0D3055" },
  { bg: "#D9D1F5", border: "#7060C0", text: "#2D1060" },
  { bg: "#BFCBF4", border: "#3C52B0", text: "#0A1860" },
]

const REVIEW_PAIRS = [
  { term: "Muriwai", meaning: "An important ancestor of Te Whakatōhea and the person at the centre of this story." },
  { term: "Mātaatua waka", meaning: "The waka that carried Muriwai and the people to Aotearoa." },
  { term: "Kākahoroa", meaning: "An older accepted name for the place now known as Whakatāne." },
  { term: "Te Mānuka Tūtahi", meaning: "A traditional name for Whakatāne, kept as supporting place information." },
  { term: "Kia whakatāne au i ahau", meaning: "Let me behave as a man." },
]

// ─── Quiz 3 ───────────────────────────────────────────────────────────────────

function Quiz3Screen({
  onNext,
  onReviewWords,
}: {
  onNext: () => void
  onReviewWords: () => void
}) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [showReview, setShowReview] = useState(false)

  const rightToLeft: Record<string, string> = {}
  for (const [l, r] of Object.entries(matches)) rightToLeft[r] = l

  function colorIndex(leftId: string) {
    return LEFT_ITEMS.findIndex((i) => i.id === leftId)
  }

  function handleLeftClick(leftId: string) {
    setSelectedLeft((prev) => (prev === leftId ? null : leftId))
  }

  function handleRightClick(rightId: string) {
    if (!selectedLeft) {
      const owner = rightToLeft[rightId]
      if (owner) setSelectedLeft(owner)
      return
    }
    const next = { ...matches }
    if (next[selectedLeft]) delete next[selectedLeft]
    const prevLeft = rightToLeft[rightId]
    if (prevLeft && prevLeft !== selectedLeft) delete next[prevLeft]
    next[selectedLeft] = rightId
    setMatches(next)
    setSelectedLeft(null)
  }

  function handleCheck() {
    if (!LEFT_ITEMS.every((l) => matches[l.id])) return
    const ok = LEFT_ITEMS.every((l) => matches[l.id] === CORRECT_MATCHES[l.id])
    setFeedback(ok ? "correct" : "incorrect")
  }

  const allMatched = LEFT_ITEMS.every((l) => matches[l.id])
  const matchCount = Object.keys(matches).length

  function leftStyle(id: string): React.CSSProperties {
    const matched = !!matches[id]
    const selected = selectedLeft === id
    if (matched) {
      const c = PAIR_COLORS[colorIndex(id)]
      return {
        backgroundColor: c.bg,
        borderColor: c.border,
        color: c.text,
        outline: `2.5px solid ${c.border}`,
        outlineOffset: "1px",
      }
    }
    if (selected) {
      return {
        backgroundColor: "#D9EEF7",
        borderColor: "#6F9FE8",
        color: "#0D3055",
        outline: "2.5px solid #6F9FE8",
        outlineOffset: "1px",
        boxShadow: "0 0 0 5px rgba(111,159,232,0.18)",
      }
    }
    return {
      backgroundColor: "#EEF7FF",
      borderColor: "#BFCBF4",
      color: "#4E4A4A",
    }
  }

  function rightStyle(id: string): React.CSSProperties {
    const owner = rightToLeft[id]
    const awaitingClick = !!selectedLeft
    if (owner) {
      const c = PAIR_COLORS[colorIndex(owner)]
      return {
        backgroundColor: c.bg,
        borderColor: c.border,
        color: c.text,
        outline: `2.5px solid ${c.border}`,
        outlineOffset: "1px",
      }
    }
    if (awaitingClick) {
      return {
        backgroundColor: "#F5F2FF",
        borderColor: "#9B8FD8",
        color: "#4E4A4A",
        borderStyle: "dashed",
      }
    }
    return {
      backgroundColor: "#FFF9EC",
      borderColor: "#E8D8A8",
      color: "#4E4A4A",
    }
  }

  return (
    <QuizFrame
      badge="Quiz 3"
      title="Can You Match Them?"
      subtitle="Match each Māori word, name or place with the correct meaning."
      progress={{ current: 3, total: 3 }}
    >
      {/* Status bar */}
      <div className="mb-4 flex items-center justify-center min-h-[34px]">
        {selectedLeft ? (
          <div
            className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full"
            style={{
              backgroundColor: "#D9EEF7",
              color: "#1A5A8A",
              border: "2px solid #6F9FE8",
            }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: "#6F9FE8" }}
            />
            Now click a meaning on the right
          </div>
        ) : matchCount === 0 ? (
          <p className="text-sm font-semibold" style={{ color: "#B0A888" }}>
            Click a word on the left to start
          </p>
        ) : (
          <p className="text-sm font-semibold" style={{ color: "#7A8A9A" }}>
            {matchCount} of 5 matched
            {matchCount < 5
              ? " — click any word to continue or change a match"
              : ""}
          </p>
        )}
      </div>

      {/* Two-column grid */}
      <div className="w-full grid grid-cols-2 gap-x-3 gap-y-0 mb-6">
        <div className="text-center pb-2.5">
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
          >
            Words &amp; Phrases
          </span>
        </div>
        <div className="text-center pb-2.5">
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: "#D9D1F5", color: "#4E4A4A" }}
          >
            Meanings
          </span>
        </div>

        {LEFT_ITEMS.map((lItem, i) => {
          const rItem = RIGHT_ITEMS[i]
          const lMatchedRight = matches[lItem.id]
          const rOwner = rightToLeft[rItem.id]
          const lColor = lMatchedRight
            ? PAIR_COLORS[colorIndex(lItem.id)]
            : null
          const rColor = rOwner ? PAIR_COLORS[colorIndex(rOwner)] : null
          return (
            <div key={lItem.id} className="contents">
              <button
                onClick={() => handleLeftClick(lItem.id)}
                className="mb-2.5 w-full text-left px-3.5 py-3 rounded-xl border-2 text-sm font-bold leading-snug transition-all duration-150 active:scale-[0.98]"
                style={{ ...leftStyle(lItem.id), cursor: "pointer" }}
              >
                <div className="flex items-center gap-2">
                  {lMatchedRight && lColor && (
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black"
                      style={{ backgroundColor: lColor.border }}
                    >
                      {colorIndex(lItem.id) + 1}
                    </span>
                  )}
                  {!lMatchedRight && selectedLeft === lItem.id && (
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full border-2 animate-pulse"
                      style={{
                        borderColor: "#6F9FE8",
                        backgroundColor: "#C8DCF8",
                      }}
                    />
                  )}
                  <span>{lItem.text}</span>
                </div>
              </button>
              <button
                onClick={() => handleRightClick(rItem.id)}
                className="mb-2.5 w-full text-left px-3.5 py-3 rounded-xl border-2 text-sm font-semibold leading-snug transition-all duration-150 active:scale-[0.98]"
                style={{ ...rightStyle(rItem.id), cursor: "pointer" }}
              >
                <div className="flex items-center gap-2">
                  {rOwner && rColor && (
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black"
                      style={{ backgroundColor: rColor.border }}
                    >
                      {colorIndex(rOwner) + 1}
                    </span>
                  )}
                  <span>{rItem.text}</span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center">
        <PrimaryBtn onClick={handleCheck} disabled={!allMatched}>
          Check My Answers
        </PrimaryBtn>
      </div>

      {/* Correct */}
      {feedback === "correct" && (
        <Backdrop>
          <FeedbackCard correct>
            <div className="text-5xl mb-3">🎉</div>
            <h2
              className="font-bold text-2xl mb-1"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "#4E4A4A",
              }}
            >
              You Got It!
            </h2>
            <p
              className="text-sm font-semibold mb-6"
              style={{ color: "#6F7B8A" }}
            >
              Great job! You matched all the words correctly.
            </p>
            <PrimaryBtn onClick={onNext}>Finish →</PrimaryBtn>
          </FeedbackCard>
        </Backdrop>
      )}

      {/* Incorrect */}
      {feedback === "incorrect" && !showReview && (
        <Backdrop>
          <FeedbackCard correct={false}>
            <div className="text-5xl mb-3">🤔</div>
            <h2
              className="font-bold text-2xl mb-1"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "#4E4A4A",
              }}
            >
              Almost! Try Again
            </h2>
            <p
              className="text-sm font-semibold mb-6"
              style={{ color: "#6F7B8A" }}
            >
              Not quite. Check the Words &amp; Places section and try again.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <SecondaryBtn onClick={() => setFeedback(null)}>
                Try Again
              </SecondaryBtn>
              <PrimaryBtn onClick={onReviewWords}>
                Review Words &amp; Places
              </PrimaryBtn>
            </div>
          </FeedbackCard>
        </Backdrop>
      )}

      {/* Review panel */}
      {showReview && (
        <Backdrop>
          <div
            className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: "#FFF5DE", border: "3px solid #BFCBF4" }}
          >
            <div
              className="px-7 pt-6 pb-4"
              style={{
                backgroundColor: "#D9EEF7",
                borderBottom: "2px solid #BFCBF4",
              }}
            >
              <div
                className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
              >
                Reference
              </div>
              <h3
                className="font-bold text-xl"
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  color: "#4E4A4A",
                }}
              >
                Words &amp; Places
              </h3>
              <p
                className="text-sm font-semibold mt-1"
                style={{ color: "#6F7B8A" }}
              >
                Use these to help with your matching.
              </p>
            </div>
            <div className="px-7 py-5 flex flex-col gap-2.5 max-h-[50vh] overflow-y-auto">
              {REVIEW_PAIRS.map((pair, i) => {
                const c = PAIR_COLORS[i]
                return (
                  <div
                    key={i}
                    className="rounded-xl p-4 flex gap-3 items-start"
                    style={{
                      backgroundColor: c.bg,
                      borderLeft: `5px solid ${c.border}`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-black mt-0.5"
                      style={{ backgroundColor: c.border }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div
                        className="font-bold text-sm mb-0.5"
                        style={{ color: c.text }}
                      >
                        {pair.term}
                      </div>
                      <div
                        className="text-sm font-semibold"
                        style={{ color: c.text, opacity: 0.8 }}
                      >
                        {pair.meaning}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className="px-7 pb-6 pt-4 flex justify-center"
              style={{ borderTop: "2px solid #E8DCC8" }}
            >
              <PrimaryBtn
                onClick={() => {
                  setShowReview(false)
                  setFeedback(null)
                }}
              >
                Back to Quiz
              </PrimaryBtn>
            </div>
          </div>
        </Backdrop>
      )}
    </QuizFrame>
  )
}

// ─── Finish screen ────────────────────────────────────────────────────────────

function FinishScreen({
  onReadAgain,
  onWords,
  onRestart,
}: {
  onReadAgain: () => void
  onWords: () => void
  onRestart: () => void
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4"
      style={{ backgroundColor: "#FFF5DE" }}
    >
      <div
        className="w-full max-w-xl relative text-center"
        style={{
          backgroundColor: "#D9EEF7",
          borderRadius: "2rem",
          border: "3px solid #BFCBF4",
          padding: "3rem 2.5rem",
        }}
      >
        <YellowCorner pos="top-left" />
        <YellowCorner pos="top-right" />
        <YellowCorner pos="bottom-left" />
        <YellowCorner pos="bottom-right" />

        <div className="text-5xl mb-5">⭐️ 🎉 ⭐️</div>

        <div
          className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: "#FFD95A", color: "#4E4A4A" }}
        >
          Ka Pai!
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "Fraunces, Georgia, serif", color: "#4E4A4A" }}
        >
          Ka Pai! You Did It!
        </h1>

        <div
          className="rounded-2xl px-6 py-5 mb-7 text-sm font-semibold leading-relaxed"
          style={{ backgroundColor: "#FFF5DE", color: "#6F7B8A" }}
        >
          <p className="mb-2">Thank you for reading Kōrero Muriwai.</p>
          <p>
            You can read the story again, review words, or try the activities
            again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
          <SecondaryBtn onClick={onReadAgain}>Read Again</SecondaryBtn>
          <SecondaryBtn onClick={onWords}>
            Explore Words &amp; Places
          </SecondaryBtn>
          <PrimaryBtn onClick={onRestart}>Try the Activities Again</PrimaryBtn>
        </div>
      </div>
    </div>
  )
}
