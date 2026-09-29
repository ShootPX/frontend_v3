import type { SeoPage } from "./types";
import { ol, p, tip, ul } from "./blocks";

const D = { publishedAt: "2026-09-21", updatedAt: "2026-09-21", published: false } as const;

export const blogPagesB: SeoPage[] = [
  {
    slug: "product-photo-shot-list",
    group: "blog",
    title: "Product Photo Shot List: Images Every Listing Needs",
    metaDescription:
      "A practical product photo shot list: the image types every online listing needs, what each one is for, and how to plan them before you shoot.",
    primaryKeyword: "product photo shot list",
    intent: "Planning: which images should I make for each product so the listing answers buyer questions?",
    h1: "A Product Photo Shot List: The Image Types Every Listing Needs",
    intro:
      "A good listing has a set of images, each with a different job, and the simplest way to plan them is a shot list: a short checklist of image types you produce for every product. For most products the set is a clean main image, angle views, a detail close-up, a scale image, a lifestyle image, and one image per variant. This guide explains what each image is for so you shoot only what earns its place.",
    sections: [
      {
        h2: "Why plan a shot list at all",
        blocks: [
          p(
            "Sellers who shoot without a plan tend to take twenty photos of the front and none of the back. A shot list fixes that by deciding the images before you pick up the phone, so every product gets the same coverage and you never have to reshoot because one view was missing.",
          ),
          p(
            "It also makes it easier to decide which images to shoot yourself and which to generate. Some images need the real item in a real photograph, and others can be produced from a single photo with a tool such as ShootPX. The list makes that decision explicit.",
          ),
        ],
      },
      {
        h2: "The core image types",
        blocks: [
          ol(
            "Main image: the clean, uncluttered view that appears in search results. Check the marketplace's current guidance on what the main image must look like.",
            "Angle views: front, back and side or three-quarter, so buyers can see the whole product.",
            "Detail close-up: the fabric weave, stitching, clasp, texture or finish that a buyer would want to inspect.",
            "Scale image: the product beside or held in a hand, or next to a familiar object, so size is clear.",
            "In-use or lifestyle image: the product in a setting that shows how it is used.",
            "Variant images: one for each colour, size or style you sell.",
            "Packaging or contents image: what arrives in the box, if it matters to the purchase.",
          ),
        ],
      },
      {
        h2: "What each image is doing for the buyer",
        blocks: [
          ul(
            "The main image earns the click. It should be clear and recognisable at a glance.",
            "The angle views prevent surprises. Buyers who cannot see the back worry about it.",
            "The detail close-up proves quality. It is the digital version of picking the item up.",
            "The scale image answers how big it is, which is a question buyers of physical goods often ask.",
            "The lifestyle image sells the idea. It answers why they would want it.",
            "Variant images stop buyers guessing what the other colours look like.",
          ),
          tip(
            "Write one question each image answers. If you cannot name the question, the image may not need to exist.",
            "The one-question test",
          ),
        ],
      },
      {
        h2: "Which images to photograph and which to generate",
        blocks: [
          p(
            "Some images depend on the real item and should be your own photographs: detail close-ups, texture, scale and packaging. These show what a buyer will really receive.",
          ),
          p(
            "Others are about presentation and can be generated from one good photo. Listing Photoshoot can produce a listing-style image, Creative Photoshoot can produce a lifestyle scene, Recolor can produce colour variants and Model Shoot can show a garment on a model. In every case, compare the generated image with the real product before you publish it.",
          ),
        ],
      },
      {
        h2: "A shot list template you can copy",
        blocks: [
          p("Print this or paste it into a notes app, and tick it off for each product."),
          ul(
            "Main image: done / to do",
            "Front, back and side views: done / to do",
            "Detail close-up: done / to do",
            "Scale image: done / to do",
            "Lifestyle image: done / to do",
            "All variants: done / to do",
            "Contents image: done / to do (if relevant)",
          ),
        ],
      },
      {
        h2: "Adjusting the list by category",
        blocks: [
          ul(
            "Clothing: add a fit view on a model and a fabric close-up. A size chart image helps too.",
            "Jewellery: add a worn view for scale and a close-up of the setting or clasp.",
            "Home decor: add a room-context image and a dimensions image.",
            "Beauty and skincare: add a back-of-pack image and a texture or swatch image.",
          ),
          p(
            "Do not pad the list. Five clear images beat fifteen repetitive ones, and a marketplace may limit how many you can upload anyway. Check the current limits for the marketplace you use.",
          ),
        ],
      },
      {
        h2: "Shoot in a batch",
        blocks: [
          p(
            "Set up once and shoot every product's images in the same session, in the same light, against the same background. Consistency is easier to keep in one sitting than across many days. The guide on keeping product images consistent goes deeper on that.",
          ),
        ],
      },
      {
        h2: "Reviewing a set as a buyer would",
        blocks: [
          p(
            "When your images are ready, look at them in the order a buyer will, on a phone. The first image should make the product obvious in a second. The next two should settle what it looks like from other sides. By the fourth or fifth image, the buyer should know the size, the use and the colour options. If there is a question you would still ask as a buyer, the set is missing an image.",
          ),
          p(
            "Then ask what could be removed. Two near-identical images waste a slot that a scale or detail image could use, and a lifestyle image that hides the product behind props may be doing more harm than good.",
          ),
        ],
      },
      {
        h2: "Keep a record for each product",
        blocks: [
          p(
            "A simple sheet with one row per product and one column per image type stops gaps from slipping through. When you add products later, or change marketplace, you know at a glance what exists and what needs shooting. Add a column for where each image came from, your own photograph or a generated image, so you can quickly find the source if a listing needs updating.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "How many images should a listing have?",
        a: "As many as answer the buyer's questions, and no more. Check the marketplace's current limits for the maximum it allows.",
      },
    ],
    related: ["listing-photoshoot", "consistent-product-images-across-catalog", "lifestyle-vs-studio-product-images", "amazon-india-sellers"],
    ...D,
  },
  {
    slug: "lifestyle-vs-studio-product-images",
    group: "blog",
    title: "Lifestyle vs Studio Product Images: When to Use Which",
    metaDescription:
      "Lifestyle vs studio product images: what each does best, where each belongs in a listing, and how to decide for your product and platform.",
    primaryKeyword: "lifestyle vs studio product images",
    intent: "Decision: should I use plain studio-style images or styled lifestyle images, and where?",
    h1: "Lifestyle vs Studio Product Images: When to Use Which",
    intro:
      "Use studio-style images, where the product sits on a plain background, when a buyer needs to see the item clearly and accurately, and use lifestyle images, where it appears in a real-looking setting, when the buyer needs to imagine using it. Most listings need both, in that order: the studio-style image first to identify the product, then lifestyle images to persuade. This guide explains where each type works and how to combine them.",
    sections: [
      {
        h2: "What each type is",
        blocks: [
          p(
            "A studio-style image shows the product alone against a plain or softly coloured background, with even light. It is about clarity: shape, colour and details are easy to read.",
          ),
          p(
            "A lifestyle image shows the product in a context: on a shelf, in a kitchen, worn by a person. It is about meaning: how it fits into a life, how large it is in relation to things around it and what mood it belongs to.",
          ),
        ],
      },
      {
        h2: "What studio-style images do best",
        blocks: [
          ul(
            "Identify the product quickly in search results and grids.",
            "Show colour and shape without distraction.",
            "Meet marketplace expectations for the main image, which you should confirm in each marketplace's current guidelines.",
            "Keep a catalog looking uniform.",
          ),
        ],
      },
      {
        h2: "What lifestyle images do best",
        blocks: [
          ul(
            "Communicate scale and use without words.",
            "Set a mood, which matters for gifts, home goods, fashion and beauty.",
            "Give social posts and banners more visual interest than a plain cut-out can.",
            "Separate your listing from others that use only plain images.",
          ),
          p(
            "Their risk is misdirection. A scene can suggest a size, a material or an included accessory that the product does not have, and that becomes a return.",
          ),
        ],
      },
      {
        h2: "How to place them in a listing",
        blocks: [
          ol(
            "First image: studio-style and clear, following the marketplace's rules for the main image.",
            "Next images: angles and details, also studio-style.",
            "Then: one or two lifestyle images that show use and scale.",
            "Last: variants, packaging or size charts as relevant.",
          ),
          tip(
            "If you have room for only two images, make them one clear studio-style image and one lifestyle image that shows scale.",
            "Two-image rule",
          ),
        ],
      },
      {
        h2: "Deciding by product type",
        blocks: [
          ul(
            "Small, simple items with low prices: studio-style images usually carry the sale. Add one lifestyle image if you can.",
            "Fashion and accessories: buyers want to see the item on a body, so lifestyle or on-model images matter more.",
            "Home and decor: context is central, since buyers picture the item in their own space.",
            "Technical or precise products: clear studio images with details matter more, and lifestyle images play a smaller role.",
          ),
        ],
      },
      {
        h2: "Making each type with ShootPX",
        blocks: [
          p(
            "Listing Photoshoot is the studio-style tool: you describe a simple scene and get listing images from one photo. Creative Photoshoot is the lifestyle tool: choose an idea or describe a scene. Model Shoot puts garments and accessories on a model. All three start from a photo you upload, and all three should be checked against the real product before you publish.",
          ),
        ],
      },
      {
        h2: "Keep the two types consistent",
        blocks: [
          p(
            "The lifestyle image and the studio image should look like the same product. Check colour, proportion and detail in each, and keep the light direction similar if you can. If they disagree, buyers will notice and trust neither.",
          ),
        ],
      },
      {
        h2: "Five questions to decide for your own product",
        blocks: [
          ol(
            "What does a buyer need to see to trust this item? If the answer is detail, lead with studio-style.",
            "What do buyers usually ask before ordering? If it is size or use, add lifestyle.",
            "Is the item bought for how it looks in a space or on a person? If yes, lifestyle carries more weight.",
            "Does the marketplace have rules about the first image? If so, follow them and use lifestyle in later slots.",
            "Can I produce a lifestyle image that stays honest about size and contents? If not, skip it.",
          ),
        ],
      },
      {
        h2: "Testing which works for you",
        blocks: [
          p(
            "The only real way to know is to test. Change the order or swap in a lifestyle image on one product while leaving similar products alone, and watch how the listing responds over a fair period. Change one thing at a time, otherwise you will not know what caused the difference. Treat the result as evidence for that product, not as a rule for the whole catalog.",
          ),
          p(
            "Keep a note of what you tried and what happened. After a few tests, you will have a house view of where lifestyle images help your customers and where plain studio-style images do the job.",
          ),
        ],
      },
      {
        h2: "Common mistakes when mixing the two",
        blocks: [
          ul(
            "Using a lifestyle image as the only image, which leaves buyers unable to see the product clearly.",
            "Using props that dominate the frame and compete with the product.",
            "Showing a scale in the lifestyle image that contradicts the dimensions in the text.",
            "Using different colour treatment in the two images, so the product looks like two different shades.",
            "Adding lifestyle images to every product without checking that each adds something new.",
          ),
        ],
      },
      {
        h2: "An example of the two working together",
        blocks: [
          p(
            "Imagine a ceramic mug. The first image is the mug on a plain surface, lit softly from the side, so the shape and glaze are clear. The second is the mug from above, showing the inside and the handle position. The third is the mug on a wooden table beside a window with a plain notebook, which tells a buyer it is a cup for a slow morning and suggests its size next to the notebook. Each image answers a different question, and none of them needs to do all the work.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Should my main image be a lifestyle image?",
        a: "Usually a clear studio-style image is the safer choice for the main image, and marketplaces have their own rules, so check the current guidelines.",
      },
    ],
    related: ["creative-photoshoot", "listing-photoshoot", "product-photo-shot-list", "instagram-sellers"],
    ...D,
  },
  {
    slug: "product-image-mistakes-that-cost-sales",
    group: "blog",
    title: "Common Product Image Mistakes That Cost You Sales",
    metaDescription:
      "The product image mistakes that put buyers off, from blur and clutter to colour mismatch and missing scale, with a quick fix for each.",
    primaryKeyword: "product image mistakes",
    intent: "Diagnostic: what's wrong with my product photos, and how do I fix it?",
    h1: "Common Product Image Mistakes That Cost You Sales, and How to Fix Them",
    intro:
      "The product image mistakes that cost the most are blur, a cluttered background, colour that does not match the real item, no sense of size, and images that do not agree with each other. Each is fixable without expensive equipment. This guide lists the mistakes in order of how much damage they do, with a quick fix for each, so you can check your own listings against them.",
    sections: [
      {
        h2: "1. Blurry or soft images",
        blocks: [
          p(
            "A soft photo says the seller does not care, and it hides the detail buyers use to judge quality. The usual causes are a dirty lens, shaky hands and dim light.",
          ),
          ul(
            "Wipe the lens before shooting.",
            "Rest the phone on something or use the timer.",
            "Move the product next to a window instead of using a lamp.",
            "Tap to focus on the product.",
          ),
        ],
      },
      {
        h2: "2. Cluttered or distracting backgrounds",
        blocks: [
          p(
            "A bed, a cup and a charger in the frame pull attention from the product and make the listing look casual. Use a plain surface and clear the frame. If you already have a photo with a messy background, a generation tool such as ShootPX Listing Photoshoot can place the product in a cleaner scene, which you should then check against the real item.",
          ),
        ],
      },
      {
        h2: "3. Colour that does not match the real product",
        blocks: [
          p(
            "Colour is the most common reason a buyer says the item was not as shown. Mixed lighting, aggressive filters and wrong exposure all shift colour.",
          ),
          ul(
            "Shoot in daylight with room lights off.",
            "Avoid heavy filters and strong saturation.",
            "Compare the photo with the real item on a screen before you upload.",
            "If you recolour or generate variants, check each against real stock.",
          ),
        ],
      },
      {
        h2: "4. No sense of scale",
        blocks: [
          p(
            "Buyers cannot guess size from a product on a blank background. Add an image with a hand, a familiar object or a person, and state dimensions in the text.",
          ),
        ],
      },
      {
        h2: "5. Inconsistent images within a listing or catalog",
        blocks: [
          p(
            "Different backgrounds, crops and light across a listing make it look assembled from many sources. Fix it by shooting in one session with one setup, or by using the same scene wording in your generation prompts.",
          ),
        ],
      },
      {
        h2: "6. Only one angle",
        blocks: [
          p(
            "A single front view leaves buyers wondering about the back, the side and the inside. Add the missing views, using the shot list guide as a checklist.",
          ),
        ],
      },
      {
        h2: "7. Images that oversell",
        blocks: [
          p(
            "Heavy retouching, misleading props and generated scenes that suggest something the product does not have all lead to returns and bad reviews. This is where AI-generated images need the most care. Compare each result with the real item, and remove any scene detail that promises more than the box delivers.",
          ),
          tip(
            "Ask of every image: would a buyer who received the item feel it looked like this? If the honest answer is not quite, fix the image.",
            "The receiving test",
          ),
        ],
      },
      {
        h2: "8. Ignoring the marketplace's guidelines",
        blocks: [
          p(
            "Marketplaces set rules for images, especially the main one, and listings that break them can be suppressed or rejected. These rules change, so read the current guidelines for your marketplace and category, rather than relying on old advice or on a number remembered from a forum post.",
          ),
        ],
      },
      {
        h2: "9. Poor mobile readability",
        blocks: [
          p(
            "Look at your images at phone size, because a product that is tiny in the frame, or a detail that needs zooming to read, gets lost there. Fill the frame with the product and make sure any text you add is large enough to read at phone size.",
          ),
        ],
      },
      {
        h2: "A ten-minute audit",
        blocks: [
          ol(
            "Open your best-selling listing on your phone.",
            "Look at the first image for two seconds. Can you tell what it is?",
            "Scroll through the rest. Does each add something new?",
            "Compare colour and detail with the real product.",
            "Write down the top two fixes and do them this week.",
          ),
        ],
      },
      {
        h2: "Mistakes people make when fixing their images",
        blocks: [
          ul(
            "Over-editing: heavy sharpening and saturation make products look artificial and change colour.",
            "Fixing one image and leaving the rest, so the listing becomes even more inconsistent.",
            "Reshooting everything at once instead of starting with the listings that get the most views.",
            "Copying another seller's style without checking that it suits your product and customers.",
            "Trusting a generated image without comparing it with the real item.",
          ),
        ],
      },
      {
        h2: "Where AI tools help and where they do not",
        blocks: [
          p(
            "A generation tool can help with clutter, dull scenes and a lack of variety. It cannot fix a blurry source photo, and it can introduce its own errors in fine detail. Use it after you have a clear photo, and treat the review step as part of the job, not an optional extra.",
          ),
          p(
            "The AI product photography guide explains what to expect from these tools, and the listing photoshoot page shows the settings that control the result.",
          ),
        ],
      },
      {
        h2: "How to tell if an image is costing you",
        blocks: [
          p(
            "You will not always see the cost directly, but there are signals. If buyers ask questions that an image should have answered, such as the size or the back view, that image is missing. If returns mention colour or fit, the images oversold. If a listing gets views but few orders while similar items do better, compare your images with theirs and look for the gaps. Treat each signal as a to-do item, and fix the images before spending anything on advertising.",
          ),
        ],
      },
      {
        h2: "Mistakes specific to generated images",
        blocks: [
          ul(
            "Publishing the first result without checking it against the real product.",
            "Writing a scene that describes the product instead of its surroundings, which invites the tool to reinterpret the item.",
            "Generating at the highest quality before you have settled the scene wording, which spends credits on drafts.",
            "Forgetting that a scene can imply extras, such as flowers, gift boxes or a second item, that the buyer will not receive.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Which mistake should I fix first?",
        a: "Blur and colour mismatch. They damage trust the most and are cheap to fix.",
      },
    ],
    related: ["product-photos-with-a-phone", "product-photography-lighting-at-home", "listing-photoshoot", "product-photo-shot-list"],
    ...D,
  },
  {
    slug: "photograph-jewellery-without-glare",
    group: "blog",
    title: "How to Photograph Jewellery Without Glare",
    metaDescription:
      "How to photograph jewellery without glare: soft light, the right angle, a tent from a white sheet, and how to clean reflections without over-editing.",
    primaryKeyword: "how to photograph jewellery",
    intent: "How-to: my jewellery photos have glare and reflections; how do I fix it?",
    h1: "How to Photograph Jewellery Without Glare",
    intro:
      "To photograph jewellery without glare, make the light larger and softer, and move the piece or the camera until the brightest reflection sits away from the important detail. A tent made from a thin white sheet around the piece, a plain matte surface and a slight change of angle solve most problems. This guide walks through the setup with materials you already have.",
    sections: [
      {
        h2: "Why jewellery glares",
        blocks: [
          p(
            "Polished metal and stones act like small mirrors. They reflect the brightest thing near them: a window, a lamp, a white shirt, your phone. A small, hard light source produces a small, hard reflection, which looks like a white blob or a hot spot. The fix is to control what the piece can reflect.",
          ),
        ],
      },
      {
        h2: "Build a simple light tent",
        blocks: [
          p(
            "A light tent surrounds the piece with soft, even white so reflections are gentle and even rather than sharp.",
          ),
          ol(
            "Use a cardboard box or a stack of books to form a small enclosure open at the front.",
            "Cover the sides and top with thin white cloth, butter paper or a white sheet.",
            "Place it beside a window so daylight passes through the cloth.",
            "Put the piece on a matte surface inside, and shoot through the open front.",
          ),
        ],
      },
      {
        h2: "Choose a matte surface",
        blocks: [
          p(
            "A glossy surface adds more reflections. Use matte paper, cloth or card in white, grey or a colour that suits the piece. A dark matte surface makes gold and stones stand out, while a white one looks cleaner for listings. Keep the surface free of creases and dust.",
          ),
        ],
      },
      {
        h2: "Change the angle",
        blocks: [
          p(
            "Small movements of the piece or the phone change what the metal reflects. Rotate the piece a few degrees, tilt it slightly or lower the phone a little and watch the screen. You are looking for an angle where the metal shows a smooth gradient rather than a hard bright patch.",
          ),
          tip(
            "Look at the screen while you move the piece. You can see glare appear and disappear in real time, which is faster than shooting and reviewing.",
            "Watch the reflection",
          ),
        ],
      },
      {
        h2: "Keep yourself out of the reflection",
        blocks: [
          ul(
            "Wear plain dark clothing, or stand further back and zoom in slightly.",
            "Put the phone on a stack of books or a tripod and use the timer, so you are not leaning over the piece.",
            "Clear bright objects from behind the phone, since the metal can reflect them.",
          ),
        ],
      },
      {
        h2: "Clean the piece",
        blocks: [
          p(
            "Fingerprints, dust and tarnish show clearly in photos. Wipe the piece with a soft, dry cloth and handle it by the edges or with clean gloves. A small blower brush removes dust from settings.",
          ),
        ],
      },
      {
        h2: "Keep the colour honest",
        blocks: [
          p(
            "Gold, rose gold and silver all look different under different light. Shoot in daylight with room lights off and compare the photo with the real piece. Avoid heavy filters. If the piece looks different on screen, adjust exposure a little rather than adding colour.",
          ),
        ],
      },
      {
        h2: "After the photo",
        blocks: [
          p(
            "Once you have a clean, glare-free photo, you can use it as the source for other images, such as styled scenes. If you use a generation tool, check the stones, clasp and any engraving against the real piece before publishing, since fine detail is where generated images are most likely to drift. The jewellery use-case page explains that workflow.",
          ),
        ],
      },
      {
        h2: "Special cases: stones, pearls, oxidised and polished finishes",
        blocks: [
          ul(
            "Stones and diamonds: they sparkle when light moves across them, so a slightly softer, larger light usually shows colour better than a bright, small one. Try two or three angles and keep the one where the stones look clear rather than washed out.",
            "Pearls: they reflect the whole scene softly, so a plain, evenly lit surround keeps their surface clean.",
            "Oxidised and matte finishes: they need less glare control, but they can look flat. Side light brings out the texture.",
            "Highly polished gold and silver: they are the hardest. Use the light tent, a matte surface and a small angle change until the metal shows a smooth gradient.",
          ),
        ],
      },
      {
        h2: "Photographing sets and worn pieces",
        blocks: [
          p(
            "For sets, lay the pieces on a plain surface in the same arrangement each time, with equal spacing, and shoot from above. Keep the whole set in the frame with a margin around it.",
          ),
          p(
            "For worn pieces, ask a friend to help, and place the item on a neutral, plain top or skin tone under soft daylight. A worn photo helps buyers judge size, so include one for pieces where scale matters, such as earrings and pendants.",
          ),
          tip(
            "Take a photo of the piece next to a common coin or a ruler in a separate shot. It is a plain way to show size without any editing.",
            "Show scale honestly",
          ),
        ],
      },
      {
        h2: "A quick checklist",
        blocks: [
          ol(
            "Lens and piece cleaned.",
            "Light tent built near a window with room lights off.",
            "Matte surface in place.",
            "Phone steady, using the timer.",
            "Angle adjusted until the brightest reflection sits away from the detail.",
            "Photo checked zoomed in on a large screen.",
            "Colour compared with the real piece.",
          ),
        ],
      },
      {
        h2: "What to do when glare will not go away",
        blocks: [
          p(
            "Some pieces are simply very reflective, and after a few tries you may still see a hot spot. Try lowering the light source's intensity by moving the setup further from the window, add another layer of cloth over the tent, or shoot on a cloudier part of the day. If it still will not behave, take the photo in two angles and choose the better one. Avoid removing glare by heavy editing, since smoothing metal can erase the detail that shows quality.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a lightbox?",
        a: "No. A cardboard box covered with thin white cloth near a window works as a simple light tent.",
      },
    ],
    related: ["jewellery-photography", "product-photography-lighting-at-home", "listing-photoshoot", "product-photos-with-a-phone"],
    ...D,
  },
];
