// ui cards and footer

function renderStallCard(stall, mode) {
  if (!mode) mode = 'grid';
  var stats = getStallStats(stall.id);
  var isFav = listContains(state.favorites, stall.id);
  var isOpen = (stall.status === 'Open');

  var statusBadge = isOpen ? 'bg-fresh text-white' : 'bg-ink/80 text-white';
  var statusLabel = isOpen ? '● Open Now' : 'Closed';
  var heartClass = isFav ? 'fill-brand text-brand heart-pop' : 'text-ink';
  var reviewWord = (stats.count === 1) ? 'review' : 'reviews';

  // cuisine tags
  var cuisineTags = '';
  var maxTags = Math.min(3, stall.cuisines.length);
  for (var i = 0; i < maxTags; i++) {
    cuisineTags += '<span class="px-2.5 py-0.5 rounded-full bg-canvas border border-stone-200/70 text-[11px] font-medium text-slate">' + escapeHtml(stall.cuisines[i]) + '</span>';
  }

  if (mode === 'list') {
    var favBtnClass = isFav ? 'bg-brand-soft text-brand border-brand-border' : 'bg-white text-slate';
    return `
      <article onclick="navigate('details', { stallId: '${stall.id}' })" class="stall-card cursor-pointer bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden flex flex-col sm:flex-row">
        <div class="relative sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden bg-stone-100">
          <img src="${stall.image}" alt="${escapeHtml(stall.name)}" class="stall-img w-full h-full object-cover" />
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md ${statusBadge}">${statusLabel}</span>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between gap-3">
          <div>
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-heading font-bold text-lg text-ink">${escapeHtml(stall.name)}</h3>
                <p class="text-xs text-slate flex items-center gap-1 mt-0.5"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand"></i> ${escapeHtml(stall.location)}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/70 text-xs font-bold text-ink">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-gold text-gold"></i> ${stats.avg} <span class="text-slate font-normal">(${stats.count})</span>
                </span>
                <button type="button" onclick="toggleFavorite('${stall.id}', event)" aria-label="Toggle favorite" class="p-2 rounded-xl border border-stone-200 hover:border-brand/40 transition-colors ${favBtnClass}">
                  <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-brand text-brand heart-pop' : ''}"></i>
                </button>
              </div>
            </div>
            <p class="text-sm text-slate mt-2.5 line-clamp-2">${escapeHtml(stall.description)}</p>
            <div class="flex flex-wrap gap-1.5 mt-3">${cuisineTags}</div>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-stone-100">
            <span class="text-sm font-semibold text-ink">₹${stall.priceForTwo} <span class="text-xs font-normal text-slate">for two • ${escapeHtml(stall.hours)}</span></span>
            <span class="inline-flex items-center gap-1 text-sm font-semibold text-brand">View Details <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
          </div>
        </div>
      </article>
    `;
  }

  var trendingHtml = '';
  if (stall.trending) {
    trendingHtml = '<span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-brand shadow-sm">Trending</span>';
  }

  return `
    <article onclick="navigate('details', { stallId: '${stall.id}' })" class="stall-card cursor-pointer bg-white rounded-[20px] border border-stone-200/80 shadow-card overflow-hidden flex flex-col">
      <div class="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img src="${stall.image}" alt="${escapeHtml(stall.name)}" class="stall-img w-full h-full object-cover" />
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-sm ${statusBadge}">${statusLabel}</span>
          ${trendingHtml}
        </div>
        <button type="button" onclick="toggleFavorite('${stall.id}', event)" aria-label="Toggle favorite" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
          <i data-lucide="heart" class="w-4 h-4 ${heartClass}"></i>
        </button>
      </div>
      <div class="p-4 sm:p-5 flex-1 flex flex-col">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-heading font-bold text-base sm:text-lg text-ink leading-snug">${escapeHtml(stall.name)}</h3>
          <span class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/70 text-xs font-bold text-ink">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-gold text-gold"></i> ${stats.avg}
          </span>
        </div>
        <p class="text-xs text-slate flex items-center gap-1 mt-1">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand shrink-0"></i>
          <span class="truncate">${escapeHtml(stall.location)}</span>
        </p>
        <div class="flex flex-wrap gap-1.5 mt-3">${cuisineTags}</div>
        <div class="mt-auto pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <p class="text-sm font-bold text-ink">₹${stall.priceForTwo} <span class="text-xs font-normal text-slate">for two</span></p>
            <p class="text-[11px] text-slate">${stats.count} student ${reviewWord}</p>
          </div>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-soft text-brand text-xs font-semibold hover:bg-brand hover:text-white transition-colors">
            View Details <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </span>
        </div>
      </div>
    </article>
  `;
}

function renderSkeletonCards(count) {
  var html = '';
  for (var i = 0; i < count; i++) {
    html += `
      <div class="bg-white rounded-[20px] border border-stone-100 overflow-hidden shadow-card">
        <div class="aspect-[4/3] skeleton"></div>
        <div class="p-5 space-y-3">
          <div class="flex justify-between">
            <div class="h-5 w-2/3 rounded-lg skeleton"></div>
            <div class="h-5 w-12 rounded-lg skeleton"></div>
          </div>
          <div class="h-3.5 w-1/2 rounded-lg skeleton"></div>
          <div class="flex gap-2">
            <div class="h-5 w-16 rounded-full skeleton"></div>
            <div class="h-5 w-14 rounded-full skeleton"></div>
          </div>
          <div class="pt-3 border-t border-stone-100 flex justify-between items-center">
            <div class="h-4 w-24 rounded-lg skeleton"></div>
            <div class="h-8 w-24 rounded-xl skeleton"></div>
          </div>
        </div>
      </div>
    `;
  }
  return html;
}

function renderReviewCard(review, showStallLink) {
  var stall = findStallById(review.stallId);
  var isLiked = listContains(state.helpfulIds, review.id);
  var likeBtnClass = isLiked
    ? 'bg-brand-soft border-brand-border text-brand font-semibold'
    : 'border-stone-200 text-slate hover:border-stone-300';

  var stallLinkHtml = '';
  if (showStallLink && stall) {
    stallLinkHtml =
      '<button type="button" onclick="navigate(\'details\', { stallId: \'' + stall.id + '\' })" class="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-canvas border border-stone-200/70 text-xs font-semibold text-ink hover:border-brand hover:text-brand transition-colors">' +
        '<i data-lucide="store" class="w-3.5 h-3.5 text-brand"></i> ' + escapeHtml(stall.name) +
      '</button>';
  }

  return `
    <article class="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-card flex flex-col justify-between gap-3">
      <div>
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-soft border border-brand-border text-brand font-heading font-bold text-sm flex items-center justify-center shrink-0">
              ${getInitials(review.student)}
            </div>
            <div>
              <h4 class="font-heading font-bold text-sm text-ink">${escapeHtml(review.student)}</h4>
              <p class="text-xs text-slate">${escapeHtml(review.program || 'LPU Student')} • ${formatDate(review.date)}</p>
            </div>
          </div>
          <div class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/70">
            ${renderStars(review.rating, 'w-3.5 h-3.5')}
          </div>
        </div>
        ${stallLinkHtml}
        <p class="mt-3 text-sm text-ink/90 leading-relaxed">${escapeHtml(review.text)}</p>
      </div>
      <div class="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-slate">
        <span class="inline-flex items-center gap-1 text-fresh font-medium"><i data-lucide="badge-check" class="w-3.5 h-3.5"></i> Verified Campus Review</span>
        <button type="button" onclick="toggleHelpful('${review.id}')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${likeBtnClass}">
          <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i> Helpful (${review.helpful})
        </button>
      </div>
    </article>
  `;
}

function renderFooter() {
  var footerCuisines = ['North Indian', 'South Indian', 'Chinese', 'Fast Food', 'Beverages', 'Desserts'];
  var cuisineLinksHtml = '';
  for (var i = 0; i < footerCuisines.length; i++) {
    var c = footerCuisines[i];
    cuisineLinksHtml += '<li><button type="button" onclick="navigate(\'explore\', { category: \'' + c + '\' })" class="hover:text-brand transition-colors">' + c + '</button></li>';
  }

  return `
    <footer class="bg-ink text-stone-300 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="space-y-4">
            <div class="flex items-center gap-2.5">
              <img src="images/campusbites-logo-3d.jpg" alt="CampusBites Logo" class="w-9 h-9 rounded-xl object-cover shadow-sm" />
              <span class="font-heading font-extrabold text-xl text-white">Campus<span class="text-brand">Bites</span></span>
            </div>
            <p class="text-sm text-stone-400 leading-relaxed">Discover campus food stalls, browse student-budget menus, and read honest peer reviews around Lovely Professional University.</p>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300">
              <i data-lucide="leaf" class="w-4 h-4 text-fresh"></i>
              <span>100% Pure Veg • LPU Campus Guide</span>
            </div>
          </div>
          <div>
            <h4 class="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul class="space-y-2.5 text-sm">
              <li><button type="button" onclick="navigate('home')" class="hover:text-brand transition-colors">Home</button></li>
              <li><button type="button" onclick="navigate('explore')" class="hover:text-brand transition-colors">Explore Food Stalls</button></li>
              <li><button type="button" onclick="navigate('reviews')" class="hover:text-brand transition-colors">Student Reviews</button></li>
              <li><button type="button" onclick="navigate('favorites')" class="hover:text-brand transition-colors">Saved Favorites</button></li>
              <li><button type="button" onclick="navigate('admin-overview')" class="hover:text-brand transition-colors">Admin Dashboard</button></li>
            </ul>
          </div>
          <div>
            <h4 class="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Popular Cuisines</h4>
            <ul class="space-y-2.5 text-sm">${cuisineLinksHtml}</ul>
          </div>
          <div>
            <h4 class="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">LPU Campus Zones</h4>
            <ul class="space-y-2.5 text-sm text-stone-400">
              <li class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand"></i> Uni Mall Food Court</li>
              <li class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand"></i> Block 41 Apartments & Stadium</li>
              <li class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand"></i> Uni Centre (Block 15)</li>
              <li class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand"></i> BH-1 to BH-6 & Block 56 (N.K)</li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>© 2026 CampusBites — Lovely Professional University. All rights reserved.</p>
          <p>Built for students &amp; members at Lovely Professional University, Phagwara, Punjab.</p>
        </div>
      </div>
    </footer>
  `;
}
