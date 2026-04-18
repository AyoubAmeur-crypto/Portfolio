import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import aaLogo from '../assets/ayoublogo.png';

interface IntroLoaderProps {
  onFinish: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onFinish }) => {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);
  const ring1Ref   = useRef<HTMLDivElement>(null);
  const ring2Ref   = useRef<HTMLDivElement>(null);
  const ring3Ref   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const fillRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1. Rings fan in
    tl.fromTo([ring3Ref.current, ring2Ref.current, ring1Ref.current],
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'back.out(1.4)' }
    )

    // 2. Logo appears
    .fromTo(logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' },
      '-=0.5'
    )

    // 3. Progress track
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, transformOrigin: 'left', ease: 'power2.out' },
      '-=0.2'
    )

    // 4. Fill + counter
    .to(fillRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power1.inOut',
      onUpdate() {
        const pct = Math.round(this.progress() * 100);
        if (counterRef.current) counterRef.current.textContent = String(pct).padStart(3, '0');
      },
      onComplete() {
        if (counterRef.current) counterRef.current.textContent = '100';
      },
    }, '+=0.05')

    // 5. Hold
    .to({}, { duration: 0.2 })

    // 6. Fade out
    .to(wrapRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        if (wrapRef.current) wrapRef.current.style.display = 'none';
        onFinish();
      },
    });

    // ── Continuous animations ──
    // Logo: slow breathe
    gsap.to(logoRef.current, {
      scale: 1.07,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Logo: gentle float
    gsap.to(logoRef.current, {
      y: -7,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.3,
    });

    // Ring 1 (outermost): slow CW rotation
    gsap.to(ring1Ref.current, {
      rotation: 360,
      duration: 18,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center',
    });

    // Ring 2: fast CCW rotation
    gsap.to(ring2Ref.current, {
      rotation: -360,
      duration: 10,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center',
    });

    // Ring 3 (innermost): slow CW
    gsap.to(ring3Ref.current, {
      rotation: 360,
      duration: 24,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center',
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([logoRef.current, ring1Ref.current, ring2Ref.current, ring3Ref.current]);
    };
  }, []);

  const circleStyle = (size: number, border: string): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    border,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
  });

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Centered group: rings + logo ── */}
      <div style={{ position: 'relative', width: 260, height: 260 }}>

        {/* Ring 1 — outermost, dashed */}
        <div
          ref={ring1Ref}
          style={circleStyle(260, '1px dashed rgba(255,255,255,0.14)')}
        />

        {/* Ring 2 — medium, solid faint */}
        <div
          ref={ring2Ref}
          style={circleStyle(180, '1px solid rgba(255,255,255,0.10)')}
        />

        {/* Ring 3 — inner, slightly brighter */}
        <div
          ref={ring3Ref}
          style={circleStyle(110, '1px dashed rgba(255,255,255,0.22)')}
        />

        {/* Logo — no box, just the image */}
        <img
          ref={logoRef}
          src={aaLogo}
          alt="Ayoub Ameur"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 56,
            height: 56,
            objectFit: 'contain',
            opacity: 0,
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* ── Progress bar ── */}
      <div style={{
        position: 'absolute',
        bottom: 44,
        left: 48,
        right: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div
          ref={lineRef}
          style={{
            flex: 1,
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        >
          <div
            ref={fillRef}
            style={{
              position: 'absolute',
              top: 0, bottom: 0, left: 0,
              width: 0,
              background: '#fff',
            }}
          />
        </div>
        <span
          ref={counterRef}
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: 10,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.06em',
            minWidth: 28,
            textAlign: 'right',
          }}
        >
          000
        </span>
      </div>
    </div>
  );
};

export default IntroLoader;