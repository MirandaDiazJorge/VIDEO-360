/**
 * MIRANDA PRODUCCIONES — CINEMATIC INTERACTIVE ENGINE
 * Dossier 2027 · Cineasta & Videógrafo de Bodas
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. FILM CHAPTERS DATA (ORIGINAL WIX ASSETS & TEXTS)
     ========================================================================== */
  const FILMS_DATA = [
    {
      index: 0,
      id: 'casas',
      title: 'LAS CASAS',
      kicker: 'PREPARATIVOS DE LA BODA',
      category: 'casas',
      duration: '02:10',
      durationSec: 130,
      videoUrl: 'https://video.wixstatic.com/video/10ba9b_37bc23ac77bb49ff91ce38eda4fef747/1080p/mp4/file.mp4',
      poster: 'https://static.wixstatic.com/media/10ba9b_37bc23ac77bb49ff91ce38eda4fef747f000.jpg',
      description: 'Comenzamos con los preparativos de la boda en casa de los novios, donde se viven momentos de complicidad y nervios previos al gran momento. Es un tiempo de risas, miradas y detalles compartidos con los más allegados, capturando la expectación y el cariño que anticipan el gran día.'
    },
    {
      index: 1,
      id: 'ceremonia',
      title: 'EL SI QUIERO',
      kicker: 'CEREMONIA',
      category: 'ceremonia',
      duration: '02:46',
      durationSec: 166,
      videoUrl: 'https://video.wixstatic.com/video/10ba9b_84b58fa0dfce442297d0baee1b7d19eb/1080p/mp4/file.mp4',
      poster: 'https://static.wixstatic.com/media/10ba9b_84b58fa0dfce442297d0baee1b7d19ebf000.jpg',
      description: 'La ceremonia es el instante en el que dos personas se unen oficialmente, rodeadas de familiares y amigos que celebran su amor. Cada mirada, cada sonrisa y cada palabra compartida en este momento tan especial simbolizan el compromiso mutuo y el inicio de una nueva etapa.'
    },
    {
      index: 2,
      id: 'exteriores',
      title: 'RECIEN CASADOS',
      kicker: 'EXTERIORES',
      category: 'exteriores',
      duration: '01:40',
      durationSec: 100,
      videoUrl: 'https://video.wixstatic.com/video/10ba9b_c120559ca23749d78a496244905b2f2a/1080p/mp4/file.mp4',
      poster: 'https://static.wixstatic.com/media/10ba9b_c120559ca23749d78a496244905b2f2af000.jpg',
      description: 'Después de la ceremonia, los recién casados disfrutan de un momento íntimo y relajado durante la sesión de fotos. Es una oportunidad para compartir sonrisas, miradas y caricias, capturando su felicidad en un entorno más tranquilo y personal antes de reunirse con sus invitados.'
    },
    {
      index: 3,
      id: 'convite',
      title: 'LA CELEBRACIÓN',
      kicker: 'CONVITE DE BODAS',
      category: 'convite',
      duration: '01:15',
      durationSec: 75,
      videoUrl: 'https://video.wixstatic.com/video/10ba9b_2fa4d5bb6af84570adadb40c7d9be6dc/1080p/mp4/file.mp4',
      poster: 'https://static.wixstatic.com/media/10ba9b_2fa4d5bb6af84570adadb40c7d9be6dcf000.jpg',
      description: 'El convite de bodas es un momento lleno de alegría y emoción, donde los novios comparten con sus seres queridos un banquete memorable. Entre risas, brindis y música, se vive un ambiente festivo que celebra el amor y la unión, creando recuerdos inolvidables para todos los presentes.'
    },
    {
      index: 4,
      id: 'baile',
      title: 'BARRA LIBRE',
      kicker: 'EL BAILE',
      category: 'baile',
      duration: '03:01',
      durationSec: 181,
      videoUrl: 'https://video.wixstatic.com/video/10ba9b_05d428e4355a453eb9e6130b00682a2d/1080p/mp4/file.mp4',
      poster: 'https://static.wixstatic.com/media/10ba9b_05d428e4355a453eb9e6130b00682a2df000.jpg',
      description: 'La barra libre en las bodas es el momento más divertido y esperado de la noche. Entre cócteles, música y baile, los invitados se desinhiben y disfrutan sin límites. Es el espacio perfecto para celebrar el amor y la alegría, creando anécdotas y momentos inolvidables.'
    },
    {
      index: 5,
      id: 'drone',
      title: 'OTRA PERSPECTIVA',
      kicker: 'CINEMATOGRAFÍA AÉREA',
      category: 'drone',
      duration: '02:29',
      durationSec: 149,
      videoUrl: 'https://video.wixstatic.com/video/10ba9b_69352e5b57724fe0a24d5b1d2ba14b1f/1080p/mp4/file.mp4',
      poster: 'https://static.wixstatic.com/media/10ba9b_69352e5b57724fe0a24d5b1d2ba14b1ff000.jpg',
      description: 'Las imágenes aéreas con dron capturan momentos mágicos y paisajes impresionantes desde las alturas. Esta tecnología ofrece una perspectiva única, transformando lo ordinario en extraordinario y creando tomas visualmente impactantes.'
    }
  ];

  /* ==========================================================================
     2. GLOBAL ELEMENTS & STATE
     ========================================================================== */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const currentYearSpan = document.getElementById('currentYear');
  
  // Hero Elements
  const heroVideo = document.getElementById('heroVideo');
  const heroAudioToggle = document.getElementById('heroAudioToggle');
  const heroAudioLabel = document.getElementById('heroAudioLabel');
  const heroCinemaModalBtn = document.getElementById('heroCinemaModalBtn');

  // Cinema Lightbox Elements
  const cinemaModal = document.getElementById('cinemaModal');
  const cinemaBackdrop = document.getElementById('cinemaBackdrop');
  const cinemaCloseBtn = document.getElementById('cinemaCloseBtn');
  const cinemaVideo = document.getElementById('cinemaVideo');
  const cinemaCenterPlay = document.getElementById('cinemaCenterPlay');
  const cinemaCenterSvg = document.getElementById('cinemaCenterSvg');
  const cinemaChapterTitle = document.getElementById('cinemaChapterTitle');
  const cinemaDrawerTitle = document.getElementById('cinemaDrawerTitle');
  const cinemaDrawerText = document.getElementById('cinemaDrawerText');
  const cinemaChapterBadge = document.getElementById('cinemaChapterBadge');
  const cinemaPlayBtn = document.getElementById('cinemaPlayBtn');
  const playPauseSvg = document.getElementById('playPauseSvg');
  const cinemaMuteBtn = document.getElementById('cinemaMuteBtn');
  const cinemaVolume = document.getElementById('cinemaVolume');
  const cinemaCurTime = document.getElementById('cinemaCurTime');
  const cinemaDuration = document.getElementById('cinemaDuration');
  const cinemaScrubBar = document.getElementById('cinemaScrubBar');
  const cinemaProgressFilled = document.getElementById('cinemaProgressFilled');
  const cinemaScrubHandle = document.getElementById('cinemaScrubHandle');
  const cinemaFsBtn = document.getElementById('cinemaFsBtn');
  const cinemaPrevBtn = document.getElementById('cinemaPrevBtn');
  const cinemaNextBtn = document.getElementById('cinemaNextBtn');

  let currentFilmIndex = 0;
  let isScrubbing = false;

  /* ==========================================================================
     3. HEADER & MOBILE NAVIGATION
     ========================================================================== */
  function initHeader() {
    // Current year
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll state
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile nav toggle
    if (mobileToggle && mobileNav) {
      const toggleMenu = (open) => {
        const isCurrentlyOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        const nextState = typeof open === 'boolean' ? open : !isCurrentlyOpen;

        mobileToggle.setAttribute('aria-expanded', String(nextState));
        mobileNav.setAttribute('aria-hidden', String(!nextState));
        mobileNav.classList.toggle('is-open', nextState);
        document.body.style.overflow = nextState ? 'hidden' : '';
      };

      mobileToggle.addEventListener('click', () => toggleMenu());

      // Close on link click
      const mobileLinks = mobileNav.querySelectorAll('.mobile-link');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });
    }
  }

  /* ==========================================================================
     4. HERO VIDEO CONTROLS
     ========================================================================== */
  function initHeroVideo() {
    if (!heroVideo || !heroAudioToggle) return;

    heroAudioToggle.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      const isMuted = heroVideo.muted;

      if (isMuted) {
        heroAudioToggle.classList.remove('is-active');
        heroAudioLabel.textContent = 'Activar Sonido';
      } else {
        heroAudioToggle.classList.add('is-active');
        heroAudioLabel.textContent = 'Silenciar Audio';
        heroVideo.volume = 0.85;
      }
    });

    if (heroCinemaModalBtn) {
      heroCinemaModalBtn.addEventListener('click', () => {
        openCinemaModal(0);
      });
    }
  }

  /* ==========================================================================
     5. PORTFOLIO FILTERING
     ========================================================================== */
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filmCards = document.querySelectorAll('.film-card');

    if (!filterBtns.length || !filmCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        filmCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ==========================================================================
     6. CINEMA LIGHTBOX MODAL PLAYER
     ========================================================================== */
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function loadFilmIntoCinema(index) {
    if (index < 0 || index >= FILMS_DATA.length) return;
    currentFilmIndex = index;
    const film = FILMS_DATA[index];

    // Update Metadata
    cinemaChapterTitle.textContent = film.title;
    cinemaDrawerTitle.textContent = `${film.kicker} — ${film.title}`;
    cinemaDrawerText.textContent = film.description;
    cinemaChapterBadge.textContent = `CAPÍTULO 0${index + 1} DE 0${FILMS_DATA.length}`;
    cinemaDuration.textContent = film.duration;

    // Load Video
    cinemaVideo.pause();
    cinemaVideo.src = film.videoUrl;
    cinemaVideo.poster = film.poster;
    cinemaVideo.load();

    // Reset Scrub bar
    cinemaProgressFilled.style.width = '0%';
    cinemaScrubHandle.style.left = '0%';
    cinemaCurTime.textContent = '00:00';

    // Show center play button
    updatePlayPauseState(false);

    // Play video automatically in modal
    const playPromise = cinemaVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updatePlayPauseState(true);
        })
        .catch(() => {
          updatePlayPauseState(false);
        });
    }
  }

  function updatePlayPauseState(isPlaying) {
    if (isPlaying) {
      cinemaCenterPlay.classList.add('is-playing');
      playPauseSvg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    } else {
      cinemaCenterPlay.classList.remove('is-playing');
      playPauseSvg.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
  }

  function toggleCinemaPlay() {
    if (cinemaVideo.paused || cinemaVideo.ended) {
      cinemaVideo.play();
      updatePlayPauseState(true);
    } else {
      cinemaVideo.pause();
      updatePlayPauseState(false);
    }
  }

  function openCinemaModal(index) {
    if (!cinemaModal) return;
    loadFilmIntoCinema(index);
    cinemaModal.classList.add('is-open');
    cinemaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Mute hero video while modal is active
    if (heroVideo && !heroVideo.paused) {
      heroVideo.pause();
    }
  }

  function closeCinemaModal() {
    if (!cinemaModal) return;
    cinemaVideo.pause();
    cinemaModal.classList.remove('is-open');
    cinemaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Resume hero video background
    if (heroVideo) {
      heroVideo.play().catch(() => {});
    }
  }

  function initCinemaPlayer() {
    if (!cinemaModal) return;

    // Open from card triggers
    document.querySelectorAll('.film-card').forEach((card) => {
      const idx = parseInt(card.getAttribute('data-film-index'), 10);
      const playBtn = card.querySelector('.btn-play-film');
      const textBtn = card.querySelector('.open-cinema-trigger');
      const poster = card.querySelector('.card-poster');

      [playBtn, textBtn, poster].forEach((el) => {
        if (el) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            openCinemaModal(idx);
          });
        }
      });
    });

    // Open from footer chapter triggers
    document.querySelectorAll('.open-cinema-index').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(link.getAttribute('data-index'), 10);
        openCinemaModal(idx);
      });
    });

    // Close button & backdrop
    if (cinemaCloseBtn) cinemaCloseBtn.addEventListener('click', closeCinemaModal);
    if (cinemaBackdrop) cinemaBackdrop.addEventListener('click', closeCinemaModal);

    // Center & Bottom Play/Pause
    if (cinemaCenterPlay) cinemaCenterPlay.addEventListener('click', toggleCinemaPlay);
    if (cinemaPlayBtn) cinemaPlayBtn.addEventListener('click', toggleCinemaPlay);
    if (cinemaVideo) {
      cinemaVideo.addEventListener('click', toggleCinemaPlay);
      cinemaVideo.addEventListener('play', () => updatePlayPauseState(true));
      cinemaVideo.addEventListener('pause', () => updatePlayPauseState(false));
    }

    // Time update & Scrub progress
    cinemaVideo.addEventListener('timeupdate', () => {
      if (!isScrubbing && cinemaVideo.duration) {
        const percent = (cinemaVideo.currentTime / cinemaVideo.duration) * 100;
        cinemaProgressFilled.style.width = `${percent}%`;
        cinemaScrubHandle.style.left = `${percent}%`;
        cinemaCurTime.textContent = formatTime(cinemaVideo.currentTime);
      }
    });

    cinemaVideo.addEventListener('loadedmetadata', () => {
      cinemaDuration.textContent = formatTime(cinemaVideo.duration);
    });

    // Scrub bar click & drag
    const seekVideo = (e) => {
      const rect = cinemaScrubBar.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      cinemaProgressFilled.style.width = `${pos * 100}%`;
      cinemaScrubHandle.style.left = `${pos * 100}%`;
      if (cinemaVideo.duration) {
        cinemaVideo.currentTime = pos * cinemaVideo.duration;
        cinemaCurTime.textContent = formatTime(cinemaVideo.currentTime);
      }
    };

    if (cinemaScrubBar) {
      cinemaScrubBar.addEventListener('mousedown', (e) => {
        isScrubbing = true;
        seekVideo(e);
      });

      window.addEventListener('mousemove', (e) => {
        if (isScrubbing) seekVideo(e);
      });

      window.addEventListener('mouseup', () => {
        isScrubbing = false;
      });
    }

    // Volume & Mute
    if (cinemaMuteBtn && cinemaVolume) {
      cinemaMuteBtn.addEventListener('click', () => {
        cinemaVideo.muted = !cinemaVideo.muted;
        if (cinemaVideo.muted) {
          cinemaVolume.value = 0;
          cinemaMuteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
        } else {
          cinemaVideo.volume = 1;
          cinemaVolume.value = 1;
          cinemaMuteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
        }
      });

      cinemaVolume.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        cinemaVideo.volume = val;
        cinemaVideo.muted = val === 0;
      });
    }

    // Fullscreen Toggle
    if (cinemaFsBtn) {
      cinemaFsBtn.addEventListener('click', () => {
        const vp = document.querySelector('.cinema-viewport');
        if (!document.fullscreenElement) {
          if (vp.requestFullscreen) vp.requestFullscreen();
          else if (vp.webkitRequestFullscreen) vp.webkitRequestFullscreen();
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    // Next / Previous Chapter Navigation
    if (cinemaPrevBtn) {
      cinemaPrevBtn.addEventListener('click', () => {
        const prevIdx = (currentFilmIndex - 1 + FILMS_DATA.length) % FILMS_DATA.length;
        loadFilmIntoCinema(prevIdx);
      });
    }

    if (cinemaNextBtn) {
      cinemaNextBtn.addEventListener('click', () => {
        const nextIdx = (currentFilmIndex + 1) % FILMS_DATA.length;
        loadFilmIntoCinema(nextIdx);
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (!cinemaModal.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeCinemaModal();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleCinemaPlay();
      } else if (e.key === 'ArrowRight') {
        cinemaVideo.currentTime = Math.min(cinemaVideo.duration, cinemaVideo.currentTime + 5);
      } else if (e.key === 'ArrowLeft') {
        cinemaVideo.currentTime = Math.max(0, cinemaVideo.currentTime - 5);
      }
    });
  }

  /* ==========================================================================
     7. INTERACTIVE BUDGET CALCULATOR
     ========================================================================== */
  function initCalculator() {
    const calcBoda = document.getElementById('calcBoda');
    const calcVr360 = document.getElementById('calcVr360');
    const calcDrone = document.getElementById('calcDrone');
    const calcLunaMiel = document.getElementById('calcLunaMiel');
    const calcPreboda = document.getElementById('calcPreboda');
    const calcPostboda = document.getElementById('calcPostboda');
    const kmSlider = document.getElementById('kmSlider');
    const kmValue = document.getElementById('kmValue');
    const kmExtraCostDisplay = document.getElementById('kmExtraCostDisplay');
    const calcTotalDisplay = document.getElementById('calcTotalDisplay');
    const calcBreakdownList = document.getElementById('calcBreakdownList');
    const btnApplyToForm = document.getElementById('btnApplyToForm');
    const btnSendCalcWhatsApp = document.getElementById('btnSendCalcWhatsApp');

    if (!calcTotalDisplay) return;

    function recalculate() {
      let total = 1700; // Base package
      const breakdown = [{ name: 'Boda Completa (Base)', price: 1700 }];

      // Complemento Exclusivo 360 VR (Precio editable: 300 €)
      if (calcVr360 && calcVr360.checked) {
        total += 300;
        breakdown.push({ name: 'Experiencia Inmersiva 360° VR (2 Gafas VR inc.)', price: 300 });
      }

      if (calcDrone && calcDrone.checked) {
        total += 200;
        breakdown.push({ name: 'Filmaciones Aéreas con Dron', price: 200 });
      }

      if (calcLunaMiel && calcLunaMiel.checked) {
        total += 400;
        breakdown.push({ name: 'Vídeo Luna de Miel (Kit GoPro)', price: 400 });
      }

      if (calcPreboda && calcPreboda.checked) {
        total += 350;
        breakdown.push({ name: 'Sesión Preboda', price: 350 });
      }

      if (calcPostboda && calcPostboda.checked) {
        total += 350;
        breakdown.push({ name: 'Sesión Postboda', price: 350 });
      }

      const extraKm = kmSlider ? parseInt(kmSlider.value, 10) : 0;
      if (kmValue) kmValue.textContent = extraKm;

      if (extraKm > 0) {
        const kmCost = Math.round(extraKm * 0.3 * 100) / 100;
        total += kmCost;
        if (kmExtraCostDisplay) kmExtraCostDisplay.textContent = `+${kmCost.toFixed(2)} €`;
        breakdown.push({ name: `Desplazamiento extra (${extraKm} km)`, price: kmCost });
      } else {
        if (kmExtraCostDisplay) kmExtraCostDisplay.textContent = '0 €';
      }

      // Update Total Display with formatting
      calcTotalDisplay.textContent = total.toLocaleString('es-ES', {
        minimumFractionDigits: total % 1 !== 0 ? 2 : 0,
        maximumFractionDigits: 2
      });

      // Update Breakdown List
      if (calcBreakdownList) {
        calcBreakdownList.innerHTML = breakdown
          .map(
            (item) =>
              `<div class="breakdown-item"><span>${item.name}</span><span>${item.price} €</span></div>`
          )
          .join('');
      }

      return { total, breakdown, extraKm };
    }

    [calcVr360, calcDrone, calcLunaMiel, calcPreboda, calcPostboda].forEach((cb) => {
      if (cb) cb.addEventListener('change', recalculate);
    });

    if (kmSlider) {
      kmSlider.addEventListener('input', recalculate);
    }

    // Apply to Contact Form
    if (btnApplyToForm) {
      btnApplyToForm.addEventListener('click', () => {
        const { total, breakdown, extraKm } = recalculate();
        const asuntoInput = document.getElementById('asunto');
        const mensajeInput = document.getElementById('mensaje');

        if (asuntoInput) {
          asuntoInput.value = `Presupuesto Boda Personalizado (${total} €)`;
        }

        if (mensajeInput) {
          const breakdownText = breakdown.map((b) => `• ${b.name}: ${b.price} €`).join('\n');
          mensajeInput.value = `Hola Jorge, nos gustaría consultar disponibilidad para nuestro reportaje de boda con la siguiente configuración:\n\n${breakdownText}\n\nPresupuesto Estimado: ${total} €\n\nQuedamos a la espera de conocernos y comentar los detalles.`;
        }

        // Smooth scroll to form
        const contactoSection = document.getElementById('contacto');
        if (contactoSection) {
          contactoSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Send via WhatsApp
    if (btnSendCalcWhatsApp) {
      btnSendCalcWhatsApp.addEventListener('click', () => {
        const { total, breakdown } = recalculate();
        const itemsList = breakdown.map((b) => `· ${b.name} (${b.price}€)`).join('%0A');
        const text = `Hola Jorge, he configurado un presupuesto en vuestra web:%0A%0A${itemsList}%0A%0A*Total Estimado:* ${total} €%0A%0A¿Podrías decirnos si tienes disponibilidad?`;
        window.open(`https://wa.me/34696477074?text=${text}`, '_blank');
      });
    }

    recalculate();
  }

  /* ==========================================================================
     8. FAQ ACCORDION
     ========================================================================== */
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');

      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all items
        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherPanel = other.querySelector('.faq-panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.style.maxHeight = null;
        });

        // Open current if was closed
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = `${panel.scrollHeight + 30}px`;
        }
      });
    });
  }

  /* ==========================================================================
     9. CONTACT FORM & WHATSAPP GENERATION
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedbackBox = document.getElementById('formFeedback');
    const btnFormWhatsApp = document.getElementById('btnFormWhatsApp');

    if (!form) return;

    // Direct WhatsApp send button from form values
    if (btnFormWhatsApp) {
      btnFormWhatsApp.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const fecha = document.getElementById('fecha').value.trim();
        const lugar = document.getElementById('lugar').value.trim();
        const asunto = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        let msg = `Hola Jorge, nos gustaría consultar disponibilidad para nuestra boda:%0A`;
        if (nombre) msg += `*Nombre:* ${encodeURIComponent(nombre)}%0A`;
        if (telefono) msg += `*Teléfono:* ${encodeURIComponent(telefono)}%0A`;
        if (email) msg += `*Email:* ${encodeURIComponent(email)}%0A`;
        if (fecha) msg += `*Fecha boda:* ${encodeURIComponent(fecha)}%0A`;
        if (lugar) msg += `*Lugar:* ${encodeURIComponent(lugar)}%0A`;
        if (asunto) msg += `*Asunto:* ${encodeURIComponent(asunto)}%0A`;
        if (mensaje) msg += `%0A*Mensaje:* ${encodeURIComponent(mensaje)}%0A`;

        window.open(`https://wa.me/34696477074?text=${msg}`, '_blank');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const telefono = document.getElementById('telefono');
      const asunto = document.getElementById('asunto');
      const mensaje = document.getElementById('mensaje');

      // Clear previous error messages
      document.querySelectorAll('.field-error').forEach((el) => {
        el.textContent = '';
        el.classList.remove('active');
      });

      let hasError = false;

      if (!nombre.value.trim()) {
        const err = document.getElementById('nombreError');
        if (err) {
          err.textContent = 'Por favor, indícanos vuestro nombre.';
          err.classList.add('active');
        }
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        const err = document.getElementById('emailError');
        if (err) {
          err.textContent = 'Por favor, introduce un correo electrónico válido.';
          err.classList.add('active');
        }
        hasError = true;
      }

      if (!telefono.value.trim()) {
        const err = document.getElementById('telefonoError');
        if (err) {
          err.textContent = 'Por favor, indícanos un número de contacto.';
          err.classList.add('active');
        }
        hasError = true;
      }

      if (!asunto.value.trim()) {
        const err = document.getElementById('asuntoError');
        if (err) {
          err.textContent = 'Por favor, escribe un asunto breve.';
          err.classList.add('active');
        }
        hasError = true;
      }

      if (!mensaje.value.trim()) {
        const err = document.getElementById('mensajeError');
        if (err) {
          err.textContent = 'Por favor, déjanos tu mensaje o consulta.';
          err.classList.add('active');
        }
        hasError = true;
      }

      if (hasError) return;

      // Submit feedback simulation / Formspree ready
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Enviando...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Enviar Mensaje';

        if (feedbackBox) {
          feedbackBox.hidden = false;
          feedbackBox.className = 'form-feedback-box success';
          feedbackBox.innerHTML = `
            <strong>¡Mensaje recibido con éxito!</strong><br>
            Muchas gracias, ${nombre.value.trim()}. Nos pondremos en contacto con vosotros lo antes posible.<br>
            Si lo preferís, también podéis escribirnos directamente por WhatsApp pulsando el botón verde.
          `;
        }

        form.reset();
      }, 700);
    });
  }

  /* ==========================================================================
     10. SERVICE & VR ADDON SELECTION TRIGGERS
     ========================================================================== */
  function initServiceSelectionTriggers() {
    // 360 VR Buttons ("QUIERO REVIVIR MI BODA EN 360°" & "DESCUBRIR LA EXPERIENCIA")
    document.querySelectorAll('.btn-select-vr, .btn-discover-vr').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const asuntoInput = document.getElementById('asunto');
        const mensajeInput = document.getElementById('mensaje');
        const nombreInput = document.getElementById('nombre');

        if (asuntoInput) {
          asuntoInput.value = 'Consulta Experiencia Inmersiva 360° VR';
        }

        if (mensajeInput) {
          mensajeInput.value = 'Hola Jorge, nos gustaría consultar disponibilidad para nuestra boda y solicitar información sobre el complemento exclusivo EXPERIENCIA INMERSIVA 360° VR (con las 2 gafas VR incluidas para smartphone, «No vuelvas a ver tu boda. Vuelve a estar allí»). Quisiéramos saber cómo podemos incluir la grabación 360° de los momentos más especiales.';
        }

        const contactoSection = document.getElementById('contacto');
        if (contactoSection) {
          contactoSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (nombreInput) nombreInput.focus();
          }, 600);
        }
      });
    });

    // Boda Completa Direct Select
    document.querySelectorAll('[data-select-package]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const pkg = btn.getAttribute('data-select-package');
        const asuntoInput = document.getElementById('asunto');
        if (asuntoInput && pkg) {
          asuntoInput.value = `Contratación ${pkg} (1.700 €)`;
        }
      });
    });
  }

  /* ==========================================================================
     11. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  /* ==========================================================================
     12. CHAPTER SELECTOR BUTTONS — abren cinema modal directamente
     ========================================================================== */
  function initChapterSelector() {
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    chapterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-film-index'), 10);
        if (!isNaN(idx)) {
          openCinemaModal(idx);
        }
      });
    });
  }

  /* ==========================================================================
     13. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroVideo();
    initPortfolioFilters();
    initCinemaPlayer();
    initChapterSelector();
    initCalculator();
    initServiceSelectionTriggers();
    initFAQ();
    initContactForm();
    initScrollReveal();
  });
})();
