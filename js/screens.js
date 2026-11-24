// pages

// home page
function renderHomeScreen() {
  // trending stalls
  var trendingHtml = '';
  var tCount = 0;
  for (var i = 0; i < state.stalls.length; i++) {
    if (state.stalls[i].trending && tCount < 4) {
      trendingHtml += renderStallCard(state.stalls[i], 'grid');
      tCount++;
    }
  }

  // top rated stalls
  var sortedByRating = state.stalls.slice();
  sortedByRating.sort(function(a, b) {
    return getStallStats(b.id).avg - getStallStats(a.id).avg;
  });
  var topRatedHtml = '';
  for (var j = 0; j < Math.min(4, sortedByRating.length); j++) {
    topRatedHtml += renderStallCard(sortedByRating[j], 'grid');
  }

  // favorite stalls
  var favHtml = '';
  var fCount = 0;
  for (var k = 0; k < state.stalls.length; k++) {
    if (state.stalls[k].studentFavorite && fCount < 4) {
      favHtml += renderStallCard(state.stalls[k], 'grid');
      fCount++;
    }
  }

  // testimonials
  var approvedReviews = getReviewsByStatus('Approved');
  var testimonialsHtml = '';
  for (var r = 0; r < Math.min(3, approvedReviews.length); r++) {
    testimonialsHtml += renderReviewCard(approvedReviews[r], true);
  }

  // quick search tags
  var popularTags = ['Oven Express', 'N.K Thali', 'Nand Juice', 'Masala Dosa'];
  var popularTagsHtml = '';
  for (var p = 0; p < popularTags.length; p++) {
    popularTagsHtml += '<button type="button" onclick="navigate(\'explore\', { search: \'' + popularTags[p] + '\' })" class="px-3 py-1 rounded-full bg-white border border-stone-200 hover:border-brand hover:text-brand transition-colors">' + popularTags[p] + '</button>';
  }

  // category chips
  var categoryChipsHtml = '';
  for (var c = 0; c < CATEGORIES.length; c++) {
    var cat = CATEGORIES[c];
    categoryChipsHtml +=
      '<button type="button" onclick="navigate(\'explore\', { category: \'' + cat.name + '\' })" class="shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-stone-200 bg-canvas hover:bg-brand hover:text-white hover:border-brand text-ink font-semibold text-sm transition-all group">' +
        '<i data-lucide="' + cat.icon + '" class="w-4 h-4 text-brand group-hover:text-white transition-colors"></i>' +
        '<span>' + cat.name + '</span>' +
      '</button>';
  }

  // announcement bar
  var bannerHtml = '';
  if (state.settings.showBanner) {
    bannerHtml =
      '<div class="bg-brand-soft/80 border-b border-brand-border/60 py-2 px-4 text-center text-xs text-ink">' +
        '<span class="font-semibold text-brand">LPU Campus Guide:</span> Explore 100% Pure Veg outlets across Uni Mall, Block 41 & Hostel Food Courts.' +
        '<button type="button" onclick="navigate(\'admin-overview\')" class="ml-2 underline font-semibold text-ink hover:text-brand">Open Admin Dashboard →</button>' +
      '</div>';
  }

  // how it works
  var steps = [
    { step: '01', icon: 'search',               title: 'Discover Nearby Stalls', desc: 'Filter stalls by cuisine, rupee budget, opening hours, and campus block location.' },
    { step: '02', icon: 'book-open',            title: 'Browse Visual Menus',    desc: 'Inspect signature dishes, veg/non-veg tags, and real student pricing before walking over.' },
    { step: '03', icon: 'message-square-heart', title: 'Rate & Save Favorites',  desc: 'Bookmark your go-to hangout spots and help fellow students with honest reviews.' }
  ];
  var stepsHtml = '';
  for (var s = 0; s < steps.length; s++) {
    stepsHtml +=
      '<div class="bg-canvas rounded-[22px] p-7 border border-stone-200/70 relative step-card">' +
        '<span class="font-heading font-extrabold text-4xl text-brand/15 absolute top-5 right-6">' + steps[s].step + '</span>' +
        '<div class="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center mb-5 shadow-sm"><i data-lucide="' + steps[s].icon + '" class="w-5 h-5"></i></div>' +
        '<h3 class="font-heading font-bold text-lg text-ink">' + steps[s].title + '</h3>' +
        '<p class="text-sm text-slate mt-2 leading-relaxed">' + steps[s].desc + '</p>' +
      '</div>';
  }

  return `
    <main class="pt-16 lg:pt-[72px]">
      ${bannerHtml}
      <section class="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div class="lg:col-span-6 space-y-6">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-border shadow-sm text-xs font-semibold text-ink hero-anim-1">
                <span class="w-2 h-2 rounded-full bg-fresh live-dot"></span>
                <span>LPU Campus Food Directory • ${state.stalls.length} Campus Outlets</span>
              </div>
              <h1 class="font-heading font-extrabold text-4xl sm:text-5xl xl:text-[58px] text-ink tracking-tight leading-[1.08] hero-anim-2">
                Good Food.<br /><span class="hero-gradient-text">Great Campus Life.</span>
              </h1>
              <p class="text-base sm:text-lg text-slate max-w-xl leading-relaxed hero-anim-3">
                Discover the best food stalls, hidden gems, and student favorites around Lovely Professional University. Compare menus, check rupee prices, and read honest peer reviews in seconds.
              </p>
              <form onsubmit="handleHeroSearch(event)" class="bg-white p-2 rounded-2xl shadow-card border border-stone-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 transition-all hero-anim-3">
                <div class="relative flex-1 flex items-center">
                  <i data-lucide="search" class="w-5 h-5 text-brand ml-3 shrink-0"></i>
                  <input id="hero-search-input" type="text" placeholder="Search Oven Express, N.K Food Court, dosa, momos..." class="w-full px-3 py-2.5 text-sm sm:text-base text-ink placeholder:text-slate/70 focus:outline-none bg-transparent" />
                </div>
                <button type="submit" class="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors shadow-sm shrink-0">Find Food</button>
              </form>
              <div class="flex flex-wrap items-center gap-2 text-xs text-slate">
                <span class="font-medium">Popular:</span>
                ${popularTagsHtml}
              </div>
              <div class="flex flex-wrap items-center gap-3 pt-1 hero-anim-4">
                <button type="button" onclick="navigate('explore')" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand hover:bg-brand-hover text-white font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5">
                  <span>Explore Food Stalls</span><i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
                <button type="button" onclick="navigate('explore', { sort: 'rating' })" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-ink border border-stone-200 font-semibold text-sm transition-all hover:border-brand/40">
                  <i data-lucide="award" class="w-4 h-4 text-gold"></i><span>View Top Rated</span>
                </button>
              </div>
              <div class="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/70 max-w-md">
                <div><p class="font-heading font-extrabold text-2xl text-ink"><span class="count-up" data-target="${state.stalls.length}">${state.stalls.length}</span>+</p><p class="text-xs text-slate">Campus Stalls</p></div>
                <div><p class="font-heading font-extrabold text-2xl text-ink"><span class="count-up" data-target="${approvedReviews.length * 14}">${approvedReviews.length * 14}</span>+</p><p class="text-xs text-slate">Student Ratings</p></div>
                <div><p class="font-heading font-extrabold text-2xl text-ink">₹20–₹300</p><p class="text-xs text-slate">Student Friendly</p></div>
              </div>
            </div>

            <div class="lg:col-span-6 relative hero-anim-5">
              <div class="grid grid-cols-12 gap-3 sm:gap-4 items-center">
                <div class="col-span-7 space-y-3 sm:space-y-4">
                  <div onclick="navigate('details', { stallId: 'stall-1' })" class="cursor-pointer group relative rounded-[24px] overflow-hidden shadow-float border-4 border-white aspect-[4/3]">
                    <img src="${FOOD_IMAGES.punjabi}" alt="N.K Food Court" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent p-4">
                      <span class="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Editor's Pick</span>
                      <p class="font-heading font-bold text-white text-base">N.K Food Court</p>
                    </div>
                  </div>
                  <div onclick="navigate('details', { stallId: 'stall-5' })" class="cursor-pointer group relative rounded-[20px] overflow-hidden shadow-card border-4 border-white aspect-[16/10]">
                    <img src="${FOOD_IMAGES.burger}" alt="Oven Express fast food and fries" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div class="col-span-5 space-y-3 sm:space-y-4 pt-6">
                  <div onclick="navigate('details', { stallId: 'stall-2' })" class="cursor-pointer group relative rounded-[20px] overflow-hidden shadow-float border-4 border-white aspect-[4/4]">
                    <img src="${FOOD_IMAGES.chai}" alt="Kitchen Ette masala chai and snacks" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div onclick="navigate('details', { stallId: 'stall-4' })" class="cursor-pointer group relative rounded-[20px] overflow-hidden shadow-card border-4 border-white aspect-[4/3]">
                    <img src="${FOOD_IMAGES.dosa}" alt="Dosa Plaza South Indian masala dosa" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              <div class="hidden sm:flex items-center gap-3 absolute -top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-float border border-stone-100 float-slow">
                <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-gold"><i data-lucide="star" class="w-5 h-5 fill-gold"></i></div>
                <div><p class="font-heading font-extrabold text-sm text-ink">5.0 ★ Top Rated</p><p class="text-xs text-slate">Oven Express • Uni Mall</p></div>
              </div>
              <div class="hidden sm:flex items-center gap-3 absolute -bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-float border border-stone-100 float-delayed">
                <div class="w-10 h-10 rounded-xl bg-fresh/10 flex items-center justify-center text-fresh"><i data-lucide="flame" class="w-5 h-5"></i></div>
                <div><p class="font-heading font-bold text-sm text-ink">100% Pure Veg Campus</p><p class="text-xs text-slate">Protein House • Open 7 AM – 11 PM</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="home-categories" class="py-10 bg-white border-y border-stone-200/70 reveal-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-end justify-between gap-4 mb-6">
            <div><p class="text-xs font-bold uppercase tracking-wider text-brand">Browse by Craving</p><h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">Explore Food Categories</h2></div>
            <button type="button" onclick="navigate('explore')" class="text-sm font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1">All Stalls <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
          </div>
          <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">${categoryChipsHtml}</div>
        </div>
      </section>

      <section class="py-14 reveal-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div><p class="text-xs font-bold uppercase tracking-wider text-brand">Buzzing Around Campus</p><h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">Trending Food Stalls</h2></div>
            <button type="button" onclick="navigate('explore')" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover">View all stalls <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-grid">${trendingHtml}</div>
        </div>
      </section>

      <section class="py-14 bg-white border-y border-stone-200/70 reveal-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div><p class="text-xs font-bold uppercase tracking-wider text-gold">Highest Student Scores</p><h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">Top-Rated Around LPU</h2></div>
            <button type="button" onclick="navigate('explore', { sort: 'rating' })" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover">See full leaderboard <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-grid">${topRatedHtml}</div>
        </div>
      </section>

      <section class="py-14 reveal-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div><p class="text-xs font-bold uppercase tracking-wider text-fresh">Budget-Friendly & Beloved</p><h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">Student Favorites</h2></div>
            <button type="button" onclick="navigate('favorites')" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover">My Saved Stalls (${state.favorites.length}) <i data-lucide="heart" class="w-4 h-4"></i></button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-grid">${favHtml}</div>
        </div>
      </section>

      <section class="py-16 bg-white border-y border-stone-200/70 reveal-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <p class="text-xs font-bold uppercase tracking-wider text-brand">Simple & Fast</p>
            <h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">How CampusBites Works</h2>
            <p class="text-sm sm:text-base text-slate mt-2">Built for LPU students so you never waste a lunch break wondering where to eat.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${stepsHtml}</div>
        </div>
      </section>

      <section class="py-16 reveal-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div><p class="text-xs font-bold uppercase tracking-wider text-brand">Peer Voices</p><h2 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-1">What LPU Students Say</h2></div>
            <button type="button" onclick="openReviewModal()" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold transition-colors shadow-sm"><i data-lucide="pen-line" class="w-4 h-4"></i> Write a Review</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${testimonialsHtml}</div>
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;
}

// explore page
function getFilteredStalls() {
  var searchText = state.exploreSearch.trim().toLowerCase();
  var result = [];

  // filter stalls
  for (var i = 0; i < state.stalls.length; i++) {
    var stall = state.stalls[i];

    if (state.exploreCategory !== 'All') {
      if (stall.category !== state.exploreCategory && !listContains(stall.cuisines, state.exploreCategory)) {
        continue;
      }
    }
    if (state.explorePrice === 'budget' && stall.priceForTwo > 150) continue;
    if (state.explorePrice === 'moderate' && (stall.priceForTwo <= 150 || stall.priceForTwo > 250)) continue;
    if (state.explorePrice === 'premium' && stall.priceForTwo <= 250) continue;
    if (state.exploreRating > 0 && getStallStats(stall.id).avg < state.exploreRating) continue;

    if (searchText !== '') {
      var matched = false;
      if (stall.name.toLowerCase().indexOf(searchText) >= 0) matched = true;
      if (stall.location.toLowerCase().indexOf(searchText) >= 0) matched = true;
      for (var c = 0; c < stall.cuisines.length; c++) {
        if (stall.cuisines[c].toLowerCase().indexOf(searchText) >= 0) matched = true;
      }
      for (var m = 0; m < stall.menu.length; m++) {
        if (stall.menu[m].name.toLowerCase().indexOf(searchText) >= 0) matched = true;
        if (stall.menu[m].desc.toLowerCase().indexOf(searchText) >= 0) matched = true;
      }
      if (!matched) continue;
    }
    result.push(stall);
  }

  // sort stalls
  if (state.exploreSort === 'rating') {
    result.sort(function(a, b) { return getStallStats(b.id).avg - getStallStats(a.id).avg; });
  } else if (state.exploreSort === 'price-asc') {
    result.sort(function(a, b) { return a.priceForTwo - b.priceForTwo; });
  } else if (state.exploreSort === 'price-desc') {
    result.sort(function(a, b) { return b.priceForTwo - a.priceForTwo; });
  } else if (state.exploreSort === 'reviews') {
    result.sort(function(a, b) { return getStallStats(b.id).count - getStallStats(a.id).count; });
  }

  return result;
}

function renderExploreResultsMarkup(filtered) {
  if (state.isLoadingSkeleton) {
    return '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">' + renderSkeletonCards(6) + '</div>';
  }
  if (filtered.length === 0) {
    return `
      <div class="bg-white rounded-[24px] border border-stone-200/80 p-12 text-center shadow-card max-w-lg mx-auto my-8">
        <div class="w-16 h-16 rounded-2xl bg-brand-soft text-brand flex items-center justify-center mx-auto mb-4"><i data-lucide="search-x" class="w-8 h-8"></i></div>
        <h3 class="font-heading font-bold text-xl text-ink">No matching food stalls</h3>
        <p class="text-sm text-slate mt-2">We couldn't find any campus stalls matching your current search or filter settings. Try broadening your price or category filters.</p>
        <button type="button" onclick="resetExploreFilters()" class="mt-6 px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold transition-colors">Reset All Filters</button>
      </div>
    `;
  }
  var cardsHtml = '';
  for (var i = 0; i < filtered.length; i++) {
    cardsHtml += renderStallCard(filtered[i], state.exploreView);
  }
  if (state.exploreView === 'list') {
    return '<div class="space-y-4">' + cardsHtml + '</div>';
  }
  return '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-grid">' + cardsHtml + '</div>';
}

function renderExploreScreen() {
  var filtered = getFilteredStalls();
  var cats = getAllCategories();
  var hasActiveFilters = (state.exploreSearch !== '' || state.exploreCategory !== 'All' || state.explorePrice !== 'all' || state.exploreRating > 0);

  var catButtonsHtml = '';
  for (var i = 0; i < cats.length; i++) {
    var cat = cats[i];
    var cls = (state.exploreCategory === cat)
      ? 'bg-brand text-white shadow-sm'
      : 'bg-canvas text-ink border border-stone-200 hover:border-brand/50';
    catButtonsHtml += '<button type="button" onclick="state.exploreCategory = \'' + escapeHtml(cat) + '\'; render();" class="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ' + cls + '">' + escapeHtml(cat) + '</button>';
  }

  var clearBtnHtml = hasActiveFilters ? '<button type="button" onclick="resetExploreFilters()" class="text-xs font-semibold text-brand hover:underline mr-2">Clear filters</button>' : '';

  return `
    <main class="pt-24 pb-12 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-brand">Campus Discovery</p>
            <h1 class="font-heading font-extrabold text-3xl sm:text-4xl text-ink mt-1">Explore Food Stalls</h1>
            <p class="text-sm sm:text-base text-slate mt-1.5">Search by stall name, campus block, or your favorite dish.</p>
          </div>
          <button type="button" onclick="triggerSkeletonPreview()" class="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-slate hover:border-brand hover:text-brand transition-colors">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Refresh Stalls
          </button>
        </div>

        <section class="bg-white rounded-[22px] border border-stone-200/80 shadow-card p-4 sm:p-5 mb-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div class="md:col-span-5 relative">
              <i data-lucide="search" class="w-4 h-4 text-slate absolute left-3.5 top-1/2 -translate-y-1/2"></i>
              <input type="text" value="${escapeHtml(state.exploreSearch)}" oninput="state.exploreSearch = this.value; renderExploreResultsOnly();" placeholder="Search stalls, dosa, chai, momos..." class="w-full pl-10 pr-4 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15" />
            </div>
            <div class="md:col-span-2">
              <select onchange="state.explorePrice = this.value; render();" aria-label="Price range" class="w-full px-3 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">
                <option value="all"      ${state.explorePrice === 'all' ? 'selected' : ''}>Any Price</option>
                <option value="budget"   ${state.explorePrice === 'budget' ? 'selected' : ''}>Under ₹150</option>
                <option value="moderate" ${state.explorePrice === 'moderate' ? 'selected' : ''}>₹151 – ₹250</option>
                <option value="premium"  ${state.explorePrice === 'premium' ? 'selected' : ''}>₹250+</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <select onchange="state.exploreRating = Number(this.value); render();" aria-label="Rating filter" class="w-full px-3 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">
                <option value="0"   ${state.exploreRating === 0 ? 'selected' : ''}>Any Rating</option>
                <option value="4.5" ${state.exploreRating === 4.5 ? 'selected' : ''}>4.5+ ★</option>
                <option value="4"   ${state.exploreRating === 4 ? 'selected' : ''}>4.0+ ★</option>
                <option value="3.5" ${state.exploreRating === 3.5 ? 'selected' : ''}>3.5+ ★</option>
              </select>
            </div>
            <div class="md:col-span-3">
              <select onchange="state.exploreSort = this.value; render();" aria-label="Sort stalls" class="w-full px-3 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">
                <option value="recommended" ${state.exploreSort === 'recommended' ? 'selected' : ''}>Sort: Recommended</option>
                <option value="rating"      ${state.exploreSort === 'rating' ? 'selected' : ''}>Sort: Highest Rated</option>
                <option value="price-asc"   ${state.exploreSort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-desc"  ${state.exploreSort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                <option value="reviews"     ${state.exploreSort === 'reviews' ? 'selected' : ''}>Sort: Most Reviewed</option>
              </select>
            </div>
          </div>
          <div class="flex gap-2 overflow-x-auto no-scrollbar pt-1">${catButtonsHtml}</div>
        </section>

        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p id="explore-count" class="text-sm text-slate">Showing <span class="font-bold text-ink">${filtered.length}</span> of <span class="font-semibold text-ink">${state.stalls.length}</span> campus food stalls</p>
          <div class="flex items-center gap-2">
            ${clearBtnHtml}
            <div class="inline-flex bg-white border border-stone-200 rounded-xl p-1">
              <button type="button" onclick="state.exploreView = 'grid'; render();" aria-label="Grid view" class="p-1.5 rounded-lg transition-colors ${state.exploreView === 'grid' ? 'bg-brand text-white' : 'text-slate hover:text-ink'}"><i data-lucide="layout-grid" class="w-4 h-4"></i></button>
              <button type="button" onclick="state.exploreView = 'list'; render();" aria-label="List view" class="p-1.5 rounded-lg transition-colors ${state.exploreView === 'list' ? 'bg-brand text-white' : 'text-slate hover:text-ink'}"><i data-lucide="list" class="w-4 h-4"></i></button>
            </div>
          </div>
        </div>

        <div id="explore-results-container">${renderExploreResultsMarkup(filtered)}</div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// stall details page
function renderDetailsScreen() {
  var stall = findStallById(state.selectedStallId);
  if (!stall) stall = state.stalls[0];
  if (!stall) return '';

  var stats = getStallStats(stall.id);
  var isFav = listContains(state.favorites, stall.id);
  var gallery = (stall.gallery && stall.gallery.length > 0) ? stall.gallery : [stall.image];
  var activeImg = gallery[state.activeGalleryIdx] || stall.image;

  // gallery thumbnails
  var thumbsHtml = '';
  for (var g = 0; g < gallery.length; g++) {
    var borderCls = (state.activeGalleryIdx === g) ? 'border-brand ring-2 ring-brand/20' : 'border-transparent opacity-75 hover:opacity-100';
    thumbsHtml +=
      '<button type="button" onclick="state.activeGalleryIdx = ' + g + '; render();" class="rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all ' + borderCls + '">' +
        '<img src="' + gallery[g] + '" alt="Gallery photo ' + (g + 1) + '" class="w-full h-full object-cover" />' +
      '</button>';
  }

  // cuisines
  var cuisineBadges = '';
  for (var c = 0; c < stall.cuisines.length; c++) {
    cuisineBadges += '<span class="px-2.5 py-0.5 rounded-full bg-brand-soft text-brand text-xs font-semibold">' + escapeHtml(stall.cuisines[c]) + '</span>';
  }

  // menu tabs
  var menuCats = ['All'];
  for (var m = 0; m < stall.menu.length; m++) {
    if (!listContains(menuCats, stall.menu[m].category)) {
      menuCats.push(stall.menu[m].category);
    }
  }
  var menuTabsHtml = '';
  for (var t = 0; t < menuCats.length; t++) {
    var mCat = menuCats[t];
    var mCls = (state.activeMenuCategory === mCat) ? 'bg-ink text-white' : 'bg-white border border-stone-200 text-ink hover:border-brand';
    menuTabsHtml += '<button type="button" onclick="state.activeMenuCategory = \'' + escapeHtml(mCat) + '\'; render();" class="px-4 py-2 rounded-xl text-xs font-semibold transition-colors ' + mCls + '">' + escapeHtml(mCat) + '</button>';
  }

  // menu items
  var menuCardsHtml = '';
  for (var mi = 0; mi < stall.menu.length; mi++) {
    var item = stall.menu[mi];
    if (state.activeMenuCategory !== 'All' && item.category !== state.activeMenuCategory) continue;
    var vegBorder = item.veg ? 'border-fresh' : 'border-red-600';
    var vegDot = item.veg ? 'bg-fresh' : 'bg-red-600';
    var bestBadge = item.bestseller ? '<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold uppercase">Bestseller</span>' : '';
    menuCardsHtml += `
      <div class="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-card flex items-center gap-4 hover:border-brand/40 transition-colors">
        <img src="${item.img || stall.image}" alt="${escapeHtml(item.name)}" class="w-24 h-24 rounded-xl object-cover shrink-0 bg-stone-100" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${vegBorder}"><span class="w-1.5 h-1.5 rounded-full ${vegDot}"></span></span>
            ${bestBadge}
          </div>
          <h3 class="font-heading font-bold text-base text-ink mt-1 truncate">${escapeHtml(item.name)}</h3>
          <p class="text-xs text-slate mt-0.5 line-clamp-2">${escapeHtml(item.desc)}</p>
          <p class="font-heading font-extrabold text-base text-brand mt-2">₹${item.price}</p>
        </div>
      </div>
    `;
  }

  // stall reviews
  var stallReviews = [];
  for (var r = 0; r < state.reviews.length; r++) {
    if (state.reviews[r].stallId === stall.id && state.reviews[r].status === 'Approved') {
      stallReviews.push(state.reviews[r]);
    }
  }

  // rating breakdown
  var barsHtml = '';
  for (var star = 5; star >= 1; star--) {
    var starCount = 0;
    for (var sr = 0; sr < stallReviews.length; sr++) {
      if (stallReviews[sr].rating === star) starCount++;
    }
    var pct = stallReviews.length > 0 ? Math.round((starCount / stallReviews.length) * 100) : 0;
    barsHtml +=
      '<div class="flex items-center gap-3 text-xs">' +
        '<span class="w-8 font-semibold text-ink">' + star + ' ★</span>' +
        '<div class="flex-1 h-2.5 rounded-full bg-canvas overflow-hidden"><div class="h-full rounded-full bg-gold bar-grow" style="width: ' + pct + '%"></div></div>' +
        '<span class="w-8 text-right text-slate">' + starCount + '</span>' +
      '</div>';
  }

  var reviewsHtml = '';
  if (stallReviews.length > 0) {
    for (var rv = 0; rv < stallReviews.length; rv++) {
      reviewsHtml += renderReviewCard(stallReviews[rv], false);
    }
  } else {
    reviewsHtml = '<div class="bg-white rounded-2xl border border-stone-200/80 p-8 text-center"><p class="font-heading font-bold text-ink">No reviews yet for this stall</p><p class="text-sm text-slate mt-1">Be the first LPU student to share your experience!</p></div>';
  }

  // similar stalls
  var similarHtml = '';
  var simCount = 0;
  for (var s = 0; s < state.stalls.length; s++) {
    if (state.stalls[s].id !== stall.id && simCount < 3) {
      similarHtml += renderStallCard(state.stalls[s], 'grid');
      simCount++;
    }
  }

  var saveBtnCls = isFav ? 'bg-brand-soft border-brand-border text-brand' : 'bg-white border-stone-200 text-ink hover:border-brand/40';

  return `
    <main class="pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-xs text-slate mb-5">
          <button type="button" onclick="navigate('home')" class="hover:text-brand">Home</button>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          <button type="button" onclick="navigate('explore')" class="hover:text-brand">Explore Stalls</button>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          <span class="font-semibold text-ink">${escapeHtml(stall.name)}</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div class="lg:col-span-7 space-y-3">
            <div class="relative rounded-[24px] overflow-hidden shadow-card border border-stone-200/70 aspect-[16/10] bg-stone-100">
              <img src="${activeImg}" alt="${escapeHtml(stall.name)}" class="w-full h-full object-cover" />
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${stall.status === 'Open' ? 'bg-fresh text-white' : 'bg-ink/85 text-white'}">
                ${stall.status === 'Open' ? '● Open Now' : 'Currently Closed'}
              </span>
            </div>
            <div class="grid grid-cols-3 gap-3">${thumbsHtml}</div>
          </div>

          <div class="lg:col-span-5">
            <div class="bg-white rounded-[24px] border border-stone-200/80 shadow-card p-6 sm:p-7 space-y-5 sticky top-24">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="flex flex-wrap gap-1.5 mb-2">${cuisineBadges}</div>
                  <h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-ink">${escapeHtml(stall.name)}</h1>
                </div>
                <div class="text-right shrink-0">
                  <div class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-base font-extrabold text-ink"><i data-lucide="star" class="w-4 h-4 fill-gold text-gold"></i> ${stats.avg}</div>
                  <p class="text-[11px] text-slate mt-1">${stats.count} reviews</p>
                </div>
              </div>
              <p class="text-sm text-slate leading-relaxed">${escapeHtml(stall.description)}</p>
              <div class="space-y-3 py-4 border-y border-stone-100 text-sm">
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded-xl bg-canvas flex items-center justify-center text-brand shrink-0"><i data-lucide="map-pin" class="w-4 h-4"></i></span><div><p class="text-xs text-slate">Campus Location</p><p class="font-semibold text-ink">${escapeHtml(stall.location)}</p></div></div>
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded-xl bg-canvas flex items-center justify-center text-fresh shrink-0"><i data-lucide="clock" class="w-4 h-4"></i></span><div><p class="text-xs text-slate">Opening Hours</p><p class="font-semibold text-ink">${escapeHtml(stall.hours)}</p></div></div>
                <div class="flex items-center gap-3"><span class="w-8 h-8 rounded-xl bg-canvas flex items-center justify-center text-ink shrink-0"><i data-lucide="wallet" class="w-4 h-4"></i></span><div><p class="text-xs text-slate">Average Price for Two</p><p class="font-semibold text-ink">₹${stall.priceForTwo} approx.</p></div></div>
              </div>
              <div class="flex flex-wrap gap-2.5">
                <button type="button" onclick="openReviewModal('${stall.id}')" class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors shadow-sm"><i data-lucide="pen-line" class="w-4 h-4"></i> Write a Review</button>
                <button type="button" onclick="toggleFavorite('${stall.id}')" class="px-4 py-3 rounded-xl border font-semibold text-sm inline-flex items-center gap-1.5 transition-colors ${saveBtnCls}"><i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-brand text-brand' : ''}"></i> ${isFav ? 'Saved' : 'Save'}</button>
                <button type="button" onclick="shareStall('${stall.id}')" aria-label="Share stall" class="p-3 rounded-xl border border-stone-200 bg-white text-ink hover:border-brand/40 transition-colors"><i data-lucide="share-2" class="w-4 h-4"></i></button>
              </div>
            </div>
          </div>
        </div>

        <section class="mb-14">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div><p class="text-xs font-bold uppercase tracking-wider text-brand">Freshly Prepared</p><h2 class="font-heading font-extrabold text-2xl text-ink mt-0.5">Menu Highlights</h2></div>
            <div class="flex gap-2 overflow-x-auto no-scrollbar">${menuTabsHtml}</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-grid">${menuCardsHtml}</div>
        </section>

        <section class="mb-14">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div><p class="text-xs font-bold uppercase tracking-wider text-brand">Student Feedback</p><h2 class="font-heading font-extrabold text-2xl text-ink mt-0.5">Ratings & Reviews</h2></div>
            <button type="button" onclick="openReviewModal('${stall.id}')" class="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold transition-colors">+ Write a Review</button>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-card h-fit">
              <div class="flex items-center gap-4 pb-5 border-b border-stone-100">
                <div class="font-heading font-extrabold text-5xl text-ink">${stats.avg}</div>
                <div>${renderStars(stats.avg, 'w-4 h-4')}<p class="text-xs text-slate mt-1">Based on ${stats.count} approved student reviews</p></div>
              </div>
              <div class="space-y-2.5 mt-5">${barsHtml}</div>
            </div>
            <div class="lg:col-span-8 space-y-4">${reviewsHtml}</div>
          </div>
        </section>

        <section>
          <h2 class="font-heading font-extrabold text-2xl text-ink mb-6">Similar Food Stalls Around LPU</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${similarHtml}</div>
        </section>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// reviews page
function renderReviewsScreen() {
  var approved = getReviewsByStatus('Approved');
  var sumStars = 0;
  for (var i = 0; i < approved.length; i++) {
    sumStars += approved[i].rating;
  }
  var avgAll = approved.length > 0 ? (sumStars / approved.length).toFixed(1) : '0.0';

  // filter reviews
  var filtered = [];
  for (var j = 0; j < approved.length; j++) {
    var r = approved[j];
    if (state.reviewFilterStall !== 'all' && r.stallId !== state.reviewFilterStall) continue;
    if (state.reviewFilterStars > 0 && r.rating !== state.reviewFilterStars) continue;
    filtered.push(r);
  }

  if (state.reviewSort === 'newest') {
    filtered.sort(function(a, b) { return b.date.localeCompare(a.date); });
  } else if (state.reviewSort === 'highest') {
    filtered.sort(function(a, b) { return b.rating - a.rating; });
  } else if (state.reviewSort === 'lowest') {
    filtered.sort(function(a, b) { return a.rating - b.rating; });
  }

  // star filter bars
  var starBarsHtml = '';
  for (var star = 5; star >= 1; star--) {
    var count = 0;
    for (var k = 0; k < approved.length; k++) {
      if (approved[k].rating === star) count++;
    }
    var pct = approved.length > 0 ? Math.round((count / approved.length) * 100) : 0;
    var active = (state.reviewFilterStars === star);
    var nextVal = active ? 0 : star;
    var rowCls = active ? 'bg-brand-soft ring-1 ring-brand-border font-bold' : 'hover:bg-canvas';
    starBarsHtml +=
      '<button type="button" onclick="state.reviewFilterStars = ' + nextVal + '; render();" class="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-xl text-xs transition-colors ' + rowCls + '">' +
        '<span class="w-9 text-left font-semibold text-ink">' + star + ' ★</span>' +
        '<div class="flex-1 h-2.5 rounded-full bg-stone-100 overflow-hidden"><div class="h-full rounded-full bg-gold bar-grow" style="width: ' + pct + '%"></div></div>' +
        '<span class="w-8 text-right text-slate">' + pct + '%</span>' +
      '</button>';
  }

  var stallOptionsHtml = '<option value="all">All Food Stalls</option>';
  for (var s = 0; s < state.stalls.length; s++) {
    var sel = (state.reviewFilterStall === state.stalls[s].id) ? 'selected' : '';
    stallOptionsHtml += '<option value="' + state.stalls[s].id + '" ' + sel + '>' + escapeHtml(state.stalls[s].name) + '</option>';
  }

  var listHtml = '';
  if (filtered.length > 0) {
    listHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
    for (var f = 0; f < filtered.length; f++) {
      listHtml += renderReviewCard(filtered[f], true);
    }
    listHtml += '</div>';
  } else {
    listHtml =
      '<div class="bg-white rounded-2xl border border-stone-200/80 p-10 text-center shadow-card">' +
        '<p class="font-heading font-bold text-lg text-ink">No reviews match this filter</p>' +
        '<p class="text-sm text-slate mt-1">Try resetting the stall or star filter to view more reviews.</p>' +
        '<button type="button" onclick="state.reviewFilterStall=\'all\'; state.reviewFilterStars=0; render();" class="mt-4 px-5 py-2 rounded-xl bg-brand text-white text-xs font-semibold">Reset Filters</button>' +
      '</div>';
  }

  return `
    <main class="pt-24 pb-12 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-brand">Community Voices</p>
            <h1 class="font-heading font-extrabold text-3xl sm:text-4xl text-ink mt-1">Student Reviews & Ratings</h1>
            <p class="text-sm sm:text-base text-slate mt-1.5">Real-time food ratings from students across LPU blocks and hostels.</p>
          </div>
          <button type="button" onclick="openReviewModal()" class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold shadow-sm transition-colors">
            <i data-lucide="pen-line" class="w-4 h-4"></i> Write a Review
          </button>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside class="lg:col-span-4 space-y-4">
            <div class="bg-white rounded-[22px] border border-stone-200/80 shadow-card p-6">
              <p class="text-xs font-bold uppercase tracking-wider text-slate">Overall Campus Score</p>
              <div class="flex items-center gap-4 mt-3 pb-5 border-b border-stone-100">
                <span class="font-heading font-extrabold text-5xl text-ink">${avgAll}</span>
                <div>${renderStars(Number(avgAll), 'w-4 h-4')}<p class="text-xs text-slate mt-1">${approved.length} approved reviews</p></div>
              </div>
              <p class="text-xs font-semibold text-ink mt-4 mb-3">Filter by Star Rating</p>
              <div class="space-y-2">${starBarsHtml}</div>
              ${state.reviewFilterStars > 0 ? '<button type="button" onclick="state.reviewFilterStars = 0; render();" class="mt-3 text-xs font-semibold text-brand hover:underline">Show all star ratings</button>' : ''}
            </div>
          </aside>
          <div class="lg:col-span-8 space-y-5">
            <div class="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-card flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <select onchange="state.reviewFilterStall = this.value; render();" aria-label="Filter by stall" class="px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${stallOptionsHtml}</select>
              <select onchange="state.reviewSort = this.value; render();" aria-label="Sort reviews" class="px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">
                <option value="newest"  ${state.reviewSort === 'newest' ? 'selected' : ''}>Sort: Newest First</option>
                <option value="highest" ${state.reviewSort === 'highest' ? 'selected' : ''}>Sort: Highest Rated</option>
                <option value="lowest"  ${state.reviewSort === 'lowest' ? 'selected' : ''}>Sort: Lowest Rated</option>
              </select>
            </div>
            ${listHtml}
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// favorites page
function renderFavoritesScreen() {
  var savedStalls = [];
  var categories = ['All'];
  for (var i = 0; i < state.stalls.length; i++) {
    if (listContains(state.favorites, state.stalls[i].id)) {
      savedStalls.push(state.stalls[i]);
      if (!listContains(categories, state.stalls[i].category)) {
        categories.push(state.stalls[i].category);
      }
    }
  }

  if (state.favCategory !== 'All' && !listContains(categories, state.favCategory)) {
    state.favCategory = 'All';
  }
  var bodyHtml = '';
  if (savedStalls.length > 0) {
    var catHtml = '';
    for (var c = 0; c < categories.length; c++) {
      var cls = (state.favCategory === categories[c]) ? 'bg-brand text-white' : 'bg-white border border-stone-200 text-ink hover:border-brand';
      catHtml += '<button type="button" onclick="state.favCategory = \'' + escapeHtml(categories[c]) + '\'; render();" class="px-4 py-2 rounded-xl text-xs font-semibold transition-colors ' + cls + '">' + escapeHtml(categories[c]) + '</button>';
    }
    var cardsHtml = '';
    for (var j = 0; j < savedStalls.length; j++) {
      if (state.favCategory === 'All' || savedStalls[j].category === state.favCategory) {
        cardsHtml += renderStallCard(savedStalls[j], 'grid');
      }
    }
    bodyHtml = '<div class="flex gap-2 overflow-x-auto no-scrollbar mb-6">' + catHtml + '</div>' +
               '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">' + cardsHtml + '</div>';
  } else {
    bodyHtml = `
      <div class="bg-white rounded-[28px] border border-stone-200/80 shadow-card p-12 sm:p-16 text-center max-w-xl mx-auto my-8">
        <div class="w-20 h-20 rounded-3xl bg-brand-soft text-brand flex items-center justify-center mx-auto mb-5"><i data-lucide="heart-off" class="w-10 h-10"></i></div>
        <h2 class="font-heading font-extrabold text-2xl text-ink">No saved stalls yet</h2>
        <p class="text-sm text-slate mt-2 leading-relaxed">Tap the heart icon on any campus food stall to build your personal LPU foodie shortlist.</p>
        <button type="button" onclick="navigate('explore')" class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold shadow-sm transition-colors">Discover More Stalls <i data-lucide="arrow-right" class="w-4 h-4"></i></button>
      </div>
    `;
  }

  return `
    <main class="pt-24 pb-12 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-brand">Personal Collection</p>
            <h1 class="font-heading font-extrabold text-3xl sm:text-4xl text-ink mt-1">Saved Favorites</h1>
            <p class="text-sm sm:text-base text-slate mt-1.5">Your bookmarked LPU food stalls for quick lunch and late-night decisions.</p>
          </div>
          <button type="button" onclick="navigate('explore')" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 hover:border-brand text-ink text-sm font-semibold transition-colors"><i data-lucide="compass" class="w-4 h-4 text-brand"></i> Discover More Stalls</button>
        </div>
        ${bodyHtml}
      </div>
    </main>
    ${renderFooter()}
  `;
}

// admin layout
function renderAdminLayout(contentHtml, pageTitle, pageSubtitle) {
  var pendingCount = getReviewsByStatus('Pending').length;
  var sidebarLinks = [
    { id: 'admin-overview',   label: 'Overview',        icon: 'layout-dashboard',     badge: 0 },
    { id: 'admin-stalls',     label: 'Manage Stalls',   icon: 'store',                badge: 0 },
    { id: 'admin-menus',      label: 'Menu Management', icon: 'utensils',             badge: 0 },
    { id: 'admin-reviews',    label: 'Reviews',         icon: 'message-square-check', badge: pendingCount },
    { id: 'admin-categories', label: 'Categories',      icon: 'tags',                 badge: 0 },
    { id: 'admin-settings',   label: 'Settings',        icon: 'settings',             badge: 0 }
  ];

  var navHtml = '';
  for (var i = 0; i < sidebarLinks.length; i++) {
    var item = sidebarLinks[i];
    var active = (state.route === item.id);
    var btnCls = active ? 'bg-brand text-white shadow-sm' : 'text-slate hover:bg-canvas hover:text-ink';
    var badgeCls = active ? 'bg-white text-brand' : 'bg-brand-soft text-brand';
    var badgeHtml = item.badge > 0 ? '<span class="px-2 py-0.5 rounded-full text-[11px] font-bold ' + badgeCls + '">' + item.badge + '</span>' : '';
    navHtml +=
      '<button type="button" onclick="navigate(\'' + item.id + '\')" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ' + btnCls + '">' +
        '<span class="flex items-center gap-3"><i data-lucide="' + item.icon + '" class="w-4 h-4"></i><span>' + item.label + '</span></span>' + badgeHtml +
      '</button>';
  }

  var mobileDrawerHtml = '';
  if (state.adminMobileSidebarOpen) {
    mobileDrawerHtml =
      '<div class="lg:hidden fixed inset-0 z-50 flex">' +
        '<div class="fixed inset-0 bg-ink/50" onclick="state.adminMobileSidebarOpen = false; render();"></div>' +
        '<aside class="relative w-64 max-w-[80vw] bg-white h-full flex flex-col shadow-xl z-10">' +
          '<div class="h-16 px-5 flex items-center justify-between border-b border-stone-100">' +
            '<span class="font-heading font-extrabold text-base text-ink">Campus<span class="text-brand">Bites</span> Admin</span>' +
            '<button type="button" onclick="state.adminMobileSidebarOpen = false; render();" class="p-1.5 rounded-lg text-slate hover:bg-canvas"><i data-lucide="x" class="w-5 h-5"></i></button>' +
          '</div>' +
          '<nav class="flex-1 p-3 space-y-1">' + navHtml + '</nav>' +
          '<div class="p-4 border-t border-stone-100"><button type="button" onclick="navigate(\'home\')" class="w-full py-2.5 rounded-xl bg-canvas border border-stone-200 text-xs font-semibold text-ink">← Student Portal</button></div>' +
        '</aside>' +
      '</div>';
  }

  return `
    <div class="min-h-screen bg-canvas flex">
      <aside class="hidden lg:flex lg:flex-col w-64 bg-white border-r border-stone-200/80 fixed inset-y-0 left-0 z-30">
        <div class="h-[72px] px-5 flex items-center border-b border-stone-100">
          <button type="button" onclick="navigate('home')" class="flex items-center gap-2.5">
            <img src="images/campusbites-logo-3d.jpg" alt="CampusBites Logo" class="w-9 h-9 rounded-xl object-cover shadow-sm" />
            <div class="text-left"><p class="font-heading font-extrabold text-base text-ink leading-none">Campus<span class="text-brand">Bites</span></p><p class="text-[10px] font-bold uppercase tracking-wider text-slate mt-0.5">Admin Console</p></div>
          </button>
        </div>
        <nav class="flex-1 p-3.5 space-y-1">${navHtml}</nav>
        <div class="p-4 border-t border-stone-100">
          <button type="button" onclick="navigate('home')" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-canvas border border-stone-200 text-xs font-semibold text-ink hover:border-brand hover:text-brand transition-colors"><i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to Student Portal</button>
        </div>
      </aside>
      ${mobileDrawerHtml}
      <div class="flex-1 lg:pl-64 min-w-0">
        <header class="sticky top-0 z-20 h-16 lg:h-[72px] bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 min-w-0">
            <button type="button" onclick="state.adminMobileSidebarOpen = true; render();" class="lg:hidden p-2 rounded-xl border border-stone-200 text-ink"><i data-lucide="menu" class="w-5 h-5"></i></button>
            <div class="min-w-0"><h1 class="font-heading font-extrabold text-lg sm:text-xl text-ink truncate">${pageTitle}</h1><p class="hidden sm:block text-xs text-slate truncate">${pageSubtitle}</p></div>
          </div>
          <div class="flex items-center gap-2.5">
            <button type="button" onclick="openStallModal()" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-semibold transition-colors"><i data-lucide="plus" class="w-4 h-4"></i> <span class="hidden sm:inline">Add Stall</span></button>
            <button type="button" onclick="navigate('home')" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-canvas border border-stone-200 text-xs font-semibold text-ink hover:border-brand"><i data-lucide="external-link" class="w-3.5 h-3.5 text-brand"></i> View Site</button>
          </div>
        </header>
        <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">${contentHtml}</div>
      </div>
    </div>
  `;
}

// admin overview
function renderAdminOverview() {
  var approved = getReviewsByStatus('Approved');
  var pendingCount = getReviewsByStatus('Pending').length;
  var openCount = 0;
  for (var i = 0; i < state.stalls.length; i++) {
    if (state.stalls[i].status === 'Open') openCount++;
  }
  var sumRating = 0;
  for (var j = 0; j < approved.length; j++) {
    sumRating += approved[j].rating;
  }
  var avgRating = approved.length > 0 ? (sumRating / approved.length).toFixed(2) : '0.0';

  var kpis = [
    { label: 'Total Food Stalls', value: state.stalls.length,  sub: openCount + ' currently open', icon: 'store',          color: 'text-brand bg-brand-soft' },
    { label: 'Total Reviews',     value: state.reviews.length, sub: approved.length + ' published', icon: 'message-square', color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Average Rating',    value: avgRating + ' ★',     sub: 'Across approved reviews',       icon: 'star',           color: 'text-amber-600 bg-amber-50' },
    { label: 'Pending Reviews',   value: pendingCount,         sub: 'Awaiting moderation',           icon: 'clock',          color: 'text-fresh bg-fresh/10' }
  ];
  var kpiHtml = '';
  for (var k = 0; k < kpis.length; k++) {
    kpiHtml +=
      '<div class="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-card flex items-start justify-between">' +
        '<div><p class="text-xs font-semibold text-slate">' + kpis[k].label + '</p><p class="font-heading font-extrabold text-3xl text-ink mt-1.5">' + kpis[k].value + '</p><p class="text-xs text-slate mt-1">' + kpis[k].sub + '</p></div>' +
        '<span class="w-11 h-11 rounded-xl flex items-center justify-center ' + kpis[k].color + '"><i data-lucide="' + kpis[k].icon + '" class="w-5 h-5"></i></span>' +
      '</div>';
  }

  var popular = state.stalls.slice();
  popular.sort(function(a, b) { return getStallStats(b.id).avg - getStallStats(a.id).avg; });
  var popularHtml = '';
  for (var p = 0; p < Math.min(5, popular.length); p++) {
    var st = popular[p];
    popularHtml +=
      '<div class="flex items-center justify-between gap-3">' +
        '<div class="flex items-center gap-3 min-w-0"><img src="' + st.image + '" alt="' + escapeHtml(st.name) + '" class="w-10 h-10 rounded-xl object-cover shrink-0" />' +
        '<div class="min-w-0"><p class="font-semibold text-sm text-ink truncate">' + escapeHtml(st.name) + '</p><p class="text-xs text-slate truncate">' + escapeHtml(st.category) + ' • ₹' + st.priceForTwo + ' for 2</p></div></div>' +
        '<span class="shrink-0 px-2.5 py-1 rounded-lg bg-amber-50 text-xs font-bold text-ink">' + getStallStats(st.id).avg + ' ★</span>' +
      '</div>';
  }

  var recent = state.reviews.slice();
  recent.sort(function(a, b) { return b.date.localeCompare(a.date); });
  var recentRowsHtml = '';
  for (var r = 0; r < Math.min(5, recent.length); r++) {
    var rev = recent[r];
    var stallObj = findStallById(rev.stallId);
    recentRowsHtml +=
      '<tr class="hover:bg-canvas/60">' +
        '<td class="px-6 py-3.5 font-semibold text-ink">' + escapeHtml(rev.student) + '</td>' +
        '<td class="px-6 py-3.5 text-slate">' + (stallObj ? escapeHtml(stallObj.name) : '—') + '</td>' +
        '<td class="px-6 py-3.5 font-semibold text-ink">' + rev.rating + ' ★</td>' +
        '<td class="px-6 py-3.5 text-slate">' + formatDate(rev.date) + '</td>' +
        '<td class="px-6 py-3.5"><span class="px-2.5 py-1 rounded-full text-xs font-semibold ' + getStatusBadgeClass(rev.status) + '">' + rev.status + '</span></td>' +
      '</tr>';
  }

  var content = `
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 stagger-grid">${kpiHtml}</div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      <div class="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <div><h2 class="font-heading font-bold text-base text-ink">Stall Category Distribution</h2><p class="text-xs text-slate">Active food stalls grouped by primary cuisine</p></div>
          <span class="px-2.5 py-1 rounded-lg bg-canvas text-xs font-semibold text-slate">Updated</span>
        </div>
        <div class="relative h-72"><canvas id="admin-category-chart"></canvas></div>
      </div>
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-card">
          <h2 class="font-heading font-bold text-base text-ink mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            <button type="button" onclick="openStallModal()" class="flex items-center justify-between px-4 py-3 rounded-xl bg-brand-soft hover:bg-brand text-brand hover:text-white font-semibold text-sm transition-colors"><span class="flex items-center gap-2.5"><i data-lucide="plus-circle" class="w-4 h-4"></i> Add New Food Stall</span><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
            <button type="button" onclick="navigate('admin-reviews')" class="flex items-center justify-between px-4 py-3 rounded-xl bg-canvas hover:bg-stone-100 text-ink font-semibold text-sm transition-colors"><span class="flex items-center gap-2.5"><i data-lucide="shield-alert" class="w-4 h-4 text-brand"></i> Moderate Pending Reviews (${pendingCount})</span><i data-lucide="chevron-right" class="w-4 h-4 text-slate"></i></button>
            <button type="button" onclick="navigate('admin-menus')" class="flex items-center justify-between px-4 py-3 rounded-xl bg-canvas hover:bg-stone-100 text-ink font-semibold text-sm transition-colors"><span class="flex items-center gap-2.5"><i data-lucide="utensils" class="w-4 h-4 text-fresh"></i> Manage Stall Menus</span><i data-lucide="chevron-right" class="w-4 h-4 text-slate"></i></button>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-card">
          <h2 class="font-heading font-bold text-base text-ink mb-4">Popular Stalls</h2>
          <div class="space-y-3">${popularHtml}</div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
        <h2 class="font-heading font-bold text-base text-ink">Recent Student Reviews</h2>
        <button type="button" onclick="navigate('admin-reviews')" class="text-xs font-semibold text-brand hover:underline">Open Moderation Queue →</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-canvas text-xs uppercase text-slate font-semibold"><tr><th class="px-6 py-3">Student</th><th class="px-6 py-3">Food Stall</th><th class="px-6 py-3">Rating</th><th class="px-6 py-3">Date</th><th class="px-6 py-3">Status</th></tr></thead>
          <tbody class="divide-y divide-stone-100">${recentRowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;
  return renderAdminLayout(content, 'Dashboard Overview', 'Real-time summary of LPU campus stalls, ratings, and moderation queue');
}

// admin stalls
function renderAdminStalls() {
  var q = state.adminStallSearch.trim().toLowerCase();
  var filtered = [];
  for (var i = 0; i < state.stalls.length; i++) {
    var s = state.stalls[i];
    if (state.adminStallCategory !== 'All' && s.category !== state.adminStallCategory) continue;
    if (q !== '' && s.name.toLowerCase().indexOf(q) < 0 && s.location.toLowerCase().indexOf(q) < 0) continue;
    filtered.push(s);
  }

  var perPage = 5;
  var totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  if (state.adminStallPage > totalPages) state.adminStallPage = totalPages;
  var startIndex = (state.adminStallPage - 1) * perPage;
  var endIndex = Math.min(startIndex + perPage, filtered.length);

  var rowsHtml = '';
  if (filtered.length === 0) {
    rowsHtml = '<tr><td colspan="7" class="px-6 py-12 text-center text-slate">No stalls match your search.</td></tr>';
  } else {
    for (var j = startIndex; j < endIndex; j++) {
      var stall = filtered[j];
      var st = getStallStats(stall.id);
      var badgeCls = (stall.status === 'Open') ? 'bg-fresh/10 text-fresh' : 'bg-stone-100 text-slate';
      rowsHtml += `
        <tr class="hover:bg-canvas/50">
          <td class="px-5 py-3.5"><div class="flex items-center gap-3"><img src="${stall.image}" alt="${escapeHtml(stall.name)}" class="w-11 h-11 rounded-xl object-cover shrink-0" /><div><p class="font-bold text-ink">${escapeHtml(stall.name)}</p><p class="text-xs text-slate">${escapeHtml(stall.hours)}</p></div></div></td>
          <td class="px-5 py-3.5 text-slate">${escapeHtml(stall.location)}</td>
          <td class="px-5 py-3.5"><span class="px-2.5 py-1 rounded-lg bg-canvas border border-stone-200 text-xs font-medium text-ink">${escapeHtml(stall.category)}</span></td>
          <td class="px-5 py-3.5 font-semibold text-ink">₹${stall.priceForTwo}</td>
          <td class="px-5 py-3.5 font-semibold text-ink">${st.avg} ★ <span class="text-xs text-slate font-normal">(${st.count})</span></td>
          <td class="px-5 py-3.5"><span class="px-2.5 py-1 rounded-full text-xs font-semibold ${badgeCls}">${stall.status}</span></td>
          <td class="px-5 py-3.5 text-right whitespace-nowrap">
            <button type="button" onclick="openStallModal('${stall.id}')" class="p-2 rounded-lg text-slate hover:text-brand hover:bg-brand-soft transition-colors" title="Edit stall"><i data-lucide="pencil" class="w-4 h-4"></i></button>
            <button type="button" onclick="openDeleteStallConfirm('${stall.id}')" class="p-2 rounded-lg text-slate hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete stall"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </td>
        </tr>
      `;
    }
  }

  var cats = getAllCategories();
  var catOptions = '';
  for (var c = 0; c < cats.length; c++) {
    var sel = (state.adminStallCategory === cats[c]) ? 'selected' : '';
    catOptions += '<option value="' + escapeHtml(cats[c]) + '" ' + sel + '>' + escapeHtml(cats[c]) + '</option>';
  }

  var pageButtons = '';
  for (var p = 1; p <= totalPages; p++) {
    var pCls = (state.adminStallPage === p) ? 'bg-brand text-white' : 'border border-stone-200 hover:border-brand';
    pageButtons += '<button type="button" onclick="state.adminStallPage = ' + p + '; render();" class="w-8 h-8 rounded-lg font-bold ' + pCls + '">' + p + '</button>';
  }

  var content = `
    <div class="bg-white rounded-2xl border border-stone-200/80 shadow-card overflow-hidden">
      <div class="p-5 border-b border-stone-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div class="flex flex-col sm:flex-row gap-3 flex-1">
          <div class="relative flex-1 max-w-sm">
            <i data-lucide="search" class="w-4 h-4 text-slate absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input id="admin-stall-search" type="text" value="${escapeHtml(state.adminStallSearch)}" oninput="handleAdminStallSearch(this.value)" placeholder="Search stalls or locations..." class="w-full pl-10 pr-4 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" />
          </div>
          <select onchange="state.adminStallCategory = this.value; state.adminStallPage = 1; render();" class="px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${catOptions}</select>
        </div>
        <button type="button" onclick="openStallModal()" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold transition-colors"><i data-lucide="plus" class="w-4 h-4"></i> Add New Stall</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-canvas text-xs uppercase text-slate font-semibold"><tr><th class="px-5 py-3.5">Food Stall</th><th class="px-5 py-3.5">Location</th><th class="px-5 py-3.5">Category</th><th class="px-5 py-3.5">Price (for 2)</th><th class="px-5 py-3.5">Rating</th><th class="px-5 py-3.5">Status</th><th class="px-5 py-3.5 text-right">Actions</th></tr></thead>
          <tbody class="divide-y divide-stone-100">${rowsHtml}</tbody>
        </table>
      </div>
      <div class="px-5 py-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate">
        <p>Showing <span class="font-semibold text-ink">${filtered.length ? startIndex + 1 : 0}–${endIndex}</span> of <span class="font-semibold text-ink">${filtered.length}</span> stalls</p>
        <div class="flex items-center gap-1.5">
          <button type="button" ${state.adminStallPage <= 1 ? 'disabled' : ''} onclick="state.adminStallPage--; render();" class="px-3 py-1.5 rounded-lg border border-stone-200 font-semibold disabled:opacity-40 hover:border-brand">Prev</button>
          ${pageButtons}
          <button type="button" ${state.adminStallPage >= totalPages ? 'disabled' : ''} onclick="state.adminStallPage++; render();" class="px-3 py-1.5 rounded-lg border border-stone-200 font-semibold disabled:opacity-40 hover:border-brand">Next</button>
        </div>
      </div>
    </div>
  `;
  return renderAdminLayout(content, 'Manage Food Stalls', 'Add, edit, or update campus food stall listings and operating status');
}

// admin review moderation
function renderAdminReviews() {
  var tabs = ['Pending', 'Approved', 'Rejected'];
  var tabsHtml = '';
  for (var t = 0; t < tabs.length; t++) {
    var tab = tabs[t];
    var count = getReviewsByStatus(tab).length;
    var active = (state.adminModTab === tab);
    var cls = active ? 'bg-brand text-white shadow-sm' : 'text-slate hover:text-ink';
    var bCls = active ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-ink';
    tabsHtml +=
      '<button type="button" onclick="state.adminModTab = \'' + tab + '\'; render();" class="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 ' + cls + '">' +
        '<span>' + tab + '</span><span class="px-1.5 py-0.5 rounded-full text-[10px] ' + bCls + '">' + count + '</span>' +
      '</button>';
  }

  var q = state.adminModSearch.trim().toLowerCase();
  var filtered = [];
  for (var i = 0; i < state.reviews.length; i++) {
    var r = state.reviews[i];
    if (r.status !== state.adminModTab) continue;
    if (state.adminModStall !== 'all' && r.stallId !== state.adminModStall) continue;
    if (q !== '' && r.student.toLowerCase().indexOf(q) < 0 && r.text.toLowerCase().indexOf(q) < 0) continue;
    filtered.push(r);
  }

  var stallOptions = '<option value="all">All Stalls</option>';
  for (var s = 0; s < state.stalls.length; s++) {
    var sel = (state.adminModStall === state.stalls[s].id) ? 'selected' : '';
    stallOptions += '<option value="' + state.stalls[s].id + '" ' + sel + '>' + escapeHtml(state.stalls[s].name) + '</option>';
  }

  var listHtml = '';
  if (filtered.length > 0) {
    listHtml = '<div class="space-y-3.5">';
    for (var j = 0; j < filtered.length; j++) {
      var rev = filtered[j];
      var st = findStallById(rev.stallId);
      var approveBtn = (rev.status !== 'Approved') ? '<button type="button" onclick="openModerationConfirm(\'' + rev.id + '\', \'Approved\')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-fresh hover:bg-fresh/90 text-white text-xs font-semibold transition-colors"><i data-lucide="check" class="w-3.5 h-3.5"></i> Approve</button>' : '';
      var rejectBtn  = (rev.status !== 'Rejected') ? '<button type="button" onclick="openModerationConfirm(\'' + rev.id + '\', \'Rejected\')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"><i data-lucide="x" class="w-3.5 h-3.5"></i> Reject</button>' : '';
      listHtml += `
        <article class="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-2 flex-1">
            <div class="flex flex-wrap items-center gap-2.5">
              <span class="w-9 h-9 rounded-full bg-brand-soft text-brand font-heading font-bold text-xs flex items-center justify-center">${getInitials(rev.student)}</span>
              <div><p class="font-bold text-sm text-ink">${escapeHtml(rev.student)} <span class="text-xs font-normal text-slate">• ${formatDate(rev.date)}</span></p><p class="text-xs text-slate">Reviewed <span class="font-semibold text-ink">${st ? escapeHtml(st.name) : 'Deleted Stall'}</span></p></div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(rev.status)}">${rev.status}</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-xs font-bold text-ink">${rev.rating} ★</span>
            </div>
            <p class="text-sm text-ink/90 leading-relaxed pl-0 md:pl-11">${escapeHtml(rev.text)}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">${approveBtn}${rejectBtn}</div>
        </article>
      `;
    }
    listHtml += '</div>';
  } else {
    listHtml =
      '<div class="bg-white rounded-2xl border border-stone-200/80 p-12 text-center shadow-card">' +
        '<div class="w-14 h-14 rounded-2xl bg-fresh/10 text-fresh flex items-center justify-center mx-auto mb-3"><i data-lucide="check-circle-2" class="w-7 h-7"></i></div>' +
        '<h3 class="font-heading font-bold text-lg text-ink">No ' + state.adminModTab.toLowerCase() + ' reviews</h3>' +
        '<p class="text-sm text-slate mt-1">Everything in this moderation tab is up to date.</p>' +
      '</div>';
  }

  var content = `
    <div class="space-y-5">
      <div class="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-card flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div class="inline-flex bg-canvas p-1 rounded-xl border border-stone-200/70">${tabsHtml}</div>
        <div class="flex flex-col sm:flex-row gap-2.5">
          <div class="relative"><i data-lucide="search" class="w-4 h-4 text-slate absolute left-3 top-1/2 -translate-y-1/2"></i><input id="admin-mod-search" type="text" value="${escapeHtml(state.adminModSearch)}" oninput="handleAdminModSearch(this.value)" placeholder="Search student or text..." class="w-full sm:w-56 pl-9 pr-3 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
          <select onchange="state.adminModStall = this.value; render();" class="px-3 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${stallOptions}</select>
        </div>
      </div>
      ${listHtml}
    </div>
  `;
  return renderAdminLayout(content, 'Review Moderation', 'Approve or reject incoming student reviews before they appear publicly');
}

// admin sub-pages
function renderAdminMenus() {
  var stall = findStallById(state.adminMenuStallId);
  if (!stall) stall = state.stalls[0];
  if (!stall) {
    return renderAdminLayout(
      '<div class="bg-white rounded-2xl border border-stone-200/80 p-12 text-center shadow-card"><p class="font-heading font-bold text-lg text-ink">No food stalls available</p><p class="text-sm text-slate mt-1">Add a food stall first to manage its menu items.</p><button type="button" onclick="openStallModal()" class="mt-4 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold">+ Add New Stall</button></div>',
      'Menu Management',
      'Inspect and add food items with rupee pricing per campus stall'
    );
  }

  var options = '';
  for (var i = 0; i < state.stalls.length; i++) {
    var sel = (state.stalls[i].id === stall.id) ? 'selected' : '';
    options += '<option value="' + state.stalls[i].id + '" ' + sel + '>' + escapeHtml(state.stalls[i].name) + '</option>';
  }

  var itemsHtml = '';
  for (var j = 0; j < stall.menu.length; j++) {
    var item = stall.menu[j];
    itemsHtml += `
      <div class="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-card flex items-center justify-between gap-4">
        <div class="flex items-center gap-3.5 min-w-0">
          <img src="${item.img || stall.image}" alt="${escapeHtml(item.name)}" class="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div class="min-w-0"><p class="font-heading font-bold text-sm text-ink truncate">${escapeHtml(item.name)}</p><p class="text-xs text-slate">${escapeHtml(item.category)} • ${item.veg ? 'Veg' : 'Non-Veg'}</p><p class="font-bold text-sm text-brand mt-1">₹${item.price}</p></div>
        </div>
        <button type="button" onclick="deleteMenuItem('${stall.id}', '${item.id}')" class="p-2 rounded-xl text-slate hover:text-red-600 hover:bg-red-50 transition-colors" title="Remove item"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    `;
  }

  var content = `
    <div class="space-y-6">
      <div class="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3"><label class="text-xs font-bold uppercase text-slate">Select Stall:</label><select onchange="state.adminMenuStallId = this.value; render();" class="px-4 py-2 text-sm font-semibold bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${options}</select></div>
        <button type="button" onclick="openAddMenuItemModal('${stall.id}')" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-semibold"><i data-lucide="plus" class="w-4 h-4"></i> Add Menu Item</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${itemsHtml}</div>
    </div>
  `;
  return renderAdminLayout(content, 'Menu Management', 'Inspect and add food items with rupee pricing per campus stall');
}

function renderAdminCategories() {
  var cats = getAllCategories();
  var cardsHtml = '';
  for (var i = 0; i < cats.length; i++) {
    if (cats[i] === 'All') continue;
    var count = 0;
    for (var j = 0; j < state.stalls.length; j++) {
      if (state.stalls[j].category === cats[i] || listContains(state.stalls[j].cuisines, cats[i])) count++;
    }
    cardsHtml +=
      '<div class="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-card flex items-center justify-between">' +
        '<div><h3 class="font-heading font-bold text-base text-ink">' + escapeHtml(cats[i]) + '</h3><p class="text-xs text-slate mt-0.5">' + count + ' linked ' + (count === 1 ? 'stall' : 'stalls') + '</p></div>' +
        '<span class="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center font-heading font-bold text-sm">' + count + '</span>' +
      '</div>';
  }

  var content = `
    <div class="space-y-6">
      <form onsubmit="handleAddCategory(event)" class="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-card flex flex-col sm:flex-row gap-3">
        <input id="new-category-input" type="text" required placeholder="Add a new cuisine category (e.g., Rolls & Wraps)..." class="flex-1 px-4 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" />
        <button type="submit" class="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold">Add Category</button>
      </form>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${cardsHtml}</div>
    </div>
  `;
  return renderAdminLayout(content, 'Food Categories', 'Manage cuisine tags shown in discovery filters');
}

function renderAdminSettings() {
  var content = `
    <div class="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-card max-w-2xl space-y-6">
      <div><h2 class="font-heading font-bold text-lg text-ink">Portal Display Settings</h2><p class="text-xs text-slate mt-0.5">Configure display and moderation preferences for CampusBites.</p></div>
      <div class="space-y-4 divide-y divide-stone-100">
        <label class="flex items-center justify-between gap-4 pt-2 cursor-pointer">
          <div><p class="text-sm font-semibold text-ink">Show Announcement Banner on Landing Page</p><p class="text-xs text-slate">Displays the campus dining announcement bar below the navbar.</p></div>
          <input type="checkbox" ${state.settings.showBanner ? 'checked' : ''} onchange="state.settings.showBanner = this.checked; showToast('Display setting updated');" class="w-5 h-5 accent-brand rounded" />
        </label>
        <label class="flex items-center justify-between gap-4 pt-4 cursor-pointer">
          <div><p class="text-sm font-semibold text-ink">Publish New Student Reviews Immediately</p><p class="text-xs text-slate">When on, submitted reviews appear live right away without requiring admin approval.</p></div>
          <input type="checkbox" ${state.settings.instantPublishReviews ? 'checked' : ''} onchange="state.settings.instantPublishReviews = this.checked; showToast('Review publishing rule updated');" class="w-5 h-5 accent-brand rounded" />
        </label>
      </div>
      <div class="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
        <div><p class="text-sm font-semibold text-ink">Reset Default Data</p><p class="text-xs text-slate">Restore the default 15 LPU campus outlets and 21 reviews.</p></div>
        <button type="button" onclick="resetAllData()" class="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100">Reset Data</button>
      </div>
    </div>
  `;
  return renderAdminLayout(content, 'Portal Settings', 'Display and data preferences');
}
