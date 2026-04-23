/* =============================================
   קושחה.נט — app.js
   לוגיקה משותפת: ערכת נושא, אבטחה
   ============================================= */

(function () {
    'use strict';

    /* ── ערכת נושא ─────────────────────────────── */
    const STORAGE_KEY = 'kushcha_theme';
    const DARK_CLASS  = 'light-mode'; // ברירת מחדל היא כהה; light = מצב בהיר

    const toggle = document.getElementById('themeCheckbox');
    const label  = document.getElementById('themeLabel');

    function applyTheme(isLight) {
        document.body.classList.toggle(DARK_CLASS, isLight);
        if (label) label.textContent = isLight ? 'יום' : 'לילה';
        if (toggle) toggle.checked = isLight;
    }

    // קריאה בטוחה מ-localStorage
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    applyTheme(saved === 'light');

    if (toggle) {
        toggle.addEventListener('change', function () {
            const isLight = this.checked;
            applyTheme(isLight);
            try { localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark'); } catch (_) {}
        });
    }

    /* ── אבטחה: בלוק קישורים בעייתיים ─────────── */
    document.addEventListener('click', function (e) {
        const el = e.target.closest('a[href]');
        if (!el) return;

        const href = el.getAttribute('href') || '';

        // חסום פרוטוקולים מסוכנים
        if (/^(javascript|data|vbscript):/i.test(href.trim())) {
            e.preventDefault();
            console.warn('[אבטחה] קישור חסום:', href);
            return;
        }

        // קישורים חיצוניים → ודא rel תקין
        if (el.hostname && el.hostname !== location.hostname) {
            el.setAttribute('rel', 'noopener noreferrer');
        }
    });

    /* ── קישורי הורדה שמורים (#) ──────────────── */
    document.querySelectorAll('.dl-btn[data-href="#"]').forEach(function (btn) {
        btn.classList.add('disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.addEventListener('click', function (e) { e.preventDefault(); });
    });

})();
