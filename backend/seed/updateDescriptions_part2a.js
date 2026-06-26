require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

const products = [
  // Camera & Photo
  {
    id: '6a3e1729282c4f7fe8ad5855',
    name: 'Canon EOS M50 Mark II',
    description: `The Canon EOS M50 Mark II is the kind of camera that makes you wonder why anyone still carries a point-and-shoot. Its 24.1MP APS-C CMOS sensor paired with Canon's DIGIC 8 processor delivers images with rich color and impressive detail, even in challenging lighting. The Dual Pixel CMOS AF system locks onto subjects quickly and smoothly, so you're not fumbling with focus when the moment matters.

What really sets this camera apart for content creators is the vari-angle touchscreen and built-in 4K24p video recording. You can flip the screen around to frame yourself perfectly for vlogs or tutorials, and the autofocus tracks your face with surprising reliability. WiFi and Bluetooth connectivity mean you can transfer files straight to your phone and share them without plugging into a computer, which is exactly how it should work.

The included EF-M 15-45mm f/3.5-6.3 IS STM lens is compact and sharp enough for everyday shooting, from wide-angle landscapes to casual portraits. At just 13.8 ounces with the battery and card, the M50 Mark II won't weigh down your bag, but it packs enough punch to handle anything from family gatherings to serious YouTube content. Canon built this camera for people who want great results without learning a whole new system.`
  },
  {
    id: '6a3e1729282c4f7fe8ad5856',
    name: 'DJI Osmo Mobile 6',
    description: `The DJI Osmo Mobile 6 turns your smartphone into a seriously smooth video machine. Its 3-axis gimbal stabilization eliminates the shaky handheld look that makes amateur footage obvious, whether you're walking through a market or running after your kids. The magnetic phone clamp snaps on and off in a second, so you're not wasting time wrestling with mounts when something interesting happens.

ActiveTrack 5.0 is where the magic really happens. Point it at a person, pet, or moving subject and it will track them automatically while you focus on composition. The built-in extension rod lets you get those impossible overhead shots or wider group shots without asking a stranger to hold your phone. Gesture control means you can start and stop recording or snap a photo with a simple hand wave, which is surprisingly handy when you're trying to capture yourself.

Folded down, the Osmo Mobile 6 slips easily into a jacket pocket or small bag, making it something you'll actually carry with you. The battery lasts long enough for a full day of shooting, and DJI's Mimo app adds intelligent shooting modes that would otherwise require expensive equipment and editing skills. If you've been wanting better phone video but don't want to invest in a dedicated camera, this is the bridge that gets you there.`
  },
  {
    id: '6a3e1729282c4f7fe8ad5857',
    name: 'GoPro HERO12 Black',
    description: `The GoPro HERO12 Black is built for people who live rough and shoot constantly. It captures 5.3K video at 60fps or 4K at 120fps, which means you get buttery slow-motion footage with detail that holds up even when you crop in. HyperSmooth 6.0 stabilization is genuinely impressive -- it smooths out bumpy bike rides and ski runs so well that you'd think you had a gimbal mounted, except you didn't, because you just strapped this thing to your helmet and went.

It's waterproof down to 33 feet without any extra housing, so you can take it snorkeling, surfing, or just drop it in the pool without worrying. The new HDR photo mode captures better dynamic range in bright outdoor scenes, which was one of the few complaints about previous models. Bluetooth audio support lets you connect wireless headphones to hear what's happening during playback, or pair an external mic for cleaner sound when you're narrating.

The Quik app makes editing surprisingly painless -- it can auto-generate highlight reels and sync footage to music with minimal input from you. Battery life gets a meaningful boost over the HERO11, and the dual mount system means you're not stuck with one attachment style. Whether you're documenting extreme sports or just want a tough camera that handles everything from rainy hikes to underwater adventures, the HERO12 Black delivers without overcomplicating things.`
  },
  {
    id: '6a3e1729282c4f7fe8ad5858',
    name: 'SanDisk Extreme 128GB SD',
    description: `The SanDisk Extreme 128GB SDXC card is one of those accessories that just works, every time, in every device you put it in. With read speeds up to 190MB/s and write speeds up to 90MB/s, it handles continuous burst shooting on DSLRs and mirrorless cameras without buffering, and it writes 4K video smoothly without dropping frames. If you've ever had a cheap card ruin a perfect shot by being too slow, you know why this matters.

The V30, U3, and A2 ratings mean it's ready for demanding applications -- your camera, drone, action cam, or laptop will all read from it at full speed. It's built to survive the kind of treatment that kills lesser cards: waterproof, X-ray proof, magnet proof, and shock resistant. SanDisk even includes a one-year subscription to RescuePRO Deluxe data recovery software, because accidents happen and sometimes you need to recover photos you thought were gone forever.

At 128GB, it hits the sweet spot between capacity and affordability. You can store thousands of high-resolution photos or hours of 4K footage before you need to offload anything, which is exactly what you want when you're out shooting and don't want to worry about running out of space. This is the card you buy once and forget about, right up until the moment it saves your data.`
  },
  {
    id: '6a3e1729282c4f7fe8ad5859',
    name: 'Sony Alpha ZV-E10',
    description: `The Sony Alpha ZV-E10 was designed from the ground up for content creators, and it shows in every detail. The 24.2MP APS-C sensor delivers excellent image quality with beautiful background blur, and the 4K30p video recording captures crisp, detailed footage for YouTube, TikTok, or Instagram. The side-opening vari-angle screen lets you see yourself while filming, so you're never guessing whether you're in frame.

The directional three-capsule microphone is surprisingly good for a built-in mic -- it picks up your voice clearly while rejecting background noise, which means you can skip the external mic for casual videos. Real-time Eye AF keeps your eyes sharp and in focus even when you're moving around, and the Product Showcase mode smoothly shifts focus from your face to an object you hold up, perfect for product reviews and unboxing videos.

The body is compact and lightweight enough to carry all day, but it still has a proper grip that makes one-handed shooting comfortable. The menu system is simplified compared to Sony's full-size cameras, with a dedicated recording button and background defocus toggle that puts the most-used features at your fingertips. For anyone who's been filming on their phone and wants a real step up without the complexity of a traditional camera, the ZV-E10 hits the mark.`
  },

  // Car & Vehicle Electronics
  {
    id: '6a3e172a282c4f7fe8ad585a',
    name: 'Autel MaxiAP AP200H',
    description: `The Autel MaxiAP AP200H is the kind of tool that pays for itself the first time it saves you a trip to the dealership. This compact Bluetooth OBD2 scanner connects to your phone via the Autel MaxiApp and gives you full-system diagnostics on pretty much any car made after 1996. It reads trouble codes from the engine, transmission, ABS, airbag, and dozens of other modules -- not just the basic engine codes that cheap scanners pull.

The live data streaming is genuinely useful when you're trying to figure out what's going wrong. You can watch sensor readings in real-time, graph multiple parameters, and record data to share with your mechanic. The app walks you through the diagnostic process with clear explanations of what each code means, so you're not just staring at cryptic alphanumeric strings wondering if your car is about to explode.

Setup takes about thirty seconds: plug it into the OBD2 port, pair it with your phone, and you're scanning. The wireless range is solid enough that you can walk around the vehicle while monitoring live data. For anyone who does their own maintenance or just wants to understand what that check engine light really means before spending money at a shop, the AP200H is an incredibly useful tool to have in the glovebox.`
  },
  {
    id: '6a3e172a282c4f7fe8ad585b',
    name: 'Garmin DriveSmart 65',
    description: `The Garmin DriveSmart 65 is the kind of GPS that makes your old phone navigation feel clunky. Its 6.95-inch glass display is bright and crisp enough to read at a glance, with a map that redraws smoothly as you drive. Live traffic updates reroute you around accidents and construction in real-time, and the voice-activated navigation means you can keep your hands on the wheel while telling it where to go.

The driver alert system is a genuine safety feature, not just a gimmick. It warns you about upcoming sharp curves, school zones, and speed changes with audible and visual alerts that you can't miss. Bluetooth connectivity pairs with your phone for hands-free calling, and built-in WiFi means you don't have to plug it into a computer to get map updates -- just connect to your home network and it downloads them automatically.

Parking information from Foursquare points you toward nearby parking garages and lots, which is surprisingly helpful when you're driving somewhere unfamiliar. The suction cup mount holds firmly to the windshield or dashboard, and the slim profile doesn't block your view. For road trips or daily commuting in areas with spotty cell service, having a dedicated GPS with reliable offline maps and real-time traffic data beats fumbling with your phone every time.`
  },
  {
    id: '6a3e172a282c4f7fe8ad585c',
    name: 'MOTOPOWER 2-Pack USB Car Charger',
    description: `The MOTOPOWER MP69033 is exactly what a car charger should be: simple, reliable, and out of your way. The dual USB-A ports deliver a combined 4.8A output, which is enough to charge two phones simultaneously without one of them crawling along at a trickle. The smart IC technology detects what device you've plugged in and adjusts the output accordingly, so your phone charges at the fastest speed it supports.

The flush-mount design is one of its best features -- it sits almost completely inside the cigarette lighter socket, with just a slim LED ring glowing to show it's powered on. No bulky housing sticking out, no snagging on your sleeve when you reach for something, and it doesn't look like an afterthought cluttering up your dashboard. The LED indicator is dim enough to be unobtrusive at night but bright enough to confirm it's working.

You get two chargers in the pack, which means one for the car and one for the truck, or one for you and one for your partner. At this price point, there's no reason not to have a solid charger in every vehicle you own. It handles everything from phones to tablets to GPS units without drama, and the compact build means it stays put even on bumpy roads.`
  },
  {
    id: '6a3e172a282c4f7fe8ad585d',
    name: 'Nulaxy 54W Bluetooth 5.3 Car Adapter',
    description: `The Nulaxy KM19 is one of those car accessories that makes you wonder how you lived without it. It plugs into your cigarette lighter and turns any car with an FM radio into a Bluetooth-connected, hands-free calling machine. The Bluetooth 5.3 connection is fast and stable, pairing with your phone in seconds and maintaining a clear signal for music streaming and calls.

The charging situation is impressive for something this compact. You get four ports -- two USB-A and two USB-C -- with a combined 54W output that can fast-charge two devices simultaneously. The USB-C ports support PD fast charging, so modern phones juice up quickly even on short trips. The gooseneck mount positions your phone where you can see it without taking your eyes off the road, and it adjusts easily to different angles.

Hands-free calling through the built-in microphone and car speakers is clear enough for normal conversations, and the noise cancellation filters out road noise effectively. The LED display shows the FM frequency, car battery voltage, and incoming call information at a glance. If your car doesn't have Bluetooth or you want a better charging setup, this single adapter solves both problems without requiring any installation or wiring.`
  },
  {
    id: '6a3e172b282c4f7fe8ad585e',
    name: 'Vantrue N4 Dash Cam',
    description: `The Vantrue N4 covers your vehicle from three angles simultaneously -- front, interior, and rear -- in a single unit, which is something most dash cam setups require multiple cameras to achieve. The front camera shoots 4K, the interior camera captures 1080p in infrared for clear night vision inside the cabin, and the rear camera records 1080p. For rideshare drivers, fleet managers, or anyone who wants complete coverage, having all three angles recording at once is invaluable.

The Sony STARVIS sensors in the front and interior cameras deliver impressive night vision, capturing readable license plates and facial details even in near-total darkness. The 24-hour parking mode uses a built-in gravity sensor to start recording automatically if your car is hit while parked, and the motion detection wakes the camera up to catch any activity around your vehicle. The included 64GB card means you're recording right out of the box.

The 3-inch LCD screen makes it easy to review footage and adjust settings without pulling the card and finding a computer. The suction mount attaches firmly to the windshield and the compact design doesn't block your view of the road. Loop recording means the camera automatically overwrites the oldest files when the card fills up, so you never have to worry about storage space during normal driving. For the level of protection this provides, the N4 is remarkably straightforward to set up and forget about.`
  },

  // Cell Phones & Accessories
  {
    id: '6a3e172b282c4f7fe8ad585f',
    name: 'Anker PowerCore 10000mAh',
    description: `The Anker PowerCore 10000 is one of those portable chargers that earns its spot in your bag by being small enough to forget about until you need it. At just 6.4 ounces, it's lighter than most smartphones, yet it packs enough capacity to fully charge an iPhone 13 twice over. The aluminum housing feels solid without adding bulk, and the rounded edges slide easily into pockets or bag compartments.

Anker's PowerIQ technology automatically detects your device and delivers the fastest possible charge, so you're not sitting around waiting for a phone that seems to charge at a glacial pace. The LED indicator ring on the bottom shows remaining capacity in four increments, which is simple enough that you don't need to press anything to check if it's time to recharge the power bank itself.

This is the kind of emergency charger you throw in your bag before a long day out and never think about until your phone hits 10%. The 10000mAh capacity hits the sweet spot between portability and usable power -- enough for multiple full charges without the weight of a brick. For daily commuters, travelers, or anyone who uses their phone heavily, having one of these around eliminates that low-battery anxiety for good.`
  },
  {
    id: '6a3e172c282c4f7fe8ad5860',
    name: 'ESR Screen Protector Galaxy S24 2-Pack',
    description: `The ESR tempered glass screen protector for the Samsung Galaxy S24 is designed to make installation foolproof, and it largely succeeds. The included Easy Install tray aligns the glass perfectly on your screen in one motion -- no more eyeballing it and ending up with bubbles or crooked edges. You press it down, peel off the backing, and you're done in about thirty seconds.

At 9H hardness, this glass handles keys, coins, and the occasional face-plant onto concrete without cracking your actual screen. The oleophobic coating keeps fingerprints and smudges from building up, so your display stays clean and responsive throughout the day. The edges are slightly rounded to prevent that annoying sharp feeling when you swipe from the side of the screen.

What matters most is that it doesn't interfere with the phone's ultrasonic fingerprint sensor, which is a problem with cheaper protectors. The ESR maintains full touch sensitivity and fingerprint recognition, so you won't have to re-register your prints or press harder to unlock your phone. You get two protectors in the pack, which is generous since most people only ever need one -- the second one sits in a drawer as a backup or covers a second phone in the household.`
  },
  {
    id: '6a3e172c282c4f7fe8ad5861',
    name: 'OnePlus 13',
    description: `The OnePlus 13 is what happens when a phone company stops playing it safe. Powered by the Snapdragon 8 Gen 3 chipset with 12GB of RAM and 256GB of storage, it tears through demanding apps and multitasking without breaking a sweat. The 6.7-inch AMOLED display runs at a buttery 120Hz refresh rate, making everything from scrolling social media to gaming feel incredibly smooth and responsive.

The 50MP Hasselblad camera system produces photos with natural color science and excellent dynamic range -- skin tones look right, skies retain detail, and low-light shots hold up surprisingly well. The 100W SUPERVOOC charging is the real headline feature here: you can go from nearly dead to fully charged in under thirty minutes, which means even a short charge during your morning routine gets you through the day. Dual SIM support lets you keep work and personal lines on the same device without carrying two phones.

OnePlus has refined the OxygenOS experience to be clean and fast without feeling stripped down. The in-display fingerprint sensor is quick and reliable, and the haptic feedback across the board feels precise rather than mushy. For anyone who wants flagship performance without the flagship price tag, the OnePlus 13 delivers exactly that, with the charging speed as a genuine differentiator that makes daily life noticeably more convenient.`
  },
  {
    id: '6a3e172c282c4f7fe8ad5862',
    name: 'Samsung Galaxy S24 FE 128GB',
    description: `The Samsung Galaxy S24 FE brings the best of the S24 experience to a more accessible price point without cutting the features that matter. Its 6.7-inch AMOLED display runs at 120Hz, delivering vivid colors and smooth scrolling that makes the FE feel every bit as premium as its pricier siblings. The Exynos 2500 processor handles everyday tasks and moderate gaming without stuttering, and the 50MP main camera captures detailed, well-exposed photos in most lighting conditions.

IP68 water and dust resistance means you don't have to panic if your phone takes an unexpected dip in the pool or gets caught in a downpour. The 25W fast charging gets you back up and running quickly, and Samsung's One UI software experience is refined and feature-rich, with seven years of promised updates keeping the phone current for a long time. The under-display fingerprint sensor is fast and reliable, and the overall build quality feels solid in the hand.

This is the phone for people who want a big screen, capable camera, and long software support without paying flagship money. It covers all the bases well -- wireless charging, stereo speakers, a bright display -- and does it at a price that doesn't sting. If you're coming from an older Galaxy or switching from another brand entirely, the S24 FE offers a smooth transition into Samsung's ecosystem.`
  },
  {
    id: '6a3e172c282c4f7fe8ad5863',
    name: 'Spigen Ultra Hybrid Galaxy S24 FE',
    description: `The Spigen Ultra Hybrid case is the go-to choice for people who bought a nice-looking phone and want to keep it looking nice. The crystal-clear back shows off the Galaxy S24 FE's design and color without hiding it behind opaque plastic, and the anti-yellowing technology keeps it clear far longer than cheaper alternatives that turn dingy after a few months.

Air Cushion technology in the corners absorbs drops and impacts that would otherwise crack your screen or dent the frame. The case meets military-grade drop test standards, which means it handles real-world tumbles onto concrete and tile without transferring the force to your phone. The raised lip around the screen and camera bump keeps those surfaces from touching flat surfaces when you set the phone down face-first.

Wireless charging works perfectly through the case, so you don't have to pop it off every time you want to charge. The buttons remain clicky and responsive, the cutouts line up precisely with ports and speakers, and the slim profile means the phone still fits easily in pockets. It's the kind of case that does its job so well you forget it's there, which is exactly what a good case should do.`
  },

  // Computers & Accessories
  {
    id: '6a3e172d282c4f7fe8ad5864',
    name: 'ASUS Vivobook Go 15.6',
    description: `The ASUS Vivobook Go 15.6 is a no-nonsense laptop that handles everyday computing without complaint. The AMD Ryzen 5 7520U processor paired with 8GB of RAM runs Windows smoothly for web browsing, document editing, video calls, and light multitasking. The 512GB SSD gives you enough room for all your files and programs while keeping boot times and app launches snappy.

The 15.6-inch Full HD display is bright enough for working in well-lit rooms and sharp enough that text looks clean during long reading sessions. The built-in fingerprint reader lets you log in with a touch instead of typing a password every time, which is a small convenience that adds up over weeks of daily use. At 3.7 pounds, it's light enough to carry between rooms or toss in a bag for a trip to the coffee shop.

ASUS included a full-size keyboard with decent travel, so typing for extended periods doesn't feel like tapping on a table. The battery life handles a full workday of moderate use without hunting for an outlet. For students, remote workers, or anyone who needs a reliable machine for daily tasks without paying for power they won't use, the Vivobook Go hits the right balance of performance, portability, and price.`
  },
  {
    id: '6a3e172d282c4f7fe8ad5865',
    name: 'Blue Yeti USB Microphone',
    description: `The Blue Yeti has been the default recommendation for aspiring podcasters and streamers for good reason: it sounds significantly better than any headset or built-in laptop mic, and it requires zero technical knowledge to set up. You plug it into a USB port, select it as your input device, and you're recording. The tri-capsule condenser microphone inside captures clear, detailed audio that makes your voice sound full and present.

Four pickup patterns give you flexibility for different recording situations. Cardioid mode isolates your voice for solo recordings and streaming. Bidirectional mode picks up audio from front and back, ideal for two-person interviews facing each other. Stereo mode captures a wider sound field for ASMR or instrument recording, and omnidirectional mode picks up sound from all directions for conference calls or group discussions.

The gain control knob on the back lets you dial in the input level without fiddling with software settings, and the headphone jack provides zero-latency monitoring so you hear yourself in real-time without the distracting delay that plague cheaper USB mics. The sturdy metal stand adjusts angle and holds the mic steady on your desk. Whether you're starting a podcast, upgrading your Zoom setup, or getting into streaming, the Blue Yeti remains one of the most versatile and forgiving microphones you can buy.`
  },
  {
    id: '6a3e172d282c4f7fe8ad5866',
    name: 'DELL KM7321W Wireless Keyboard Mouse',
    description: `The Dell KM7321W is a keyboard and mouse combo built for people who switch between devices throughout the day. You can pair it with up to three computers or tablets simultaneously using Bluetooth or the 2.4GHz wireless dongle, and switching between them is as simple as pressing a button on the keyboard. No more unplugging and replugging a single keyboard between your work laptop and personal tablet.

The quiet-click mouse and low-profile keyboard are designed for office environments where clacking keys and clicking mice distract everyone within earshot. The scroll wheel on the mouse handles both precise document navigation and fast web scrolling, and the optical sensor tracks reliably on most surfaces without needing a mousepad. Both devices run on a single AA battery for up to a year, so you're not constantly hunting for replacements.

The full-size keyboard includes a number pad and function keys, so you're not sacrificing productivity for wireless convenience. The build quality feels solid without being heavy, and the keys have a comfortable bounce that makes extended typing sessions less fatiguing. For a clean desk setup that works across multiple devices without cable clutter, this Dell combo does exactly what it promises.`
  },
  {
    id: '6a3e172d282c4f7fe8ad5867',
    name: 'Elgato Stream Deck MK.2 15 keys',
    description: `The Elgato Stream Deck MK.2 transforms how you interact with your computer by giving you fifteen customizable LCD keys that launch apps, control scenes, adjust audio, and trigger actions with a single press. Each key displays a bright, clear icon showing exactly what it does, so there's no guessing or memorizing keyboard shortcuts. The drag-and-drop software makes configuration dead simple -- drag an action onto a key, customize the icon and label, and you're set.

For streamers, it's a game-changer: switch scenes, mute your mic, trigger sound effects, and post chat messages without Alt-Tabbing away from your game. But its usefulness extends well beyond streaming -- video editors can map frequently used commands, music producers can control their DAW, and anyone can create shortcuts for repetitive tasks. The USB connection keeps latency low and eliminates Bluetooth pairing headaches.

The adjustable stand angles the deck for comfortable viewing and access whether it sits on your desk or mounts to an arm. The keys have a satisfying click when pressed and the LCD panels are bright enough to read in any lighting. Once you start building out your key layouts, you'll wonder how you managed without it. The Stream Deck makes complex workflows feel simple by putting the most important actions literally at your fingertips.`
  },
  {
    id: '6a3e172e282c4f7fe8ad5868',
    name: 'Logitech C920x HD Pro Webcam',
    description: `The Logitech C920x is the webcam that proved you don't need to spend hundreds of dollars to look professional on video calls. It captures 1080p video at 30fps with autofocus that adjusts smoothly as you move, so you stay sharp whether you lean in or sit back. The stereo microphones on either side pick up your voice clearly from a normal desk distance, eliminating the need for a separate mic for casual meetings and calls.

The privacy shutter is a small but important detail -- just slide it over the lens when you're not using the webcam so there's zero chance of accidentally broadcasting yourself. It clips onto laptop screens and monitors easily, and the USB cable gives you enough length to position it where you need without pulling your laptop off balance. The wide 78-degree field of view frames you naturally without the fish-eye distortion that cheaper webcams produce.

It works seamlessly with Zoom, Microsoft Teams, Skype, Google Meet, and pretty much every video platform out there without requiring special drivers or configuration. The low-light correction adjusts automatically to keep your image usable in dim rooms without turning you into a grainy mess. For remote workers, students, or anyone who needs a reliable webcam that just works every time they open it, the C920x is the standard for good reason.`
  },

  // eBook Readers
  {
    id: '6a3e172e282c4f7fe8ad5869',
    name: 'AmazonBasics Kindle USB-C Cable 3ft',
    description: `The AmazonBasics Kindle USB-C cable is exactly what it sounds like: a reliable, no-frills charging cable that does its job without drama. At 3 feet long, it reaches from a wall outlet to your nightstand or desk without excess cable tangling up behind furniture. The USB-C connector is Amazon-certified, so it fits securely into your Kindle without the loose connection that cheaper cables sometimes have.

The braided nylon exterior gives the cable better durability than standard rubber-coated alternatives, resisting fraying and kinking even after you've wrapped it tightly and tossed it in a bag hundreds of times. Fast charging support means your Kindle goes from low battery to fully charged quickly, so you're not waiting around when you want to read.

This is the kind of cable you buy as a spare to keep in your travel bag or office drawer, so you always have a charger handy when the original is already plugged in somewhere else. It charges Kindle devices reliably, transfers data at standard speeds, and holds up to daily use. There's nothing flashy about it, but that's exactly the point -- it works, it lasts, and you don't have to think about it.`
  },
  {
    id: '6a3e172f282c4f7fe8ad586a',
    name: 'Kindle Paperwhite 11th Gen 16GB',
    description: `The Kindle Paperwhite 11th generation fixes the one thing people always complained about with e-readers: the screen. The 6.8-inch display at 300ppi is sharp enough that text looks like printed ink on paper, with no visible pixel grid even when you hold it close. The adjustable warm light lets you shift from cool white to amber tones as the day progresses, making nighttime reading gentler on your eyes without the blue light that messes with sleep.

IPX8 waterproofing means you can read in the bathtub, at the pool, or on the beach without worrying about splashes or brief submersions. The 10-week battery life on a single charge is not a typo -- you can read for hours every day for over two months before needing to find a USB-C cable. The larger screen compared to previous Paperwhites gives you more text per page, which means fewer page turns and a more immersive reading experience.

At 16GB, you can store thousands of books and still have room for comics and audiobooks. The flush-front design is sleek and comfortable to hold for long stretches, and the weight distribution makes one-handed reading feel natural. For anyone who reads regularly, the Paperwhite 11th Gen is the best dedicated e-reader you can buy -- it does one thing perfectly, and that thing is reading.`
  },
  {
    id: '6a3e172f282c4f7fe8ad586b',
    name: 'Kindle Scribe 32GB',
    description: `The Kindle Scribe is Amazon's answer to people who wanted to read and write in one device. The 10.2-inch 300ppi display is the largest Kindle screen ever made, giving you a page that feels close to a real book in size and readability. The Basic Pen included in the box lets you write directly in the margins of books, annotate PDFs, and create notebooks -- and it never needs charging because it uses electromagnetic technology built into the display.

The handwriting experience on the Scribe is surprisingly good. Latency is low enough that writing feels natural, and the different pen styles and weights let you take quick notes or sketch diagrams without reaching for a separate tablet. You can organize your notes into notebooks by subject, and the handwriting recognition converts your scrawl to typed text when you need to share or search your notes.

With 32GB of storage, you have room for a massive library plus all your notebooks and documents. The warm adjustable display and weeks-long battery life maintain everything people love about the Paperwhite, just on a bigger canvas. For readers who also want to take notes, students who annotate textbooks, or professionals who review marked-up documents, the Scribe bridges the gap between e-reader and writing tablet without trying to be a full-blown tablet.`
  },
  {
    id: '6a3e172f282c4f7fe8ad586c',
    name: 'Kobo Libra Colour 32GB',
    description: `The Kobo Libra Colour brings something genuinely new to the e-reader world: a color E Ink display that makes book covers, comics, magazines, and illustrated content pop in a way black-and-white screens simply can't. The 7-inch screen renders colors with enough accuracy that manga and graphic novels look vibrant without the eye strain of reading on a tablet or phone. Text remains crisp and easy on the eyes for hours of regular reading.

The ergonomic design with physical page turn buttons is one of the Libra's best features. Holding the device in one hand and clicking through pages with your thumb feels natural and satisfying, especially during long reading sessions where tapping a screen gets repetitive. The IPX8 waterproof rating means it handles bathtub reading, poolside lounging, and accidental spills without concern.

Bluetooth connectivity lets you pair wireless headphones and listen to audiobooks directly from the device, which is a feature Kindle users have been requesting for years. The 32GB of storage holds thousands of books plus a generous audiobook collection. Kobo's integration with OverDrive and the public library system means you can borrow books directly from your library card without any extra apps or transfers. For readers who value openness, color, and physical buttons, the Libra Colour makes a strong case for switching sides.`
  },
  {
    id: '6a3e172f282c4f7fe8ad586d',
    name: 'MoKo Kindle Paperwhite Case 11th Gen',
    description: `The MoKo case for the Kindle Paperwhite 11th Gen does everything a good e-reader case should do without getting in the way. The auto sleep/wake function opens to your last page when you flip the cover and puts the Kindle to sleep when you close it, preserving battery life without any effort on your part. The magnetic closure holds the cover shut in your bag without adding bulk or weight.

The built-in stand lets you prop the Kindle up for hands-free reading on a desk or table, which is surprisingly useful during meals or when you want to read while eating breakfast. It supports both portrait and landscape orientations, so you can find the angle that works for your setup. The slim profile adds minimal thickness, keeping the Paperwhite comfortable to hold for extended reading sessions.

Available in multiple colors, the case lets you personalize your Kindle without compromising protection. The exterior resists fingerprints and minor scratches, and the interior microfiber lining keeps the screen clean. The precise cutouts around the USB-C port and power button don't interfere with daily use. For a case that protects well, reads well, and looks clean, the MoKo hits all the marks at a price that makes buying one a no-brainer.`
  },

  // GPS & Navigation
  {
    id: '6a3e1730282c4f7fe8ad586e',
    name: 'Garmin DriveSmart 55 5.5"',
    description: `The Garmin DriveSmart 55 is a solid middle ground between Garmin's smaller and larger GPS units. The 5.5-inch display is big enough to read map details without squinting but compact enough that it doesn't dominate your windshield or dashboard. Voice-activated navigation means you can speak your destination without taking your hands off the wheel, and the system responds quickly and accurately to spoken commands.

Live traffic updates keep you moving around slowdowns and closures, rerouting you automatically when conditions change. The Bluetooth connection pairs with your phone for hands-free calling, so you can answer calls without fumbling for your device while driving. Driver alerts warn you about upcoming school zones, sharp curves, speed limit changes, and red light cameras -- warnings that have genuine safety value beyond just avoiding tickets.

The mount attaches firmly to the windshield and holds the GPS steady even on rough roads. Map updates download over WiFi, so you're not hunting for a computer and USB cable every few months. For drivers who prefer a dedicated navigation device over phone-based options, the DriveSmart 55 delivers reliable, distraction-free guidance that just works.`
  },
  {
    id: '6a3e1730282c4f7fe8ad586f',
    name: 'Garmin eTrex 22x',
    description: `The Garmin eTrex 22x is built for the kind of outdoor use that kills consumer electronics. It's a handheld GPS designed for hikers, geocachers, and outdoor enthusiasts who need reliable navigation where cell service doesn't exist. The 2.2-inch color display is readable in direct sunlight, and the button-based interface works with gloves on -- no touch screen that fails when your fingers are cold or wet.

Preloaded worldwide basemaps give you basic navigation anywhere on the planet, and you can download detailed topo maps for specific regions if you want more granular trail information. The 25-hour battery life on two AA batteries means you're not tethered to a charging cable on multi-day trips, and finding replacement batteries in a small town store is always possible. The rugged, water-resistant construction handles rain, mud, and the occasional drop without skipping a beat.

The high-sensitivity GPS receiver maintains a lock under heavy tree canopy and in steep valleys where cheaper receivers lose signal. Trip computer tracks your distance, speed, elevation, and pace, giving you useful data without overwhelming you with options. For anyone who ventures off the beaten path regularly, the eTrex 22x is a reliable navigation companion that won't leave you stranded.`
  },
  {
    id: '6a3e1730282c4f7fe8ad5870',
    name: 'Garmin GPSMAP 66i',
    description: `The Garmin GPSMAP 66i combines a capable handheld GPS with an inReach satellite communicator, which means you can send and receive text messages, share your location, and trigger an SOS from virtually anywhere on Earth. The two-way messaging works through the Iridium satellite network, so you're not dependent on cell towers -- when you're deep in the backcountry and need to check in with family or call for help, this device makes it possible.

TopoActive maps come preloaded with detailed terrain data, and the high-sensitivity GPS receiver with multi-band support holds a solid lock in challenging environments like dense forest and deep canyons. The battery lasts up to 15 hours in full GPS tracking mode with inReach enabled, or longer if you use expedition mode. The rechargeable battery charges via USB-C, and you can extend life by carrying spare batteries.

The SOS button is protected by a cover to prevent accidental activation, and when triggered, it connects you directly to Garmin's IERCC rescue coordination center. For solo hikers, backcountry skiers, and remote workers, having satellite communication built into your GPS is a genuine safety net. The device also tracks your route, elevation, and speed, giving you all the navigation data you'd expect from a premium handheld GPS plus the peace of mind that help is a button press away.`
  },
  {
    id: '6a3e1730282c4f7fe8ad5871',
    name: 'Rand McNally RVND 7730',
    description: `The Rand McNally RVND 7730 is purpose-built for RV drivers, not just a regular GPS with a bigger screen. It routes you based on your actual RV dimensions, weight, and cargo type, avoiding low bridges, narrow roads, weight-restricted tunnels, and sharp turns that would be impossible or dangerous for a large vehicle. Input your rig's specs once and every route it calculates is something you can actually drive.

The 7-inch display shows your route clearly with lane guidance that tells you exactly which lane to be in before highway exits and interchanges. The campground database includes detailed information about RV parks and campgrounds with amenity details, photos, and user reviews, so you can find places to stay without pulling over and searching on your phone. Upcoming路Points of interest are flagged based on your RV's clearance, so you know which gas stations and rest stops you can actually pull into.

Built-in WiFi keeps maps and software updated without needing a computer, and the Bluetooth connection handles hands-free calling from the driver's seat. For anyone who's ever had a GPS route them under a bridge that was too low or through a road too narrow to turn around on, the RVND 7730 solves that problem completely. It's an essential tool for full-time RVers and weekend warriors alike.`
  },
  {
    id: '6a3e1731282c4f7fe8ad5872',
    name: 'TomTom Go Comfort 5"',
    description: `The TomTom Go Comfort is a compact GPS that focuses on doing the basics well. The 5-inch screen is small enough to tuck out of your sightline on the windshield while still being readable at a glance. Offline maps mean you navigate without burning through your phone's data plan or losing direction in areas without cell coverage, and the maps update over WiFi so you're always working with current road information.

Spoken street names make navigation clear and unambiguous -- instead of "turn right in 200 feet," you hear "turn right onto Main Street," which is much easier to follow in complex intersections. Bluetooth hands-free calling pairs with your phone so you can take calls without reaching for your device. The connected services provide real-time traffic information, speed camera locations, and parking availability near your destination.

The compact design mounts to the windshield without blocking much of your view, and the interface is straightforward enough that you're not fiddling with settings when you should be watching the road. For drivers who want a dedicated navigation device that doesn't require a data plan and works reliably out of the box, the TomTom Go Comfort delivers straightforward guidance without unnecessary complexity.`
  },

  // Headphones
  {
    id: '6a3e1731282c4f7fe8ad5873',
    name: 'AirPods Pro 2nd Gen',
    description: `The AirPods Pro 2nd generation represent Apple's best effort at making wireless earbuds that work seamlessly for daily life. The Active Noise Cancellation uses the H2 chip to block out airplane engines, office chatter, and subway rumble with impressive effectiveness -- you can genuinely focus on music or calls in noisy environments without cranking the volume to damaging levels. Adaptive Transparency mode lets outside sounds through naturally when you need to hear announcements or conversations without removing the buds.

Personalized Spatial Audio uses the TrueDepth camera on your iPhone to map your ear shape and customize the sound stage, which sounds gimmicky until you actually hear the difference. Music and movie audio feel immersive in a way that flat stereo can't match. The touch controls on the stems let you adjust volume, skip tracks, and switch between ANC and transparency with a squeeze or swipe, no phone required.

Battery life holds up well at around six hours per charge, with the MagSafe case providing multiple additional charges for a total of around 30 hours. The case itself charges via Lightning, USB-C, Qi wireless, or Apple Watch chargers, so you'll always find a way to power up. IP54 water and sweat resistance means you can wear them through workouts and rain without worry. For iPhone users especially, the AirPods Pro 2 deliver a combination of sound quality, convenience, and ecosystem integration that's hard to beat.`
  },
  {
    id: '6a3e1732282c4f7fe8ad5874',
    name: 'Jabra Evolve2 55 UC',
    description: `The Jabra Evolve2 55 is built specifically for the reality of modern work: back-to-back video calls, noisy home offices, and the constant need to switch between focused work and communication. The advanced noise cancellation blocks out background noise so your colleagues hear you clearly, not your dog barking or your kids playing in the next room. The busylight on the ear cups glows red when you're on a call, giving everyone around you a clear visual signal not to interrupt.

Microsoft Teams certification means the button layout, audio quality, and call handling are optimized for the platform most offices run on. The USB-C dongle provides a rock-solid wireless connection that doesn't compete with your WiFi for bandwidth, which matters when you're in an important client meeting. Battery life stretches up to 36 hours, so you can get through a full work week without charging.

The headband and ear cushions are designed for all-day comfort, which is essential when you're wearing them for eight hours straight. The boom microphone positions precisely for clear voice pickup and folds away when you're listening to music between calls. For remote workers and office professionals who spend hours on calls every day, the Evolve2 55 is an investment in better communication and less fatigue.`
  },
  {
    id: '6a3e1732282c4f7fe8ad5875',
    name: 'JBL Tune 760NC',
    description: `The JBL Tune 760NC delivers solid active noise cancellation and JBL's signature bass-forward sound at a price that doesn't make you flinch. The 35-hour battery life is genuinely impressive -- you can wear these for days between charges, and when you do need to power up, a quick five-minute charge gives you enough juice for a couple hours of playback. The foldable design collapses flat and fits into the included carrying case, making them easy to pack in a bag.

Active noise cancellation blocks out enough ambient noise to focus on music in open offices, planes, and busy cafes, though it won't match the best premium options for silencing everything completely. Google Fast Pair connects to your Android phone instantly when you open the case, and multipoint Bluetooth lets you stay connected to your phone and laptop simultaneously so you don't have to manually switch devices.

The 40mm drivers produce punchy bass and clear mids that work well across genres from hip-hop to podcasts. The over-ear cups create a comfortable seal that blocks some passive noise even with ANC off. For listeners who want good sound, useful noise cancellation, and exceptional battery life without spending premium prices, the Tune 760NC is a smart choice that covers all the essentials.`
  },
  {
    id: '6a3e1732282c4f7fe8ad5876',
    name: 'Sony WH-1000XM5',
    description: `The Sony WH-1000XM5 is widely considered the best noise-canceling headphone you can buy, and after using them, you understand why. The adaptive sound control adjusts noise cancellation automatically based on your activity -- walking, sitting, commuting -- without you having to open an app. The noise cancellation itself is remarkably effective, creating a bubble of silence that makes airplane cabins and busy offices feel genuinely peaceful.

At 250 grams, they're light enough to wear all day without the fatigue that heavier headphones cause. Multipoint Bluetooth lets you connect to two devices at once, so audio switches seamlessly from your phone to your laptop when a call comes in. The speak-to-chat feature pauses your music automatically when you start talking and resumes when you stop, which works reliably enough to become second nature.

DSEE Extreme upscaling breathes new life into compressed audio files, and the LDAC codec support streams high-resolution audio wirelessly when you're connected to compatible devices. The 30-hour battery life means you charge once a week for most people, and the carrying case keeps them protected in your bag. For travelers, commuters, and anyone who values silence and sound quality equally, the WH-1000XM5 sets the standard.`
  },
  {
    id: '6a3e1732282c4f7fe8ad5877',
    name: 'Soundcore Life Q30',
    description: `The Soundcore Life Q30 proves that you don't need to spend hundreds of dollars to get headphones that block noise and sound good. The hybrid ANC uses multiple microphones to reduce ambient noise across a wider frequency range than single-mic systems, making them effective against engine hum, office chatter, and air conditioning. The three ANC modes -- transport, indoor, and outdoor -- let you customize the level of noise cancellation to your environment.

At 40 hours with ANC on, the battery life rivals headphones that cost three times as much. You can wear them for a full work week without charging, which is especially convenient for travelers who hate hunting for outlets. Hi-Res Audio certification and LDAC codec support mean these headphones can play high-quality audio files without downgrading them, which is rare at this price point.

Multipoint Bluetooth connection keeps you paired to your phone and computer simultaneously, and the transparency mode lets ambient sound through when you need to hear announcements or conversations. The foldable design fits into a carrying case that's small enough for a daypack. For budget-conscious listeners who still want genuine noise cancellation, long battery life, and detailed sound, the Life Q30 is the headphone that makes premium features accessible.`
  },

  // Home Audio
  {
    id: '6a3e1733282c4f7fe8ad5878',
    name: 'Google Audio Bluetooth Speaker',
    description: `The Google Audio Bluetooth Speaker fills a room with surprisingly full 360-degree sound for its compact size. The speaker fires audio in all directions, so you don't need to aim it at a specific spot to get good sound -- place it in the middle of a table and everyone around it hears the same quality audio. Pair two together for stereo sound that creates a wider, more immersive listening experience.

Chromecast built-in means you can stream directly from Spotify, YouTube Music, Apple Music, and dozens of other services over WiFi without tying up your phone's Bluetooth connection. Multi-room audio lets you sync the speaker with other Google speakers throughout your house, playing the same music everywhere or different songs in different rooms. The water-resistant construction handles splashes and light rain, making it a solid choice for the kitchen, patio, or poolside.

Google Assistant integration gives you hands-free control over music playback, smart home devices, timers, and general questions. The simple setup through the Google Home app gets you streaming in minutes. For anyone already invested in the Google ecosystem, this speaker fits naturally alongside their other devices and delivers reliable performance without complicated features or menus.`
  },
  {
    id: '6a3e1733282c4f7fe8ad5879',
    name: 'JBL Bar 500 5.1 Soundbar',
    description: `The JBL Bar 500 transforms your living room audio with Dolby Atmos support and a wireless 10-inch subwoofer that delivers bass you feel in your chest. The 590-watt total output fills even large rooms with clear dialogue, immersive surround effects, and low-end punch that built-in TV speakers can't begin to match. MultiBeam technology bounces sound off your walls to create surround effects without running wires to rear speakers.

The dedicated center channel keeps dialogue crisp and intelligible, so you don't miss whispered lines during action sequences or strain to understand conversations over background music. AirPlay and Alexa compatibility let you stream music directly from Apple devices or control the soundbar with voice commands. The wireless subwoofer pairs automatically and gives you placement flexibility -- put it anywhere in the room where it looks good.

HDMI eARC passes through Dolby Atmos audio from your TV with a single cable, and the optical input handles older devices. The slim profile mounts to the wall below your TV or sits on the included stand without blocking the screen. For anyone upgrading from TV speakers or a basic soundbar, the JBL Bar 500 delivers a genuine home theater experience without the complexity and cost of a full component system.`
  },
  {
    id: '6a3e1733282c4f7fe8ad587a',
    name: 'Polk Audio Monitor XT20 Bookshelf Speakers Pair',
    description: `The Polk Audio Monitor XT20 bookshelf speakers deliver Hi-Res Audio certified sound in a compact package that fits on a desk, shelf, or wall mount. The 1-inch tweeter reproduces highs with clarity and sparkle without sounding harsh, while the 4.5-inch woofer handles mids and bass with a warmth and punch that belies the small cabinet size. The wide dispersion pattern means the sweet spot is forgiving -- you don't have to sit in one exact spot to hear good sound.

These speakers work well as stereo pairs for music listening, as part of a home theater setup with a receiver, or as upgrade replacements for TV speakers when paired with an amplifier. The rear-firing bass port extends low-frequency response, so they produce more bass than you'd expect from speakers this size. The wall-mountable design with keyhole slots makes installation straightforward without needing separate brackets.

At their price point, the XT20s outperform their cost significantly. The build quality is solid, the sound is detailed and balanced, and they handle a wide range of music genres without favoring one style over another. For anyone building their first stereo system, upgrading from budget speakers, or looking for quality sound in a small space, these Polks deliver serious performance.`
  },
  {
    id: '6a3e1733282c4f7fe8ad587b',
    name: 'Sonos Era 100',
    description: `The Sonos Era 100 is the kind of speaker that quietly becomes the center of your home audio. It produces surprisingly powerful stereo sound from a single compact unit, filling medium-sized rooms with clear mids, detailed highs, and bass that reaches deeper than the size suggests. Trueplay tuning uses your phone's microphone to analyze the room's acoustics and adjusts the EQ automatically, so it sounds optimized regardless where you place it.

WiFi and Bluetooth connectivity give you flexibility -- stream over your home network for highest quality, or switch to Bluetooth for guests who want to play music from their phones. Voice control through Alexa or Sonos' own voice assistant lets you request songs, control smart home devices, and ask questions without reaching for your phone. Multi-room audio syncs the Era 100 with other Sonos speakers for whole-home sound or plays different content in different rooms.

The design is clean and modern enough to sit on a shelf, desk, or counter without looking out of place in any room decor. Setup through the Sonos app takes minutes and guides you through WiFi connection, voice assistant setup, and multi-room configuration. For anyone who wants premium sound without visible wires, complicated receivers, or bulky speaker cabinets, the Era 100 delivers.`
  },
  {
    id: '6a3e1734282c4f7fe8ad587c',
    name: 'Yamaha R-S202BL Stereo Receiver',
    description: `The Yamaha R-S202BL is a traditional stereo receiver for people who want to build a real speaker system without paying for features they'll never use. It delivers 100 watts per channel into 8 ohms, which is more than enough power to drive most bookshelf and floor-standing speakers to satisfying volume levels in typical rooms. The sound is clean and warm, with Yamaha's decades of audio engineering behind the tuning.

Bluetooth streaming lets you play music wirelessly from your phone, tablet, or computer, while the phono input means you can connect a turntable directly without needing a separate preamp. The 40-station FM/AM tuner with memory presets lets you save your favorite local stations for quick access. The simple front-panel controls and included remote make operation straightforward, even for people who aren't audio enthusiasts.

The build quality is what you'd expect from Yamaha -- solid construction, quality components, and a design that looks at home in any living room. The speaker terminals accept banana plugs, spade connectors, or bare wire, giving you flexibility in how you connect your speakers. For music lovers who want to separate their audio components and build a system that sounds better than a Bluetooth speaker, the R-S202BL is a reliable foundation that won't need replacing for years.`
  },

  // Office Electronics
  {
    id: '6a3e1734282c4f7fe8ad587d',
    name: 'Bostitch Sharpener + Stapler Combo',
    description: `The Bostitch Sharpener and Stapler Combo puts two essential desk tools into one compact unit that doesn't take up half your workspace. The auto-stop pencil sharpener prevents over-sharpening -- it stops turning the blade when the pencil reaches an optimal point, so you don't waste wood or end up with a tip that breaks immediately. The shavings bin is easy to pull out, empty, and slide back in without making a mess.

The integrated stapler handles up to 20 sheets of standard paper, which covers most everyday office stapling without struggling or jamming. The metal construction feels sturdy and holds up to daily use in shared office environments where staplers get used hard and returned without care. The combo design means you're not hunting for two separate tools when you need them -- everything is in one place on your desk.

This is the kind of office accessory that solves a simple problem elegantly. Instead of a cheap sharpener that jams and a stapler that bends on thick stacks, you get one well-built unit that handles both tasks reliably. For home offices, reception desks, or classrooms, the Bostitch combo is practical, compact, and durable enough to justify its spot on the desk.`
  },
  {
    id: '6a3e1734282c4f7fe8ad587e',
    name: 'Canon imageCLASS MF743Cdw',
    description: `The Canon imageCLASS MF743Cdw is a color laser multifunction printer that handles printing, scanning, copying, and faxing in a single machine that's genuinely capable at all of them. Print speeds of 22 pages per minute in both color and black-and-white keep up with office demand without making you wait around. The 50-sheet automatic document feeder scans and copies multi-page documents without you feeding each page manually.

The 5-inch color touchscreen puts all functions within a few taps, with customizable shortcuts for your most-used tasks. Wireless connectivity means you can print from phones, tablets, and laptops without running Ethernet cables, and the machine supports AirPrint, Mopria, and Canon's own PRINT app. Automatic duplex printing saves paper on double-sided documents, which adds up to real savings over months of use.

The print quality is sharp and color-accurate enough for presentations, brochures, and marketing materials that need to look professional. The toner cartridges are available in standard and high-yield capacities, with the high-yield options offering better cost per page for offices with regular printing needs. For small to medium offices that need a reliable all-in-one that doesn't compromise on any function, the MF743Cdw handles the workload without drama.`
  },
  {
    id: '6a3e1735282c4f7fe8ad587f',
    name: 'Epson DS-785W Scanner',
    description: `The Epson DS-785W is a wireless document scanner built for offices that need to digitize paper files quickly and get them into cloud storage without fuss. Scanning at 25 pages per minute in both simplex and duplex modes, it processes stacks of documents faster than most office workers can feed them into the ADF. The 50-sheet automatic document feeder handles multi-page contracts, invoices, and reports without jams.

WiFi connectivity means you can scan directly to your computer, phone, or cloud services like Google Drive, Dropbox, and SharePoint without being tethered by cables. The portable design lets you move it between offices or take it to off-site locations where you need to scan documents on the spot. The included software handles OCR, file organization, and scan scheduling, so you can set it up to scan specific documents to specific folders automatically.

The scanning quality is sharp enough for text recognition and detailed graphics, with color correction that produces clean, readable images from even faded or wrinkled original documents. For offices transitioning to paperless workflows or organizations that need to archive physical documents digitally, the DS-785W streamlines the process enough that it actually gets done instead of piling up in a corner.`
  }
];

async function updateDescriptions() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    let successCount = 0;
    let failCount = 0;

    for (const product of products) {
      try {
        const result = await Product.findByIdAndUpdate(
          product.id,
          { description: product.description },
          { new: true }
        );

        if (result) {
          console.log(`Updated: ${product.name} (${product.id})`);
          successCount++;
        } else {
          console.log(`Not found: ${product.name} (${product.id})`);
          failCount++;
        }
      } catch (err) {
        console.error(`Error updating ${product.name}: ${err.message}`);
        failCount++;
      }
    }

    console.log(`\nDone! Updated: ${successCount}, Failed: ${failCount}`);
    process.exit(0);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
}

updateDescriptions();
