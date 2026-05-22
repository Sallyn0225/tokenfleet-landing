/**
 * FaultyTerminalIsland — production-grade wrapper around FaultyTerminal.
 *
 * Adds three behaviors the raw component doesn't:
 *   1. respects `prefers-reduced-motion` (pauses + zeros glitch/flicker)
 *   2. pauses the RAF loop once the host element scrolls out of viewport
 *   3. silently no-ops when WebGL is unavailable, letting the static dark
 *      fallback in HeroBackdrop take over
 *
 * Mounted via `client:only="react"` from HeroBackdrop.astro — never runs on
 * the server, so window/document access is safe inside effects.
 */

import { useEffect, useRef, useState } from 'react';
import FaultyTerminal from './FaultyTerminal.jsx';

export default function FaultyTerminalIsland(props) {
  const wrapRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [outOfView, setOutOfView] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [webglOk, setWebglOk] = useState(null);

  useEffect(() => {
    const c = document.createElement('canvas');
    const gl =
      c.getContext('webgl2') ||
      c.getContext('webgl') ||
      c.getContext('experimental-webgl');
    setWebglOk(Boolean(gl));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => setDocumentHidden(document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setOutOfView(!entry.isIntersecting || entry.intersectionRatio < 0.08),
      { threshold: [0, 0.08] }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  if (webglOk !== true) return null;

  const {
    glitchAmount = 1,
    flickerAmount = 1,
    scanlineIntensity = 1,
    pause: pauseProp = false,
    ...rest
  } = props;

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      <FaultyTerminal
        {...rest}
        pause={pauseProp || outOfView || reducedMotion || documentHidden}
        glitchAmount={reducedMotion ? 0 : glitchAmount}
        flickerAmount={reducedMotion ? 0 : flickerAmount}
        scanlineIntensity={reducedMotion ? 0.15 : scanlineIntensity}
      />
    </div>
  );
}
