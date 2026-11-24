// actions, modals and render

function navigate(route, opts) {
  state.route = route;
  if (opts) {
    if (opts.stallId) { state.selectedStallId = opts.stallId; state.activeGalleryIdx = 0; state.activeMenuCategory = 'All'; }
    if (opts.category !== undefined) state.exploreCategory = opts.category;
    if (opts.sort !== undefined)     state.exploreSort = opts.sort;
    if (opts.search !== undefined)   state.exploreSearch = opts.search;
  }
  state.adminMobileSidebarOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function goToCategories() {
  var section = document.getElementById('home-categories');
  if (state.route === 'home' && section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    navigate('explore', { category: 'All' });
  }
}

function handleNavSearch(e)    { e.preventDefault(); navigate('explore', { search: document.getElementById('nav-search-input').value.trim() }); }
function handleHeroSearch(e)   { e.preventDefault(); navigate('explore', { search: document.getElementById('hero-search-input').value.trim() }); }
function handleMobileSearch(e) { e.preventDefault(); var q = document.getElementById('mobile-search-input').value.trim(); toggleMobileMenu(); navigate('explore', { search: q }); }
function toggleMobileMenu()    { document.getElementById('mobile-menu').classList.toggle('hidden'); }
function toggleAvatarMenu()    { document.getElementById('avatar-menu').classList.toggle('hidden'); }

function resetExploreFilters() {
  state.exploreSearch = '';
  state.exploreCategory = 'All';
  state.explorePrice = 'all';
  state.exploreRating = 0;
  state.exploreSort = 'recommended';
  render();
}

function renderExploreResultsOnly() {
  var filtered = getFilteredStalls();
  var container = document.getElementById('explore-results-container');
  var countEl = document.getElementById('explore-count');
  if (container) container.innerHTML = renderExploreResultsMarkup(filtered);
  if (countEl) countEl.innerHTML = 'Showing <span class="font-bold text-ink">' + filtered.length + '</span> of <span class="font-semibold text-ink">' + state.stalls.length + '</span> campus food stalls';
  if (window.lucide) lucide.createIcons();
}

function triggerSkeletonPreview() {
  state.isLoadingSkeleton = true;
  render();
  setTimeout(function() { state.isLoadingSkeleton = false; render(); }, 950);
}

function toggleFavorite(stallId, ev) {
  if (ev) ev.stopPropagation();
  var stall = findStallById(stallId);
  var idx = state.favorites.indexOf(stallId);

  if (idx >= 0) {
    state.favorites.splice(idx, 1);
    saveFavorites();
    showToast('Removed ' + (stall ? stall.name : 'stall') + ' from Favorites', 'info', 'Undo', function() {
      if (!listContains(state.favorites, stallId)) {
        state.favorites.push(stallId);
        saveFavorites();
        render();
      }
    });
  } else {
    state.favorites.push(stallId);
    saveFavorites();
    showToast('Saved ' + (stall ? stall.name : 'stall') + ' to Favorites', 'success', 'View', function() {
      navigate('favorites');
    });
  }
  render();
}

function toggleHelpful(reviewId) {
  var rev = findReviewById(reviewId);
  if (!rev) return;
  var idx = state.helpfulIds.indexOf(reviewId);
  if (idx >= 0) {
    state.helpfulIds.splice(idx, 1);
    rev.helpful = Math.max(0, rev.helpful - 1);
  } else {
    state.helpfulIds.push(reviewId);
    rev.helpful = rev.helpful + 1;
    showToast('Marked review as helpful', 'success');
  }
  saveReviews();
  render();
}

function shareStall(stallId) {
  var stall = findStallById(stallId);
  var stallName = stall ? stall.name : 'this stall';
  var text = 'Check out ' + stallName + ' on CampusBites LPU!';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('Stall link copied to clipboard');
    }).catch(function() {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showToast('Stall link copied to clipboard'); } catch (e) { showToast('Copied stall info', 'info'); }
  ta.remove();
}

function openModal(html) {
  var root = document.getElementById('modal-root');
  root.innerHTML = html;
  root.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  var root = document.getElementById('modal-root');
  root.classList.add('hidden');
  root.innerHTML = '';
}

function setModalRating(val) {
  modalRating = val;
  var labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Loved it!'];
  var buttons = document.querySelectorAll('.star-picker-btn');
  for (var i = 0; i < buttons.length; i++) {
    var starNum = Number(buttons[i].dataset.star);
    var icon = buttons[i].querySelector('svg, i');
    if (icon) {
      icon.classList.toggle('fill-gold', starNum <= val);
      icon.classList.toggle('text-gold', starNum <= val);
      icon.classList.toggle('text-stone-300', starNum > val);
    }
  }
  var lbl = document.getElementById('star-picker-label');
  if (lbl) lbl.textContent = val + '/5 — ' + labels[val];
}

function openReviewModal(preselectStallId) {
  modalRating = 5;
  var selected = preselectStallId || (state.stalls[0] ? state.stalls[0].id : '');
  var options = '';
  for (var i = 0; i < state.stalls.length; i++) {
    var sel = (state.stalls[i].id === selected) ? 'selected' : '';
    options += '<option value="' + state.stalls[i].id + '" ' + sel + '>' + escapeHtml(state.stalls[i].name) + ' (' + escapeHtml(state.stalls[i].location) + ')</option>';
  }
  var starBtns = '';
  for (var n = 1; n <= 5; n++) {
    starBtns += '<button type="button" data-star="' + n + '" onclick="setModalRating(' + n + ')" class="star-picker-btn p-1 focus:outline-none hover:scale-110 transition-transform"><i data-lucide="star" class="w-6 h-6 fill-gold text-gold"></i></button>';
  }

  openModal(`
    <div class="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-float animate-in max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-5">
        <div><h2 class="font-heading font-extrabold text-xl text-ink">Write a Student Review</h2><p class="text-xs text-slate mt-0.5">Share your honest take to help fellow LPU students.</p></div>
        <button type="button" onclick="closeModal()" class="p-2 rounded-xl hover:bg-canvas text-slate"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <form onsubmit="submitReviewForm(event)" class="space-y-4">
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Your Name</label><input id="rev-student" type="text" required placeholder="e.g., Aarav Sharma" class="w-full px-4 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Select Food Stall</label><select id="rev-stall" class="w-full px-4 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${options}</select></div>
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Your Rating</label><div class="flex items-center gap-2 bg-canvas border border-stone-200 rounded-xl px-4 py-2.5">${starBtns}<span id="star-picker-label" class="ml-2 text-xs font-semibold text-ink">5/5 — Loved it!</span></div></div>
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Review</label><textarea id="rev-text" rows="4" required placeholder="What did you try? How were the taste, portion size, and value?" class="w-full px-4 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand resize-none"></textarea></div>
        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button type="button" onclick="closeModal()" class="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-slate hover:bg-canvas">Cancel</button>
          <button type="submit" class="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold shadow-sm">Submit Review</button>
        </div>
      </form>
    </div>
  `);
}

function submitReviewForm(e) {
  e.preventDefault();
  var student = document.getElementById('rev-student').value.trim();
  var stallId = document.getElementById('rev-stall').value;
  var text = document.getElementById('rev-text').value.trim();
  var today = new Date().toISOString().slice(0, 10);

  var newStatus = state.settings.instantPublishReviews ? 'Approved' : 'Pending';
  state.reviews.unshift({
    id: 'rev-' + Date.now(),
    stallId: stallId,
    student: student,
    program: 'LPU Student',
    rating: modalRating,
    date: today,
    text: text,
    status: newStatus,
    helpful: 0
  });
  saveReviews();
  // Reset review filters so the newly posted review is immediately visible
  state.reviewFilterStars = 0;
  if (state.reviewFilterStall !== 'all' && state.reviewFilterStall !== stallId) {
    state.reviewFilterStall = 'all';
  }
  render();

  openModal(`
    <div class="bg-white rounded-[24px] max-w-md w-full p-7 text-center shadow-float animate-in">
      <div class="w-16 h-16 rounded-2xl bg-fresh/10 text-fresh flex items-center justify-center mx-auto mb-4"><i data-lucide="check-circle-2" class="w-9 h-9"></i></div>
      <h2 class="font-heading font-extrabold text-xl text-ink">Review Published!</h2>
      <p class="text-sm text-slate mt-2 leading-relaxed">Thanks, <span class="font-semibold text-ink">${escapeHtml(student)}</span>! Your review is now live on the Reviews page and stall details.</p>
      <div class="flex flex-col sm:flex-row gap-2.5 justify-center mt-6">
        <button type="button" onclick="closeModal()" class="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold">Done</button>
        <button type="button" onclick="closeModal(); navigate('reviews');" class="px-5 py-2.5 rounded-xl border border-stone-200 text-ink text-sm font-semibold hover:border-brand">View Reviews</button>
      </div>
    </div>
  `);
}

function openStallModal(editId) {
  var existing = editId ? findStallById(editId) : null;
  var selectedImg = existing ? existing.image : FOOD_IMAGES.punjabi;

  var cats = getAllCategories();
  var catOptions = '';
  for (var i = 0; i < cats.length; i++) {
    if (cats[i] === 'All') continue;
    var sel = (existing && existing.category === cats[i]) ? 'selected' : '';
    catOptions += '<option value="' + escapeHtml(cats[i]) + '" ' + sel + '>' + escapeHtml(cats[i]) + '</option>';
  }

  var imgKeys = Object.keys(FOOD_IMAGES);
  var imgOptions = '';
  for (var k = 0; k < imgKeys.length; k++) {
    var key = imgKeys[k];
    var val = FOOD_IMAGES[key];
    var isSel = (selectedImg === val) ? 'selected' : '';
    var label = key.charAt(0).toUpperCase() + key.slice(1) + ' Food Photography';
    imgOptions += '<option value="' + val + '" ' + isSel + '>' + label + '</option>';
  }

  openModal(`
    <div class="bg-white rounded-[24px] max-w-xl w-full p-6 sm:p-7 shadow-float animate-in max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-heading font-extrabold text-xl text-ink">${existing ? 'Edit Food Stall' : 'Add New Food Stall'}</h2>
        <button type="button" onclick="closeModal()" class="p-2 rounded-xl hover:bg-canvas text-slate"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <form onsubmit="saveStallForm(event, '${editId || ''}')" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="block text-xs font-semibold text-ink mb-1.5">Stall Name</label><input id="st-name" type="text" required value="${existing ? escapeHtml(existing.name) : ''}" placeholder="e.g., Campus Roll House" class="w-full px-3.5 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
          <div><label class="block text-xs font-semibold text-ink mb-1.5">Campus Location</label><input id="st-location" type="text" required value="${existing ? escapeHtml(existing.location) : ''}" placeholder="e.g., Uni Mall, Block 15" class="w-full px-3.5 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label class="block text-xs font-semibold text-ink mb-1.5">Cuisine Category</label><select id="st-category" class="w-full px-3 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${catOptions}</select></div>
          <div><label class="block text-xs font-semibold text-ink mb-1.5">Avg. Price for Two (₹)</label><input id="st-price" type="number" min="30" max="2000" required value="${existing ? existing.priceForTwo : 160}" class="w-full px-3.5 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
          <div><label class="block text-xs font-semibold text-ink mb-1.5">Status</label><select id="st-status" class="w-full px-3 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand"><option value="Open" ${!existing || existing.status === 'Open' ? 'selected' : ''}>Open</option><option value="Closed" ${existing && existing.status === 'Closed' ? 'selected' : ''}>Closed</option></select></div>
        </div>
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Opening Hours</label><input id="st-hours" type="text" required value="${existing ? escapeHtml(existing.hours) : '9:00 AM – 10:00 PM'}" class="w-full px-3.5 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Description</label><textarea id="st-desc" rows="3" required placeholder="Short appetizing summary of specialties..." class="w-full px-3.5 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand resize-none">${existing ? escapeHtml(existing.description) : ''}</textarea></div>
        <div><label class="block text-xs font-semibold text-ink mb-1.5">Cover Photo</label><select id="st-image" class="w-full px-3.5 py-2.5 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand">${imgOptions}</select></div>
        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button type="button" onclick="closeModal()" class="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-slate hover:bg-canvas">Cancel</button>
          <button type="submit" class="px-6 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-semibold shadow-sm">${existing ? 'Save Changes' : 'Create Stall'}</button>
        </div>
      </form>
    </div>
  `);
}

function saveStallForm(e, editId) {
  e.preventDefault();
  var name = document.getElementById('st-name').value.trim();
  var location = document.getElementById('st-location').value.trim();
  var category = document.getElementById('st-category').value;
  var priceForTwo = Number(document.getElementById('st-price').value) || 150;
  var status = document.getElementById('st-status').value;
  var hours = document.getElementById('st-hours').value.trim();
  var description = document.getElementById('st-desc').value.trim();
  var image = document.getElementById('st-image').value;

  if (editId) {
    var stall = findStallById(editId);
    if (stall) {
      stall.name = name;
      stall.location = location;
      stall.category = category;
      stall.priceForTwo = priceForTwo;
      stall.status = status;
      stall.hours = hours;
      stall.description = description;
      stall.image = image;
      stall.cuisines[0] = category;
      showToast('Updated "' + name + '"');
    }
  } else {
    state.stalls.unshift({
      id: 'stall-' + Date.now(),
      name: name,
      location: location,
      category: category,
      cuisines: [category, 'Pure Veg'],
      priceForTwo: priceForTwo,
      hours: hours,
      status: status,
      trending: false,
      studentFavorite: false,
      image: image,
      gallery: [image, FOOD_IMAGES.chai, FOOD_IMAGES.sweets],
      description: description,
      menu: [{ id: 'm-' + Date.now(), name: name + ' Signature Combo', category: 'Mains', price: Math.round(priceForTwo * 0.55), veg: true, bestseller: true, desc: 'House specialty combo popular with LPU students.', img: image }]
    });
    showToast('Added "' + name + '" to CampusBites');
  }
  closeModal();
  render();
}

function openDeleteStallConfirm(stallId) {
  var stall = findStallById(stallId);
  if (!stall) return;
  openModal(`
    <div class="bg-white rounded-[24px] max-w-md w-full p-6 shadow-float animate-in">
      <h2 class="font-heading font-extrabold text-lg text-ink">Delete "${escapeHtml(stall.name)}"?</h2>
      <p class="text-sm text-slate mt-2">This will remove the stall from both the Admin table and the student discovery portal in this session.</p>
      <div class="flex justify-end gap-2.5 mt-6">
        <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-stone-200 text-sm font-semibold text-slate">Cancel</button>
        <button type="button" onclick="confirmDeleteStall('${stallId}')" class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">Delete Stall</button>
      </div>
    </div>
  `);
}

function confirmDeleteStall(stallId) {
  var updatedStalls = [];
  for (var i = 0; i < state.stalls.length; i++) {
    if (state.stalls[i].id !== stallId) updatedStalls.push(state.stalls[i]);
  }
  state.stalls = updatedStalls;

  var updatedFavs = [];
  for (var j = 0; j < state.favorites.length; j++) {
    if (state.favorites[j] !== stallId) updatedFavs.push(state.favorites[j]);
  }
  state.favorites = updatedFavs;
  saveFavorites();
  closeModal();
  showToast('Food stall deleted', 'info');
  render();
}

function openModerationConfirm(reviewId, newStatus) {
  var rev = findReviewById(reviewId);
  if (!rev) return;
  var btnCls = (newStatus === 'Approved') ? 'bg-fresh hover:bg-fresh/90' : 'bg-red-600 hover:bg-red-700';
  openModal(`
    <div class="bg-white rounded-[24px] max-w-md w-full p-6 shadow-float animate-in">
      <h2 class="font-heading font-extrabold text-lg text-ink">${newStatus === 'Approved' ? 'Approve' : 'Reject'} Student Review?</h2>
      <p class="text-xs text-slate mt-1">Submitted by <span class="font-semibold text-ink">${escapeHtml(rev.student)}</span> (${rev.rating} ★)</p>
      <p class="text-sm text-ink bg-canvas border border-stone-200/70 rounded-xl p-3.5 mt-3 italic">"${escapeHtml(rev.text)}"</p>
      <div class="flex justify-end gap-2.5 mt-6">
        <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-stone-200 text-sm font-semibold text-slate">Cancel</button>
        <button type="button" onclick="confirmModeration('${reviewId}', '${newStatus}')" class="px-5 py-2 rounded-xl text-white text-sm font-semibold ${btnCls}">Confirm ${newStatus === 'Approved' ? 'Approval' : 'Rejection'}</button>
      </div>
    </div>
  `);
}

function confirmModeration(reviewId, newStatus) {
  var rev = findReviewById(reviewId);
  if (rev) { rev.status = newStatus; saveReviews(); }
  closeModal();
  showToast('Review marked as ' + newStatus, newStatus === 'Approved' ? 'success' : 'info');
  render();
}

function openAddMenuItemModal(stallId) {
  openModal(`
    <div class="bg-white rounded-[24px] max-w-md w-full p-6 shadow-float animate-in">
      <div class="flex items-center justify-between mb-4"><h2 class="font-heading font-extrabold text-lg text-ink">Add Menu Item</h2><button type="button" onclick="closeModal()" class="p-1.5 rounded-lg text-slate hover:bg-canvas"><i data-lucide="x" class="w-4 h-4"></i></button></div>
      <form onsubmit="saveMenuItemForm(event, '${stallId}')" class="space-y-3.5">
        <div><label class="block text-xs font-semibold text-ink mb-1">Dish Name</label><input id="mi-name" type="text" required placeholder="e.g., Paneer Tikka Roll" class="w-full px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="block text-xs font-semibold text-ink mb-1">Category</label><input id="mi-cat" type="text" required value="Specials" class="w-full px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
          <div><label class="block text-xs font-semibold text-ink mb-1">Price (₹)</label><input id="mi-price" type="number" min="10" required value="90" class="w-full px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
        </div>
        <div><label class="block text-xs font-semibold text-ink mb-1">Short Description</label><input id="mi-desc" type="text" required placeholder="Freshly prepared with house spices." class="w-full px-3.5 py-2 text-sm bg-canvas border border-stone-200 rounded-xl focus:outline-none focus:border-brand" /></div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" onclick="closeModal()" class="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-slate">Cancel</button>
          <button type="submit" class="px-5 py-2 rounded-xl bg-brand text-white text-xs font-semibold">Add Item</button>
        </div>
      </form>
    </div>
  `);
}

function saveMenuItemForm(e, stallId) {
  e.preventDefault();
  var stall = findStallById(stallId);
  if (!stall) return;
  stall.menu.unshift({
    id: 'm-' + Date.now(),
    name: document.getElementById('mi-name').value.trim(),
    category: document.getElementById('mi-cat').value.trim(),
    price: Number(document.getElementById('mi-price').value) || 80,
    veg: true,
    bestseller: false,
    desc: document.getElementById('mi-desc').value.trim(),
    img: stall.image
  });
  closeModal();
  showToast('Added new item to menu');
  render();
}

function deleteMenuItem(stallId, itemId) {
  var stall = findStallById(stallId);
  if (!stall) return;
  var updated = [];
  for (var i = 0; i < stall.menu.length; i++) {
    if (stall.menu[i].id !== itemId) updated.push(stall.menu[i]);
  }
  stall.menu = updated;
  showToast('Menu item removed', 'info');
  render();
}

function handleAddCategory(e) {
  e.preventDefault();
  var val = document.getElementById('new-category-input').value.trim();
  if (val && !listContains(getAllCategories(), val)) {
    state.customCategories.push(val);
    showToast('Added category "' + val + '"');
  }
  render();
}

function resetAllData() {
  state.stalls = JSON.parse(JSON.stringify(INITIAL_STALLS));
  state.reviews = JSON.parse(JSON.stringify(INITIAL_REVIEWS));
  state.favorites = ['stall-1', 'stall-2', 'stall-6'];
  saveFavorites();
  saveReviews();
  showToast('Default campus data restored');
  render();
}

function openAboutModal() {
  openModal(`
    <div class="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-float animate-in">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2.5"><img src="images/campusbites-logo-3d.jpg" alt="CampusBites Logo" class="w-9 h-9 rounded-xl object-cover shadow-sm" /><h2 class="font-heading font-extrabold text-xl text-ink">About CampusBites</h2></div>
        <button type="button" onclick="closeModal()" class="p-2 rounded-xl hover:bg-canvas text-slate"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <p class="text-sm text-slate leading-relaxed"><strong class="text-ink">CampusBites — Lovely Professional University</strong> helps students explore campus food outlets, browse vegetarian menus, compare rupee prices, and read honest peer reviews.</p>
      <div class="mt-4 p-4 rounded-2xl bg-canvas border border-stone-200/70 space-y-2 text-xs text-slate">
        <p class="font-bold text-ink">Included Screens (All Interactive):</p>
        <p>1. Landing Page • 2. Explore Food Stalls • 3. Food Stall Details • 4. Reviews & Ratings • 5. Favorites • 6. Admin Overview • 7. Manage Stalls • 8. Review Moderation</p>
      </div>
      <p class="text-xs text-slate mt-4">Covering Uni Mall, Uni Centre (Block 15), Block 41, and Boys Hostel food zones across LPU campus.</p>
      <div class="mt-5 flex justify-end"><button type="button" onclick="closeModal()" class="px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold">Close</button></div>
    </div>
  `);
}

function initAdminChart() {
  var canvas = document.getElementById('admin-category-chart');
  if (!canvas || !window.Chart) return;
  if (categoryChartInstance) {
    categoryChartInstance.destroy();
    categoryChartInstance = null;
  }

  var counts = {};
  for (var i = 0; i < state.stalls.length; i++) {
    var cat = state.stalls[i].category;
    counts[cat] = (counts[cat] || 0) + 1;
  }

  categoryChartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Food Stalls',
        data: Object.values(counts),
        backgroundColor: ['#FF6B35', '#F5B942', '#22A06B', '#17202A', '#E85A24', '#64748B', '#FB923C'],
        borderRadius: 10,
        maxBarThickness: 44
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, color: '#64748B' }, grid: { color: '#F1ECE8' } },
        x: { ticks: { color: '#17202A', font: { weight: '600' } }, grid: { display: false } }
      }
    }
  });
}

// main render function
function render() {
  var isAdmin = (state.route.indexOf('admin-') === 0);
  document.getElementById('public-navbar').classList.toggle('hidden', isAdmin);

  var navLinks = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinks.length; i++) {
    var active = (navLinks[i].dataset.nav === state.route);
    navLinks[i].classList.toggle('text-brand', active);
    navLinks[i].classList.toggle('bg-brand-soft', active);
    navLinks[i].classList.toggle('font-semibold', active);
    navLinks[i].classList.toggle('text-ink', !active);
    navLinks[i].classList.toggle('hover:text-brand', !active);
  }

  var favBadge = document.getElementById('nav-fav-badge');
  if (favBadge) {
    favBadge.textContent = state.favorites.length;
    favBadge.classList.toggle('hidden', state.favorites.length === 0);
  }

  var pageHtml = '';
  if (state.route === 'home')                  pageHtml = renderHomeScreen();
  else if (state.route === 'explore')          pageHtml = renderExploreScreen();
  else if (state.route === 'details')          pageHtml = renderDetailsScreen();
  else if (state.route === 'reviews')          pageHtml = renderReviewsScreen();
  else if (state.route === 'favorites')        pageHtml = renderFavoritesScreen();
  else if (state.route === 'admin-overview')   pageHtml = renderAdminOverview();
  else if (state.route === 'admin-stalls')     pageHtml = renderAdminStalls();
  else if (state.route === 'admin-menus')      pageHtml = renderAdminMenus();
  else if (state.route === 'admin-reviews')    pageHtml = renderAdminReviews();
  else if (state.route === 'admin-categories') pageHtml = renderAdminCategories();
  else if (state.route === 'admin-settings')   pageHtml = renderAdminSettings();
  else                                         pageHtml = renderHomeScreen();

  var appRoot = document.getElementById('app-root');
  appRoot.classList.remove('page-enter');
  appRoot.innerHTML = pageHtml;
  void appRoot.offsetWidth;
  appRoot.classList.add('page-enter');

  initScrollReveal();
  if (state.route === 'home') initCountUpStats();

  if (window.lucide) lucide.createIcons();
  if (state.route === 'admin-overview') {
    setTimeout(initAdminChart, 30);
  }
}

// smooth count-up for hero numbers on home page
function initCountUpStats() {
  var counters = document.querySelectorAll('.count-up');
  for (var i = 0; i < counters.length; i++) {
    (function(el) {
      var target = Number(el.dataset.target) || 0;
      var current = 0;
      var steps = 24;
      var increment = Math.max(1, Math.ceil(target / steps));
      var timer = setInterval(function() {
        current = current + increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, 26);
    })(counters[i]);
  }
}

// scroll reveal for sections
function initScrollReveal() {
  var sections = document.querySelectorAll('.reveal-section');
  if (!sections.length) return;
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.08 });
    for (var j = 0; j < sections.length; j++) {
      observer.observe(sections[j]);
    }
  } else {
    for (var k = 0; k < sections.length; k++) {
      sections[k].classList.add('is-visible');
    }
  }
}

// admin search handlers
function handleAdminStallSearch(val) {
  state.adminStallSearch = val;
  state.adminStallPage = 1;
  render();
  var el = document.getElementById('admin-stall-search');
  if (el) { el.focus(); el.setSelectionRange(val.length, val.length); }
}

function handleAdminModSearch(val) {
  state.adminModSearch = val;
  render();
  var el = document.getElementById('admin-mod-search');
  if (el) { el.focus(); el.setSelectionRange(val.length, val.length); }
}

// close modal on Esc
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// page listeners
window.addEventListener('scroll', function() {
  var nav = document.getElementById('public-navbar');
  if (!nav) return;
  nav.classList.toggle('nav-solid', window.scrollY > 24);
  nav.classList.toggle('nav-glass', window.scrollY <= 24);
});

document.getElementById('modal-root').addEventListener('click', function(e) {
  if (e.target.id === 'modal-root') closeModal();
});

document.addEventListener('click', function(e) {
  var menu = document.getElementById('avatar-menu');
  var btn = document.getElementById('avatar-btn');
  if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.add('hidden');
  }
});


// init
render();
