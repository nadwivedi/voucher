const mockProducts = [
  {
    seoTitle: "Amazon Pay e-Gift Card - Min 5% Cashback",
    description: "Amazon Pay e-Gift Cards are the perfect gifting solution for all occasions. Redeemable on millions of products on Amazon.in. Safe, instant, and highly convenient.",
    category: "e-commerce",
    subCategory: "shopping",
    brand: "Amazon Pay Gift Card",
    model: "E-Gift Card",
    price: 950,
    originalPrice: 1000,
    stockQuantity: 500,
    images: ["https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Instant email delivery within 5 minutes",
      "Valid for 1 year from the date of activation",
      "Can be used to purchase any product on Amazon",
      "No hidden fees or charges"
    ],
    specifications: {
      "Voucher Type": "Digital Code",
      "Redemption Method": "Amazon App/Website",
      "Validity": "12 Months",
      "Region": "India Only"
    },
    isFeatured: true
  },
  {
    seoTitle: "Google Play Gift Card - ₹500 digital code",
    description: "Buy apps, games, music, movies, and more on the Google Play Store. Easy to redeem, never expires, and instantly added to your Google Play balance.",
    category: "gaming",
    subCategory: "gaming-credits",
    brand: "Google Play",
    model: "Play Store Voucher",
    price: 475,
    originalPrice: 500,
    stockQuantity: 800,
    images: ["https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Instant delivery of 16-digit digital code",
      "Usable on Android devices and web",
      "No expiration date",
      "Perfect for in-game purchases and subscriptions"
    ],
    specifications: {
      "Voucher Type": "Digital Code",
      "Redemption Method": "Google Play Store",
      "Validity": "Lifetime",
      "Region": "India Only"
    },
    isFeatured: true
  },
  {
    seoTitle: "Steam Wallet Code - ₹1000 Digital Code",
    description: "Access thousands of games, DLCs, and community items on Steam. The ultimate gaming platform gift card for PC gamers worldwide.",
    category: "gaming",
    subCategory: "gaming-credits",
    brand: "Steam",
    model: "Wallet Code",
    price: 960,
    originalPrice: 1000,
    stockQuantity: 300,
    images: ["https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Instant delivery via email",
      "Directly funds your Steam Wallet balance",
      "Valid for all games and in-game items on Steam",
      "No credit card required to purchase games on Steam"
    ],
    specifications: {
      "Voucher Type": "Digital Code",
      "Redemption Method": "Steam Client / Website",
      "Validity": "Lifetime",
      "Region": "India Only"
    },
    isFeatured: true
  },
  {
    seoTitle: "Netflix Gift Card - ₹1000 Subscription Card",
    description: "Watch your favorite TV shows, movies, documentaries, and specials on Netflix. Redeemable for any subscription plan.",
    category: "travel-entertainment",
    subCategory: "subscription",
    brand: "Netflix",
    model: "Subscription Card",
    price: 970,
    originalPrice: 1000,
    stockQuantity: 400,
    images: ["https://images.unsplash.com/photo-1574375927938-d5a98e8fed85?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Instantly adds credit to your Netflix account",
      "Valid for new and existing accounts",
      "No credit card required to start streaming",
      "Redeemable on Mobile, Basic, Standard, and Premium plans"
    ],
    specifications: {
      "Voucher Type": "Digital Code",
      "Redemption Method": "Netflix Account Settings",
      "Validity": "Lifetime",
      "Region": "India Only"
    },
    isFeatured: true
  },
  {
    seoTitle: "Starbucks E-Gift Card - ₹500 Beverage Voucher",
    description: "Indulge in premium handcrafted coffee, delicious food, and merchandise at any Starbucks store across India. Perfect gift for coffee lovers.",
    category: "food-dining",
    subCategory: "food-beverage",
    brand: "Starbucks",
    model: "Beverage Voucher",
    price: 450,
    originalPrice: 500,
    stockQuantity: 250,
    images: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Redeemable at all Starbucks outlets in India",
      "Can be added to the Starbucks India App",
      "Multiple redemptions allowed until balance is zero",
      "12 months validity from activation"
    ],
    specifications: {
      "Voucher Type": "Digital Barcode/Code",
      "Redemption Method": "In-Store scan or Mobile App",
      "Validity": "12 Months",
      "Region": "India Only"
    },
    isFeatured: false
  },
  {
    seoTitle: "Nike Shopping Voucher - ₹2000 Apparel E-Gift Card",
    description: "Gear up with the best Nike footwear, clothing, and accessories. Redeemable at exclusive Nike stores and online.",
    category: "fashion-lifestyle",
    subCategory: "clothing",
    brand: "Nike",
    model: "Store Voucher",
    price: 1850,
    originalPrice: 2000,
    stockQuantity: 150,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Redeemable at participating Nike retail stores",
      "Can be combined with seasonal sales and promotions",
      "Safe, easy-to-use digital barcode delivery",
      "Valid for 1 year"
    ],
    specifications: {
      "Voucher Type": "Digital E-Gift Card",
      "Redemption Method": "In-Store Billing Counter",
      "Validity": "12 Months",
      "Region": "India Only"
    },
    isFeatured: false
  },
  {
    seoTitle: "Apple Store Gift Card - ₹5000 iTunes & App Store Code",
    description: "One card for everything Apple: products, accessories, apps, games, music, movies, iCloud+, and more. Redeemable on any Apple platform.",
    category: "e-commerce",
    subCategory: "shopping",
    brand: "Apple",
    model: "App Store & iTunes Card",
    price: 4850,
    originalPrice: 5000,
    stockQuantity: 200,
    images: ["https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Instant email delivery of gift card code",
      "Use for hardware at Apple Store or content on App Store",
      "No expiration date",
      "Secure and convenient digital storage in Apple Wallet"
    ],
    specifications: {
      "Voucher Type": "Digital Code",
      "Redemption Method": "Apple ID Wallet",
      "Validity": "Lifetime",
      "Region": "India Only"
    },
    isFeatured: true
  },
  {
    seoTitle: "Spotify Premium 12-Month Subscription Voucher",
    description: "Enjoy millions of songs ad-free, with offline playback and high-quality audio. Gift a year of premium music subscription.",
    category: "travel-entertainment",
    subCategory: "subscription",
    brand: "Spotify",
    model: "12 Months Premium",
    price: 1099,
    originalPrice: 1189,
    stockQuantity: 350,
    images: ["https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&q=80&w=600"],
    features: [
      "Redeemable for 12 months of individual Premium subscription",
      "Ad-free music listening with unlimited skips",
      "Download music to listen offline",
      "Valid for new and existing Premium users (cannot be used with student/family discounts)"
    ],
    specifications: {
      "Voucher Type": "Digital Code",
      "Redemption Method": "Spotify Website Redeem Page",
      "Validity": "12 Months",
      "Region": "India Only"
    },
    isFeatured: true
  }
];

module.exports = mockProducts;
