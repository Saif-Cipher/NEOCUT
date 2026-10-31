'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Calibrated kinetic profiles for the Jitter Stretch Snap effect.
 * Emulates physical rubber-band elasticity:
 * 1. Initial squash/stretch state + vertical offset
 * 2. Rapid launch expanding past natural proportions (elastic overshoot)
 * 3. Sharp snap back and settling oscillation
 */
const LEVEL_CONFIGS = {
  display: {
    duration: 0.82,
    stagger: 0.026,
    initialScaleY: 0.12,
    initialScaleX: 1.45,
    initialY: 42,
    ease: 'elastic.out(1.18, 0.42)',
    defaultSplit: 'chars',
  },
  secondary: {
    duration: 0.72,
    stagger: 0.02,
    initialScaleY: 0.35,
    initialScaleX: 1.25,
    initialY: 26,
    ease: 'elastic.out(1.1, 0.46)',
    defaultSplit: 'chars',
  },
  subtle: {
    duration: 0.62,
    stagger: 0.025,
    initialScaleY: 0.65,
    initialScaleX: 1.12,
    initialY: 14,
    ease: 'elastic.out(1.05, 0.52)',
    defaultSplit: 'words',
  },
};

/**
 * Extracts raw string representation for accessible screen reader labels.
 */
function extractRawText(node) {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractRawText).join('');
  if (React.isValidElement(node) && node.props && node.props.children) {
    return extractRawText(node.props.children);
  }
  return '';
}

/**
 * Recursively splits text into character spans while preserving nested React elements and formatting.
 */
function splitIntoChars(node, path = 'c', counter = { current: 0 }) {
  if (typeof node === 'string') {
    const chunks = node.split(/(\s+)/);
    return chunks.map((chunk, chunkIdx) => {
      if (/^\s+$/.test(chunk)) {
        return chunk;
      }
      const chars = Array.from(chunk);
      return (
        <span key={`${path}-w-${chunkIdx}`} className="inline-block whitespace-nowrap">
          {chars.map((char, charIdx) => {
            const index = counter.current++;
            return (
              <span
                key={`${path}-ch-${index}-${charIdx}`}
                className="stretch-snap-target inline-block origin-bottom transform-gpu will-change-transform"
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    });
  }

  if (React.isValidElement(node)) {
    const children = React.Children.toArray(node.props.children);
    return React.cloneElement(
      node,
      {
        ...node.props,
        key: node.key || `${path}-el`,
      },
      children.map((child, idx) => splitIntoChars(child, `${path}-${idx}`, counter))
    );
  }

  return node;
}

/**
 * Recursively splits text into word spans for body paragraphs or subtle UI text.
 */
function splitIntoWords(node, path = 'w', counter = { current: 0 }) {
  if (typeof node === 'string') {
    const chunks = node.split(/(\s+)/);
    return chunks.map((chunk, idx) => {
      if (/^\s+$/.test(chunk)) {
        return chunk;
      }
      const index = counter.current++;
      return (
        <span
          key={`${path}-${index}-${idx}`}
          className="stretch-snap-target inline-block origin-bottom transform-gpu will-change-transform"
          style={{ display: 'inline-block' }}
        >
          {chunk}
        </span>
      );
    });
  }

  if (React.isValidElement(node)) {
    const children = React.Children.toArray(node.props.children);
    return React.cloneElement(
      node,
      {
        ...node.props,
        key: node.key || `${path}-el`,
      },
      children.map((child, idx) => splitIntoWords(child, `${path}-${idx}`, counter))
    );
  }

  return node;
}

/**
 * StretchSnapText: Reusable Global Typography Kinetic Motion Component.
 * Faithfully reproduces the Jitter Stretch Snap kinetic typography effect across the application.
 */
export default function StretchSnapText({
  as: Component = 'div',
  children,
  level = 'display',
  split,
  className = '',
  delay = 0,
  duration,
  stagger,
  ease,
  trigger = 'scroll', // 'scroll' | 'mount' | 'hover'
  interactive = false, // on hover: trigger a subtle spring stretch snap
  once = true,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rawText = extractRawText(children);
  const config = LEVEL_CONFIGS[level] || LEVEL_CONFIGS.display;
  const splitMode = split || config.defaultSplit;

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion || !containerRef.current) return;

    const targets = containerRef.current.querySelectorAll('.stretch-snap-target');
    if (!targets || targets.length === 0) return;

    const animDuration = duration !== undefined ? duration : config.duration;
    const animStagger = stagger !== undefined ? stagger : config.stagger;
    const animEase = ease || config.ease;

    const ctx = gsap.context(() => {
      if (trigger === 'mount') {
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            scaleY: config.initialScaleY,
            scaleX: config.initialScaleX,
            y: config.initialY,
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: animDuration,
            ease: animEase,
            stagger: animStagger,
            delay: delay,
            onComplete: () => {
              gsap.set(targets, { clearProps: 'willChange' });
            },
          }
        );
      } else if (trigger === 'scroll') {
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            scaleY: config.initialScaleY,
            scaleX: config.initialScaleX,
            y: config.initialY,
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: animDuration,
            ease: animEase,
            stagger: animStagger,
            delay: delay,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 90%',
              once: once,
            },
            onComplete: () => {
              gsap.set(targets, { clearProps: 'willChange' });
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, reducedMotion, level, splitMode, delay, duration, stagger, ease, trigger, once]);

  // Interactive hover bounce for buttons or navigation items
  const handleMouseEnter = () => {
    if (!interactive || reducedMotion || !containerRef.current) return;
    const targets = containerRef.current.querySelectorAll('.stretch-snap-target');
    if (!targets || targets.length === 0) return;

    gsap.fromTo(
      targets,
      {
        scaleY: 1.15,
        scaleX: 0.92,
        y: -3,
        transformOrigin: '50% 100%',
      },
      {
        scaleY: 1,
        scaleX: 1,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.4)',
        stagger: 0.015,
      }
    );
  };

  // If reduced motion is requested, render clean without spans
  if (reducedMotion) {
    return (
      <Component className={className} style={style} {...props}>
        {children}
      </Component>
    );
  }

  const renderedContent =
    splitMode === 'chars' ? splitIntoChars(children) : splitIntoWords(children);

  return (
    <Component
      ref={containerRef}
      className={`stretch-snap-container ${className}`}
      style={style}
      aria-label={rawText}
      onMouseEnter={interactive ? handleMouseEnter : undefined}
      {...props}
    >
      <span aria-hidden="true" className="contents">
        {renderedContent}
      </span>
    </Component>
  );
}

/**
 * Custom hook to imperatively apply the Stretch Snap effect to any DOM ref.
 */
export function useStretchSnap(ref, options = {}) {
  const {
    level = 'display',
    delay = 0,
    duration,
    stagger,
    ease,
    trigger = 'scroll',
    once = true,
  } = options;

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const config = LEVEL_CONFIGS[level] || LEVEL_CONFIGS.display;
    const animDuration = duration !== undefined ? duration : config.duration;
    const animStagger = stagger !== undefined ? stagger : config.stagger;
    const animEase = ease || config.ease;

    const targets = ref.current.querySelectorAll('.stretch-snap-target') || [ref.current];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          scaleY: config.initialScaleY,
          scaleX: config.initialScaleX,
          y: config.initialY,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          scaleY: 1,
          scaleX: 1,
          y: 0,
          duration: animDuration,
          ease: animEase,
          stagger: animStagger,
          delay: delay,
          scrollTrigger: trigger === 'scroll' ? {
            trigger: ref.current,
            start: 'top 88%',
            once: once,
          } : undefined,
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, level, delay, duration, stagger, ease, trigger, once]);
}
