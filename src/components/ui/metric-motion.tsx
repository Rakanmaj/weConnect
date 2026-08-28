"use client";

import { useEffect } from "react";

const NUMBER_PATTERN = /[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?/g;
const METRIC_TEXT_PATTERN = /^[\s$€£#]*[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?(?:\s*%|[kKmMbB]|\s*\+)?(?:\s+(?:match|best match|completed|working independently|developers?|companies|projects?|hires?|assessments?|challenges?|candidates?|invoices?|results?|unread notifications?))?\s*$/i;
const EXCLUDED_SELECTOR = [
  "[data-count-up-ignore]",
  "input",
  "textarea",
  "select",
  "option",
  "script",
  "style",
  "noscript",
  "code",
  "pre",
  "time",
  "footer",
  "[contenteditable='true']",
  "a[href^='tel:']",
  "a[href^='mailto:']",
].join(",");

interface NumericPart {
  index: number;
  length: number;
  end: number;
  decimals: number;
  grouped: boolean;
  explicitPlus: boolean;
  integerWidth: number;
  preserveLeadingZeros: boolean;
}

interface TextCount {
  textNode: Text;
  finalText: string;
  lastRendered: string;
  parts: NumericPart[];
}

interface CountState {
  segments: TextCount[];
  cancelled: boolean;
}

const activeCounts = new WeakMap<HTMLElement, CountState>();

function getNumericParts(text: string): NumericPart[] {
  return Array.from(text.matchAll(NUMBER_PATTERN), (match) => {
    const token = match[0];
    const unsigned = token.replace(/^[+-]/, "");
    const [integer, fraction = ""] = unsigned.split(".");

    return {
      index: match.index ?? 0,
      length: token.length,
      end: Number(token.replaceAll(",", "")),
      decimals: fraction.length,
      grouped: integer.includes(","),
      explicitPlus: token.startsWith("+"),
      integerWidth: integer.replaceAll(",", "").length,
      preserveLeadingZeros: integer.length > 1 && integer.startsWith("0"),
    };
  }).filter((part) => Number.isFinite(part.end));
}

function formatPart(part: NumericPart, value: number, finished: boolean) {
  const rounded = part.decimals > 0
    ? Number(value.toFixed(part.decimals))
    : Math.round(value);
  const sign = rounded < 0 ? "-" : part.explicitPlus && finished ? "+" : "";
  const absolute = Math.abs(rounded);
  let formatted = absolute.toLocaleString("en-US", {
    useGrouping: part.grouped,
    minimumFractionDigits: part.decimals,
    maximumFractionDigits: part.decimals,
  });

  if (!part.grouped && part.preserveLeadingZeros) {
    const [integer, fraction] = formatted.split(".");
    formatted = `${integer.padStart(part.integerWidth, "0")}${fraction ? `.${fraction}` : ""}`;
  }

  return `${sign}${formatted}`;
}

function renderCount(state: TextCount, progress: number) {
  let output = "";
  let cursor = 0;
  const finished = progress >= 1;

  for (const part of state.parts) {
    output += state.finalText.slice(cursor, part.index);
    output += formatPart(part, part.end * progress, finished);
    cursor = part.index + part.length;
  }

  return output + state.finalText.slice(cursor);
}

function shouldCount(element: HTMLElement, text: string, parts: NumericPart[]) {
  if (!parts.length || element.closest(EXCLUDED_SELECTOR)) return false;
  if (/\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b/.test(text)) return false;
  if (/^\+?\d[\d\s().-]{7,}\d$/.test(text.trim())) return false;
  if (element.hasAttribute("data-count-up")) return true;

  const className = element.className;
  const hasMetricTypography = typeof className === "string" && (
    className.includes("tabular-nums") ||
    className.includes("text-display") ||
    className.includes("text-h1") ||
    className.includes("text-h2") ||
    className.includes("text-h3")
  );

  if (hasMetricTypography && text.length <= 48) return true;
  return parts.length === 1 && text.length <= 36 && METRIC_TEXT_PATTERN.test(text);
}

function startCount(element: HTMLElement) {
  const state = activeCounts.get(element);
  if (!state || state.cancelled) return;

  const maxValue = Math.max(
    ...state.segments.flatMap((segment) => segment.parts.map((part) => Math.abs(part.end))),
    1
  );
  const duration = Math.min(1400, 800 + Math.log10(maxValue + 1) * 130);
  const startedAt = performance.now();

  const frame = (now: number) => {
    if (
      state.cancelled ||
      !element.isConnected ||
      state.segments.some((segment) => !segment.textNode.isConnected)
    ) {
      return;
    }
    const elapsed = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    for (const segment of state.segments) {
      const nextText = elapsed >= 1 ? segment.finalText : renderCount(segment, eased);
      segment.lastRendered = nextText;
      segment.textNode.nodeValue = nextText;
    }

    if (elapsed < 1) {
      requestAnimationFrame(frame);
    } else {
      element.dataset.countUpComplete = "true";
    }
  };

  requestAnimationFrame(frame);
}

export function MetricMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preparedElements = new Set<HTMLElement>();
    document.documentElement.classList.add("metric-motion-enabled");

    const countObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          countObserver.unobserve(entry.target);
          startCount(entry.target as HTMLElement);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -4% 0px" }
    );

    const progressObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("metric-progress-visible");
          progressObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -4% 0px" }
    );

    const prepareNumber = (element: HTMLElement) => {
      if (element.children.length > 0 || element.closest(EXCLUDED_SELECTOR)) return;
      const displayText = element.textContent?.trim() ?? "";
      if (!displayText) return;

      const numericTextNodes = Array.from(element.childNodes).filter(
        (node): node is Text => node.nodeType === Node.TEXT_NODE && /\d/.test(node.nodeValue ?? "")
      );
      if (!numericTextNodes.length) return;

      const current = activeCounts.get(element);
      if (current) {
        const isInternalUpdate = current.segments.every(
          (segment) => segment.textNode.isConnected && segment.textNode.nodeValue === segment.lastRendered
        );
        if (isInternalUpdate) return;
        current.cancelled = true;
        activeCounts.delete(element);
        countObserver.unobserve(element);
        preparedElements.delete(element);
      }

      if (element.dataset.countUpComplete === "true" && element.dataset.countUpFinal === displayText) {
        return;
      }

      const displayParts = getNumericParts(displayText);
      if (!shouldCount(element, displayText, displayParts)) return;
      const segments = numericTextNodes.map((textNode) => {
        const finalText = textNode.nodeValue ?? "";
        return {
          textNode,
          finalText,
          lastRendered: finalText,
          parts: getNumericParts(finalText),
        } satisfies TextCount;
      }).filter((segment) => segment.parts.length > 0);
      if (!segments.length) return;

      if (reduceMotion || segments.every((segment) => segment.parts.every((part) => part.end === 0))) {
        element.dataset.countUpComplete = "true";
        element.dataset.countUpFinal = displayText;
        return;
      }

      const state: CountState = {
        segments,
        cancelled: false,
      };
      activeCounts.set(element, state);
      preparedElements.add(element);
      element.dataset.countUpFinal = displayText;
      for (const segment of state.segments) {
        segment.lastRendered = renderCount(segment, 0);
        segment.textNode.nodeValue = segment.lastRendered;
      }
      countObserver.observe(element);
    };

    const scan = (root: ParentNode | HTMLElement) => {
      const elements: HTMLElement[] = [];
      if (root instanceof HTMLElement) elements.push(root);
      elements.push(
        ...Array.from(root.querySelectorAll("*")).filter(
          (element): element is HTMLElement => element instanceof HTMLElement
        )
      );

      for (const element of elements) {
        if (element.classList.contains("metric-progress-fill")) {
          if (reduceMotion) element.classList.add("metric-progress-visible");
          else progressObserver.observe(element);
        }
        prepareNumber(element);
      }
    };

    scan(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement;
          if (parent) prepareNumber(parent);
          continue;
        }

        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) scan(node);
          else if (node.parentElement) prepareNumber(node.parentElement);
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      mutationObserver.disconnect();
      countObserver.disconnect();
      progressObserver.disconnect();
      for (const element of preparedElements) {
        const state = activeCounts.get(element);
        if (state) {
          state.cancelled = true;
          for (const segment of state.segments) {
            if (segment.textNode.isConnected) segment.textNode.nodeValue = segment.finalText;
          }
          activeCounts.delete(element);
        }
        delete element.dataset.countUpComplete;
        delete element.dataset.countUpFinal;
      }
      document.querySelectorAll(".metric-progress-fill").forEach((element) => {
        element.classList.remove("metric-progress-visible");
      });
      document.documentElement.classList.remove("metric-motion-enabled");
    };
  }, []);

  return null;
}
