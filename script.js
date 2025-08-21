// Note: Search functionality now uses native Tistory search variables
// [##_search_name_##] and [##_search_onclick_submit_##]

document.addEventListener("DOMContentLoaded", function () {
  // 카테고리 글 개수 괄호 제거
  document.querySelectorAll('.category-tree .c_cnt').forEach(function(cnt) {
    let text = cnt.textContent;
    cnt.textContent = text.replace(/[()]/g, '');
  });
  
  // 빈 사이드바 섹션 숨기기
  document.querySelectorAll('.sidebar-section').forEach(function(section) {
    const links = section.querySelector('.sidebar-links');
    if (links) {
      const hasContent = links.querySelectorAll('li').length > 0;
      if (!hasContent) {
        section.style.display = 'none';
      }
    }
  });

  // Build carousel from post data for homepage
  const carousel = document.querySelector(".hero-carousel");
  const isHomePage = document.body.id === "tt-body-index";

  if (carousel && isHomePage) {
    // Show carousel on homepage
    carousel.style.display = "block";

    const track = carousel.querySelector(".carousel-track");
    const postCards = document.querySelectorAll(".post-card");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");

    // Create carousel slides from first 5 posts
    if (postCards.length > 0 && track) {
      const maxSlides = Math.min(postCards.length, 5);

      // Build carousel slides from post data
      for (let i = 0; i < maxSlides; i++) {
        const card = postCards[i];
        function getBgImageUrl(el) {
          if (!el) return "";
          // 1) 인라인 style 우선
          const inline = el.getAttribute("style") || "";
          let m = inline.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
          if (m && m[1]) return m[1];

          // 2) 인라인이 없으면 computed style
          const bg = window.getComputedStyle(el).backgroundImage; // ex) url("https://...")
          m = bg && bg.match(/url\(["']?(.*?)["']?\)/i);
          return (m && m[1]) || "";
        }

        const thumbEl = card.querySelector(".post-thumbnail-bg");
        let thumbnail = getBgImageUrl(thumbEl);

        // 3) 마지막 폴백: 내부 <img>가 있다면 사용
        if (!thumbnail) {
          const img = card.querySelector("img");
          if (img?.src) thumbnail = img.src;
        }

        // Get title text directly from the card
        const titleElement =
          card.querySelector(".title-text") ||
          card.querySelector(".post-card-title");
        const rawTitle = titleElement?.textContent || "";
        const title = rawTitle
          .replace(/<[^>]*>/g, "")
          .replace(/&lt;.*?&gt;/g, "")
          .replace(/&gt;.*$/g, "")
          .trim();
        const summary =
          (card.querySelector(".post-card-excerpt")?.textContent || "")
          .substring(0, 100) + (card.querySelector(".post-card-excerpt")?.textContent?.length > 100 ? "..." : "");
        const link =
          card.dataset.link ||
          card.querySelector(".post-card-link")?.href ||
          "#";

        const slideHTML = `
                  <article class="carousel-slide">
                    ${
                      thumbnail
                        ? `<div class="slide-background" style="background-image: url('${thumbnail}')"></div>`
                        : `<div class="slide-background default-bg"></div>`
                    }
                    <div class="slide-overlay"></div>
                    <div class="slide-content">
                      <div class="slide-number">2025</div>
                      <h2 class="slide-title">${title}</h2>
                      <p class="slide-excerpt">${summary}</p>
                      <a href="${link}" class="slide-link">자세히보기</a>
                    </div>
                  </article>
                `;

        track.insertAdjacentHTML("beforeend", slideHTML);
      }

      const slides = track.querySelectorAll(".carousel-slide");
      const prevBtn = carousel.querySelector(".carousel-prev");
      const nextBtn = carousel.querySelector(".carousel-next");

      let currentIndex = 0;
      const slideCount = slides.length;

      // Create indicators with dots
      for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement("button");
        indicator.classList.add("carousel-indicator");
        indicator.setAttribute("aria-label", `슬라이드 ${i + 1}`);
        if (i === 0) indicator.classList.add("active");

        indicator.addEventListener("click", () => {
          goToSlide(i);
        });

        indicatorsContainer.appendChild(indicator);
      }

      const indicators = carousel.querySelectorAll(".carousel-indicator");

      // Hide extra slides if more than 5
      for (let i = 5; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      // Update carousel position
      function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle("active", index === currentIndex);
        });
      }

      // Go to specific slide
      function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
      }

      // Next slide
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
      }

      // Previous slide
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
      }

      // Event listeners
      if (nextBtn) nextBtn.addEventListener("click", nextSlide);
      if (prevBtn) prevBtn.addEventListener("click", prevSlide);

      // Auto-play carousel
      let autoPlayInterval = setInterval(nextSlide, 5000);

      // Pause on hover
      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoPlayInterval);
      });

      carousel.addEventListener("mouseleave", () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
      });

      // Touch/Swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      carousel.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
          nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
          prevSlide();
        }
      }

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      });
    }
  }

  // Mobile Menu (Sidebar) Toggle - Support multiple menu toggles
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const sidebarClose = document.querySelector(".sidebar-close");

  function openSidebar() {
    sidebar.classList.add("active");
    if (sidebarOverlay) {
      sidebarOverlay.classList.add("active");
    }
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove("active");
    }
    document.body.style.overflow = "";
  }

  // Add event listener to all menu toggles
  menuToggles.forEach(toggle => {
    if (toggle && sidebar) {
      toggle.addEventListener("click", openSidebar);
    }
  });

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // Search Modal Toggle - Support multiple search toggles
  const searchToggles = document.querySelectorAll(".search-toggle");
  const searchModal = document.querySelector(".search-modal");
  const searchClose = document.querySelector(".search-close");

  // Add event listener to all search toggles
  searchToggles.forEach(toggle => {
    if (toggle && searchModal) {
      toggle.addEventListener("click", () => {
        searchModal.classList.add("active");
        document.body.style.overflow = "hidden";

        // Focus on search input when opened
        const searchInput = searchModal.querySelector('input[type="text"]');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 100);
        }
      });
    }
  });

  if (searchClose) {
    searchClose.addEventListener("click", () => {
      searchModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchModal.classList.contains("active")) {
      searchModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Subscribe Buttons (only floating button now)
  const subscribeBtns = document.querySelectorAll(
    ".subscribe-floating"
  );
  subscribeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Tistory subscription logic
      if (window.T && window.T.Blog) {
        // Try to subscribe using Tistory's API
        alert("구독 기능이 활성화됩니다!");
      } else {
        alert("블로그를 구독해주셔서 감사합니다!");
      }
    });
  });

  // Fix post card data attributes breaking layout and format dates
  document.querySelectorAll(".post-card").forEach((card) => {
    // Remove any inline styles that might be breaking the layout
    if (card.hasAttribute("style")) {
      card.removeAttribute("style");
    }
    // Ensure the card doesn't have broken data-link attribute
    const dataLink = card.getAttribute("data-link");
    if (dataLink && dataLink.includes(">")) {
      card.setAttribute("data-link", dataLink.split(">")[0]);
    }

    // Format date to YYYY-MM-DD HH:MM:SS
    const dateElement = card.querySelector(".post-date");
    if (dateElement) {
      const dateText = dateElement.textContent.trim();
      // Check if it's just time (HH:MM:SS format)
      if (dateText.match(/^\d{2}:\d{2}:\d{2}$/)) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        dateElement.textContent = `${year}-${month}-${day} ${dateText}`;
      }
    }
  });

  // View Toggle Functionality - 모든 페이지에서 동작하도록 개선
  function setupViewToggle() {
    const postGrids = document.querySelectorAll(".post-grid");
    const viewToggles = document.querySelectorAll(".view-toggle");
    
    // 페이지 로드 시 기본값을 그리드로 설정
    if (postGrids.length > 0) {
      postGrids.forEach((grid) => {
        grid.classList.add("grid-view");
        grid.classList.remove("list-view");
      });
    }
    
    // 그리드 버튼을 활성화 상태로 설정
    if (viewToggles.length > 0) {
      viewToggles.forEach((toggle) => {
        if (toggle.dataset.view === "grid") {
          toggle.classList.add("active");
        } else {
          toggle.classList.remove("active");
        }
      });
    }
  }

  // 초기 설정
  setupViewToggle();

  // 이벤트 위임으로 토글 버튼 처리 - 더 강력한 선택자 사용
  document.addEventListener("click", (e) => {
    // 더 정확한 버튼 감지
    const toggle = e.target.closest(".view-toggle") || 
                   (e.target.classList.contains("view-toggle") ? e.target : null);
    
    if (!toggle || !toggle.dataset.view) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const view = toggle.dataset.view;
    const viewToggles = document.querySelectorAll(".view-toggle");
    const postGrids = document.querySelectorAll(".post-grid");
    
    console.log(`Switching to ${view} view`); // 디버깅용
    
    // Update active toggle - 모든 버튼에서 active 제거 후 현재 버튼만 활성화
    viewToggles.forEach((t) => t.classList.remove("active"));
    toggle.classList.add("active");
    
    // Update all grid classes
    postGrids.forEach((grid) => {
      if (view === "list") {
        grid.classList.add("list-view");
        grid.classList.remove("grid-view");
      } else {
        grid.classList.remove("list-view");
        grid.classList.add("grid-view");
      }
    });
  });
  
  // MutationObserver를 사용하여 동적으로 추가된 요소도 처리
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 새로 추가된 뷰 토글 버튼이나 포스트 그리드 확인
        const hasNewToggles = mutation.addedNodes.length > 0 && 
          Array.from(mutation.addedNodes).some(node => 
            node.nodeType === 1 && 
            (node.querySelector && node.querySelector('.view-toggle'))
          );
        
        if (hasNewToggles) {
          setTimeout(setupViewToggle, 100); // 약간의 지연 후 재설정
        }
      }
    });
  });
  
  // 전체 document 관찰
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // 접은글 (더보기) 기능
  function initMoreLess() {
    document.querySelectorAll('div[data-ke-type="moreLess"]').forEach(function(container) {
      const toggleBtn = container.querySelector('.btn-toggle-moreless');
      const content = container.querySelector('.moreless-content');
      
      if (toggleBtn && content) {
        // 제목 커스터마이징: data-text-more 속성 사용
        let moreText = container.getAttribute('data-text-more') || '더보기';
        let lessText = container.getAttribute('data-text-less') || '접기';
        
        // 첫 번째 h3 태그를 찾아서 제목으로 사용
        const firstHeading = content.querySelector('h3');
        if (firstHeading && firstHeading.textContent.trim()) {
          moreText = firstHeading.textContent.trim();
          lessText = firstHeading.textContent.trim();
        }
        
        // 초기 상태 설정
        let isOpen = false;
        toggleBtn.textContent = moreText;
        
        // 토글 이벤트
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          isOpen = !isOpen;
          
          if (isOpen) {
            content.classList.add('show');
            toggleBtn.classList.add('open');
            // 열렸을 때는 제목 그대로 유지하거나 '접기' 표시
            if (container.hasAttribute('data-text-less')) {
              toggleBtn.textContent = lessText;
            }
          } else {
            content.classList.remove('show');
            toggleBtn.classList.remove('open');
            toggleBtn.textContent = moreText;
          }
        });
      }
    });
  }
  
  // 페이지 로드 시 접은글 초기화
  initMoreLess();
  
  // AJAX 등으로 동적 컨텐츠 로드 시 재초기화
  const morelessObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && node.querySelector && node.querySelector('div[data-ke-type="moreLess"]')) {
            initMoreLess();
          }
        });
      }
    });
  });
  
  morelessObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Lazy loading for images
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // Header behavior on scroll
  let lastScrollTop = 0;
  const header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // Add background to header when scrolling down
        if (scrollTop > 100) {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.backdropFilter = "blur(10px)";
          header.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
        } else {
          header.style.background = "transparent";
          header.style.backdropFilter = "none";
          header.style.boxShadow = "none";
        }

        lastScrollTop = scrollTop;
      },
      { passive: true }
    );
  }

  // Initialize syntax highlighting if present
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  }


  // Category tree expansion (for sidebar)
  const categoryTree = document.querySelector(".category-tree");
  if (categoryTree) {
    const categoryLinks = categoryTree.querySelectorAll("a");
    categoryLinks.forEach((link) => {
      if (link.nextElementSibling && link.nextElementSibling.tagName === "UL") {
        link.addEventListener("click", (e) => {
          if (e.target === link) {
            e.preventDefault();
            const subList = link.nextElementSibling;
            subList.style.display =
              subList.style.display === "none" ? "block" : "none";
          }
        });
      }
    });
  }
});
