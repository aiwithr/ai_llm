// Mermaid runtime loader for Material for MkDocs
// Loads Mermaid 10 from CDN and renders every <pre class="mermaid"> block.
// Renders late-mounted blocks too (Material instant-nav, instant-pagination).

(function () {
  var MERMAID_VERSION = "10";
  var CDN_BASE = "https://cdn.jsdelivr.net/npm/mermaid@" + MERMAID_VERSION + "/dist/mermaid.min.js";
  var POLL_MS = 250;
  var POLL_MAX = 40; // 10 seconds

  function renderAll() {
    if (!window.mermaid || typeof window.mermaid.run !== "function") return;
    try {
      var blocks = document.querySelectorAll("pre.mermaid:not([data-mermaid-rendered])");
      if (blocks.length === 0) return;
      blocks.forEach(function (el) { el.setAttribute("data-mermaid-rendered", "1"); });
      window.mermaid.run({ nodes: blocks });
    } catch (e) {
      console.error("Mermaid render error:", e);
    }
  }

  function init() {
    if (!window.mermaid) {
      var s = document.createElement("script");
      s.src = CDN_BASE;
      s.async = true;
      s.onload = function () {
        window.mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: (document.documentElement.getAttribute("data-md-color-scheme") === "slate") ? "dark" : "default",
          fontFamily: "inherit"
        });
        renderAll();
        pollLate();
      };
      s.onerror = function () { console.error("Failed to load Mermaid from CDN:", CDN_BASE); };
      document.head.appendChild(s);
    } else {
      renderAll();
      pollLate();
    }
  }

  function pollLate() {
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      renderAll();
      if (tries >= POLL_MAX) clearInterval(t);
    }, POLL_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-render when Material swaps content (instant nav)
  document.addEventListener("DOMContentSwap", function () { setTimeout(renderAll, 50); });
  window.addEventListener("load", pollLate);
})();
