import { useEffect, useState, useRef } from "react";

/*
  LightOfCreteIntro
  ─────────────────
  Drop this into your existing site as a preloader.
  Props:
    onComplete   – called when the intro has finished and the page should show
    logoSrc      – path/URL to the existing logo image (PNG or SVG)
                   If omitted an SVG stand-in matching the real logo is rendered.

  Usage:
    <LightOfCreteIntro logoSrc="/logo.png" onComplete={() => setIntroDone(true)} />

  The component overlays the full viewport, animates, then fades out and calls
  onComplete. After that you can unmount it entirely.
*/

export default function LightOfCreteIntro({ onComplete, logoSrc }) {
  const [phase, setPhase] = useState("idle"); // idle → revealing → sweeping → fading
  const timerRef = useRef([]);

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      // Simple 1-second fade then done
      setPhase("sweeping");
      const t = setTimeout(() => {
        setPhase("fading");
        setTimeout(() => onComplete?.(), 900);
      }, 1000);
      return () => clearTimeout(t);
    }

    // Normal animation timeline
    const add = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timerRef.current.push(id);
      return id;
    };

    setPhase("revealing");                         // 0ms  – logo fades in
    add(() => setPhase("sweeping"), 900);          // 900ms – sunlight sweep starts
    add(() => setPhase("fading"), 4600);           // 4600ms – fade out begins
    add(() => onComplete?.(), 6100);               // 6100ms – done

    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @keyframes loc-logo-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes loc-sun-sweep {
          from { transform: translateX(-45%); opacity: 0; }
          10%  { opacity: 1; }
          85%  { opacity: 1; }
          to   { transform: translateX(120%); opacity: 0; }
        }
        @keyframes loc-leaf-a {
          0%   { transform: translate(0px, 0px)    rotate(0deg)   scale(1);    }
          20%  { transform: translate(18px, -10px) rotate(4deg)   scale(1.02); }
          45%  { transform: translate(-8px, 14px)  rotate(-3deg)  scale(0.98); }
          70%  { transform: translate(22px, 8px)   rotate(5deg)   scale(1.03); }
          100% { transform: translate(6px, -6px)   rotate(1deg)   scale(1);    }
        }
        @keyframes loc-leaf-b {
          0%   { transform: translate(0px, 0px)     rotate(0deg)   scale(1);    }
          25%  { transform: translate(-14px, 8px)   rotate(-6deg)  scale(1.04); }
          55%  { transform: translate(20px, -18px)  rotate(3deg)   scale(0.97); }
          80%  { transform: translate(-6px, 12px)   rotate(-2deg)  scale(1.01); }
          100% { transform: translate(4px, -4px)    rotate(-1deg)  scale(1);    }
        }
        @keyframes loc-leaf-c {
          0%   { transform: translate(0px, 0px)    rotate(0deg)   scale(1);    }
          30%  { transform: translate(10px, 16px)  rotate(7deg)   scale(0.96); }
          60%  { transform: translate(-18px, -8px) rotate(-4deg)  scale(1.05); }
          85%  { transform: translate(8px, 12px)   rotate(2deg)   scale(0.99); }
          100% { transform: translate(-2px, 2px)   rotate(-1deg)  scale(1);    }
        }
        @keyframes loc-wrapper-fadein {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes loc-page-appear {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Intro overlay ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          // Warm paper/plaster background
          background: "linear-gradient(145deg, #f5efe6 0%, #ede4d6 40%, #e8ddd0 100%)",
          // Subtle paper grain via SVG data-URI noise
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\"), linear-gradient(145deg, #f5efe6 0%, #ede4d6 40%, #e8ddd0 100%)",
          ...(phase === "fading"
            ? {
                animation: "loc-wrapper-fadein 1.5s cubic-bezier(0.4,0,0.2,1) forwards",
                pointerEvents: "none",
              }
            : {}),
          ...(prefersReduced && phase === "fading"
            ? { animation: "loc-wrapper-fadein 0.8s ease forwards" }
            : {}),
        }}
      >
        {/* ── Leaf shadow layer A (upper-left drift) ── */}
        {!prefersReduced && (phase === "sweeping" || phase === "fading") && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10%",
              left: "-5%",
              width: "55%",
              height: "70%",
              filter: "blur(18px)",
              mixBlendMode: "multiply",
              opacity: 0.18,
              animation: "loc-leaf-a 4.8s cubic-bezier(0.4,0,0.6,1) infinite",
              pointerEvents: "none",
            }}
          >
            <LeafShadowSvg variant="a" />
          </div>
        )}

        {/* ── Leaf shadow layer B (lower-right drift) ── */}
        {!prefersReduced && (phase === "sweeping" || phase === "fading") && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-5%",
              right: "0%",
              width: "45%",
              height: "60%",
              filter: "blur(22px)",
              mixBlendMode: "multiply",
              opacity: 0.14,
              animation: "loc-leaf-b 5.6s cubic-bezier(0.4,0,0.6,1) 0.3s infinite",
              pointerEvents: "none",
            }}
          >
            <LeafShadowSvg variant="b" />
          </div>
        )}

        {/* ── Leaf shadow layer C (mid drift) ── */}
        {!prefersReduced && (phase === "sweeping" || phase === "fading") && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              width: "40%",
              height: "55%",
              filter: "blur(26px)",
              mixBlendMode: "multiply",
              opacity: 0.10,
              animation: "loc-leaf-c 6.2s cubic-bezier(0.4,0,0.6,1) 0.8s infinite",
              pointerEvents: "none",
            }}
          >
            <LeafShadowSvg variant="c" />
          </div>
        )}

        {/* ── Logo layer ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            opacity: phase === "idle" ? 0 : 1,
            animation:
              phase === "revealing" || phase === "sweeping"
                ? "loc-logo-fade 1.1s cubic-bezier(0.22,1,0.36,1) forwards"
                : "none",
            // Keep visible once revealed
            ...(phase === "sweeping" || phase === "fading" ? { opacity: 1 } : {}),
          }}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Light of Crete"
              style={{
                width: "min(420px, 72vw)",
                height: "auto",
                display: "block",
              }}
              draggable={false}
            />
          ) : (
            <LogoFallback />
          )}
        </div>

        {/* ── Sunlight sweep ── */}
        {!prefersReduced && (phase === "sweeping" || phase === "fading") && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "60%",
                height: "100%",
                background:
                  "radial-gradient(ellipse 55% 100% at 50% 50%, rgba(255,222,158,0.38) 0%, rgba(255,210,130,0.22) 40%, transparent 100%)",
                filter: "blur(32px)",
                animation:
                  "loc-sun-sweep 3.8s cubic-bezier(0.22,1,0.36,1) forwards",
              }}
            />
          </div>
        )}
      </div>

      {/* ── Page reveal hint: add this class to your <main> or page wrapper ── */}
      {phase === "fading" && (
        <style>{`
          body > *:not([data-intro-overlay]) {
            animation: loc-page-appear 1.6s cubic-bezier(0.22,1,0.36,1) 0.4s both;
          }
        `}</style>
      )}
    </>
  );
}

/* ─── Leaf shadow SVG shapes ─────────────────────────────────────────────── */
function LeafShadowSvg({ variant }) {
  // Organic, imperfect leaf/branch silhouettes in warm gray
  const fills = {
    a: (
      <svg viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="80"  cy="60"  rx="55" ry="22" transform="rotate(-35 80 60)"  fill="#5a4a3a" />
        <ellipse cx="160" cy="90"  rx="70" ry="18" transform="rotate(-20 160 90)" fill="#5a4a3a" />
        <ellipse cx="60"  cy="150" rx="45" ry="16" transform="rotate(-50 60 150)" fill="#5a4a3a" />
        <ellipse cx="200" cy="130" rx="80" ry="20" transform="rotate(-15 200 130)" fill="#5a4a3a" />
        <ellipse cx="130" cy="200" rx="60" ry="14" transform="rotate(-30 130 200)" fill="#5a4a3a" />
        <ellipse cx="280" cy="80"  rx="50" ry="15" transform="rotate(-10 280 80)"  fill="#5a4a3a" />
        {/* stem */}
        <line x1="0" y1="0" x2="220" y2="260" stroke="#5a4a3a" strokeWidth="8" strokeLinecap="round" />
        <line x1="220" y1="260" x2="280" y2="320" stroke="#5a4a3a" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
    b: (
      <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="300" cy="50"  rx="60" ry="20" transform="rotate(25 300 50)"   fill="#5a4a3a" />
        <ellipse cx="220" cy="80"  rx="75" ry="17" transform="rotate(15 220 80)"   fill="#5a4a3a" />
        <ellipse cx="320" cy="140" rx="50" ry="15" transform="rotate(35 320 140)"  fill="#5a4a3a" />
        <ellipse cx="180" cy="160" rx="65" ry="18" transform="rotate(10 180 160)"  fill="#5a4a3a" />
        <ellipse cx="260" cy="220" rx="55" ry="14" transform="rotate(20 260 220)"  fill="#5a4a3a" />
        <line x1="380" y1="0" x2="140" y2="280" stroke="#5a4a3a" strokeWidth="7" strokeLinecap="round" />
        <line x1="140" y1="280" x2="80"  y2="320" stroke="#5a4a3a" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
    c: (
      <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="100" cy="40"  rx="50" ry="18" transform="rotate(-28 100 40)"  fill="#5a4a3a" />
        <ellipse cx="200" cy="70"  rx="65" ry="16" transform="rotate(-12 200 70)"  fill="#5a4a3a" />
        <ellipse cx="80"  cy="130" rx="40" ry="14" transform="rotate(-40 80 130)"  fill="#5a4a3a" />
        <ellipse cx="250" cy="120" rx="70" ry="19" transform="rotate(-8 250 120)"  fill="#5a4a3a" />
        <line x1="20"  y1="10"  x2="200" y2="240" stroke="#5a4a3a" strokeWidth="6" strokeLinecap="round" />
        <line x1="200" y1="240" x2="250" y2="290" stroke="#5a4a3a" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  };
  return fills[variant] || fills.a;
}

/* ─── Logo fallback (matches the real logo proportions) ─────────────────── */
function LogoFallback() {
  return (
    <svg
      viewBox="0 0 440 300"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "min(420px, 72vw)", height: "auto", display: "block" }}
      aria-label="Light of Crete"
    >
      {/* Sun symbol */}
      <g transform="translate(220, 82)">
        {/* Crescent arc */}
        <path
          d="M-52,0 A52,52 0 0,1 52,0"
          fill="none"
          stroke="#b8935a"
          strokeWidth="1.5"
        />
        <path
          d="M-38,-18 A44,44 0 0,0 38,-18"
          fill="none"
          stroke="#b8935a"
          strokeWidth="1.5"
        />
        {/* Sun rays */}
        {Array.from({ length: 9 }, (_, i) => {
          const angle = -90 + (i * 20) - 80;
          const rad = (angle * Math.PI) / 180;
          const r1 = 14, r2 = 28;
          return (
            <line
              key={i}
              x1={r1 * Math.cos(rad)}
              y1={r1 * Math.sin(rad)}
              x2={r2 * Math.cos(rad)}
              y2={r2 * Math.sin(rad)}
              stroke="#b8935a"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          );
        })}
        {/* Horizon lines */}
        <line x1="-30" y1="8"  x2="30"  y2="8"  stroke="#b8935a" strokeWidth="1.2" />
        <line x1="-24" y1="14" x2="24"  y2="14" stroke="#b8935a" strokeWidth="1.2" />
        <line x1="-18" y1="20" x2="18"  y2="20" stroke="#b8935a" strokeWidth="1.2" />
      </g>

      {/* "Light of Crete" */}
      <text
        x="220"
        y="188"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
        fontSize="52"
        fontWeight="300"
        letterSpacing="2"
        fill="#2c2620"
      >
        Light of Crete
      </text>

      {/* Divider */}
      <line x1="128" y1="202" x2="200" y2="202" stroke="#b8935a" strokeWidth="0.8" />
      <circle cx="220" cy="202" r="2.5" fill="#b8935a" />
      <line x1="240" y1="202" x2="312" y2="202" stroke="#b8935a" strokeWidth="0.8" />

      {/* Subtitle */}
      <text
        x="220"
        y="230"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
        fontSize="13"
        fontWeight="400"
        letterSpacing="5"
        fill="#5a4a3a"
      >
        PHOTOSHOOTS IN CRETE
      </text>
    </svg>
  );
}
