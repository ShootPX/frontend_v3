import type { SeoPage } from "./types";
import { ol, p, tip, ul } from "./blocks";

const D = { publishedAt: "2026-09-21", updatedAt: "2026-09-21" } as const;

export const platformPages: SeoPage[] = [
  {
    slug: "meesho-sellers",
    group: "for",
    title: "Product Photos for Meesho Sellers, Made with AI",
    metaDescription:
      "How Meesho sellers can use ShootPX to turn phone photos into cleaner listing images and colour variants, and what to check in Meesho's current guidelines.",
    primaryKeyword: "meesho product photos",
    intent: "Commercial investigation: how do I improve my Meesho listing photos without a studio?",
    h1: "Better Product Photos for Meesho Sellers, Without a Studio",
    intro:
      "If you sell on Meesho and shoot your own photos, you can use ShootPX to turn a phone photo into cleaner listing images, add colour variants from one photographed piece, and show garments on a model. Start with Listing Photoshoot for the main image and add Recolor or Model Shoot where they help. Always read Meesho's current image guidelines before uploading, because the rules belong to the marketplace, not to ShootPX.",
    sections: [
      {
        h2: "The problem most Meesho sellers face with photos",
        blocks: [
          p(
            "Many sellers photograph stock themselves, often in a rush, on a bed, floor or hanging rail. The result shows the product, but also the room. When a buyer scrolls through many similar items, a cluttered or dim photo looks less trustworthy than a tidy one, even when the product is the same.",
          ),
          p(
            "The other common problem is variety. One design may come in many colours, and photographing each takes time. Sellers end up showing one colour and listing the rest as text, which leaves buyers guessing.",
          ),
        ],
      },
      {
        h2: "A workflow that fits a busy seller",
        blocks: [
          ol(
            "Photograph the item flat or hanging against a plain wall, in daylight.",
            "Open Listing Photoshoot, upload the photo and describe a simple, neutral scene in a sentence.",
            "Generate at low settings first, review, then generate the version you want to use.",
            "For other colours, use Recolor on your best photo instead of shooting each one.",
            "For garments, try Model Shoot to show the item on a model.",
          ),
          p(
            "Files can be PNG, JPEG or WebP up to 10 MB each, so photos straight from a phone work. You can download single images or all results at once from the results panel.",
          ),
        ],
      },
      {
        h2: "Which tool for which listing image",
        blocks: [
          ul(
            "Main image: Listing Photoshoot, with a plain scene. Check the marketplace's rules for the main image first and reflect them in your prompt.",
            "Colour variants: Recolor. Pick the colour from the palette or a hex value and name the part to change, or let it detect the area.",
            "On-body view: Model Shoot for garments, with a preset or generated model.",
            "Extra lifestyle image: Creative Photoshoot, if you want a styled scene as a secondary image.",
          ),
        ],
      },
      {
        h2: "Before you upload, always check",
        blocks: [
          p(
            "Each marketplace sets its own rules for images, and they change. Read Meesho's current image guidelines and any category-specific guidance before you upload, and follow them for every image, whether it was photographed or generated. This page deliberately gives no marketplace size or format numbers, since they are not ours to state.",
          ),
          tip(
            "Compare every generated image with the real product for colour, print and shape. A listing image that oversells the product is the fastest route to returns.",
            "Accuracy first",
          ),
        ],
      },
      {
        h2: "Keeping cost sensible",
        blocks: [
          p(
            "Generation uses credits, and the cost depends on the settings. Test a look at low quality and 1K resolution, then raise the settings only for the images you will publish. The estimated cost is shown before you generate, so you can see the number first. Current plans are on the pricing section of the home page.",
          ),
        ],
      },
      {
        h2: "Build a repeatable habit instead of a one-off fix",
        blocks: [
          p(
            "The sellers who get the most from any image tool are the ones who turn it into a routine. Pick a fixed time for photographing new stock, use the same corner of the room and the same time of day, and process the photos in one sitting. When your source photos look alike, your generated images look alike, and a store of similar-looking products reads as one organised seller.",
          ),
          ul(
            "Photograph in daylight beside a window, with room lights off.",
            "Keep one plain surface or wall for every product.",
            "Write one short scene sentence and reuse it for the whole batch.",
            "Keep your original photos in a folder, so you can always compare a generated image with the real item.",
          ),
        ],
      },
      {
        h2: "Handling returns risk in your images",
        blocks: [
          p(
            "For fashion and home items, a mismatch between the photo and what arrives is a common reason a buyer sends something back. The safest habit is a two-minute check on every generated image: colour, print, neckline or shape, and any element that has been added. If it fails, generate again or use your own photograph for that slot.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "What file types can I upload from my phone?",
        a: "PNG, JPEG and WebP, up to 10 MB per file.",
      },
      {
        q: "Where do I find Meesho's image rules?",
        a: "In Meesho's own seller guidance. Check the current version before you upload, since it can change.",
      },
    ],
    related: ["listing-photoshoot", "recolor", "clothing-and-apparel", "product-photos-with-a-phone"],
    published: true,
    ...D,
  },
  {
    slug: "amazon-india-sellers",
    group: "for",
    title: "Product Images for Amazon India Sellers with AI",
    metaDescription:
      "How Amazon India sellers can plan a listing image set and use ShootPX for main, lifestyle and variant images while following Amazon's current guidelines.",
    primaryKeyword: "amazon india product images",
    intent: "Commercial investigation: how should I plan and produce a full image set for an Amazon India listing?",
    h1: "Planning Product Images for Amazon India Listings with AI",
    intro:
      "A marketplace listing usually carries several images rather than one, so an Amazon India seller needs a main image plus supporting ones that show use, scale and variants. ShootPX can help you produce each of those from your own product photos: Listing Photoshoot for the main-style image, Creative Photoshoot for lifestyle images and Recolor for variants. Check Amazon's current image requirements yourself before uploading, as ShootPX does not state marketplace specifications.",
    sections: [
      {
        h2: "Think in an image set, not a single photo",
        blocks: [
          p(
            "A buyer cannot handle the item, so the images have to do the handling. A good set answers the questions a shopper would ask in a shop: what does it look like clean, how big is it, how does it look in use, and what does it look like in each colour.",
          ),
          ul(
            "A clean primary image that follows the marketplace's main-image rules.",
            "Supporting images that show angles and details.",
            "Lifestyle images that show use.",
            "One image per colour or variant you sell.",
          ),
          p(
            "The shot list guide covers that set in more detail. Here the focus is how to produce each type with the tools.",
          ),
        ],
      },
      {
        h2: "Producing each image type with ShootPX",
        blocks: [
          ul(
            "Primary image: Listing Photoshoot. Describe the presentation your category calls for. Read Amazon's current main-image guidance first and confirm the result meets it before you upload.",
            "Lifestyle images: Creative Photoshoot. Choose an idea or describe a scene, and keep the scene consistent with what is in the box.",
            "Variant images: Recolor. Photograph one colour and generate the others, checking each against the real stock.",
            "Apparel: Model Shoot places garments on a model, with Top, Bottom and extra labelled slots.",
          ),
        ],
      },
      {
        h2: "Rules belong to the marketplace",
        blocks: [
          p(
            "Amazon publishes image requirements and updates them over time. ShootPX does not repeat them, because a copied number can quickly become wrong. Read the current help pages for your category, including anything on how the main image must look, and treat those as the standard every uploaded image must meet.",
          ),
          tip(
            "Write the rule you are following into your prompt where possible, then check the finished image against the rule rather than assuming the tool applied it.",
            "Verify, don't assume",
          ),
        ],
      },
      {
        h2: "Avoid the mistakes that hurt trust",
        blocks: [
          ol(
            "Do not let a lifestyle scene imply extra items or a larger size than the listing delivers.",
            "Match variant colours to real stock.",
            "Keep small text on the product, such as model names, checked against the real pack.",
            "Keep image style consistent across variants so the listing looks like one product.",
          ),
          p(
            "Generated images can differ from the real product in fine detail. A quick side-by-side with the item in your hand is the best safeguard, and it is cheap compared with a return.",
          ),
        ],
      },
      {
        h2: "Working through a catalog",
        blocks: [
          p(
            "ShootPX processes one generation at a time, so plan your work in order of importance. Do the main image for your best-selling items first, then lifestyle and variants. Test wording at low quality and settle on a wording you can reuse across products, so images look like they belong together.",
          ),
        ],
      },
      {
        h2: "A sensible order of work",
        blocks: [
          p(
            "If you have more products than time, do not try to finish everything at once. Rank your listings by how much you would gain from better images, and work down the list.",
          ),
          ol(
            "Products that already get views but few orders, because a better image can convert that traffic.",
            "New products about to launch, so they start with a full set.",
            "Products with many colours, where Recolor saves the most shooting.",
            "Everything else, once your wording and settings are settled.",
          ),
        ],
      },
      {
        h2: "Keep your originals",
        blocks: [
          p(
            "Store the untouched source photo for every product alongside the images you generate. If a marketplace later asks you to change an image, or you want to try a different scene, you start from the original rather than from an already generated picture. It also gives you a reference to compare against when you check a generated image for accuracy.",
          ),
          p(
            "Since only one generation runs at a time on your account, queue your work sensibly and review each result as it finishes, rather than waiting until the end of a long session to find that a setting needs changing.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does ShootPX apply Amazon's image rules for me?",
        a: "No. The tool generates images from your photo and your settings. You are responsible for checking the result against the marketplace's current guidelines.",
      },
    ],
    related: ["listing-photoshoot", "creative-photoshoot", "product-photo-shot-list", "white-background-product-photos"],
    published: true,
    ...D,
  },
  {
    slug: "instagram-sellers",
    group: "for",
    title: "Product Photos for Instagram Sellers, Made with AI",
    metaDescription:
      "How Instagram-first sellers can create styled product scenes and a consistent feed from one product photo with ShootPX, without a studio or a creator.",
    primaryKeyword: "instagram product photos for sellers",
    intent: "Commercial investigation: how do I get a consistent, attractive feed without a photographer?",
    h1: "Product Photos for Instagram Sellers: A Consistent Feed from Your Phone",
    intro:
      "If you sell through Instagram, your feed is your shop window, and ShootPX can help you fill it with styled product scenes made from your own phone photos. Creative Photoshoot is the main tool, with Model Shoot for garments and Recolor for colour variants. The trick is consistency: use the same kind of scene and light description across posts so the grid looks like one brand.",
    sections: [
      {
        h2: "What an Instagram seller needs from images",
        blocks: [
          p(
            "On a feed, a product photo has to earn attention in a second and hold a brand look across dozens of posts. A plain listing shot on a cluttered table does neither. A styled scene with clear light and a clear subject does both.",
          ),
          p(
            "You also need a steady supply. One good shoot does not fill a month of posts, but one product photo can become several different scenes.",
          ),
        ],
      },
      {
        h2: "Use Creative Photoshoot for the feed",
        blocks: [
          p(
            "Upload your product photo, then either choose an idea or describe the scene. For a feed, write descriptions that follow one visual rule, for example soft window light on a pale surface, with a single prop. When every post follows the same rule, the grid looks planned.",
          ),
          ul(
            "Pick an aspect ratio from the tool's shape grid that suits where the image will sit, such as the feed or a story.",
            "Keep resolution modest for testing and raise it for the final image.",
            "Use Enhance prompt, which is free, if your description feels short.",
          ),
        ],
      },
      {
        h2: "Show variety without a new shoot",
        blocks: [
          p(
            "A feed with the same angle every day gets dull. Vary the scene, not the product. One photo can appear on a stone ledge, a kitchen counter or a shelf. Recolor lets you show colour options as separate posts, and Model Shoot puts garments on a model for posts that show fit.",
          ),
          p(
            "Use the Send to option in the results panel to pass an image from one tool to another, for example from a Creative scene into Recolor.",
          ),
        ],
      },
      {
        h2: "Stay honest about the product",
        blocks: [
          tip(
            "A beautiful scene sells the mood, and the caption should still say exactly what the buyer gets: size, material, colours and what is in the box.",
            "Caption the facts",
          ),
          p(
            "Compare each generated image with the real item. If a colour, print or detail differs, generate again or use your own photograph. Followers who receive something that looks different from the post become complaints in your messages.",
          ),
        ],
      },
      {
        h2: "A weekly routine",
        blocks: [
          ol(
            "Photograph the week's products in one sitting, in daylight.",
            "Run each through Creative Photoshoot using your standard scene rule.",
            "Review against the real products and discard misses.",
            "Download the keepers and plan posts across the week.",
          ),
        ],
      },
      {
        h2: "Plan the grid, not just the post",
        blocks: [
          p(
            "On Instagram, people judge a shop from the grid before they read a single caption. Look at your last nine posts side by side. If the backgrounds, light and crop jump around, pick the two or three scenes that look best and make them your standard.",
          ),
          ul(
            "Choose one dominant colour or surface, and use it in most scenes.",
            "Alternate close product shots with wider lifestyle scenes so the grid has rhythm.",
            "Keep the product in a similar position in the frame across posts.",
            "Use the same aspect ratio for the same type of post.",
          ),
        ],
      },
      {
        h2: "Reels, stories and other formats",
        blocks: [
          p(
            "ShootPX generates still images. If you want to use them in stories or reels, download them and put them together in the editing app you already use. The aspect-ratio options in each tool let you choose a shape that suits vertical or square placement, so check the options on offer before you generate.",
          ),
          p(
            "Keep your captions specific: price, size, colours and how to order. The image earns the pause, and the caption closes the sale.",
          ),
        ],
      },
      {
        h2: "Reusing one photo for several posts",
        blocks: [
          p(
            "One product photo can give you a plain scene for a launch post, a warmer scene for a festival post and a colour-variant post from Recolor. Space them across weeks, so followers see the product several times without seeing the same image twice.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Which tool should an Instagram seller start with?",
        a: "Creative Photoshoot, since it builds styled scenes from a product photo. Add Recolor and Model Shoot when they fit your products.",
      },
    ],
    related: ["creative-photoshoot", "lifestyle-vs-studio-product-images", "model-shoot", "festive-season-product-photography-plan"],
    published: true,
    ...D,
  },
  {
    slug: "shopify-stores",
    group: "for",
    title: "Product Photos for Shopify Stores, Made with AI",
    metaDescription:
      "How Shopify store owners can use ShootPX to build consistent product pages: clean listing images, lifestyle scenes and colour variants from one photo.",
    primaryKeyword: "shopify product photos",
    intent: "Commercial investigation: how do I produce a consistent set of images for my own storefront?",
    h1: "Product Photos for Shopify Stores: A Consistent Look Across Your Pages",
    intro:
      "On your own Shopify store you control the look of every product page, which makes consistency the main photography goal. ShootPX can generate listing images, lifestyle scenes and colour variants from one photo per product, so pages share a style without a studio. Use Listing Photoshoot for the core images and Creative Photoshoot for story images, then download and add them to your product pages as usual.",
    sections: [
      {
        h2: "Why a store needs a system, not just good photos",
        blocks: [
          p(
            "A marketplace puts your product among others. A store puts it alone, so any mismatch shows: different backgrounds, different crops, different light. Buyers read that as an unorganised brand. A repeatable approach fixes it more effectively than any single great photograph.",
          ),
        ],
      },
      {
        h2: "Build a house style",
        blocks: [
          ul(
            "Choose one background description for product-only images and reuse it word for word.",
            "Choose one lifestyle mood, such as soft daylight on a pale surface, for supporting images.",
            "Use the same aspect ratio across a collection so grids line up.",
            "Use the same resolution for the images you publish.",
          ),
          p(
            "Write these rules down once and paste the same wording into the prompt for every product. That is the cheapest way to make a catalog look designed.",
          ),
        ],
      },
      {
        h2: "Tools for each part of a product page",
        blocks: [
          ul(
            "Hero image: Listing Photoshoot, with your house background.",
            "Story images: Creative Photoshoot, with your house mood.",
            "Variant swatches or images: Recolor, from one photographed colour.",
            "Apparel on body: Model Shoot with a chosen model.",
          ),
          p(
            "Download the images from the results panel and upload them to your store yourself. ShootPX does not connect to your store automatically.",
          ),
        ],
      },
      {
        h2: "Check before you publish",
        blocks: [
          tip(
            "Open the generated image next to the real product and check colour, shape and any text. Your own store has no marketplace reviewing images for you, so the check is yours to do.",
            "Your store, your check",
          ),
          p(
            "Also keep accurate dimensions, materials and care details in the product text so buyers can confirm what the images suggest.",
          ),
        ],
      },
      {
        h2: "Names and files that keep a store tidy",
        blocks: [
          p(
            "Once you have many generated images, you will spend more time finding files than making them. Name each download with the product, the view and the version, and keep a folder per product with the original photo next to the finished images. When you replace a product's images later, you know exactly which file to swap.",
          ),
          ul(
            "Keep the original source photo in every product folder.",
            "Keep the scene sentence you used in a text file beside the images.",
            "Record the resolution and aspect ratio you chose, so a future image matches.",
          ),
        ],
      },
      {
        h2: "Product pages need words as well as images",
        blocks: [
          p(
            "A styled image sells the mood, and the text answers practical questions. Put real dimensions, materials and care details in the description, and make sure the images and the text agree. If a scene includes a prop, say in the description that it is not included.",
          ),
          p(
            "Look at each finished product page on a phone. Most store visitors browse on one, and it is the fastest way to see whether your first image is clear and your gallery is in a sensible order.",
          ),
        ],
      },
      {
        h2: "Where to start",
        blocks: [
          ol(
            "Pick your five most important products.",
            "Write your house background sentence and house mood sentence.",
            "Run those products through Listing Photoshoot with the house background.",
            "Add one Creative Photoshoot scene each.",
            "Review the pages on a phone, then extend the approach to the rest of the catalog.",
          ),
        ],
      },
      {
        h2: "Where each image type sits on the page",
        blocks: [
          p(
            "Many storefront themes show one large image with a row of thumbnails beneath or beside it. That makes the first image and the order of the rest important, and it is worth previewing your theme with real products before you decide on an order.",
          ),
          ul(
            "First image: the clean product-only shot, at the aspect ratio your theme displays best.",
            "Second and third: an angle or detail view, so the gallery answers what the back looks like.",
            "Fourth: a lifestyle scene that shows use and scale.",
            "Last: variants or size charts, if your theme does not handle them elsewhere.",
          ),
          p(
            "Since themes differ in how they crop, check how your chosen aspect ratio looks in the gallery and on collection pages before you generate the whole catalog.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does ShootPX publish images to Shopify?",
        a: "No. You download the images and add them to your store yourself.",
      },
    ],
    related: ["listing-photoshoot", "consistent-product-images-across-catalog", "creative-photoshoot", "recolor"],
    published: false,
    ...D,
  },
];
