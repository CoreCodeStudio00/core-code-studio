(() => {
  const mq = window.matchMedia("(max-width: 768px)");
  const sections = Array.from(document.querySelectorAll(".section"));

  function applyMobileTapBehavior() {
    // remove old listeners by cloning (simple + reliable)
    for (const s of sections) {
      const clone = s.cloneNode(true);
      s.parentNode.replaceChild(clone, s);
    }

    const freshSections = Array.from(document.querySelectorAll(".section"));

    if (!mq.matches) {
      // Desktop: ensure everything is not forced open/closed
      freshSections.forEach(s => s.classList.remove("open"));
      return;
    }

    // Mobile: tap toggles
    freshSections.forEach(s => {
      s.classList.remove("open");
      s.addEventListener("click", () => {
        // Optional: close others so only one is open at a time
        freshSections.forEach(x => { if (x !== s) x.classList.remove("open"); });
        s.classList.toggle("open");
      });
    });
  }

  applyMobileTapBehavior();
  mq.addEventListener("change", applyMobileTapBehavior);
})();
