// app state
var state = {
  route: 'home',
  stalls: JSON.parse(JSON.stringify(INITIAL_STALLS)),
  reviews: JSON.parse(JSON.stringify(INITIAL_REVIEWS)),
  favorites: ['stall-1', 'stall-2', 'stall-6'],
  helpfulIds: [],
  customCategories: [],

  selectedStallId: 'stall-1',
  activeGalleryIdx: 0,
  activeMenuCategory: 'All',

  exploreSearch: '',
  exploreCategory: 'All',
  explorePrice: 'all',
  exploreRating: 0,
  exploreSort: 'recommended',
  exploreView: 'grid',
  isLoadingSkeleton: false,

  reviewFilterStall: 'all',
  reviewFilterStars: 0,
  reviewSort: 'newest',
  favCategory: 'All',

  adminMobileSidebarOpen: false,
  adminStallSearch: '',
  adminStallCategory: 'All',
  adminStallPage: 1,
  adminModTab: 'Pending',
  adminModSearch: '',
  adminModStall: 'all',
  adminMenuStallId: 'stall-1',

  settings: {
    showBanner: false,
    instantPublishReviews: true
  }
};

var categoryChartInstance = null;
var modalRating = 5;

// load saved favorites
try {
  var savedData = localStorage.getItem('campusbites_favs');
  if (savedData) {
    var parsedFavs = JSON.parse(savedData);
    if (Array.isArray(parsedFavs)) {
      state.favorites = parsedFavs;
    }
  }
} catch (e) {}

function saveFavorites() {
  try {
    localStorage.setItem('campusbites_favs', JSON.stringify(state.favorites));
  } catch (e) {}
}

// load saved reviews
try {
  var savedReviews = localStorage.getItem('campusbites_reviews');
  if (savedReviews) {
    var parsedReviews = JSON.parse(savedReviews);
    if (Array.isArray(parsedReviews) && parsedReviews.length > 0) {
      state.reviews = parsedReviews;
    }
  }
} catch (e) {}

function saveReviews() {
  try {
    localStorage.setItem('campusbites_reviews', JSON.stringify(state.reviews));
  } catch (e) {}
}
