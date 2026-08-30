import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface RevealOptions {
  duration?: number;
  stagger?: number;
}

/**
 * [EFFECT-01] GSAP Entrance Reveal Timeline Hook
 * Orchestrates letter-by-letter, badge, glyph, paragraph words, and social icons reveals
 * + continuous idle spin of the badge ring.
 */
export function useHeroTimeline(
  scopeRef: RefObject<HTMLElement | null>,
  ready: boolean
) {
  useGSAP(
    () => {
      if (!scopeRef.current || !ready) return;

      const root = scopeRef.current;
      const mm = gsap.matchMedia();

      const reveal = (
        tl: gsap.core.Timeline,
        targets: HTMLElement[],
        at: number | string,
        opts: RevealOptions = {}
      ) => {
        if (!targets || targets.length === 0) return;

        tl.fromTo(
          targets,
          {
            x: (_i: number, el: HTMLElement) => parseFloat(el.dataset.fromX || '0'),
            y: (_i: number, el: HTMLElement) => parseFloat(el.dataset.fromY || '0'),
            scale: (_i: number, el: HTMLElement) => parseFloat(el.dataset.fromScale || '1'),
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: opts.duration ?? 0.7,
            ease: 'power3.out',
            stagger: opts.stagger,
          },
          at
        );
      };

      mm.add(
        {
          reduced: '(prefers-reduced-motion: reduce)',
          full: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean; full: boolean };

          if (reduced) {
            // In reduced branch: Skip entrance timeline entirely. Instantly snap every rigged element to rest
            const animElements = gsap.utils.toArray<HTMLElement>('[data-anim]', root);
            gsap.set(animElements, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            });

            // Append idle spin tween starting at 0
            const ringElements = gsap.utils.toArray<HTMLElement>('[data-badge-ring]', root);
            if (ringElements.length > 0) {
              gsap.to(ringElements, {
                rotate: 360,
                duration: 26,
                ease: 'none',
                repeat: -1,
              });
            }
            return;
          }

          // Full branch: build one gsap.timeline()
          const tl = gsap.timeline();

          // 1. Headline letters: [data-headline-letter]
          const headlineLetters = gsap.utils.toArray<HTMLElement>('[data-headline-letter]', root);
          reveal(tl, headlineLetters, 0.15, { duration: 0.55, stagger: 0.035 });

          // 2. Badge ring SVG: [data-badge-ring]
          const badgeRing = gsap.utils.toArray<HTMLElement>('[data-badge-ring]', root);
          reveal(tl, badgeRing, 0.75, { duration: 0.7 });

          // 3. Badge center glyph: [data-badge-glyph]
          const badgeGlyph = gsap.utils.toArray<HTMLElement>('[data-badge-glyph]', root);
          reveal(tl, badgeGlyph, 0.95, { duration: 0.6 });

          // 4. Paragraph words: [data-paragraph-word]
          const paragraphWords = gsap.utils.toArray<HTMLElement>('[data-paragraph-word]', root);
          reveal(tl, paragraphWords, 0.9, { duration: 0.5, stagger: 0.025 });

          // 5. Social icons: [data-social-icon]
          const socialIcons = gsap.utils.toArray<HTMLElement>('[data-social-icon]', root);
          reveal(tl, socialIcons, 1.1, { duration: 0.6, stagger: 0.12 });

          // Idle continuous spin
          const loopAt = reduced ? 0 : '>-0.2';
          if (badgeRing.length > 0) {
            tl.to(
              badgeRing,
              {
                rotate: 360,
                duration: 26,
                ease: 'none',
                repeat: -1,
              },
              loopAt
            );
          }
        }
      );

      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: [ready] }
  );
}
