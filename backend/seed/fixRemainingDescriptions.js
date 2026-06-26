require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const updates = [
  {
    name: 'Acer Aspire 5 Slim Laptop (Ryzen 5, 8GB, 256GB)',
    description: 'The Acer Aspire 5 Slim Laptop delivers reliable everyday computing with its AMD Ryzen 5 processor, 8GB of RAM, and a 256GB SSD for fast boot times. The 15.6-inch Full HD IPS display offers crisp, wide-angle viewing with slim bezels for an immersive experience.\n\nWeighing just 3.9 pounds, this laptop is easy to carry and features a backlit keyboard for comfortable typing in low-light environments. Wi-Fi 6 connectivity ensures fast, stable internet access, while the slim aluminum chassis gives it a premium look and feel.\n\nWith multiple USB ports including USB-C, HDMI output for external displays, and a fingerprint reader for quick Windows Hello login, the Aspire 5 is a versatile and affordable choice for students and home users who need a dependable everyday laptop.'
  },
  {
    name: 'Seagate Portable 2TB External Hard Drive',
    description: 'The Seagate Portable 2TB External Hard Drive is a compact, plug-and-play storage solution that makes it simple to back up and transfer files. Just drag and drop to save documents, photos, music, and videos with up to 2TB of space, enough for roughly 250,000 photos or 500 hours of HD video.\n\nIt connects via USB 3.0 for fast transfer speeds up to 5Gbps while remaining backward compatible with USB 2.0 ports. The compact, lightweight design fits easily into a bag or pocket, making it a great travel companion.\n\nCompatible with both Windows and Mac computers, this drive requires no external power adapter and includes Seagate Backup Software for automatic scheduled backups. Whether you are archiving old projects or freeing up space on your laptop, the Seagate Portable Drive is a simple and reliable way to keep your data safe.'
  },
  {
    name: 'WD My Passport 4TB Portable HDD',
    description: 'The WD My Passport 4TB Portable Hard Drive offers massive storage capacity in a sleek, pocket-sized design. With 4TB of space, you can store and back up thousands of hours of video, hundreds of thousands of photos, or a massive music library.\n\nIt features hardware encryption and password protection with 256-bit AES encryption to keep your files secure, and the included WD Discovery software makes setup and backup easy. USB 3.0 connectivity delivers fast data transfer speeds, while USB 2.0 backward compatibility ensures it works with older hardware.\n\nThe My Passport is designed for durability and portability, with a stylish textured enclosure that resists scratches. Automatic backup scheduling through WD Backup software ensures your files are always protected. Whether you need extra space for your growing media collection or a reliable backup solution, the WD My Passport delivers dependable performance.'
  },
  {
    name: 'StarTech.com USB 3.0 to HDMI Adapter',
    description: 'The StarTech.com USB 3.0 to HDMI Adapter lets you add an additional display to your computer without needing a separate graphics card. Simply plug it into a USB 3.0 port and connect an HDMI monitor for an instant second screen.\n\nSupporting resolutions up to 1920x1200 at 60Hz, this adapter delivers smooth, sharp video output suitable for presentations, extended desktops, or dual-monitor workstations. The compact dongle-style design is easy to carry and requires no external power supply.\n\nCompatible with Windows 7 and later, the adapter is ideal for laptops or desktops with limited video outputs. The included DisplayLink driver installs in minutes and supports screen mirroring, extension, and rotation modes, making it a flexible and affordable way to boost your productivity with multiple monitors.'
  },
  {
    name: 'Targus Laptop Cooling Pad with 4 Fans',
    description: 'The Targus Laptop Cooling Pad features four powerful fans that actively draw heat away from your laptop, keeping it cool during intense workloads or gaming sessions. The large 16-inch surface accommodates laptops from 12 to 17 inches with a secure, non-slip grip.\n\nAn ergonomic tilt design raises your laptop screen to a more comfortable viewing angle, reducing neck and back strain during long sessions. Adjustable fan speed lets you choose between whisper-quiet operation and maximum cooling power.\n\nPowered via a single USB pass-through cable so you do not lose a USB port, this cooling pad is lightweight and portable. Whether you work at a desk or game on the go, the Targus cooling pad extends your laptop performance and lifespan by preventing thermal throttling.'
  },
  {
    name: 'tomtoc 360 Protective Laptop Sleeve 15.6"',
    description: 'The tomtoc 360 Protective Laptop Sleeve is an award-winning carrying case designed to keep your 15.6-inch laptop safe from drops, scratches, and bumps. It features a patented CornerArmor design with reinforced corners and thick cushioning that absorbs impact from all angles.\n\nThe exterior is made from water-resistant, durable fabric that stands up to daily wear and tear. A large front pocket with elastic organization panels provides space for chargers, cables, and accessories.\n\nInside, a soft, fuzzy lining prevents scratches on your laptop finish. The slim, lightweight profile slides easily into backpacks or briefcases. Whether you commute daily or travel frequently, the tomtoc sleeve offers military-grade protection without the bulk.'
  },
  {
    name: 'UGREEN 7-in-1 Docking Station Dual Monitor',
    description: 'The UGREEN 7-in-1 Docking Station expands a single USB-C port into seven connectivity options, including dual HDMI output for extended desktop setups supporting up to 4K at 30Hz on one screen and 1080p on the second.\n\nAdditional ports include three USB-A 3.0 ports for high-speed data transfer at 5Gbps, a Gigabit Ethernet port for reliable wired networking, and a 100W USB-C power delivery pass-through port to keep your laptop charged while docked.\n\nThe compact, lightweight aluminum design dissipates heat efficiently and fits neatly on any desk. Plug-and-play on most modern operating systems without needing to install drivers, this dock is an ideal companion for ultrabooks and MacBook users who need more ports without carrying dongles everywhere.'
  },
  {
    name: 'TP-Link AX3000 WiFi 6 Router (Archer AX55)',
    description: 'The TP-Link Archer AX55 is a dual-band WiFi 6 router that delivers combined speeds of up to 3000Mbps across its 2.4GHz and 5GHz bands. OFDMA and MU-MIMO technology enable simultaneous communication with multiple devices, reducing lag even in busy households.\n\nWith four high-gain external antennas and beamforming technology, the AX55 delivers wide coverage and a strong signal throughout homes up to 2,500 square feet. A 1GHz dual-core processor handles heavy network traffic efficiently.\n\nTP-Link HomeShield provides free basic network security including a firewall, parental controls, and real-time IoT protection. Setup takes just minutes through the Tether app, and compatibility with Alexa lets you control network access with voice commands. The AX55 is an excellent upgrade for households with many connected devices.'
  },
  {
    name: 'TP-Link TL-SG108S-M2 8-Port Multi-Gigabit 2.5G Ethernet Switch',
    description: 'The TP-Link TL-SG108S-M2 is an 8-port multi-gigabit Ethernet switch that supports speeds of 100Mbps, 1Gbps, and 2.5Gbps on every port, making it a future-proof upgrade for home and small office networks.\n\nAll ports support auto-negotiation and non-blocking architecture ensures wire-speed switching across all connections. The fanless metal design operates silently and dissipates heat efficiently for reliable 24/7 operation.\n\nPlug-and-play installation means no configuration is needed. The energy-efficient design reduces power consumption during low-traffic periods. Whether you are connecting NAS devices, workstations, or WiFi 6E access points, the TL-SG108S-M2 delivers multi-gigabit performance without the complexity or cost of managed switches.'
  },
  {
    name: 'Anker Power Strip with USB-C 30W (12 Outlets)',
    description: 'The Anker Power Strip features 12 AC outlets and 3 USB ports including a 30W USB-C Power Delivery port capable of fast-charging phones, tablets, and even some laptops. A 6-foot cord with a flat plug reaches behind furniture easily.\n\nSurgeGuard technology protects up to 12 devices from power spikes with a 2,160-joule energy rating, while the fire-retardant casing adds an extra layer of safety. The slim, space-saving design lets you plug it behind a desk or mount it to a wall.\n\nThe widely spaced outlets accommodate large adapters without blocking adjacent sockets. Whether you are setting up a home office, entertainment center, or dorm room workstation, the Anker Power Strip keeps all your devices powered and protected in one convenient location.'
  },
  {
    name: 'Synology DS223j 2-Bay Diskstation NAS',
    description: 'The Synology DS223j is a 2-bay Network Attached Storage device designed for home users and small teams looking to centralize file storage, media streaming, and automated backups. Powered by a Realtek RTD1619B processor and 1GB of RAM, it delivers efficient performance for everyday storage tasks.\n\nSupporting up to two 3.5-inch SATA drives or 2.5-inch drives with a combined capacity of 40TB, the DS223j runs Synology DiskStation Manager software with over 100 built-in applications including file sharing, media streaming, and data protection tools.\n\nSetup through the Synology Assistant app is straightforward, and mobile apps like Synology Photos and Synology Drive let you access your files from anywhere. The compact, low-power design uses just 17.5 watts under load, making it an affordable and energy-efficient way to build your personal cloud.'
  },
  {
    name: 'Nulaxy 54W Bluetooth 5.3 Car Adapter Charger 4-Port Fast Charging',
    description: 'The Nulaxy 54W Bluetooth 5.3 Car Adapter plugs into your car cigarette lighter and transforms it into a multi-device charging hub with four USB ports and a sleek LED display showing voltage and music track information.\n\nSupporting up to 54W total output with QC 3.0 fast charging, it can charge four devices simultaneously without slowing down. Bluetooth 5.3 provides a stable, low-latency connection for hands-free calling and wireless music streaming from your phone to your car stereo.\n\nThe built-in microphone with noise cancellation ensures clear phone calls, while the LED screen shows incoming call numbers and music playback status. Dual rotary knobs control volume and track selection without touching your phone. Compatible with virtually any car with a 12V outlet, the Nulaxy adapter is an all-in-one upgrade for older vehicles.'
  },
  {
    name: 'Elgato Stream Deck MK.2 (15 keys)',
    description: 'The Elgato Stream Deck MK.2 features 15 customizable LCD keys that give you instant control over streaming, content creation, and productivity workflows. Each key displays a live icon and performs an action with a single press.\n\nUse it to switch scenes in OBS or Streamlabs, launch applications, adjust audio levels, trigger sound effects, or control smart home devices. The free Stream Deck software provides drag-and-drop configuration with an intuitive interface.\n\nThe adjustable stand offers two viewing angles, and the detachable USB-C cable makes setup and transport easy. With profiles for streaming, video editing, and office productivity, the Stream Deck MK.2 is an indispensable tool for creators and professionals who want instant tactile control at their fingertips.'
  },
  {
    name: 'Jabra Evolve2 55 UC Wireless Headset',
    description: 'The Jabra Evolve2 55 UC is a premium wireless headset designed for hybrid workers, featuring advanced noise cancellation that blocks out background noise for crystal-clear calls and focused work.\n\nIts 40mm custom drivers deliver rich, natural sound for music and calls, while the lightweight 55-gram design with memory foam ear cushions ensures all-day comfort. The boom arm microphone with Jabra Audio chipset ensures your voice is heard clearly in any environment.\n\nWith up to 32 hours of wireless battery life, Bluetooth 5.0 connectivity, and a USB adapter for seamless integration with UC platforms like Microsoft Teams and Zoom, the Evange2 55 is built for professionals who need reliable, high-quality audio throughout their workday.'
  },
  {
    name: 'HP LaserJet Pro MFP M428fdw (PrintScanCopyFax)',
    description: 'The HP LaserJet Pro MFP M428fdw is a monochrome laser multifunction printer designed for small office and workgroup productivity, offering print, scan, copy, and fax capabilities in one compact unit.\n\nPrinting speeds up to 40 pages per minute with a first-page-out time of 6.3 seconds, the M428fdw delivers professional-quality documents with HP Auto-On/Auto-Off technology that saves energy. The 50-sheet automatic document feeder speeds up multi-page scanning and copying.\n\nBuilt-in WiFi, Ethernet, and USB connectivity provide flexible deployment options, and the HP Smart app enables easy mobile printing and scanning. With enterprise-level security features and HP Wolf Pro Security, the M428fdw protects sensitive documents while keeping your office workflow efficient.'
  },
  {
    name: 'Soundcore Anker Motion Boom Waterproof Bluetooth Speaker',
    description: 'The Soundcore Motion Boom is a portable Bluetooth speaker built for outdoor adventures with IPX7 waterproof rating, meaning it can survive submersion in up to one meter of water for 30 minutes.\n\nDual drivers and dual passive radiators produce room-filling sound with enhanced bass thanks to BassUp technology that analyzes and boosts low frequencies in real time. Connect two Motion Boom speakers together for stereo sound.\n\nWith up to 24 hours of playback on a single charge and a built-in power bank function to charge your phone, the Motion Boom is ready for any outdoor trip. The lightweight, rugged design with a carry strap makes it easy to take to the beach, pool, or campsite.'
  },
  {
    name: 'Ring Video Doorbell (2nd Gen)',
    description: 'The Ring Video Doorbell (2nd Gen) lets you see, hear, and speak to visitors from anywhere using your smartphone. Its 1080p HD camera provides clear, wide-angle video with infrared night vision for around-the-clock monitoring.\n\nMotion detection zones let you customize alerts so you only get notified when someone approaches your door, and two-way audio lets you communicate with visitors without opening the door.\n\nThe doorbell connects to your existing doorbell wiring for continuous power, or runs on the included rechargeable battery. With optional Ring Protect subscription, you can save and review video clips. Compatible with Alexa, you can see who is at the door with a simple voice command. Installation is straightforward and takes just a few minutes with the included tools.'
  },
  {
    name: 'Braun ThermoScan 7 Ear Thermometer IRT6520',
    description: 'The Braun ThermoScan 7 is a precision ear thermometer featuring Age Precision technology, which provides a color-coded fever guidance display based on the age you select, making it easy to interpret temperature readings correctly for babies, toddlers, and adults.\n\nThe pre-warmed tip and ExacTemp technology ensure accurate readings every time by compensating for ambient temperature. A lens filter on each probe tip ensures hygiene and consistent results.\n\nMemory function stores the last nine readings, and a silent mode lets you take temperatures without waking a sleeping child. The ergonomic design fits comfortably in any ear, and the large backlit display is easy to read in any lighting. Trusted by pediatricians worldwide, the ThermoScan 7 is one of the most reliable consumer ear thermometers available.'
  },
  {
    name: 'Drive Medical Folding Walker with Wheels',
    description: 'The Drive Medical Folding Walker with Wheels is a lightweight, durable mobility aid designed to provide stable support for individuals recovering from surgery, injury, or chronic conditions.\n\nConstructed from welded aluminum, it supports up to 350 pounds while remaining light enough for easy transport. The 5-inch wheels on the front legs allow smooth, effortless movement across most indoor surfaces, while the rubber leg tips provide traction on smooth floors.\n\nThe easy one-button folding mechanism collapses the walker flat for storage or car transport. Height-adjustable legs accommodate users between 32 and 39 inches tall, and the ergonomic hand grips reduce wrist fatigue during extended use. Whether you are recovering from hip surgery or need daily stability support, this walker delivers reliable, comfortable mobility.'
  },
  {
    name: 'Oral-B iO Series 7 Electric Toothbrush',
    description: 'The Oral-B iO Series 7 is a premium electric toothbrush featuring a frictionless magnetic drive system that transfers micro-vibrations directly to the bristle tips for a thorough yet gentle clean.\n\nIts 3D tracking technology with AI recognizes and adapts to your brushing style across all tooth surfaces, while the pressure sensor alerts you if you are pressing too hard. Seven cleaning modes including Daily Clean, Whitening, Sensitive, Gum Care, Intense Clean, Super Sensitive, and Tongue Cleaning let you customize every session.\n\nThe smart display on the handle shows brushing time, battery level, and mode selection. A two-minute professional timer with 30-second interval reminders ensures you brush the recommended time. The sleek travel case charges the brush fully in just 3 hours, providing up to 14 days of use on a single charge.'
  },
  {
    name: 'Optimum Nutrition Gold Standard Whey Protein 5 lb (Double Rich Chocolate)',
    description: 'Optimum Nutrition Gold Standard 100% Whey Protein in Double Rich Chocolate flavor is one of the most popular and trusted protein supplements in the world, providing 24 grams of high-quality whey protein per scoop.\n\nEach serving delivers 5.5 grams of naturally occurring branched-chain amino acids (BCAAs) and 11 grams of essential amino acids to support muscle recovery and growth after intense training. The formula uses a blend of whey protein isolate as the primary ingredient with whey protein concentrate and peptides.\n\nMixes easily with a shaker bottle or in a blender for a smooth, great-tasting shake without the chalky texture. Whether you are building muscle, recovering from workouts, or simply need a convenient protein source, Gold Standard Whey delivers consistent quality and taste that athletes have relied on for over 25 years.'
  },
  {
    name: 'Jam Paper Wrapping Paper, 5 Rolls Assorted Patterns',
    description: 'Jam Paper Wrapping Paper comes in a set of 5 rolls with assorted patterns including polka dots, stripes, chevron, snowflakes, and geometric designs, giving you versatile options for birthdays, holidays, and special occasions.\n\nEach roll measures 30 inches long by 30 inches wide, providing ample coverage for standard and oversized gifts. The premium-weight paper resists tearing and creasing while folding neatly around corners for a clean, professional look.\n\nThe vibrant, fade-resistant inks ensure your wrapped gifts look bright and attractive. Whether you are wrapping birthday presents, holiday gifts, or party favors, this multi-pattern set gives you a variety of stylish options without having to buy separate rolls.'
  },
  {
    name: 'NOW Foods Omega-3 Fish Oil 2400mg (200 softgels)',
    description: 'NOW Foods Omega-3 Fish Oil provides 2400mg of marine fish oil per serving of two softgels, delivering 800mg of EPA and 600mg of DHA omega-3 fatty acids to support cardiovascular health, brain function, and joint mobility.\n\nThe molecular distillation process removes heavy metals, PCBs, and other contaminants to ensure a pure, clean product that meets strict international quality standards. The lemon-flavored softgels are easy to swallow and minimize any fishy aftertaste.\n\nNOW Foods is a trusted brand in natural health products, and this fish oil supplement is manufactured in a GMP-certified facility to ensure consistent quality and potency. Whether you are looking to support heart health, cognitive function, or overall wellness, this fish oil provides high-potency omega-3s in a convenient softgel form.'
  },
  {
    name: 'Thorne Magnesium Glycinate 90 Capsules',
    description: 'Thorne Magnesium Glycinate provides 200mg of highly bioavailable magnesium in the glycinate form, which is gentle on the stomach and well-absorbed compared to other magnesium forms.\n\nMagnesium is essential for over 300 enzymatic reactions in the body, including muscle and nerve function, energy production, and bone health. The glycinate form also supports restful sleep and relaxation without causing digestive discomfort.\n\nThorne is a trusted practitioner-grade supplement brand used by healthcare professionals and athletes worldwide. These capsules are gluten-free, dairy-free, and soy-free, and manufactured in a GMP-certified facility. Whether you are supplementing to support sleep quality, muscle recovery, or general wellness, Thorne Magnesium Glycinate delivers clean, effective magnesium in a gentle form.'
  },
  {
    name: 'Ambu Res-Cue Key CPR Face Shield Keychain (50-pack)',
    description: 'The Ambu Res-Cue Key is a compact CPR pocket mask that attaches to your keychain, giving you immediate access to a protective barrier whenever an emergency arises.\n\nMade from transparent, medical-grade TPU, the face shield allows you to see the patient\'s lip color while performing rescue breathing. The one-way valve prevents backflow of fluids, protecting both the rescuer and the patient.\n\nEach pack contains 50 individually sealed face shields, making them ideal for stocking in first aid kits, classrooms, workplaces, and vehicles. The flat, lightweight design fits easily in a pocket or purse. Having one on your keychain ensures you are always prepared to give life-saving breaths without hesitation during a CPR emergency.'
  },
];

async function main() {
  await connectDB();
  
  let updated = 0;
  let notFound = 0;
  
  for (const item of updates) {
    const product = await Product.findOne({ name: item.name });
    if (product) {
      await Product.findByIdAndUpdate(product._id, { description: item.description });
      console.log(`Updated: ${item.name} (${item.description.length} chars)`);
      updated++;
    } else {
      console.log(`Not found: ${item.name}`);
      notFound++;
    }
  }
  
  console.log(`\nDone. Updated: ${updated}, Not found: ${notFound}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
