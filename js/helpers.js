// helpers

// find stall by id
function findStallById(stallId) {
  for (var i = 0; i < state.stalls.length; i++) {
    if (state.stalls[i].id === stallId) {
      return state.stalls[i];
    }
  }
  return null;
}

// find review by id
function findReviewById(reviewId) {
  for (var i = 0; i < state.reviews.length; i++) {
    if (state.reviews[i].id === reviewId) {
      return state.reviews[i];
    }
  }
  return null;
}

// check if item exists in array
function listContains(list, value) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === value) {
      return true;
    }
  }
  return false;
}

// filter reviews by status
function getReviewsByStatus(statusName) {
  var result = [];
  for (var i = 0; i < state.reviews.length; i++) {
    if (state.reviews[i].status === statusName) {
      result.push(state.reviews[i]);
    }
  }
  return result;
}

// get average rating for a stall
function getStallStats(stallId) {
  var totalStars = 0;
  var count = 0;
  for (var i = 0; i < state.reviews.length; i++) {
    var r = state.reviews[i];
    if (r.stallId === stallId && r.status === 'Approved') {
      totalStars = totalStars + r.rating;
      count = count + 1;
    }
  }
  if (count === 0) {
    return { avg: 4.5, count: 0 };
  }
  var average = Number((totalStars / count).toFixed(1));
  return { avg: average, count: count };
}

// all categories
function getAllCategories() {
  var names = [];
  for (var i = 0; i < CATEGORIES.length; i++) {
    names.push(CATEGORIES[i].name);
  }
  for (var j = 0; j < state.customCategories.length; j++) {
    if (!listContains(names, state.customCategories[j])) {
      names.push(state.customCategories[j]);
    }
  }
  return names;
}

// escape html text
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// student initials
function getInitials(name) {
  if (!name) return 'ST';
  var words = name.split(' ');
  var initials = '';
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > 0) {
      initials = initials + words[i][0].toUpperCase();
    }
  }
  return initials.slice(0, 2);
}

// format date
function formatDate(isoDate) {
  try {
    var d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return isoDate;
  }
}

// star icons
function renderStars(rating, sizeClass) {
  if (!sizeClass) sizeClass = 'w-4 h-4';
  var filled = Math.round(rating);
  var html = '<span class="inline-flex items-center gap-0.5">';
  for (var i = 1; i <= 5; i++) {
    var color = 'text-stone-300';
    if (i <= filled) {
      color = 'fill-gold text-gold';
    }
    html += '<i data-lucide="star" class="' + sizeClass + ' ' + color + '"></i>';
  }
  html += '</span>';
  return html;
}

// status badge color
function getStatusBadgeClass(status) {
  if (status === 'Approved') {
    return 'bg-fresh/10 text-fresh';
  } else if (status === 'Pending') {
    return 'bg-amber-50 text-amber-700';
  } else {
    return 'bg-red-50 text-red-600';
  }
}

// toast message
function showToast(message, type, actionLabel, actionFn) {
  if (!type) type = 'success';
  var root = document.getElementById('toast-root');
  var themeClass = 'bg-ink text-white border-ink';
  var iconName = 'check-circle-2';
  var iconColor = 'text-fresh';

  if (type === 'info') {
    themeClass = 'bg-white text-ink border-stone-200';
    iconName = 'info';
    iconColor = 'text-brand';
  } else if (type === 'warning') {
    themeClass = 'bg-amber-50 text-amber-900 border-amber-200';
    iconName = 'alert-circle';
    iconColor = 'text-amber-600';
  }

  var toast = document.createElement('div');
  toast.id = 'toast-' + Date.now();
  toast.className = 'pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border shadow-float animate-in text-sm font-medium ' + themeClass;

  var actionHtml = '';
  if (actionLabel) {
    actionHtml = '<button type="button" class="toast-action text-xs font-bold text-brand hover:underline shrink-0">' + escapeHtml(actionLabel) + '</button>';
  }

  toast.innerHTML =
    '<div class="flex items-center gap-2.5 min-w-0">' +
      '<i data-lucide="' + iconName + '" class="w-4 h-4 shrink-0 ' + iconColor + '"></i>' +
      '<span class="truncate">' + escapeHtml(message) + '</span>' +
    '</div>' + actionHtml;

  if (actionLabel && actionFn) {
    var btn = toast.querySelector('.toast-action');
    btn.addEventListener('click', function() {
      actionFn();
      toast.remove();
    });
  }

  root.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(function() {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(function() { toast.remove(); }, 250);
    }
  }, 3400);
}
