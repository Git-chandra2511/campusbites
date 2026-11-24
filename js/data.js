// CampusBites data
var FOOD_IMAGES = {
  punjabi:  "images/nk-food-court.jpg",
  chai:     "images/kitchen-ette.jpg",
  noodles:  "images/momos-villa.jpg",
  dosa:     "images/dosa-plaza.jpg",
  burger:   "images/oven-express.jpg",
  munchies: "images/protein-house.jpg",
  coffee:   "images/lovely-bake-studio.jpg",
  sweets:   "images/lovely-sweets.jpg",
  juice:    "images/nand-juice.jpg"
};

var CATEGORIES = [
  { name: 'All',          icon: 'sparkles' },
  { name: 'North Indian', icon: 'flame' },
  { name: 'South Indian', icon: 'sun' },
  { name: 'Chinese',      icon: 'soup' },
  { name: 'Fast Food',    icon: 'sandwich' },
  { name: 'Snacks',       icon: 'cookie' },
  { name: 'Beverages',    icon: 'coffee' },
  { name: 'Desserts',     icon: 'cake-slice' }
];

var INITIAL_STALLS = [
  {
    id: 'stall-1',
    name: 'N.K Food Court',
    location: 'Block 56, Behind Boys Hostel (BH-6)',
    category: 'North Indian',
    cuisines: ['North Indian', 'Thalis', 'Pure Veg'],
    priceForTwo: 170,
    hours: '9:00 AM – 10:30 PM',
    status: 'Open',
    trending: true,
    studentFavorite: true,
    image: FOOD_IMAGES.punjabi,
    gallery: [FOOD_IMAGES.punjabi, FOOD_IMAGES.chai, FOOD_IMAGES.sweets],
    description: 'One of the most popular student-budget dining hubs behind BH-6. Famous across LPU for filling Veg Thalis, Paneer Lababdar with butter garlic naan, Amritsari kulchas, and crisp samosas.',
    menu: [
      { id: 'm1', name: 'Paneer Lababdar & Butter Garlic Naan', category: 'Mains',  price: 130, veg: true, bestseller: true,  desc: 'Rich spiced tomato-cashew paneer gravy paired with crisp tandoori butter garlic naan.', img: FOOD_IMAGES.punjabi },
      { id: 'm2', name: 'N.K Special Veg Thali',              category: 'Thalis', price: 85, veg: true, bestseller: true,  desc: 'Dal makhani, seasonal sabzi, paneer curry, jeera rice, 2 butter roti & raita.', img: FOOD_IMAGES.punjabi },
      { id: 'm3', name: 'Amritsari Naan & Chole',             category: 'Mains',  price: 75, veg: true, bestseller: false, desc: 'Stuffed flaky Amritsari naan served hot with tangy Punjabi chole and pickled onions.', img: FOOD_IMAGES.punjabi },
      { id: 'm4', name: 'Punjabi Samosa & Sweet Lassi',       category: 'Drinks', price: 50,  veg: true, bestseller: false, desc: 'Crispy potato samosa paired with a tall chilled glass of sweet Punjabi lassi.', img: FOOD_IMAGES.chai }
    ]
  },
  {
    id: 'stall-2',
    name: 'Kitchen Ette',
    location: 'Food Court, Near Block 41 Apartments',
    category: 'Snacks',
    cuisines: ['North Indian', 'Parathas', 'Chai'],
    priceForTwo: 120,
    hours: '9:00 AM – 10:00 PM',
    status: 'Open',
    trending: true,
    studentFavorite: true,
    image: FOOD_IMAGES.chai,
    gallery: [FOOD_IMAGES.chai, FOOD_IMAGES.punjabi, FOOD_IMAGES.coffee],
    description: 'Bustling Block 41 food court hangout with shaded seating. Beloved by LPU students for hot stuffed aloo & onion parathas, Makki di Roti with Sarson da Saag, and masala chai.',
    menu: [
      { id: 'm5', name: 'Aloo & Onion Stuffed Paratha Combo', category: 'Parathas', price: 55,  veg: true, bestseller: true,  desc: 'Two hot tawa parathas served with white butter, fresh curd, and mango pickle.', img: FOOD_IMAGES.chai },
      { id: 'm6', name: 'Makki di Roti & Sarson da Saag',     category: 'Specials', price: 90, veg: true, bestseller: true,  desc: 'Authentic winter Punjab favorite served with a dollop of butter and jaggery.', img: FOOD_IMAGES.punjabi },
      { id: 'm7', name: 'Kitchen Ette Full Meal Thali',       category: 'Thalis',   price: 80, veg: true, bestseller: false, desc: 'Homestyle dal tadka, paneer sabzi, steamed rice, 3 rotis, and fresh salad.', img: FOOD_IMAGES.punjabi },
      { id: 'm8', name: 'Adrak Masala Chai & Samosa',         category: 'Chai',     price: 30,  veg: true, bestseller: false, desc: 'Steaming ginger-spiced tea with a crispy hot samosa for between-class breaks.', img: FOOD_IMAGES.chai }
    ]
  },
  {
    id: 'stall-3',
    name: 'Momos Villa',
    location: 'Hostel Food Street, Near BH-2 to BH-6',
    category: 'Chinese',
    cuisines: ['Chinese', 'Momos', 'Noodles'],
    priceForTwo: 150,
    hours: '11:00 AM – 10:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.noodles,
    gallery: [FOOD_IMAGES.noodles, FOOD_IMAGES.munchies, FOOD_IMAGES.burger],
    description: 'Campus favorite for steaming hot veg & paneer momos with fiery red garlic chutney, smoky veg hakka noodles, and crispy Indo-Chinese starters.',
    menu: [
      { id: 'm9',  name: 'Steamed Paneer Momos (8 pcs)', category: 'Momos',    price: 70,  veg: true, bestseller: true,  desc: 'Soft hand-folded dumplings stuffed with spiced paneer and served with red chili chutney.', img: FOOD_IMAGES.noodles },
      { id: 'm10', name: 'Smoky Veg Hakka Noodles',      category: 'Noodles',  price: 80, veg: true, bestseller: true,  desc: 'Wok-tossed noodles with crisp bell peppers, cabbage, spring onion, and soy glaze.', img: FOOD_IMAGES.noodles },
      { id: 'm11', name: 'Crispy Honey Chilli Paneer',   category: 'Starters', price: 110, veg: true, bestseller: false, desc: 'Golden cottage cheese tossed in sweet-spicy chili garlic glaze and sesame seeds.', img: FOOD_IMAGES.noodles },
      { id: 'm12', name: 'Veg Manchurian Gravy Bowl',    category: 'Mains',    price: 90, veg: true, bestseller: false, desc: 'Crispy vegetable dumplings simmered in savory garlic-soy gravy.', img: FOOD_IMAGES.noodles }
    ]
  },
  {
    id: 'stall-4',
    name: 'Dosa Plaza',
    location: 'Uni Centre, Block 15',
    category: 'South Indian',
    cuisines: ['South Indian', 'Dosa', 'Breakfast'],
    priceForTwo: 170,
    hours: '8:30 AM – 9:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.dosa,
    gallery: [FOOD_IMAGES.dosa, FOOD_IMAGES.chai, FOOD_IMAGES.sweets],
    description: 'Iconic Uni Centre outlet serving crisp golden dosas, fluffy idlis, medu vada, and comforting drumstick sambar with fresh coconut and tomato chutneys.',
    menu: [
      { id: 'm13', name: 'Classic Ghee Masala Dosa',     category: 'Dosas',  price: 90, veg: true, bestseller: true,  desc: 'Paper-crisp roasted dosa filled with spiced potato masala, hot sambar & 2 chutneys.', img: FOOD_IMAGES.dosa },
      { id: 'm14', name: 'Mysore Cheese Paneer Dosa',    category: 'Dosas',  price: 120, veg: true, bestseller: true,  desc: 'Fiery Mysore garlic spread layered with grated paneer and melted cheese.', img: FOOD_IMAGES.dosa },
      { id: 'm15', name: 'Steamed Idli & Medu Vada Set', category: 'Combos', price: 65,  veg: true, bestseller: false, desc: '2 pillowy idlis and 1 crispy medu vada served with fresh coconut chutney.', img: FOOD_IMAGES.dosa },
      { id: 'm16', name: 'South Indian Filter Coffee',   category: 'Drinks', price: 35,  veg: true, bestseller: false, desc: 'Aromatic frothed decoction coffee brewed fresh all day.', img: FOOD_IMAGES.coffee }
    ]
  },
  {
    id: 'stall-5',
    name: 'Oven Express',
    location: 'Uni Mall, Opposite HDFC Bank',
    category: 'Fast Food',
    cuisines: ['Fast Food', 'Pizza & Pasta', 'Burgers'],
    priceForTwo: 260,
    hours: '10:30 AM – 11:00 PM',
    status: 'Open',
    trending: true,
    studentFavorite: false,
    image: FOOD_IMAGES.burger,
    gallery: [FOOD_IMAGES.burger, FOOD_IMAGES.noodles, FOOD_IMAGES.coffee],
    description: "One of LPU's most visited all-rounder cafes near Uni Mall. Known for White Sauce Pasta, Cheese Garlic Bread, Margherita Pizza, Veg Wraps, Masala Fries, and Oreo Crushers.",
    menu: [
      { id: 'm17', name: 'Cheese Garlic Bread', category: 'Starters',  price: 110, veg: true, bestseller: true,  desc: 'Toasted herb garlic bread loaded with gooey melted mozzarella cheese.', img: FOOD_IMAGES.burger },
      { id: 'm18', name: 'Margherita Pizza',    category: 'Pizza',     price: 170, veg: true, bestseller: true,  desc: 'Stone-baked crust topped with tangy basil tomato sauce and rich mozzarella.', img: FOOD_IMAGES.burger },
      { id: 'm19', name: 'Masala Fries',        category: 'Sides',     price: 90, veg: true, bestseller: false, desc: 'Crispy golden fries tossed in chatpata house masala seasoning.', img: FOOD_IMAGES.burger },
      { id: 'm20', name: 'Veggie Wrap',         category: 'Wraps',     price: 85, veg: true, bestseller: false, desc: 'Crunchy spiced veggies and creamy mayo rolled in a warm toasted tortilla.', img: FOOD_IMAGES.burger },
      { id: 'm21', name: 'Cold Coffee Crusher', category: 'Beverages', price: 110, veg: true, bestseller: true,  desc: 'Thick ice-blended cold coffee crusher — a Uni Mall afternoon staple.', img: FOOD_IMAGES.coffee }
    ]
  },
  {
    id: 'stall-6',
    name: 'Protein House',
    location: 'Block 41 Campus & BH-1 Market',
    category: 'Snacks',
    cuisines: ['Healthy Bowls', 'Sandwiches', 'Snacks'],
    priceForTwo: 200,
    hours: '7:00 AM – 11:00 PM',
    status: 'Open',
    trending: false,
    studentFavorite: true,
    image: FOOD_IMAGES.munchies,
    gallery: [FOOD_IMAGES.munchies, FOOD_IMAGES.coffee, FOOD_IMAGES.burger],
    description: 'Go-to clean-eating kitchen inside LPU for gym-goers and hostel students. Serves high-protein paneer rice bowls, grilled sandwiches, salads, and evening snacks.',
    menu: [
      { id: 'm22', name: 'High-Protein Paneer Rice Bowl', category: 'Bowls',      price: 130, veg: true, bestseller: true,  desc: 'Grilled herb paneer cubes over seasoned rice with sautéed veggies and mint dip.', img: FOOD_IMAGES.munchies },
      { id: 'm23', name: 'Grilled Paneer & Cheese Toast', category: 'Sandwiches', price: 80, veg: true, bestseller: true,  desc: 'Whole-wheat grilled sandwich packed with spiced paneer, corn, and mint chutney.', img: FOOD_IMAGES.munchies },
      { id: 'm24', name: 'All Veggie Fresh Salad Bowl',   category: 'Salads',     price: 110, veg: true, bestseller: false, desc: 'Crisp lettuce, sweet corn, bell peppers, chickpeas, and light lemon dressing.', img: FOOD_IMAGES.munchies }
    ]
  },
  {
    id: 'stall-7',
    name: 'Lovely Bake Studio',
    location: 'Block 41, Facing LPU Indoor Stadium',
    category: 'Beverages',
    cuisines: ['Bakery', 'Coffee', 'Desserts'],
    priceForTwo: 180,
    hours: '8:30 AM – 9:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.coffee,
    gallery: [FOOD_IMAGES.coffee, FOOD_IMAGES.sweets, FOOD_IMAGES.chai],
    description: 'Premium campus bakery and coffee counter facing the Indoor Stadium. Famous for Irish Frappe, espresso shots, softy cones, fresh cookies, and signature Badam Jamun.',
    menu: [
      { id: 'm25', name: 'Chilled Irish Frappe',     category: 'Cold Coffee', price: 95, veg: true, bestseller: true,  desc: 'Creamy blended espresso frappe with smooth Irish cream notes.', img: FOOD_IMAGES.coffee },
      { id: 'm26', name: 'Chocolate Walnut Brownie', category: 'Bakery',      price: 75,  veg: true, bestseller: true,  desc: 'Dense fudgy dark-chocolate brownie studded with toasted walnuts.', img: FOOD_IMAGES.coffee },
      { id: 'm27', name: 'Signature Badam Jamun',    category: 'Sweets',      price: 45,  veg: true, bestseller: false, desc: "Lovely Bake Studio's campus-famous warm almond-stuffed gulab jamun.", img: FOOD_IMAGES.sweets },
      { id: 'm28', name: 'Double Espresso Shot',     category: 'Hot Coffee',  price: 60,  veg: true, bestseller: false, desc: 'Bold freshly pulled espresso to kick-start 8 AM lectures.', img: FOOD_IMAGES.coffee }
    ]
  },
  {
    id: 'stall-8',
    name: 'Lovely Sweets',
    location: 'Uni Mall, Ground Floor',
    category: 'Desserts',
    cuisines: ['Desserts', 'Indian Sweets', 'Chaat'],
    priceForTwo: 130,
    hours: '9:00 AM – 10:00 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.sweets,
    gallery: [FOOD_IMAGES.sweets, FOOD_IMAGES.chai, FOOD_IMAGES.coffee],
    description: "Jalandhar's legendary mithai house right inside LPU's Uni Mall. Student favorite for chilled Kesar Rasmalai, crispy Pyaz Kachori, warm Gulab Jamun, and traditional laddoos.",
    menu: [
      { id: 'm29', name: 'Kesar Rasmalai (2 pcs)',      category: 'Indian Sweets', price: 70,  veg: true, bestseller: true,  desc: 'Soft chenna patties soaked in saffron-cardamom thickened milk with pistachios.', img: FOOD_IMAGES.sweets },
      { id: 'm30', name: 'Crispy Pyaz Kachori',         category: 'Snacks',        price: 35,  veg: true, bestseller: true,  desc: 'Flaky golden Rajasthani-style onion kachori served with sweet & spicy chutneys.', img: FOOD_IMAGES.chai },
      { id: 'm31', name: 'Hot Gulab Jamun (2 pcs)',     category: 'Indian Sweets', price: 50,  veg: true, bestseller: false, desc: 'Warm melt-in-mouth khoya jamuns dipped in rose-cardamom syrup.', img: FOOD_IMAGES.sweets },
      { id: 'm32', name: 'Chocolate Waffle Sundae Cup', category: 'Desserts',      price: 90, veg: true, bestseller: false, desc: 'Crisp waffle bites topped with warm dark chocolate drizzle and nuts.', img: FOOD_IMAGES.sweets }
    ]
  },
  {
    id: 'stall-9',
    name: 'Nand Juice Corner',
    location: 'BH-2 Playground, Behind BH-2',
    category: 'Beverages',
    cuisines: ['Beverages', 'Fresh Juices', 'Shakes'],
    priceForTwo: 90,
    hours: '7:00 AM – 11:30 PM',
    status: 'Open',
    trending: true,
    studentFavorite: true,
    image: FOOD_IMAGES.juice,
    gallery: [FOOD_IMAGES.juice, FOOD_IMAGES.coffee, FOOD_IMAGES.sweets],
    description: 'Popular LPU hostel-zone juice bar near BH-2 Playground serving freshly pressed seasonal fruit juices, pomegranate-anar blends, and chilled shakes from early morning till late night.',
    menu: [
      { id: 'm33', name: 'Fresh Anar Mix Juice',    category: 'Fresh Juices', price: 55, veg: true, bestseller: true,  desc: 'Freshly pressed pomegranate and seasonal fruit blend served chilled without preservatives.', img: FOOD_IMAGES.juice },
      { id: 'm34', name: 'Chilled Mango Shake',     category: 'Shakes',       price: 45, veg: true, bestseller: true,  desc: 'Thick, refreshing mango shake popular after classes and evening sports at BH-2.', img: FOOD_IMAGES.juice },
      { id: 'm35', name: 'Fresh Mosambi Juice',     category: 'Fresh Juices', price: 35, veg: true, bestseller: false, desc: 'Sweet lime juice pressed to order with a pinch of chaat masala.', img: FOOD_IMAGES.juice },
      { id: 'm36', name: 'Pineapple & Orange Juice', category: 'Fresh Juices', price: 40, veg: true, bestseller: false, desc: 'Zesty cold-pressed pineapple and citrus juice loaded with vitamin C.', img: FOOD_IMAGES.juice }
    ]
  },
  {
    id: 'stall-10',
    name: "Domino's Pizza",
    location: 'Uni Mall, Ground Floor',
    category: 'Fast Food',
    cuisines: ['Fast Food', 'Pizza', 'Pure Veg'],
    priceForTwo: 300,
    hours: '11:00 AM – 11:00 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.burger,
    gallery: [FOOD_IMAGES.burger, FOOD_IMAGES.munchies, FOOD_IMAGES.coffee],
    description: "Official 100% pure-vegetarian Domino's Pizza outlet inside LPU's Uni Mall. Student favorite for Pizza Mania combos, Peppy Paneer, Farmhouse, and Garlic Breadsticks.",
    menu: [
      { id: 'm37', name: 'Margherita Pizza (Regular)',   category: 'Pizza',  price: 109, veg: true, bestseller: true,  desc: 'Classic hand-tossed crust with tangy tomato sauce and 100% mozzarella cheese.', img: FOOD_IMAGES.burger },
      { id: 'm38', name: 'Peppy Paneer Pizza (Regular)', category: 'Pizza',  price: 239, veg: true, bestseller: true,  desc: 'Spiced paneer chunks, crisp capsicum, and red paprika on a cheesy crust.', img: FOOD_IMAGES.burger },
      { id: 'm39', name: 'Stuffed Garlic Breadsticks',   category: 'Sides',  price: 149, veg: true, bestseller: true,  desc: 'Freshly baked garlic bread stuffed with sweet corn, jalapenos, and cheese.', img: FOOD_IMAGES.munchies },
      { id: 'm40', name: 'Choco Lava Cake',              category: 'Desserts', price: 109, veg: true, bestseller: false, desc: 'Warm dark chocolate cake with a molten fudgy center.', img: FOOD_IMAGES.sweets }
    ]
  },
  {
    id: 'stall-11',
    name: 'Café Coffee Day (CCD)',
    location: 'Block 15A, Near Bank of India',
    category: 'Beverages',
    cuisines: ['Beverages', 'Coffee', 'Cafe'],
    priceForTwo: 240,
    hours: '8:30 AM – 8:00 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.coffee,
    gallery: [FOOD_IMAGES.coffee, FOOD_IMAGES.sweets, FOOD_IMAGES.munchies],
    description: 'Classic Block 15A campus coffee lounge near Bank of India. Quiet AC seating popular for project meetings, Café Frappe, Cappuccino, and warm veg puffs.',
    menu: [
      { id: 'm41', name: 'Classic Café Frappe',        category: 'Cold Coffee', price: 145, veg: true, bestseller: true,  desc: 'Signature blended cold coffee topped with creamy froth.', img: FOOD_IMAGES.coffee },
      { id: 'm42', name: 'Hot Cappuccino',             category: 'Hot Coffee',  price: 115, veg: true, bestseller: true,  desc: 'Rich espresso shot balanced with steamed velvety milk foam.', img: FOOD_IMAGES.coffee },
      { id: 'm43', name: "Devil's Own Cold Coffee",    category: 'Cold Coffee', price: 165, veg: true, bestseller: false, desc: 'Indulgent chocolate-rich cold coffee topped with whipped cream.', img: FOOD_IMAGES.coffee },
      { id: 'm44', name: 'Tandoori Paneer Veg Puff',   category: 'Snacks',      price: 75,  veg: true, bestseller: false, desc: 'Flaky baked puff pastry filled with spiced tandoori paneer.', img: FOOD_IMAGES.munchies }
    ]
  },
  {
    id: 'stall-12',
    name: 'The Belgian Waffle Co.',
    location: 'Uni Mall Food Court, First Floor',
    category: 'Desserts',
    cuisines: ['Desserts', 'Waffles', 'Shakes'],
    priceForTwo: 250,
    hours: '11:00 AM – 10:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.sweets,
    gallery: [FOOD_IMAGES.sweets, FOOD_IMAGES.coffee, FOOD_IMAGES.juice],
    description: 'Freshly baked crisp Belgian wafflewiches inside Uni Mall. Go-to campus dessert counter for Triple Chocolate, Naked Nutella, and Red Velvet waffles.',
    menu: [
      { id: 'm45', name: 'Triple Chocolate Waffle',   category: 'Waffles', price: 155, veg: true, bestseller: true,  desc: 'Warm dark-chocolate waffle layered with milk, white, and dark melted chocolate.', img: FOOD_IMAGES.sweets },
      { id: 'm46', name: 'Naked Nutella Waffle',      category: 'Waffles', price: 165, veg: true, bestseller: true,  desc: 'Golden crispy waffle generously spread with classic hazelnut Nutella.', img: FOOD_IMAGES.sweets },
      { id: 'm47', name: 'KitKat Crunch Waffle',      category: 'Waffles', price: 150, veg: true, bestseller: false, desc: 'Crisp waffle loaded with crushed KitKat wafers and milk chocolate.', img: FOOD_IMAGES.sweets },
      { id: 'm48', name: 'Belgian Chocolate Shake',   category: 'Shakes',  price: 130, veg: true, bestseller: false, desc: 'Thick chilled dark chocolate milkshake.', img: FOOD_IMAGES.coffee }
    ]
  },
  {
    id: 'stall-13',
    name: 'Kathi Junction',
    location: 'Uni Mall & Academic Food Strip',
    category: 'Snacks',
    cuisines: ['Snacks', 'Rolls & Wraps', 'North Indian'],
    priceForTwo: 170,
    hours: '10:00 AM – 10:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.punjabi,
    gallery: [FOOD_IMAGES.punjabi, FOOD_IMAGES.munchies, FOOD_IMAGES.chai],
    description: 'Quick grab-and-go kathi roll counter popular between lectures. Serves flaky lachha paratha rolls stuffed with tandoori paneer, spiced aloo, and mint chutney.',
    menu: [
      { id: 'm49', name: 'Paneer Tikka Kathi Roll',    category: 'Rolls', price: 95,  veg: true, bestseller: true,  desc: 'Smoky tandoori paneer cubes, crunchy onions, and mint mayo in a crisp paratha.', img: FOOD_IMAGES.punjabi },
      { id: 'm50', name: 'Double Paneer Cheese Roll',  category: 'Rolls', price: 120, veg: true, bestseller: true,  desc: 'Extra paneer tikka and melted cheese rolled hot off the tawa.', img: FOOD_IMAGES.punjabi },
      { id: 'm51', name: 'Aloo Masala Kathi Roll',     category: 'Rolls', price: 65,  veg: true, bestseller: false, desc: 'Budget-friendly spiced potato masala roll with tangy green chutney.', img: FOOD_IMAGES.chai },
      { id: 'm52', name: 'Chilli Paneer Roll',         category: 'Rolls', price: 105, veg: true, bestseller: false, desc: 'Indo-Chinese tossed chilli paneer wrapped in a soft flaky paratha.', img: FOOD_IMAGES.noodles }
    ]
  },
  {
    id: 'stall-14',
    name: 'Chicago Pizza',
    location: 'Uni Mall, LPU Campus',
    category: 'Fast Food',
    cuisines: ['Fast Food', 'Pizza', 'Coolers'],
    priceForTwo: 280,
    hours: '11:00 AM – 10:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.burger,
    gallery: [FOOD_IMAGES.burger, FOOD_IMAGES.juice, FOOD_IMAGES.munchies],
    description: 'Famous at Uni Mall for oversized single pizza slices, Paneer Lababdar Pizza, Kadhai Paneer Tikka Pizza, and chilled Green Apple Coolers.',
    menu: [
      { id: 'm53', name: 'Monster Veg Pizza Slice',     category: 'Pizza',   price: 115, veg: true, bestseller: true,  desc: 'Oversized thin-crust slice loaded with sweet corn, olives, and cheese.', img: FOOD_IMAGES.burger },
      { id: 'm54', name: 'Paneer Lababdar Pizza',       category: 'Pizza',   price: 199, veg: true, bestseller: true,  desc: 'Desi spiced paneer lababdar sauce, onions, and mozzarella cheese.', img: FOOD_IMAGES.burger },
      { id: 'm55', name: 'Kadhai Paneer Tikka Pizza',   category: 'Pizza',   price: 199, veg: true, bestseller: false, desc: 'Homemade tomato sauce topped with marinated kadhai paneer tikka.', img: FOOD_IMAGES.burger },
      { id: 'm56', name: 'Green Apple Cooler (300 ml)', category: 'Drinks',  price: 95,  veg: true, bestseller: false, desc: 'Refreshing chilled green apple fizz cooler.', img: FOOD_IMAGES.juice }
    ]
  },
  {
    id: 'stall-15',
    name: 'Yummy Kitchen',
    location: 'BH-2 Food Market, LPU',
    category: 'Snacks',
    cuisines: ['Snacks', 'Fast Food', 'Maggi'],
    priceForTwo: 130,
    hours: '10:00 AM – 11:30 PM',
    status: 'Open',
    trending: false,
    studentFavorite: false,
    image: FOOD_IMAGES.munchies,
    gallery: [FOOD_IMAGES.munchies, FOOD_IMAGES.burger, FOOD_IMAGES.chai],
    description: 'Hostel-zone favorite inside BH-2 Food Market serving pocket-friendly cheese Maggi, grilled club sandwiches, veg burgers, and late-evening snacks.',
    menu: [
      { id: 'm57', name: 'Double Cheese Masala Maggi', category: 'Maggi',      price: 55, veg: true, bestseller: true,  desc: 'Hot spiced Maggi noodles finished with grated melted cheese.', img: FOOD_IMAGES.munchies },
      { id: 'm58', name: 'Veg Grilled Club Sandwich',  category: 'Sandwiches', price: 65, veg: true, bestseller: true,  desc: 'Triple-layer crisp toasted sandwich with veggies, cheese, and mint chutney.', img: FOOD_IMAGES.munchies },
      { id: 'm59', name: 'Crispy Aloo Tikki Burger',   category: 'Burgers',    price: 50, veg: true, bestseller: false, desc: 'Toasted bun with spiced potato patty, onion rings, and tangy mayo.', img: FOOD_IMAGES.burger },
      { id: 'm60', name: 'Cold Coffee Glass',          category: 'Drinks',     price: 55, veg: true, bestseller: false, desc: 'Chilled frothy campus-style cold coffee.', img: FOOD_IMAGES.coffee }
    ]
  }
];

var INITIAL_REVIEWS = [
  { id: 'rev-1',  stallId: 'stall-1', student: 'Riya Verma',      program: 'B.Tech CSE • 3rd Year',     rating: 5, date: '2026-11-18', status: 'Approved', helpful: 24, text: 'N.K Food Court behind BH-6 is unbeatable on budget. Paneer Lababdar with butter garlic naan and the ₹85 thali are total lifesavers.' },
  { id: 'rev-2',  stallId: 'stall-5', student: 'Kabir Mehta',     program: 'MBA • 1st Year',            rating: 5, date: '2026-11-17', status: 'Approved', helpful: 31, text: 'Oven Express Cheese Garlic Bread and Cold Coffee Crusher are our go-to order at Uni Mall after afternoon classes.' },
  { id: 'rev-3',  stallId: 'stall-3', student: 'Ananya Nair',     program: 'B.Des UX • 2nd Year',       rating: 4, date: '2026-11-16', status: 'Approved', helpful: 15, text: 'Momos Villa serves super soft paneer momos with spicy chutney. Gets crowded around 5 PM, so order a few minutes early.' },
  { id: 'rev-4',  stallId: 'stall-4', student: 'Siddharth Rao',   program: 'B.Tech AI & ML • 2nd Year', rating: 5, date: '2026-11-15', status: 'Approved', helpful: 19, text: 'Dosa Plaza in Uni Centre nails the crisp ghee masala dosa and fresh coconut chutney. Super quick between lectures.' },
  { id: 'rev-5',  stallId: 'stall-2', student: 'Meera Kapoor',    program: 'BBA • 3rd Year',            rating: 5, date: '2026-11-14', status: 'Approved', helpful: 22, text: 'Kitchen Ette near Block 41 has great shaded seating and their hot aloo parathas and winter Makki di Roti taste just like home.' },
  { id: 'rev-6',  stallId: 'stall-6', student: 'Devansh Gill',    program: 'B.Tech CSE • 4th Year',     rating: 5, date: '2026-11-13', status: 'Approved', helpful: 28, text: 'Protein House at BH-1 Market is open from 7 AM to 11 PM — the Paneer Rice Bowl is my daily post-gym dinner.' },
  { id: 'rev-7',  stallId: 'stall-7', student: 'Ishita Bose',     program: 'B.Arch • 3rd Year',         rating: 5, date: '2026-11-12', status: 'Approved', helpful: 17, text: 'Lovely Bake Studio facing the Indoor Stadium has the best Irish Frappe and warm Badam Jamun on campus.' },
  { id: 'rev-8',  stallId: 'stall-8', student: 'Rohan Kulkarni',  program: 'B.Tech ECE • 2nd Year',     rating: 4, date: '2026-11-11', status: 'Approved', helpful: 14, text: 'Lovely Sweets in Uni Mall is a must-visit for Kesar Rasmalai and hot Pyaz Kachori during evening breaks.' },
  { id: 'rev-9',  stallId: 'stall-1', student: 'Harshdeep Singh', program: 'B.Tech CSE • 2nd Year',     rating: 4, date: '2026-11-20', status: 'Pending',  helpful: 2,  text: 'Amritsari Naan & Chole at N.K Food Court was crisp and filling. Fast counter service too.' },
  { id: 'rev-10', stallId: 'stall-5', student: 'Tanvi Joshi',     program: 'BCA • 1st Year',            rating: 5, date: '2026-11-20', status: 'Pending',  helpful: 4,  text: 'Veggie Wrap and Masala Fries from Oven Express are a 10/10 evening combo!' },
  { id: 'rev-11', stallId: 'stall-3', student: 'Arjun Malhotra',  program: 'B.Tech ME • 3rd Year',      rating: 2, date: '2026-11-19', status: 'Pending',  helpful: 1,  text: 'Noodles were a bit too oily during the 2 PM rush, though the steamed momos were fresh.' },
  { id: 'rev-12', stallId: 'stall-8', student: 'Vikram Das',      program: 'Guest',                     rating: 1, date: '2026-11-10', status: 'Rejected', helpful: 0,  text: 'Off-topic promotional post removed by campus moderators.' },
  { id: 'rev-13', stallId: 'stall-9',  student: 'Pranav Sharma',   program: 'B.Tech CSE • 2nd Year',     rating: 5, date: '2026-11-19', status: 'Approved', helpful: 18, text: 'Nand Juice Corner near BH-2 Playground is my daily post-workout stop. Fresh Anar Mix Juice and chilled Mosambi Juice are super refreshing and pocket-friendly!' },
  { id: 'rev-14', stallId: 'stall-10', student: 'Aakriti Bansal',  program: 'MBA • 2nd Year',            rating: 5, date: '2026-11-22', status: 'Approved', helpful: 21, text: "Domino's inside Uni Mall is super convenient for group treats after exams. Stuffed Garlic Breadsticks and Peppy Paneer always arrive piping hot." },
  { id: 'rev-15', stallId: 'stall-11', student: 'Nikhil Thakur',   program: 'B.Tech CSE • 3rd Year',     rating: 4, date: '2026-11-21', status: 'Approved', helpful: 13, text: 'CCD near Block 15A is the best quiet spot to finish assignments with a Classic Café Frappe.' },
  { id: 'rev-16', stallId: 'stall-12', student: 'Sneha Choudhary', program: 'B.Des • 2nd Year',          rating: 5, date: '2026-11-23', status: 'Approved', helpful: 26, text: 'Triple Chocolate Waffle at The Belgian Waffle Co. in Uni Mall is crisp, warm, and worth every rupee.' },
  { id: 'rev-17', stallId: 'stall-13', student: 'Yashvardhan Rai', program: 'B.Tech IT • 1st Year',      rating: 5, date: '2026-11-22', status: 'Approved', helpful: 16, text: 'Paneer Tikka Kathi Roll from Kathi Junction is my fastest 10-minute lunch between lectures.' },
  { id: 'rev-18', stallId: 'stall-14', student: 'Simranjeet Kaur', program: 'BBA • 2nd Year',            rating: 4, date: '2026-11-20', status: 'Approved', helpful: 11, text: 'Chicago Pizza Monster Veg Slice and Green Apple Cooler are a great Uni Mall combo when you do not want a whole pizza.' },
  { id: 'rev-19', stallId: 'stall-15', student: 'Varun Deshmukh',  program: 'B.Tech CSE • 2nd Year',     rating: 5, date: '2026-11-23', status: 'Approved', helpful: 19, text: 'Yummy Kitchen in BH-2 Food Market is super affordable — ₹55 Double Cheese Maggi and ₹65 Grilled Club Sandwich hit the spot every night.' },
  { id: 'rev-20', stallId: 'stall-12', student: 'Komal Preet',     program: 'B.Pharm • 3rd Year',        rating: 5, date: '2026-11-24', status: 'Pending',  helpful: 3,  text: 'Naked Nutella Waffle was super fresh and not overly sweet. Friendly counter staff too.' },
  { id: 'rev-21', stallId: 'stall-13', student: 'Ritesh Kumar',    program: 'BCA • 2nd Year',            rating: 4, date: '2026-11-24', status: 'Pending',  helpful: 2,  text: 'Aloo Masala Roll for ₹65 is great value for students on a tight monthly budget.' }
];
