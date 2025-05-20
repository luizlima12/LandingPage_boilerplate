"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const NAVBAR_SIZE = 64;

const PAGES = [
  "inicio",
  "sobre",
  "solucoes",
  "funcionamento",
  "feedback",
  "economy",
  "doubts",
];

/**
 * Custom React hook to handle smooth scrolling to page sections and track the active section.
 *
 * - Provides a scrollToElement function to scroll smoothly to a section by its id.
 * - Tracks the currently active section (activePage) based on scroll position.
 * - Updates the activePage as the user scrolls through the page or clicks a menu item.
 * - Updates the URL hash using Next.js router push.
 *
 * @returns {{ scrollToElement: (elementId: string) => void, activePage: string }}
 */
export function useScrollToElement() {
  const [activePage, setActivePage] = useState(PAGES[0]);
  const { push } = useRouter();
  const isManualScrolling = useRef(false);

  interface VisibleAreas {
    [key: string]: number;
  }

  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const determineActivePage = (): void => {
      if (isManualScrolling.current) return;
      const viewportHeight: number = window.innerHeight - NAVBAR_SIZE;
      const viewportTop: number = window.scrollY + NAVBAR_SIZE;
      const viewportBottom: number = viewportTop + viewportHeight;
      const visibleAreas: VisibleAreas = {};
      let maxVisibleArea: number = 0;
      let mostVisiblePage: string | null = null;

      for (const page of PAGES) {
        const element: HTMLElement | null = document.getElementById(page);
        if (!element) continue;

        const rect: DOMRect = element.getBoundingClientRect();
        const elementTop: number = window.scrollY + rect.top;
        const elementBottom: number = elementTop + element.offsetHeight;

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          const visibleTop: number = Math.max(elementTop, viewportTop);
          const visibleBottom: number = Math.min(elementBottom, viewportBottom);
          const visibleArea: number = visibleBottom - visibleTop;
          visibleAreas[page] = visibleArea;
          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            mostVisiblePage = page;
          }
        }
      }

      if (mostVisiblePage && mostVisiblePage !== activePage) {
        setActivePage(mostVisiblePage);
      }
    };

    const handleScroll = (): void => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(determineActivePage, 100);
    };

    window.addEventListener("scroll", handleScroll);
    determineActivePage();
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [activePage]);

  /**
   * Smoothly scrolls to the element with the given id, accounting for the navbar size.
   * Also updates the URL hash using Next.js router push.
   * @param {string} elementId - The id of the element to scroll to.
   */
  const scrollToElement = useCallback(
    (elementId: string) => {
      if (elementId.startsWith("#")) elementId = elementId.slice(1);
      const element = document.getElementById(elementId);
      if (!element) return;
      isManualScrolling.current = true;

      setActivePage(elementId);

      const elementTop = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementTop + window.scrollY - NAVBAR_SIZE,
        behavior: "smooth",
      });

      push(`#${elementId}`, {
        scroll: false,
      });

      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1000);
    },
    [push]
  );

  return { scrollToElement, activePage };
}
