/* ═══════════════════════════════════════════════════════════════
   script.js — VK Innovative Technologies
   Save this file as: script.js
   Link in HTML (before </body>): <script src="script.js"></script>
═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════
   1. PROJECT FILTER
   Filters the project grid by category.
   Called from filter buttons and category cards.
════════════════════════════════════════ */
function filterProjects(cat, btn) {
  // Show/hide project items based on data-cat attribute
  const allItems = document.querySelectorAll('.project-item');
  allItems.forEach(function (el) {
    if (cat === 'all' || el.dataset.cat === cat) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });

  // Update active state on filter buttons (only when a button is passed)
  if (btn) {
    const allBtns = document.querySelectorAll('.filter-btn');
    allBtns.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  }

  // Smooth scroll to the projects section
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ════════════════════════════════════════
   2. NAVBAR ACTIVE LINK ON SCROLL
   Highlights the correct nav link as the
   user scrolls through sections.
════════════════════════════════════════ */
(function initNavObserver() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Remove active from all links
          navLinks.forEach(function (link) {
            link.classList.remove('active');
          });
          // Add active to the matching link
          const activeLink = document.querySelector(
            '.navbar-nav .nav-link[href="#' + entry.target.id + '"]'
          );
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  // Observe every section that has an id
  document.querySelectorAll('section[id]').forEach(function (section) {
    sectionObserver.observe(section);
  });
})();

/* ════════════════════════════════════════
   3. SCROLL TO TOP BUTTON
   Shows the button after scrolling 400px,
   hides it when near the top.
════════════════════════════════════════ */
(function initScrollTop() {
  var scrollBtn = document.getElementById('scrollTop');
  if (!scrollBtn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
})();

/* ════════════════════════════════════════
   4. CONTACT FORM — SUBMIT FEEDBACK
   Shows a success state for 3 seconds,
   then resets the button.
════════════════════════════════════════ */
function submitForm(btn) {
  // Show success state
  btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  btn.disabled = true;

  // Reset after 3 seconds
  setTimeout(function () {
    btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
}

/* ════════════════════════════════════════
   5. NEWSLETTER SUBSCRIBE BUTTON
   Shows a tick icon for 3 seconds on click,
   then reverts to the arrow icon.
════════════════════════════════════════ */
function subscribe(btn) {
  // Show success state
  btn.innerHTML = '<i class="fas fa-check"></i>';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

  // Reset after 3 seconds
  setTimeout(function () {
    btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
    btn.style.background = '';
  }, 3000);
}

/* ════════════════════════════════════════
   6. SKILL BARS — ANIMATE ON SCROLL
   Triggers the CSS width transition when
   the skills section enters the viewport.
════════════════════════════════════════ */
(function initSkillBars() {
  var skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  var animated = false; // only animate once

  var skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;

          // Briefly reset widths to 0, then restore to trigger transition
          var fills = entry.target.querySelectorAll('.skill-fill');
          fills.forEach(function (bar) {
            var targetWidth = bar.style.width; // e.g. "90%"
            bar.style.width = '0%';

            // Small delay so the browser registers the 0% before animating
            setTimeout(function () {
              bar.style.width = targetWidth;
            }, 100);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  skillObserver.observe(skillsSection);
})();

/* ════════════════════════════════════════
   7. NAVBAR — CLOSE MOBILE MENU ON LINK CLICK
   Collapses the Bootstrap navbar when a
   nav link is tapped on mobile.
════════════════════════════════════════ */
/* ════════════════════════════════════════
   7. NAVBAR — CLOSE MOBILE MENU ON LINK CLICK (Fixed)
   Collapses the Bootstrap navbar when a
   nav link is clicked on mobile, bypassing observer loops.
════════════════════════════════════════ */
(function initMobileNavClose() {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var navCollapse = document.getElementById('navMenu');
  var navToggler = document.querySelector('.navbar-toggler');

  // Fix 1: Stop event bubbling on the 3-line toggle button itself
  if (navToggler) {
    navToggler.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  navLinks.forEach(function (link) {
    // Fix 2: If it's a dropdown toggle link, do not force-close the whole menu
    if (link.classList.contains('dropdown-toggle')) return;

    link.addEventListener('click', function (e) {
      // Only collapse if the menu is currently open (mobile view)
      if (navCollapse && navCollapse.classList.contains('show')) {
        
        // Use Bootstrap's Collapse API if available
        if (window.bootstrap && window.bootstrap.Collapse) {
          var bsCollapse = window.bootstrap.Collapse.getInstance(navCollapse);
          if (!bsCollapse) {
            bsCollapse = new window.bootstrap.Collapse(navCollapse, { toggle: false });
          }
          bsCollapse.hide();
        } else {
          navCollapse.classList.remove('show');
        }
      }
    });
  });
})();


