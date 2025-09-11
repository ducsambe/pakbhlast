// Centralized product data with enhanced structure
export interface Product {
  id: string
  name: string
  color: string
  colorKey: string
  colorCode: string
  length: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  images: string[]
  inStock: boolean
  popular?: boolean
  description: string
  weight: string
  texture: string
  features: string[]
  category: string
  slug: string
}

// Base product template to reduce repetition
const createBaseProduct = (): Omit<Product, 'id' | 'name' | 'color' | 'colorKey' | 'colorCode' | 'length' | 'price' | 'originalPrice' | 'slug'> => ({
  rating: 4.5,
  reviews: 50,
  image: "",
  images: [],
  inStock: true,
  description: "Premium quality afro kinky bulk hair perfect for braiding and protective styling.",
  weight: "50g",
  texture: "Afro Kinky",
  category: "afro-kinky-bulk",
  features: [
    "100% Premium Human Hair",
    "Natural Afro Kinky Texture",
    "Perfect for Braiding & Dreadlocks",
    "Heat Resistant up to 350°F"
  ],
});

// Color definitions
const colors = {
  naturalBlack: {
    name: "Natural Black",
    key: "natural-black",
    code: "#1B1B1B",
    multiplier: 1.0
  },
  darkBrown: {
    name: "Dark Brown",
    key: "dark-brown",
    code: "#3C2415",
    multiplier: 1.0
  },
  mediumBrown: {
    name: "Medium Brown",
    key: "medium-brown",
    code: "#8B4513",
    multiplier: 1.0
  },
  reddishBrown: {
    name: "Reddish Brown",
    key: "reddish-brown",
    code: "#A0522D",
    multiplier: 1.0
  },
  blackBrownMix: {
    name: "Black & Brown Mix",
    key: "black-brown-mix",
    code: "#654321",
    multiplier: 1.0
  },
  burgundy: {
    name: "Burgundy",
    key: "burgundy",
    code: "#800020",
    multiplier: 1.0
  }
};

// Length definitions with base prices
const lengths = {
  ten: { display: '10"', price: 25 },
  twelve: { display: '12"', price: 30 },
  fourteen: { display: '14"', price: 35 },
  sixteen: { display: '16"', price: 45 },
  eighteen: { display: '18"', price: 50 },
  twenty: { display: '20"', price: 55 },
  twentyTwo: { display: '22"', price: 60 }
};

// Helper function to generate slug in the format: afro-kinky-{color}-{length}
const generateSlug = (colorKey: string, lengthDisplay: string): string => {
  const cleanLength = lengthDisplay.replace('"', '');
  return `afro-kinky-${colorKey}-${cleanLength}`;
};

// Generate products programmatically to reduce repetition
const generateProducts = () => {
  const products: Product[] = [];
  
  // Helper function to create product variants
  const createProduct = (
    color: typeof colors[keyof typeof colors],
    length: typeof lengths[keyof typeof lengths],
    overrides: Partial<Product> = {}
  ) => {
    const basePrice = Math.round(length.price * color.multiplier);
    const originalPrice = basePrice + 20;
    const name = `PAKBH ${color.name} Afro Kinky Bulk Hair - ${length.display}`;
    
    return {
      ...createBaseProduct(),
      id: `afro-kinky-${color.key}-${length.display.replace('"', '')}`,
      name: name,
      slug: generateSlug(color.key, length.display),
      color: color.name,
      colorKey: color.key,
      colorCode: color.code,
      length: length.display,
      price: basePrice,
      originalPrice,
      ...overrides
    };
  };

  // Natural Black products
  products.push(
    createProduct(colors.naturalBlack, lengths.fourteen, {
      rating: 4.9,
      reviews: 234,
      image: "/IMG-20250629-WA0185.jpg",
      images: ["/IMG-20250629-WA0185.jpg", "/IMG-20250629-WA0183.jpg",  "/pakbh04007663.jpg",  "/IMG-20250629-WA0168.jpg"],
      popular: true
    })
  );
  products.push(
    createProduct(colors.naturalBlack, lengths.twentyTwo, {
      rating: 4.8,
      reviews: 98,
      image: "/IMG-20250629-WA0197.jpg",
      images: ["/IMG-20250629-WA0197.jpg", "/IMG-20250702-WA0002.jpg", "/IMG-20250702-WA0006.jpg"]
    })
  );
  
  // Dark Brown products
  products.push(
    createProduct(colors.darkBrown, lengths.twenty, {
      rating: 4.6,
      reviews: 112,
      image: "/dark_brown_afro_kinky_bulk_human_hair_for_dreadlocks_black_women.webp",
      images: ["/soft_afro_kinky_bulk_hair_extensions_for_4c_protective_styles.webp", "/dark_brown_afro_kinky_bulk_human_hair_for_dreadlocks_black_women.webp", "/afro_kinky_bulk_human_hair_for_dreadlocks_and_twists_in_deep_brown.webp"],
    })
  );
  
  products.push(
    createProduct(colors.darkBrown, lengths.fourteen, {
      rating: 4.8,
      reviews: 167,
      image: "/QVR-Affordable-Afro-Kinky-Bulk-Human-Hair-Auburn-Color-For-Braiding-DreadLock.webp",
      images: ["/QVR-Affordable-Afro-Kinky-Bulk-Human-Hair-Auburn-Color-For-Braiding-DreadLock.webp", "/auburn_color_afro_kinky_bulk_human_hair_for_braiding.webp", "/realistic_afro_kinky_bulk_human_hair_for_4c_dreadlocks.jpg"],
      popular: true
    })
  );

  products.push(
    createProduct(colors.darkBrown, lengths.sixteen, {
      rating: 4.6,
      reviews: 112,
      image: "/styles.webp",
      images: ["/styles.webp", "/dark_brown_afro_kinky_bulk_hair_perfect_for_protective_hairstyles.webp", "/afro_kinky_bulk_human_hair_for_dreadlocks_and_twists_in_deep_brown.webp"]
    })
  );

  // Medium Brown products
  products.push(
    createProduct(colors.mediumBrown, lengths.fourteen, {
      rating: 4.7,
      reviews: 145,
      image: "/IMG-20250702-WA0001.jpg",
      images: ["/afro-kinky-bulk-perfect-for-building-volume-in-locs.webp", "/IMG-20250702-WA0001.jpg",  "/highlight_afro_kinky_hair_extensions_for_natural_locs.webp"]
    })
  );

  products.push(
    createProduct(colors.mediumBrown, lengths.sixteen, {
      rating: 4.7,
      reviews: 145,
      image: "/honey_blonde_afro_kinky_bulk_human_hair_for_dreadlocks_black_women.jpg",
      images: ["/honey_blonde_afro_kinky_bulk_human_hair_for_dreadlocks_black_women.jpg", "/soft_afro_kinky_hair_extensions_in_blonde_for_4c_protective_styles.jpg", "/blonde_afro_kinky_bulk_human_hair_for_braiding_black_female_styles.webp"]
    })
  );

  // Reddish Brown products
  products.push(
    createProduct(colors.reddishBrown, lengths.fourteen, {
      rating: 4.6,
      reviews: 89,
      image: "/auburn_afro_kinky_hair_extensions_for_4c_hair_textures.jpg",
      images: ["/IMG-20250629-WA0189.jpg", "/auburn_afro_kinky_hair_extensions_for_4c_hair_textures.jpg", "/IMG-20250629-WA0193.jpg"],
      popular: true,
      description: "Stunning reddish brown afro kinky bulk hair with warm auburn tones perfect for adding dimension to your style."
    })
  );

  // Black & Brown Mix products
  products.push(
    createProduct(colors.blackBrownMix, lengths.sixteen, {
      rating: 4.5,
      reviews: 95,
      image: "/afro_kinky_bulk_human_hair_auburn_black_mix_for_dreadlocks.jpg",
      images: [
        "/afro_kinky_bulk_human_hair_auburn_black_mix_for_dreadlocks.jpg",
        "/natural_black_afro_kinky_bulk_hair_extensions_for_4c_hair.jpg",
        "/afro_kinky_bulk_hair_extensions_two_tone_for_protective_styles.jpg"
      ],
      description: "Rich combination of black and brown tones for a sophisticated and elegant look.",
      features: [
        "100% Premium Human Hair",
        "Black & Brown Blend",
        "Sophisticated Look", 
        "Rich Color Depth"
      ]
    })
  );

  // Burgundy products
  products.push(
    createProduct(colors.burgundy, lengths.fourteen, {
      rating: 4.5,
      reviews: 84,
      image: "/defined-afro-kinky-hair-extensions-that-mimic-4c-texture.webp",
      images: ["/defined-afro-kinky-hair-extensions-that-mimic-4c-texture.webp", "/soft_afro_kinky_bulk_hair_for_4c_twists.jpg", "/qvr_afro_kinky_bulk_human_hair_99j_color.webp"],
      description: "Vibrant purple afro kinky bulk hair for creative and expressive protective styling."
    })
  );

  products.push(
    createProduct(colors.burgundy, lengths.twenty, {
      rating: 4.6,
      reviews: 92,
      image: "/natural_1b_and_dark_orange_afro_kinky_bulk_human_hair_for_4c_hair.webp",
      images: ["/natural_1b_and_dark_orange_afro_kinky_bulk_human_hair_for_4c_hair.webp", "/protective-afro-kinky-hair-extensions-for-black-women.jpg", "/vibrant_afro_kinky_bulk_hair_extensions_for_protective_twists.jpg"],
      description: "Deep burgundy afro kinky bulk hair with rich wine tones for a bold and sophisticated look."
    })
  );

  products.push(
    createProduct(colors.burgundy, lengths.twenty, {
      rating: 4.7,
      reviews: 134,
      image: "/20250731-4.jpg",
      images: ["/20250731-4.jpg", "/20250731-6.jpg", "/20250731-5.jpg", "/rich_mix_1b_99j_afro_kinky_bulk_for_4c_protective_styles.jpg"],
      description: "Stunning Burgundy afro kinky bulk hair with warm auburn tones perfect for adding dimension to your style."
    })
  );

  return products;
};

// Generate all products
export const afroKinkyProducts: Product[] = generateProducts();

// Color options array
export const colorOptions = Object.values(colors).map(color => ({
  key: color.key,
  name: color.name,
  colorCode: color.code
}));

// Length options array
export const lengthOptions = Object.values(lengths).map(length => length.display);

// Pack options with discounts
export const packOptions = [
  { count: 1, label: "1 Pack", discount: 0, badge: "" },
  { count: 3, label: "3 Packs (Full Head)", discount: 15, badge: "Popular" },
  { count: 5, label: "5 Packs (Recommended)", discount: 30, badge: "Best Value" },
];

// Utility functions
export const getAllProducts = (): Product[] => {
  return afroKinkyProducts;
};

export const getProductById = (id: string): Product | undefined => {
  return afroKinkyProducts.find((product) => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return afroKinkyProducts.find((product) => product.slug === slug);
};

export const getProductsByColor = (colorKey: string): Product[] => {
  return afroKinkyProducts.filter(
    (product) => product.colorKey === colorKey
  );
};

export const getProductsByLength = (length: string): Product[] => {
  return afroKinkyProducts.filter((product) => product.length === length);
};

export const getAvailableColors = () => colorOptions;
export const getAvailableLengths = () => lengthOptions;
export const getPackOptions = () => packOptions;

// Price calculation functions
export const getPriceForLength = (length: string): number => {
  const lengthObj = Object.values(lengths).find(l => l.display === length);
  return lengthObj ? lengthObj.price : 35;
};

export const getColorMultiplier = (colorKey: string): number => {
  const color = Object.values(colors).find(c => c.key === colorKey);
  return color ? color.multiplier : 1.0;
};

export const calculateDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const getSimilarProducts = (currentProduct: Product, limit = 4): Product[] => {
  if (!currentProduct) return [];

  const sameColorProducts = afroKinkyProducts.filter(
    (p) => p.colorKey === currentProduct.colorKey && p.id !== currentProduct.id
  );

  return sameColorProducts.slice(0, limit);
};

// Get products organized by length for better display
export const getProductsByLengthGroup = () => {
  const groups: { [key: string]: Product[] } = {};

  lengthOptions.forEach((length) => {
    groups[length] = afroKinkyProducts.filter((product) => product.length === length);
  });

  return groups;
};

// Get the main product for each color (14" as default)
export const getMainProducts = (): Product[] => {
  const mainProducts: Product[] = [];

  colorOptions.forEach((color) => {
    const product = afroKinkyProducts.find((p) => 
      p.colorKey === color.key && p.length === '14"'
    );
    if (product) {
      mainProducts.push(product);
    }
  });

  return mainProducts;
};