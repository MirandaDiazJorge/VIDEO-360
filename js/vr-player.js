/**
 * REPRODUCTOR ESFÉRICO 360° PARA VÍDEO INSTA360 CON GIROSCOPIO MÓVIL Y RATÓN/TOUCH
 * Miranda Producciones - Experiencia Inmersiva 360° VR
 * 
 * Implementa rotación por cuaterniones (Three.js DeviceOrientationControls)
 * para eliminar saltos gimbal lock (incluso al mirar al cenit o al suelo),
 * y permite activar/desactivar el giroscopio de manera limpia.
 */

(function () {
  'use strict';

  var wrapper = document.getElementById('vrPlayerWrapper');
  var container = document.getElementById('vrPlayerContainer');
  var video = document.getElementById('vrVideoElement');
  if (!container || !video) return;

  var scene, camera, renderer, sphere;
  var isUserInteracting = false;
  var onPointerDownMouseX = 0, onPointerDownMouseY = 0;
  
  // Posición inicial de visualización
  var initialLon = 0;
  var initialLat = 0;

  var lon = initialLon, onPointerDownLon = 0;
  var lat = initialLat, onPointerDownLat = 0;
  var phi = 0, theta = 0;
  var distance = 500;

  // Variables para giroscopio y cuaterniones
  var deviceOrientation = {};
  var useOrientation = false;
  var orientationListenerActive = false;
  var screenOrientation = 0;

  // Objetos Three.js para cálculo matemático por cuaterniones (evita saltos al mirar hacia arriba/abajo)
  var zee = new THREE.Vector3(0, 0, 1);
  var up = new THREE.Vector3(0, 1, 0);
  var v0 = new THREE.Vector3();
  var euler = new THREE.Euler();
  var q0 = new THREE.Quaternion();
  var q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 alrededor de X
  var initialAlpha = null;

  // Elementos de UI
  var btnPlay = document.getElementById('vrCustomPlayBtn');
  var playOverlay = document.getElementById('vrPlayOverlay');
  var btnGyro = document.getElementById('vrGyroToggleBtn');
  var btnFullscreen = document.getElementById('vrFullscreenBtn');
  var btnMute = document.getElementById('vrMuteBtn');
  var statusBadge = document.getElementById('vrSensorStatus');

  function initThree() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      1100
    );
    camera.target = new THREE.Vector3(0, 0, 0);

    // Esfera invertida para reproducir el vídeo en su interior
    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;

    var material = new THREE.MeshBasicMaterial({ map: texture });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Eventos de ratón y táctiles
    container.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onDocumentMouseWheel, { passive: true });

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', onScreenOrientationChange);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    onScreenOrientationChange();
    animate();
  }

  function onScreenOrientationChange() {
    screenOrientation = window.orientation || 0;
  }

  function onWindowResize() {
    if (!renderer || !camera) return;
    var w = (wrapper && wrapper.classList.contains('vr-pseudo-fullscreen')) ? window.innerWidth : container.clientWidth;
    var h = (wrapper && wrapper.classList.contains('vr-pseudo-fullscreen')) ? window.innerHeight : container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function onFullscreenChange() {
    setTimeout(onWindowResize, 150);
  }

  function onPointerDown(event) {
    if (event.isPrimary === false) return;
    isUserInteracting = true;
    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }

  function onPointerMove(event) {
    if (event.isPrimary === false) return;
    if (isUserInteracting === true) {
      lon = (onPointerDownMouseX - event.clientX) * 0.18 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.18 + onPointerDownLat;
    }
  }

  function onPointerUp(event) {
    if (event.isPrimary === false) return;
    isUserInteracting = false;
  }

  function onDocumentMouseWheel(event) {
    var fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp(fov, 35, 95);
    camera.updateProjectionMatrix();
  }

  // --- CONTROL DE GIROSCOPIO / SENSORES CON CUATERNIONES (SIN SALTOS) ---

  function onDeviceOrientation(event) {
    if (event.alpha === null && event.beta === null && event.gamma === null) return;
    deviceOrientation = event;

    // Calibrar la primera lectura del rumbo (alpha)
    if (initialAlpha === null && event.alpha !== null) {
      initialAlpha = event.alpha;
    }
  }

  function activateGyroscope() {
    useOrientation = true;
    initialAlpha = null; // Reiniciar calibración para tomar el ángulo actual del usuario

    if (!orientationListenerActive) {
      window.addEventListener('deviceorientation', onDeviceOrientation, true);
      orientationListenerActive = true;
    }

    if (btnGyro) {
      btnGyro.classList.add('active');
      btnGyro.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg><span>Giroscopio: ACTIVO</span>';
    }
    if (statusBadge) statusBadge.textContent = 'Giroscopio Activo';
  }

  function deactivateGyroscope() {
    useOrientation = false;
    deviceOrientation = {};
    initialAlpha = null;

    if (orientationListenerActive) {
      window.removeEventListener('deviceorientation', onDeviceOrientation, true);
      orientationListenerActive = false;
    }

    if (btnGyro) {
      btnGyro.classList.remove('active');
      btnGyro.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg><span>Giroscopio Móvil</span>';
    }
    if (statusBadge) statusBadge.textContent = 'Modo Táctil / Arrastre';

    // Restablecer la cámara para que quede mirando en la dirección actual
    camera.rotation.set(0, 0, 0);
  }

  function toggleGyroscope() {
    // Si ya está activo, se desactiva limpiamente
    if (useOrientation) {
      deactivateGyroscope();
      return;
    }

    // Si está desactivado, se activa solicitando permiso si es necesario
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ (iPhone / iPad)
      DeviceOrientationEvent.requestPermission()
        .then(function (permissionState) {
          if (permissionState === 'granted') {
            activateGyroscope();
          } else {
            alert('Permiso de giroscopio no concedido. Puedes rotar el vídeo arrastrando con el dedo.');
          }
        })
        .catch(function (err) {
          console.warn('Error al solicitar permiso en iOS:', err);
          if (location.protocol !== 'https:') {
            alert('Para activar el giroscopio, debes acceder mediante HTTPS seguro: https://192.168.1.155:8443');
          }
        });
    } else if ('ondeviceorientation' in window || window.DeviceOrientationEvent) {
      // Android / navegadores estándar
      activateGyroscope();
    } else {
      if (location.protocol !== 'https:') {
        alert('Los sensores de giroscopio requieren entrar por HTTPS seguro (https://192.168.1.155:8443).');
      } else {
        alert('Este dispositivo no dispone de sensores de giroscopio.');
      }
    }
  }

  // --- CÁLCULO MATEMÁTICO POR CUATERNIONES (ESTABILIDAD TOTAL AL MIRAR AL CIELO/SUELO) ---
  function setObjectQuaternion(quaternion, alpha, beta, gamma, orient) {
    euler.set(beta, alpha, -gamma, 'YXZ');
    quaternion.setFromEuler(euler);
    quaternion.multiply(q1); // Corrige la orientación de la cámara para que mire hacia adelante
    quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // Corrige rotación de pantalla portrait/landscape
  }

  // Actualización de cámara
  function update() {
    if (useOrientation && deviceOrientation.beta !== undefined && deviceOrientation.beta !== null) {
      var rawAlpha = deviceOrientation.alpha || 0;
      var rawBeta = deviceOrientation.beta || 0;
      var rawGamma = deviceOrientation.gamma || 0;

      // Compensar el rumbo para iniciar en la dirección donde sostenemos el teléfono
      var relAlpha = (initialAlpha !== null) ? (rawAlpha - initialAlpha) : rawAlpha;

      var alpha = THREE.MathUtils.degToRad(relAlpha);
      var beta = THREE.MathUtils.degToRad(rawBeta);
      var gamma = THREE.MathUtils.degToRad(rawGamma);
      var orient = THREE.MathUtils.degToRad(screenOrientation);

      // Usar cuaterniones DeviceOrientationControls para evitar los saltos por gimbal lock
      setObjectQuaternion(camera.quaternion, alpha, beta, gamma, orient);

      // Si además el usuario arrastra con el dedo en pantalla
      if (lon !== initialLon) {
        camera.rotateY(THREE.MathUtils.degToRad(lon - initialLon));
      }
    } else {
      // Modo táctil / ratón clásico mirando hacia el frente
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      camera.target.x = distance * Math.sin(phi) * Math.cos(theta);
      camera.target.y = distance * Math.cos(phi);
      camera.target.z = distance * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(camera.target);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
  }

  // --- BOTONES Y CONTROLES ---

  function togglePlay() {
    if (video.paused) {
      video.play().then(function () {
        if (playOverlay) playOverlay.classList.add('playing');
        if (btnPlay) {
          btnPlay.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>Pausa</span>';
        }
      }).catch(function (err) {
        console.warn('Reproducción bloqueada por navegador:', err);
      });
    } else {
      video.pause();
      if (playOverlay) playOverlay.classList.remove('playing');
      if (btnPlay) {
        btnPlay.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg><span>Reproducir</span>';
      }
    }
  }

  if (btnPlay) btnPlay.addEventListener('click', togglePlay);
  if (playOverlay) {
    playOverlay.addEventListener('click', function (e) {
      if (e.target.closest('.vr-player-bar')) return;
      togglePlay();
    });
  }

  // Activar / Desactivar Giroscopio con un solo clic alternable
  if (btnGyro) {
    btnGyro.addEventListener('click', function () {
      toggleGyroscope();
    });
  }

  if (btnMute) {
    btnMute.addEventListener('click', function () {
      video.muted = !video.muted;
      if (video.muted) {
        btnMute.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
      } else {
        btnMute.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
      }
    });
  }

  // --- PANTALLA COMPLETA ROBUSTA ---
  var originalParent = null;
  var placeholderElement = null;

  function toggleFullscreen() {
    var target = wrapper || container;
    var isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;

    if (!isFullscreen && !target.classList.contains('vr-pseudo-fullscreen')) {
      if (target.requestFullscreen) {
        target.requestFullscreen().catch(fallbackFullscreen);
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
      } else {
        fallbackFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      fallbackExitFullscreen();
    }
  }

  function fallbackFullscreen() {
    if (wrapper) {
      if (!originalParent) {
        originalParent = wrapper.parentNode;
        placeholderElement = document.createElement('div');
        placeholderElement.id = 'vrPlaceholder';
        placeholderElement.style.display = 'none';
        originalParent.insertBefore(placeholderElement, wrapper);
      }

      document.body.appendChild(wrapper);
      wrapper.classList.add('vr-pseudo-fullscreen');
      document.body.classList.add('vr-locked-scroll');

      if (btnFullscreen) {
        btnFullscreen.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg><span>Salir</span>';
      }
      setTimeout(onWindowResize, 50);
    }
  }

  function fallbackExitFullscreen() {
    if (wrapper && originalParent && placeholderElement) {
      wrapper.classList.remove('vr-pseudo-fullscreen');
      document.body.classList.remove('vr-locked-scroll');

      originalParent.insertBefore(wrapper, placeholderElement);
      placeholderElement.remove();
      placeholderElement = null;
      originalParent = null;

      if (btnFullscreen) {
        btnFullscreen.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><span>Pantalla Completa</span>';
      }
      setTimeout(onWindowResize, 50);
    }
  }

  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  if (window.THREE) {
    initThree();
  } else {
    window.addEventListener('load', function () {
      if (window.THREE) initThree();
    });
  }
})();
