require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Category = require('../models/Category');

const updates = [
  {
    id: '6a3e1736282c4f7fe8ad5882',
    description: `The Amazon Fire HD 10 Tablet delivers a vibrant 10.1" 1080p Full HD display that brings your favorite movies, books, and apps to life with crisp detail and rich colors. With 3GB of RAM and a generous 32GB of internal storage, you have plenty of room for apps, games, and downloaded content. Need even more space? The microSD card slot supports expansion up to 1TB, so you'll never run out of room for your media library.

Designed for all-day use, the Fire HD 10 offers up to 12 hours of continuous battery life on a single charge, making it the perfect travel companion for flights, road trips, or lazy afternoons on the couch. USB-C charging means you can top up quickly and use the same cable as your other modern devices.

With Alexa built in, you can control your smart home, ask questions, set timers, and manage your schedule entirely hands-free. The Fire HD 10 seamlessly integrates with Amazon's ecosystem, giving you instant access to Prime Video, Kindle books, Audible audiobooks, and thousands of apps through the Amazon Appstore. It's a versatile tablet that excels at entertainment and everyday tasks without breaking the bank.`
  },
  {
    id: '6a3e1736282c4f7fe8ad5883',
    description: `The JBL Flip 6 is a portable Bluetooth speaker that punches well above its weight class. Featuring JBL Pro Sound technology, this speaker delivers surprisingly powerful, room-filling audio with deep bass and crystal-clear highs that belies its compact size. The bold, eye-catching design is available in a range of vibrant colors, and the rugged build means it's ready for whatever adventure you throw at it.

Built to withstand the elements, the Flip 6 carries an IP67 rating, meaning it's fully waterproof and dustproof. Take it to the pool, the beach, or even the shower without a second thought. The rechargeable battery provides up to 12 hours of continuous playtime, so the music keeps going from morning to night. When you're ready to keep the party going, JBL PartyBoost lets you wirelessly connect multiple JBL speakers for an even bigger sound experience.

Charging is a breeze thanks to the convenient USB-C port, and the compact cylindrical design fits easily into backpacks, beach bags, and cup holders. Whether you're hosting a backyard barbecue or enjoying a quiet hike, the JBL Flip 6 delivers the signature JBL sound signature that audio enthusiasts have trusted for decades. It's the ideal companion for anyone who demands great sound on the go.`
  },
  {
    id: '6a3e1736282c4f7fe8ad5884',
    description: `The Mighty Vibe is a game-changer for music lovers who want to enjoy their Spotify playlists without being tethered to their phone. This compact, lightweight player streams your Spotify music and podcasts offline, so you can leave your phone at home and still have access to all your favorite tracks. Simply sync your music over WiFi and you're ready to go—no cellular data required.

Designed to clip onto your clothing, bag, or armband, the Mighty Vibe is the ultimate workout companion. Whether you're hitting the trails, running on the treadmill, or just going about your daily routine, this tiny device keeps the music playing without the bulk and distraction of carrying a smartphone. Its durable construction can handle sweat, rain, and the rigors of an active lifestyle.

Compatible with Spotify Premium, the Mighty Vibe gives you full access to Spotify's massive library of over 100 million songs and podcasts. The simple button controls make it easy to play, pause, skip tracks, and adjust volume without ever looking at a screen. If you've been looking for a way to disconnect from your phone while staying connected to your music, the Mighty Vibe is exactly what you've been waiting for.`
  },
  {
    id: '6a3e1736282c4f7fe8ad5885',
    description: `The Sony SRS-XB100 wireless Bluetooth speaker combines ultra-portable design with impressive sound quality that's hard to find at this size. Weighing just 270 grams, it's light enough to toss in a bag or clip onto a backpack, yet it delivers rich, detailed audio powered by Sony's Sound Diffusion Processor. This technology spreads sound wider and further than you'd expect from such a compact speaker, creating an immersive listening experience in any environment.

With an IP67 waterproof and dustproof rating, the SRS-XB100 is built to handle anything from poolside splashes to sandy beach days. The impressive 16-hour battery life means you can enjoy uninterrupted music from sunrise to well past sunset. An integrated microphone allows you to take hands-free calls, making it as practical for conference calls as it is for parties.

The minimalist design is both stylish and functional, featuring a convenient strap that lets you hang the speaker almost anywhere. Multipoint connection lets you pair two devices simultaneously, so you and a friend can take turns DJing. Whether you're relaxing at home, exploring the outdoors, or just want better sound than your phone speaker can provide, the Sony SRS-XB100 is a remarkably capable little speaker.`
  },
  {
    id: '6a3e1736282c4f7fe8ad5886',
    description: `The Soundcore Motion Boom is a powerhouse portable Bluetooth speaker that delivers room-shaking audio wherever you go. With 30 watts of total output and specially engineered titanium drivers, it produces detailed, dynamic sound that fills outdoor spaces with ease. BassUp technology analyzes and enhances low frequencies in real time, giving you that deep, thumping bass that outdoor listening demands.

Built for adventure, the Motion Boom carries an IPX7 waterproof rating, meaning it can survive submersion in water. Whether you're at the beach, by the pool, or caught in the rain, this speaker keeps performing. The massive 24-hour battery life is among the best in its class, ensuring the music never stops during long days and nights outdoors. Hi-Audio certification guarantees that every note is reproduced with stunning clarity and fidelity.

The rugged, outdoors-inspired design is as tough as it sounds, with a durable build that can withstand drops, bumps, and the general wear and tear of an active lifestyle. The built-in power bank feature lets you charge your phone or other devices in a pinch. For those who refuse to compromise on sound quality, even when miles from home, the Soundcore Motion Boom is the ultimate portable audio companion.`
  },
  {
    id: '6a3e1737282c4f7fe8ad5887',
    description: `The Arlo Pro 4 3-pack security camera system provides comprehensive, whole-home protection with crystal-clear 2K HDR video quality. Each camera captures every detail with enhanced dynamic range, ensuring you can clearly see faces, license plates, and other critical details in any lighting condition. The 160-degree field of view covers vast areas with a single camera, reducing blind spots and minimizing the number of cameras you need.

Day or night, the Arlo Pro 4 delivers exceptional surveillance. Color night vision lets you see what's happening in vivid detail even in complete darkness, while the built-in spotlight and siren serve as powerful deterrents against intruders. The magnetic mount system makes installation incredibly easy—no drilling required—so you can set up your security system in minutes and reposition cameras as your needs change.

These rechargeable cameras operate wirelessly, eliminating the hassle of running cables through walls. The rechargeable battery can last for months depending on activity levels, and Arlo's intelligent motion detection sends instant alerts to your phone when activity is detected. With the 3-pack, you have everything you need to monitor multiple entry points, your backyard, and other key areas of your property with professional-grade security.`
  },
  {
    id: '6a3e1737282c4f7fe8ad5888',
    description: `The Hikvision NVR 8-Channel is a robust network video recorder designed for serious surveillance installations. Supporting Power over Ethernet (PoE), each camera receives both data and power through a single Ethernet cable, dramatically simplifying installation and reducing the need for separate power supplies at each camera location. With support for cameras up to 12 megapixels, this NVR captures extraordinary detail that makes identifying people and objects effortless.

Featuring H.265+ compression technology, the Hikvision NVR dramatically reduces storage requirements without sacrificing video quality. This means you can store weeks or even months of footage on your hard drives that would only hold days with older compression standards. The 80Mbps incoming bandwidth ensures smooth, uninterrupted recording even with multiple high-resolution cameras streaming simultaneously.

The HDMI output provides crystal-clear local monitoring on any compatible TV or monitor, while Hik-Connect remote access lets you view live feeds and recordings from anywhere in the world through the mobile app. Advanced features like motion detection zones, schedule recording, and event-triggered alerts give you granular control over your security system. Whether you're protecting a small business or a large residential property, this NVR provides the reliability and performance that professional-grade security demands.`
  },
  {
    id: '6a3e1737282c4f7fe8ad5889',
    description: `The Reolink RLC-810A is a high-performance PoE security camera that delivers stunning 4K 8-megapixel resolution, capturing four times the detail of standard 1080p cameras. Every frame is loaded with detail, from facial features to license plates, ensuring you have clear, usable footage when you need it most. The advanced image sensor performs beautifully in low light, producing impressive color night vision that reveals details you'd miss with standard infrared cameras.

Smart detection technology sets the RLC-810A apart from basic security cameras. Advanced person and vehicle detection algorithms intelligently identify and classify moving objects, significantly reducing false alerts caused by animals, trees, or passing shadows. This means you only receive notifications when something truly important is happening, keeping you informed without overwhelming you with constant pings.

The Power over Ethernet design means a single cable carries both data and power, eliminating the need for separate wiring at each camera location. A built-in time-lapse feature lets you create compelling condensed videos of events like sunrises, construction projects, or package deliveries. With its combination of exceptional image quality, intelligent detection, and easy installation, the RLC-810A delivers professional-grade security surveillance at a remarkably accessible price point.`
  },
  {
    id: '6a3e1737282c4f7fe8ad588a',
    description: `The Ring Video Doorbell 2nd Generation redefines what a doorbell can do. Featuring crisp HD video, you can see exactly who's at your door from anywhere using the Ring app on your phone. The wide-angle camera captures a clear view of your entire entryway, while enhanced night vision ensures you can identify visitors even after dark. Motion-activated alerts notify you the moment someone approaches your door, whether you're inside the house or across the world.

Two-way audio lets you speak with visitors, delivery drivers, and guests without opening your door. Built-in Quick Replies provide pre-recorded messages for common scenarios like asking delivery drivers to leave packages in a safe spot or telling visitors you'll be right there. The customizable motion zones let you fine-tune exactly which areas trigger alerts, reducing unnecessary notifications from passing cars or pedestrians.

Installation is refreshingly simple, with the included hardware and step-by-step instructions getting you up and running in minutes. The doorbell connects to your existing doorbell wiring for continuous power, with a rechargeable battery backup for uninterrupted operation. Integrated with the Ring ecosystem, it works seamlessly with Alexa-enabled devices, letting you see and speak to visitors through your Echo Show or Fire TV. It's the modern doorbell that keeps you connected to your front door, no matter where you are.`
  },
  {
    id: '6a3e1737282c4f7fe8ad588b',
    description: `The Wyze Cam v3 Pro takes affordable security to new heights with stunning 2K QHD resolution, delivering significantly more detail than standard 1080p cameras. Every frame is sharp and clear, making it easy to identify faces, read license plates, and capture critical details. The camera features impressive color night vision, revealing full-color footage even in near-total darkness, far surpassing the grainy black-and-white night vision of older cameras.

Versatile and feature-packed, the Wyze Cam v3 Pro includes a built-in spotlight and siren that can be activated remotely or triggered automatically by motion detection. Two-way audio lets you communicate with anyone near the camera in real time. The camera's IP65 rating means it's built to withstand rain, dust, and the elements, making it equally suitable for indoor and outdoor installation.

Powered by Edge AI processing, the camera intelligently detects and alerts you to people, packages, vehicles, and pets with impressive accuracy. This smart detection significantly reduces false alarms while ensuring you never miss important events. The compact, unobtrusive design blends into any environment, while the Wyze app provides intuitive live streaming, recording management, and customizable alert settings. For homeowners and renters seeking premium security features without the premium price tag, the Wyze Cam v3 Pro is an outstanding choice.`
  },
  {
    id: '6a3e1738282c4f7fe8ad588c',
    description: `The Fire TV Stick 4K Max 2nd Generation is the fastest, most powerful Fire TV Stick yet, delivering stunning 4K Ultra HD streaming with support for Dolby Vision, HDR10+, and Dolby Atmos audio. With WiFi 6E connectivity, you get significantly faster streaming speeds, reduced buffering, and smoother performance even when multiple devices are connected to your network. The generous 16GB of internal storage means you can download more apps and games without running out of space.

The included Alexa Voice Remote Pro elevates your control experience with backlit buttons, a customizable shortcut button, and lost remote functionality that makes it easy to find with your voice. Alexa voice control lets you search for content, control smart home devices, check the weather, set timers, and manage your entertainment entirely hands-free. The ambient experience transforms your TV into a beautiful display of art, photography, or useful information when you're not actively watching.

The Fire TV Stick 4K Max also features an impressive ambient experience that turns your television into a stunning visual display when idle. From breathtaking nature scenes to interactive art, your TV becomes a dynamic piece of wall art. With access to all major streaming services including Netflix, Prime Video, Disney+, Hulu, and HBO Max, plus thousands of free movies and TV shows through ad-supported apps, the Fire TV Stick 4K Max 2nd Gen is the ultimate streaming upgrade for any television.`
  },
  {
    id: '6a3e1739282c4f7fe8ad588d',
    description: `The LG C5 55" OLED evo TV represents the pinnacle of television technology, delivering breathtaking picture quality that makes every frame look stunning. The self-lit OLED pixels produce perfect blacks, infinite contrast, and over a billion colors that bring movies, shows, and games to life in ways that traditional LED TVs simply cannot match. The a9 Gen7 AI Processor analyzes content in real time, automatically optimizing picture and sound settings for the best possible viewing experience.

Gamers will appreciate the four HDMI 2.1 ports, each supporting 4K at 120Hz for buttery-smooth gameplay. Features like Variable Refresh Rate (VRR), Auto Low Latency Mode (ALLM), and NVIDIA G-SYNC compatibility ensure you're getting the most responsive gaming experience possible. The TV also supports Dolby Vision and Dolby Atmos, creating a truly immersive home cinema experience that rivals commercial theaters.

Powered by webOS 25, the LG C5 offers a sleek, intuitive interface with access to all major streaming apps. The thin OLED panel is beautifully designed with minimal bezels, creating an edge-to-edge viewing experience that looks stunning whether mounted on a wall or placed on its elegant stand. For discerning viewers who demand the absolute best in picture quality, the LG C5 55" OLED evo is an exceptional choice that will impress for years to come.`
  },
  {
    id: '6a3e1739282c4f7fe8ad588e',
    description: `The Samsung 55" Crystal UHD TU690T delivers stunning 4K Ultra HD resolution at an incredibly accessible price point. The Crystal Processor 4K automatically upcasts lower-resolution content to near-4K quality, so everything you watch looks sharper and more detailed. Samsung's PurColor technology displays a wider spectrum of colors than standard UHD TVs, making movies look more cinematic and nature documentaries come alive with vivid, natural hues.

The sleek, slim design of the TU690T looks fantastic in any room, with clean lines and a minimal bezel that keeps your focus on the picture. Three HDMI ports provide ample connectivity for your cable box, game console, and streaming device, while USB ports let you play your own media files directly on the big screen. The Tizen operating system provides a smooth, responsive smart TV experience with access to thousands of apps including Netflix, Hulu, Disney+, and more.

Samsung's Clean Cable Solution keeps unsightly cords hidden and organized, maintaining the TV's elegant appearance. The PurColor technology, combined with 4K UHD resolution and HDR support, creates a picture that's remarkably vibrant and detailed. Whether you're watching the latest blockbuster, catching up on your favorite series, or enjoying a gaming marathon, the Samsung 55" Crystal UHD TU690T delivers impressive performance that punches well above its price class.`
  },
  {
    id: '6a3e1739282c4f7fe8ad588f',
    description: `The Sony 65" X90L is a premium Full Array LED TV that delivers exceptional picture quality powered by Sony's legendary XR Processor. This advanced processor analyzes and optimizes every element of the picture in real time, enhancing color, contrast, and clarity to produce images that are remarkably lifelike. Full Array LED backlighting provides precise control over brightness across the entire screen, creating deep blacks and bright highlights that bring HDR content to life.

With native 120Hz refresh rate support, the X90L delivers incredibly smooth motion handling that sports fans and action movie enthusiasts will love. Dolby Vision support ensures you're seeing content exactly as the creators intended, with stunning HDR performance that reveals detail in both the brightest and darkest scenes. Sony's 4K X-Reality PRO technology upscales lower-resolution content to near-4K quality, so your entire library of movies and shows looks better.

Running Google TV, the X90L provides a seamless, intuitive smart TV experience with voice control, personalized recommendations, and access to all major streaming services. The minimalist design features thin bezels and a premium build quality that looks as impressive as the picture it produces. For viewers who want a television that combines Sony's decades of picture quality expertise with modern smart features, the 65" X90L is a compelling choice that excels in every category.`
  },
  {
    id: '6a3e1739282c4f7fe8ad5890',
    description: `The TCL 65" 4-Series Roku TV brings stunning 4K UHD resolution and the convenience of built-in Roku TV into one beautiful package. With HDR10 and Dolby Vision support, this TV delivers enhanced contrast and a wider color gamut that makes every scene pop with detail and vibrancy. The 65-inch screen provides an immersive viewing experience that's perfect for movie nights, sports, and gaming.

Roku TV built right in means you have instant access to over 500,000 movies and TV episodes across thousands of free and paid channels, including Netflix, Hulu, Disney+, HBO Max, and many more. The Roku interface is famously simple and intuitive, making it easy to find exactly what you want to watch. Four HDMI ports provide plenty of connectivity for your cable box, gaming console, soundbar, and streaming devices.

The clean, modern design of the TCL 4-Series features slim bezels and a stable tabletop stand that fits comfortably on most entertainment centers. The included Roku remote is straightforward and easy to use, with dedicated buttons for your favorite streaming services. Whether you're upgrading from an older TV or outfitting a new space, the TCL 65" 4-Series Roku TV delivers impressive picture quality and smart functionality without the complicated setup or premium price tag of competing brands.`
  },
  {
    id: '6a3e173a282c4f7fe8ad5891',
    description: `The DualSense wireless controller for PlayStation 5 revolutionizes gaming with haptic feedback that lets you feel the impact of every action. From the pitter-patter of raindrops to the rumble of an explosion, the advanced vibration motors create incredibly immersive sensations that draw you deeper into your games. Adaptive triggers provide varying levels of resistance, simulating the tension of a bowstring or the kick of a powerful engine.

A built-in microphone array lets you chat with friends without needing a separate headset, and the dedicated create button makes it easy to capture screenshots, record gameplay, and stream your adventures to the world. The ergonomic design fits comfortably in your hands for extended gaming sessions, while the USB-C charging port ensures fast, convenient recharging of the long-lasting 12-hour battery.

The DualSense controller connects wirelessly to your PS5 via Bluetooth, providing a lag-free, responsive gaming experience. The refined analog sticks and triggers offer precision control that competitive gamers will appreciate. Available in a stunning white design that perfectly complements the PS5 console, the DualSense is more than just a controller—it's a gateway to a new generation of gaming experiences that engage all your senses.`
  },
  {
    id: '6a3e173a282c4f7fe8ad5892',
    description: `The Xbox Series X is the most powerful Xbox ever created, delivering true 4K gaming at up to 120 frames per second for incredibly smooth, responsive gameplay. With 12 teraflops of processing power, the custom AMD RDNA 2 GPU produces stunning visuals with hardware-accelerated ray tracing that creates realistic lighting, reflections, and shadows. Quick Resume lets you instantly switch between multiple games exactly where you left off, eliminating load times and keeping you in the action.

With a 1TB custom NVMe SSD, the Series X delivers dramatically faster load times that get you into games in seconds rather than minutes. The ultra-high bandwidth storage technology means open worlds load faster, texture pop-in is virtually eliminated, and games feel more responsive than ever before. Backward compatibility extends your library to thousands of games from previous Xbox generations, many of which receive performance boosts on the Series X.

Xbox Game Pass Ultimate gives you access to hundreds of games on day one, including all first-party Microsoft titles. The sleek tower design is both visually striking and functionally engineered for optimal cooling and performance. Whether you're exploring vast open worlds, competing in fast-paced multiplayer matches, or diving into immersive single-player adventures, the Xbox Series X delivers the performance and features that hardcore gamers demand.`
  },
  {
    id: '6a3e173a282c4f7fe8ad5893',
    description: `The Nintendo Switch OLED Model takes the versatile hybrid console to the next level with a stunning 7-inch OLED screen that delivers vivid colors, deep blacks, and crisp detail whether you're playing handheld or tabletop. The larger display makes games look better than ever, while the vivid OLED technology ensures every game in the Switch library shines with enhanced visual quality. The 64GB of internal storage provides ample space for your digital game library.

The redesigned tabletop mode features a wide, adjustable stand that lets you find the perfect viewing angle for multiplayer gaming anywhere. Enhanced audio through the built-in speakers provides richer, more immersive sound that brings your games to life. The dock now includes a wired Ethernet port for more stable online gaming, making it easier to enjoy smooth multiplayer matches without relying on WiFi.

The Nintendo Switch OLED maintains the same beloved hybrid design that made the original Switch a phenomenon, seamlessly transitioning between handheld, tabletop, and TV modes. Joy-Con controllers attach and detach smoothly, supporting single-player and multiplayer gaming in any configuration. For fans of Nintendo's iconic franchises and indie gems alike, the Switch OLED Model delivers the most polished, visually stunning portable gaming experience available.`
  },
  {
    id: '6a3e173b282c4f7fe8ad5894',
    description: `The PlayStation 5 Console Disc Edition delivers the full next-generation gaming experience with blazing-fast load times and stunning 4K visuals at up to 120 frames per second. Powered by a custom AMD RDNA 2 GPU capable of 10.3 TFLOPS, the PS5 produces breathtaking graphics with hardware-accelerated ray tracing that creates photorealistic lighting, reflections, and shadows. The ultra-high-speed 825GB SSD virtually eliminates loading screens, getting you into the action faster than ever before.

The included DualSense controller introduces haptic feedback and adaptive triggers that let you feel the game in entirely new ways. Hear and feel the difference between walking on sand, splashing through water, or firing different weapons. The controller's built-in microphone, create button, and refined ergonomics make it the most advanced controller ever designed. With 3D Audio technology through the Tempest Engine, you can hear sound from every direction with pinpoint accuracy.

The PS5's bold, futuristic design makes it a statement piece in any entertainment setup, and the inclusion of a 4K Blu-ray drive means it doubles as a premium media player. Backward compatibility with thousands of PS4 games ensures you can enjoy your existing library with enhanced performance. Whether you're exploring the latest exclusives or diving into multiplatform blockbusters, the PS5 Disc Edition delivers the performance and immersion that defines the next generation of gaming.`
  },
  {
    id: '6a3e173b282c4f7fe8ad5895',
    description: `The Xbox Wireless Controller in Carbon Black delivers the signature Xbox ergonomics and performance that gamers have trusted for years, refined with modern improvements. Bluetooth 5.0 provides a reliable, low-latency wireless connection to Xbox Series X|S, Xbox One, Windows PC, and mobile devices, giving you seamless compatibility across all your gaming platforms. The textured grip on the triggers and bumpers ensures precise control during intense gaming sessions.

The dedicated Share button makes it effortless to capture screenshots and video clips to share with friends and the gaming community. USB-C connectivity allows for wired play while charging, so you never have to interrupt a gaming session. The controller runs on either AA batteries or the optional Xbox Rechargeable Battery Kit, giving you flexibility in how you power your gaming.

The Carbon Black colorway gives the controller a sleek, understated look that matches any gaming setup. The refined button layout, responsive triggers, and precise analog sticks provide the tactile feedback that competitive gamers demand. Compatible with Xbox Series X|S, Xbox One, Windows 10/11, and mobile devices via Bluetooth, this controller is one of the most versatile gaming peripherals available. It's the perfect companion for gamers who want reliable, comfortable performance across every platform they play on.`
  },
  {
    id: '6a3e173b282c4f7fe8ad5896',
    description: `The Amazfit GTR 3 is a feature-packed smartwatch that delivers an impressive array of health and fitness tracking tools in an elegant, traditional watch design. With over 150 built-in sports modes, you can track virtually any activity from running and cycling to yoga and swimming with detailed metrics and insights. Built-in GPS accurately tracks your outdoor routes without needing to carry your phone, while Amazon Alexa integration lets you set timers, check the weather, and control smart home devices from your wrist.

Health monitoring is a cornerstone of the GTR 3, with continuous heart rate tracking, blood oxygen saturation (SpO2) measurement, and sleep analysis that provides detailed insights into your recovery and overall wellbeing. The always-on display ensures you can always see the time and your key stats without raising your wrist, while the vibrant AMOLED screen makes everything look sharp and easy to read even in bright sunlight.

With an exceptional 14-day battery life on a single charge, the Amazfit GTR 3 outlasts most smartwatches on the market, meaning you can wear it through two full weeks of activity tracking and smart features before reaching for a charger. The lightweight, comfortable design means you'll barely notice you're wearing it, whether you're crushing a workout or sleeping. It's the ideal smartwatch for anyone who wants comprehensive health tracking without the hassle of daily charging.`
  },
  {
    id: '6a3e173c282c4f7fe8ad5897',
    description: `The Apple Watch Series 9 (41mm) introduces the powerful S9 chip, delivering faster performance and more intelligent features than any Apple Watch before it. The innovative Double Tap gesture lets you control the watch with a simple pinch of your fingers, making it easy to answer calls, dismiss notifications, and play or pause music without touching the screen. This hands-free interaction is a game-changer when your hands are full or dirty.

Comprehensive health monitoring is at the core of the Series 9, with a blood oxygen sensor that measures your SpO2 levels on demand, an electrical heart sensor for taking ECG readings, and a temperature sensor that provides insights into your overall wellbeing. The always-on Retina display shows your watch face and key complications at all times, while the bright, easy-to-read screen is visible even in direct sunlight. With up to 18 hours of battery life, the Series 9 easily lasts through a full day of active use.

The Apple Watch Series 9 seamlessly integrates with your iPhone, delivering notifications, messages, and calls right to your wrist. Apple Pay, Siri, and a massive library of apps make it a powerful extension of your phone. The 41mm case size is ideal for smaller wrists, while the wide selection of bands and watch faces lets you customize the look to match your personal style. Whether you're tracking workouts, monitoring health metrics, or staying connected on the go, the Series 9 is Apple's most capable smartwatch yet.`
  },
  {
    id: '6a3e173c282c4f7fe8ad5898',
    description: `The Fitbit Charge 6 marks the return of Google-powered features to Fitbit's most popular fitness tracker, delivering a powerful combination of health monitoring and smart connectivity. Google Maps integration lets you navigate directly from your wrist, while YouTube Music support lets you control your playlists without reaching for your phone. The vibrant AMOLED display makes everything easy to see and interact with, even during intense workouts.

Advanced health tracking is where the Charge 6 truly excels. The built-in ECG sensor provides clinical-grade heart rhythm assessments on demand, while continuous heart rate monitoring with heart rate zones helps you optimize your training intensity. Built-in GPS tracks your outdoor runs, walks, and rides without your phone, and the comprehensive sleep tracking provides detailed insights into your sleep stages and recovery. An impressive 7-day battery life means you can wear it through an entire week of activity tracking without stopping to charge.

The Charge 6 maintains the slim, comfortable form factor that made its predecessors so popular, making it easy to wear 24/7 for continuous health monitoring. The intuitive interface and responsive touchscreen make navigating features quick and effortless. Whether you're a dedicated athlete tracking every workout, a health-conscious individual monitoring daily activity, or someone who simply wants better insights into their sleep and wellness, the Fitbit Charge 6 delivers a comprehensive, well-rounded fitness tracking experience.`
  },
  {
    id: '6a3e173c282c4f7fe8ad5899',
    description: `The Garmin Forerunner 265 is a premium running watch that features a gorgeous AMOLED display, making it one of the most visually stunning GPS watches on the market. The vibrant, colorful screen brings your training data to life with crisp, easy-to-read metrics and gorgeous watch faces. Advanced training metrics including training load, recovery time, and performance condition give you deep insights into your fitness and readiness to train.

Garmin's morning report provides a personalized daily briefing that includes your sleep score, recovery status, and training suggestions based on your recent activity. The race predictor estimates your finish times for common race distances based on your fitness level and training history, helping you set realistic goals and pace yourself effectively. With 13 days of battery life in smartwatch mode, the Forerunner 265 keeps up with your most demanding training schedules without daily charging.

Built-in music storage lets you sync playlists from Spotify, Amazon Music, and other services, giving you the freedom to run with just your watch and headphones. Advanced running dynamics including cadence, ground contact time, and stride length provide actionable insights to help you improve your form. Whether you're training for your first 5K or your next marathon, the Forerunner 265 delivers the data, motivation, and durability that serious runners demand.`
  },
  {
    id: '6a3e173c282c4f7fe8ad589a',
    description: `The Samsung Galaxy Watch 6 Classic (47mm) brings back the beloved rotating bezel that fans have been asking for, providing an intuitive, satisfying way to navigate through apps, menus, and notifications. The premium Sapphire Crystal glass is incredibly scratch-resistant, keeping your watch looking pristine through daily wear and intense workouts. Powered by Wear OS with Samsung's One UI Watch interface, it delivers a smooth, feature-rich smartwatch experience.

Advanced health monitoring is at the forefront of the Galaxy Watch 6 Classic. The BioActive Sensor combines optical heart rate, electrical heart signal, and bioelectrical impedance analysis into a single compact chip, enabling blood pressure monitoring, ECG readings, and body composition analysis. The comprehensive health tracking suite includes sleep analysis, stress monitoring, and activity tracking across dozens of workout types, giving you a complete picture of your overall wellbeing.

The larger 47mm case houses a bright, vivid AMOLED display that's easy to read even in direct sunlight, while the premium stainless steel build quality feels substantial and refined on your wrist. Seamless integration with Samsung Galaxy phones unlocks additional features, though it works well with other Android devices too. With its combination of classic watch aesthetics, cutting-edge health technology, and the precision of the rotating bezel, the Galaxy Watch 6 Classic is the ideal choice for anyone who wants a premium smartwatch that doesn't compromise on style or substance.`
  }
];

async function updateDescriptions() {
  await connectDB();

  let successCount = 0;
  let failCount = 0;

  for (const item of updates) {
    try {
      const product = await Product.findByIdAndUpdate(
        item.id,
        { description: item.description },
        { new: true }
      );
      if (product) {
        console.log(`✓ Updated: ${product.name}`);
        successCount++;
      } else {
        console.log(`✗ Not found: ${item.id}`);
        failCount++;
      }
    } catch (err) {
      console.error(`✗ Error updating ${item.id}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nDone. Success: ${successCount}, Failed: ${failCount}`);
  mongoose.disconnect();
}

updateDescriptions();
