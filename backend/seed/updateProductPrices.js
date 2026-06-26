require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const updates = [
  // COMPUTERS - $10 placeholders
  { id: '6a3e1715282c4f7fe8ad5811', price: 50, originalPrice: 65, description: '16GB (2x8GB) DDR4 3200MHz CL16 desktop memory kit with RGB LEDs, custom performance PCB, Intel/AMD compatible' },
  { id: '6a3e1715282c4f7fe8ad5813', price: 80, originalPrice: 105, description: 'PCIe Gen 4x4 NVMe M.2 2280 internal SSD, up to 7150MB/s read, HMB and Intelligent TurboWrite 2.0' },
  { id: '6a3e1716282c4f7fe8ad5816', price: 350, originalPrice: 450, description: '15.6-inch FHD IPS display, Intel Core i5, 8GB DDR4 RAM, 256GB NVMe SSD, backlit keyboard, Windows 11' },
  { id: '6a3e1719282c4f7fe8ad581f', price: 25, originalPrice: 35, description: 'USB 3.0 slim portable external DVD drive, M-DISC support, plug and play, Windows and Mac compatible' },
  { id: '6a3e1719282c4f7fe8ad5821', price: 160, originalPrice: 200, description: 'USB 3.2 Gen 2x2 portable SSD, up to 2100MB/s read, IP65 dust/water resistant, drop resistant to 3 meters' },
  { id: '6a3e171c282c4f7fe8ad5829', price: 400, originalPrice: 460, description: '27-inch 4K UHD IPS monitor, 100% sRGB, USB-C 96W PD, Calman Verified, HDR, built-in USB hub' },
  { id: '6a3e171c282c4f7fe8ad582a', price: 130, originalPrice: 170, description: '24-inch FHD IPS monitor, eye-care technology, cable management, thin bezel, built-in speakers' },
  { id: '6a3e171c282c4f7fe8ad582b', price: 265, originalPrice: 330, description: '27-inch QHD 165Hz IPS gaming monitor, FreeSync Premium Pro, G-Sync compatible, 1ms response, HDR' },
  { id: '6a3e171c282c4f7fe8ad582c', price: 100, originalPrice: 150, description: '24-inch FHD IPS monitor, 3-side borderless, AMD FreeSync, On-Screen Control, 75Hz refresh rate' },
  { id: '6a3e171d282c4f7fe8ad582d', price: 180, originalPrice: 280, description: '27-inch QHD 144Hz curved gaming monitor, 1ms response, FreeSync Premium, HDR10, 1000R curvature' },
  { id: '6a3e171e282c4f7fe8ad5831', price: 30, originalPrice: 40, description: '8-port multi-gigabit 2.5G Ethernet switch, plug-and-play, fanless design, silent operation' },
  { id: '6a3e171f282c4f7fe8ad5834', price: 65, originalPrice: 85, description: '650VA/390W battery backup with surge protection, 6 outlets, automatic voltage regulation' },
  { id: '6a3e1723282c4f7fe8ad5844', price: 450, originalPrice: 500, description: '4-bay NAS with Intel Celeron J4125, 4GB DDR4, 2x 2.5GbE ports, PCIe Gen 2 slot, HDMI output' },
  { id: '6a3e1724282c4f7fe8ad5846', price: 16, originalPrice: 20, description: '20W USB-C compact charger, foldable plug, PowerIQ 3.0 fast charging for iPad and tablets' },
  { id: '6a3e1725282c4f7fe8ad5849', price: 15, originalPrice: 20, description: 'Tempered glass screen protector 2-pack for iPad 11th and 10th generation, scratch resistant' },

  // ELECTRONICS - $10 placeholders
  { id: '6a3e1735282c4f7fe8ad5880', price: 270, originalPrice: 370, description: '100-sheet auto-feed micro-cut shredder, P-4 security, 15-min continuous run, SilentShred, 6-gallon bin' },
  { id: '6a3e1735282c4f7fe8ad5881', price: 450, originalPrice: 550, description: 'Wireless monochrome laser MFP, print/scan/copy/fax, 40ppm, duplex, 2.7-inch touchscreen' },
  { id: '6a3e1737282c4f7fe8ad5888', price: 290, originalPrice: 360, description: '8-channel PoE NVR, H.265+ compression, up to 12MP resolution, 80Mbps incoming bandwidth' },
  { id: '6a3e1738282c4f7fe8ad588b', price: 35, originalPrice: 50, description: '2K QHD indoor/outdoor security camera, color night vision, 2-way audio, motion tracking, spotlight and siren' },
  { id: '6a3e1739282c4f7fe8ad588d', price: 1100, originalPrice: 2000, description: '55-inch OLED evo 4K Smart TV, a9 Gen7 AI processor, Dolby Vision and Atmos, 120Hz, 4 HDMI 2.1 ports' },
  { id: '6a3e1739282c4f7fe8ad588e', price: 350, originalPrice: 450, description: '55-inch Crystal UHD 4K Smart TV, Crystal Processor 4K, PurColor, Tizen Smart TV, 3 HDMI ports' },
  { id: '6a3e1739282c4f7fe8ad588f', price: 850, originalPrice: 1200, description: '65-inch Full Array LED 4K HDR Google TV, XR Processor, Dolby Vision, 120Hz, 4K X-Reality PRO' },
  { id: '6a3e1739282c4f7fe8ad5890', price: 350, originalPrice: 450, description: '65-inch 4K UHD HDR Smart Roku TV, Dolby Vision, HDR10, 4 HDMI ports, Roku streaming built-in' },

  // SPORTS AND OUTDOORS - all $10
  { id: '6a3e1756282c4f7fe8ad58ee', price: 30, originalPrice: 50, description: 'Soccer-inspired track jacket, moisture-wicking AEROREADY, Primegreen recycled polyester, full zip, stand-up collar' },
  { id: '6a3e1757282c4f7fe8ad58ef', price: 200, originalPrice: 271, description: '6-person cabin tent with instant 60-second setup, WeatherTec system, fits 2 queen air beds, 10x9 ft, vented rainfly' },
  { id: '6a3e1757282c4f7fe8ad58f0', price: 45, originalPrice: 45, description: '32oz stainless steel insulated water bottle, TempShield double-wall vacuum insulation, 24hr cold, 12hr hot, leakproof' },
  { id: '6a3e1757282c4f7fe8ad58f1', price: 130, originalPrice: 130, description: 'Inflatable single-person kayak, 9 feet long, 220lb capacity, includes 86-inch paddle and high-output pump' },
  { id: '6a3e1757282c4f7fe8ad58f2', price: 180, originalPrice: 200, description: '24L day hiking backpack, Airspeed ventilated backpanel, included raincover, Stow-on-the-Go trekking pole attachment' },
  { id: '6a3e1758282c4f7fe8ad58f3', price: 190, originalPrice: 190, description: '150lb rubber hex dumbbell set with A-frame rack, pairs of 5/10/15/20/25 lb, knurled steel handles, rubber coating' },
  { id: '6a3e1758282c4f7fe8ad58f4', price: 30, originalPrice: 30, description: '15-foot agility training ladder with 11 heavy-duty rungs, improves speed and coordination, includes carry bag' },
  { id: '6a3e1758282c4f7fe8ad58f5', price: 50, originalPrice: 80, description: 'Recreational tennis racket, Arc Technology frame, graphite construction, 103 sq in head, strung and ready to play' },

  // TOYS AND GAMES - all $10
  { id: '6a3e1759282c4f7fe8ad58f6', price: 13, originalPrice: 15, description: '6-dart rotating drum blaster, slam-fire action, fires darts up to 90 feet, comes with 6 Official Nerf darts' },
  { id: '6a3e1759282c4f7fe8ad58f7', price: 25, originalPrice: 30, description: 'Collectible action figures and accessories from Roblox Ninja Legends, includes exclusive virtual item code' },
  { id: '6a3e175a282c4f7fe8ad58f8', price: 13, originalPrice: 18, description: 'Classic wooden block stacking game, 54 blocks, skill and chance, for 1 or more players, ages 6 and up' },
  { id: '6a3e175a282c4f7fe8ad58f9', price: 20, originalPrice: 25, description: 'Classic property trading board game for 2 to 6 players, buy and trade properties, family game night favorite' },
  { id: '6a3e175a282c4f7fe8ad58fa', price: 13, originalPrice: 13, description: '159-piece LEGO Technic building set, buildable NASA Mars Rover Perseverance with Ingenuity helicopter model' },
  { id: '6a3e175b282c4f7fe8ad58fb', price: 23, originalPrice: 28, description: '20-pack of 1:64 scale die-cast vehicles, authentic details and decos, gift-ready packaging for ages 3 and up' },
  { id: '6a3e175b282c4f7fe8ad58fc', price: 60, originalPrice: 80, description: 'iPad-based hands-on learning kit with 5 educational games, Osmo Reflector, Tangram pieces, and Words tiles' },

  // HEALTH AND HOUSEHOLD - $10 placeholders
  { id: '6a3e1745282c4f7fe8ad58b4', price: 9, originalPrice: 12, description: 'Latex-free elastic bandage rolls, 4 inch by 4.5 yards, provides compression and support for sprains and strains' },
  { id: '6a3e1745282c4f7fe8ad58b5', price: 8, originalPrice: 10, description: 'Non-adherent bordered gauze pads, 4x4 inches, sterile wound dressings, 50-count box, individually wrapped' },
  { id: '6a3e1749282c4f7fe8ad58c3', price: 25, originalPrice: 30, description: '30 servings, patent-pending 3:1:2 BCAA ratio, supports muscle recovery and reduces breakdown, fruit punch flavor' },

  // FASHION - incorrect prices
  { id: '6a3e5638d7d1bdfe68183eca', price: 15, originalPrice: 20, description: 'Mens dress socks, cotton-blend fabric, assorted colors and patterns, comfortable 3-pack' },
  { id: '6a3e5641d7d1bdfe68183ee0', price: 130, originalPrice: 160, description: 'Mens running shoes, Max Air unit for cushioning, lightweight mesh upper, durable rubber outsole, iconic design' },
  { id: '6a3e5641d7d1bdfe68183ee1', price: 90, originalPrice: 120, description: 'Mens dress oxford, premium leather upper, cushioned Ortholite insole, classic lace-up design, versatile style' },
  { id: '6a3e5642d7d1bdfe68183ee3', price: 198, originalPrice: 210, description: 'Mens waterproof premium leather boot, seam-sealed construction, anti-fatigue comfort insole, iconic styling' },
];

async function main() {
  await connectDB();
  console.log(`Updating ${updates.length} products...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      const product = await Product.findById(update.id);
      if (!product) {
        console.log(`NOT FOUND: ${update.id}`);
        errorCount++;
        continue;
      }

      const oldPrice = product.price;
      product.price = update.price;
      if (update.originalPrice) product.originalPrice = update.originalPrice;
      if (update.description) product.description = update.description;
      await product.save();

      console.log(`OK: ${product.name} | $${oldPrice} -> $${update.price} | orig: $${update.originalPrice}`);
      successCount++;
    } catch (err) {
      console.log(`ERROR: ${update.id} - ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\nDone! Updated: ${successCount}, Errors: ${errorCount}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
