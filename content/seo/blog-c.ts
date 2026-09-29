import type { SeoPage } from "./types";
import { ol, p, tip, ul } from "./blocks";

const D = { publishedAt: "2026-09-21", updatedAt: "2026-09-21", published: false } as const;

export const blogPagesC: SeoPage[] = [
  {
    slug: "clothing-photography-flat-lay-mannequin-model",
    group: "blog",
    title: "Flat Lay vs Mannequin vs Model: Clothing Photography",
    metaDescription:
      "Flat lay, mannequin or model? Compare the three ways to photograph clothing on what buyers learn, what each needs to shoot and when to pick each.",
    primaryKeyword: "flat lay vs mannequin vs model photography",
    intent: "Decision: which format should I use to photograph my garments?",
    h1: "Clothing Photography: Flat Lay vs Mannequin vs Model",
    intro:
      "Flat lay shows a garment's design and details clearly and is the easiest to shoot, a mannequin shows shape and drape, and a model shows fit, movement and how the garment looks on a real body. Most clothing listings work best with a flat or hanging main image plus at least one image that shows the garment worn. This guide compares the three so you can choose based on the garment, the price and the effort you can spend.",
    sections: [
      {
        h2: "Flat lay: the simplest option",
        blocks: [
          p(
            "In a flat lay, the garment lies flat on a plain surface and you shoot from directly above. It needs a surface, daylight and a bit of patience with creases and folds.",
          ),
          ul(
            "Best at: showing the design, print, colour and construction clearly.",
            "Weak at: fit and drape. A flat garment does not show how it hangs.",
            "Watch for: wrinkles, uneven sleeves, a crooked collar and shadows from your phone.",
          ),
          tip(
            "Smooth the garment with your hands, tuck the sleeves into a neat shape and stuff tissue paper into collars and shoulders so they hold form.",
            "Flat lay tip",
          ),
        ],
      },
      {
        h2: "Mannequin: shape without a person",
        blocks: [
          p(
            "A mannequin gives the garment a body shape, so buyers see how it drapes and where it sits. It needs a mannequin, some pinning at the back and space to shoot from a slight distance.",
          ),
          ul(
            "Best at: showing shape, length and structure such as a structured jacket.",
            "Weak at: showing how it moves or how it fits different bodies.",
            "Watch for: visible pins, a shape that flatters unrealistically and a mannequin that is a different size from your size chart.",
          ),
        ],
      },
      {
        h2: "Model: the closest to real life",
        blocks: [
          p(
            "A live model shows fit, movement and proportion, and helps buyers imagine themselves in the garment. It needs a person, a location or backdrop, and time.",
          ),
          ul(
            "Best at: fit, styling and mood.",
            "Weak at: cost and effort, and at showing accurate colour if the light varies.",
            "Watch for: the model's size compared with your size range, styling that hides the garment and light that shifts colour.",
          ),
        ],
      },
      {
        h2: "How to choose",
        blocks: [
          ol(
            "Start with the garment. Structured or embellished pieces benefit from a model or mannequin. Simple T-shirts often do fine with a flat lay plus one worn image.",
            "Consider the price. Higher-priced items justify more effort on worn images.",
            "Consider the buyer's question. If fit is the concern, show it worn. If design is the concern, show it flat.",
            "Consider your capacity. Do what you can do consistently across the catalog.",
          ),
        ],
      },
      {
        h2: "Getting worn images without a live shoot",
        blocks: [
          p(
            "If arranging models is the obstacle, ShootPX Model Shoot generates on-model images from garment photos. You choose a preset model, generate one from attributes or upload one, add the garment photos, and generate. You can supply several angles per garment, and a Top and Bottom slot for outfits. Compare each result with the real garment, especially neckline, sleeve length, print and colour, because the image should not promise a fit or finish the garment lacks.",
          ),
        ],
      },
      {
        h2: "Mixing formats in one listing",
        blocks: [
          p(
            "A workable combination is a flat or hanging image first for clarity, a worn image second for fit, a detail close-up third, and a size or fabric image last. Keep light and background consistent across them so they look like the same garment. For the full image list, see the product photo shot list guide.",
          ),
        ],
      },
      {
        h2: "What each format needs from you",
        blocks: [
          ul(
            "Flat lay: a plain surface, daylight, tissue paper for shaping and a way to shoot from above, such as a stack of books or a small stand.",
            "Mannequin: the mannequin itself, pins or clips for the back, and enough room to step back.",
            "Live model: a person, a plain wall or backdrop, time for several poses and a plan for how you will show the size you sell.",
            "Generated on-model images: clear photos of the garment from a few angles, plus a decision about which model best represents your customer.",
          ),
        ],
      },
      {
        h2: "Mistakes that hurt clothing photos in any format",
        blocks: [
          ul(
            "Creases and ironing marks that suggest poor quality.",
            "Colour that shifts between images, because the light changed between shots.",
            "Cropping that cuts off the hem or sleeve, so buyers cannot judge length.",
            "Missing the back view for garments with a back detail.",
            "Showing a fit that flatters more than the garment actually does.",
          ),
          p(
            "Fixing these costs nothing but attention, and each fix reduces the chance of a return.",
          ),
        ],
      },
      {
        h2: "Ethnic wear, layered outfits and other tricky garments",
        blocks: [
          p(
            "Garments with drape, layers or long lengths, such as sarees, dupattas and lehengas, are hard to show flat, because the way they fall is part of the design. For these, a worn image matters more, and detail close-ups of borders, embroidery and fabric add proof. If you plan to use generated on-model images, check the fall of the fabric, the placement of the border and the length carefully, since these are the parts a buyer will study.",
          ),
        ],
      },
      {
        h2: "Questions to ask before you pick a format",
        blocks: [
          p(
            "Before you commit to a format for the whole catalog, run one garment through each format you are considering and look at the three results together on a phone. Ask which one answers the buyer's likely questions fastest, which you can repeat reliably across hundreds of garments, and which best shows the parts of the design you are proudest of. The right format is usually the one you can keep doing consistently, not the most impressive one you can manage once.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Is a flat lay enough for a clothing listing?",
        a: "It can be, but many buyers want to see the garment worn. Adding at least one worn image usually answers fit questions a flat lay cannot.",
      },
    ],
    related: ["model-shoot", "clothing-and-apparel", "product-photo-shot-list", "recolor"],
    ...D,
  },
  {
    slug: "festive-season-product-photography-plan",
    group: "blog",
    title: "Plan Product Photography for Festive-Season Sales",
    metaDescription:
      "A practical plan for festive-season product photography: what to shoot, when to start, how to theme images and how to avoid last-minute rushes.",
    primaryKeyword: "festive season product photography",
    intent: "Planning: how do I prepare images for festive-season selling without a last-minute scramble?",
    h1: "How to Plan Product Photography for Festive-Season Sales",
    intro:
      "The best festive-season photography plan is to work backwards from your listing go-live date: decide which products matter most, shoot clear base photos early, then add festive-themed scenes and variants on top. Do the boring, essential images first and the themed extras second, so a late change never leaves you without a usable main image. This guide gives you a timeline structure and a checklist you can adapt to your own calendar.",
    sections: [
      {
        h2: "Work backwards from the go-live date",
        blocks: [
          p(
            "Pick the date you want festive listings live. Then subtract the time each stage takes, plus a buffer for problems. You know your own catalog size and how fast you work, so set your own timings rather than borrowing anyone else's.",
          ),
          ol(
            "Go-live date for festive listings.",
            "Upload and check date, when images are added and reviewed.",
            "Image finishing date, for downloads, checks and fixes.",
            "Base photo date, for shooting clear source photos of every product.",
            "Planning date, when you choose which products to feature and which images each needs.",
          ),
        ],
      },
      {
        h2: "Decide which products to feature",
        blocks: [
          p(
            "You cannot refresh every listing. Choose the products that fit festive buying, such as gifts, clothing, decor and accessories, and among them the ones you sold well before. Give those the full image set and leave the rest with clean base images.",
          ),
        ],
      },
      {
        h2: "Shoot clear base photos first",
        blocks: [
          p(
            "Everything else builds on a sharp, evenly lit photo of each product, so shoot those before anything themed. Follow the phone photography guide for light and background, and take front, back and detail views. Once base photos exist, generation tools and edits can use them to create the festive variants without another shoot.",
          ),
        ],
      },
      {
        h2: "Add festive scenes on top",
        blocks: [
          p(
            "With base photos ready, create themed images. ShootPX Creative Photoshoot lets you describe a scene in your own words, so you can ask for a warm evening glow, a diya on a wooden shelf or a gift-wrapped table setting behind the product. Keep scenes tasteful and relevant to the product, and make sure props do not imply items that are not included.",
          ),
          ul(
            "Use one consistent style for the whole festive collection so it looks planned.",
            "Keep the product the clear subject and the theme in the background.",
            "Test scene wording at low settings, then generate final images at the quality you need.",
          ),
          tip(
            "Save the best-performing scene wording. It gives you a starting point for the next season.",
            "Reuse what worked",
          ),
        ],
      },
      {
        h2: "Colour variants and gifting sets",
        blocks: [
          p(
            "If products come in colours, show the ones likely to be popular for the occasion. Recolor can generate colours from one photo, but compare each with real stock. For gifting, show what is included, and make sure images and text agree on the contents.",
          ),
        ],
      },
      {
        h2: "Check before you publish",
        blocks: [
          ul(
            "Colour and detail match the real product.",
            "Scenes do not imply extra items, larger sizes or a different material.",
            "Images follow the marketplace's current guidelines, which you should re-read before a large upload.",
            "Image files are named and organised so you can find them in the rush.",
          ),
        ],
      },
      {
        h2: "After the season",
        blocks: [
          p(
            "Note which images you used and which listings responded, so next year you start with evidence. Keep the base photos, because they are the raw material for every future refresh.",
          ),
        ],
      },
      {
        h2: "A checklist to adapt",
        blocks: [
          ol(
            "Choose the products to feature and write them down.",
            "Set your go-live date and work backwards for each stage.",
            "Shoot base photos of every featured product.",
            "Write two or three festive scene sentences and test them on one product.",
            "Generate the final images at the quality you need.",
            "Compare each image with the real item and the marketplace's current guidelines.",
            "Name and organise the files.",
            "Upload, then check each listing on a phone.",
          ),
        ],
      },
      {
        h2: "Avoiding the last-week rush",
        blocks: [
          p(
            "The rush usually comes from doing too much at the last minute: new shoots, new scenes and new variants all crowded into the final days. Protect yourself by finishing the essential images, meaning the clean main image and detail views, before adding themed extras. If time runs out, you still have listings that work, and the themed images are a bonus rather than a dependency.",
          ),
          p(
            "Also keep in mind that only one generation runs at a time on your account, so spread your generating across days rather than leaving it all to one afternoon, and leave room for regenerating images that do not pass your checks.",
          ),
        ],
      },
      {
        h2: "Themes that stay honest",
        blocks: [
          p(
            "Festive imagery is easy to overdo. A tasteful hint of the occasion, such as warm light, a plain textile or a small lamp in the background, sells the mood without hiding the product. Avoid crowded scenes with props that a buyer might assume are included, and avoid claims about the product that the scene alone would suggest, such as a gift box you are not supplying.",
          ),
        ],
      },
      {
        h2: "Repurpose the same images across channels",
        blocks: [
          p(
            "A festive image set can do several jobs. The clean main image goes on the listing, the styled scenes go on social media, and a colour or gift variant can become a separate post. Plan the channels before you generate, so you choose aspect ratios that suit each one and avoid regenerating the same scene in a different shape later.",
          ),
        ],
      },
      {
        h2: "Budget your credits and time together",
        blocks: [
          p(
            "Generation costs credits, and the cost rises with quality, resolution and the number of images. Before the season starts, estimate how many final images you need and add an allowance for tests and rejects. Buy or plan credits for that total in advance, so you are not stopped by a low balance in the middle of a rush. The studio shows the cost before each generation, so you can adjust a setting when the number is more than you planned to spend.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "When should I start?",
        a: "Work backwards from your own go-live date. Allow time for shooting, generating, checking and a buffer for fixes.",
      },
    ],
    related: ["creative-photoshoot", "instagram-sellers", "product-photo-shot-list", "jewellery-photography"],
    ...D,
  },
  {
    slug: "consistent-product-images-across-catalog",
    group: "blog",
    title: "How to Keep Product Images Consistent Across a Catalog",
    metaDescription:
      "How to make a whole catalog look like one brand: a simple style guide for background, light, crop and colour, plus habits that keep images consistent.",
    primaryKeyword: "consistent product images catalog",
    intent: "How-to: my catalog looks patchy; how do I make images consistent?",
    h1: "How to Keep Product Images Consistent Across Your Catalog",
    intro:
      "To keep product images consistent, write a one-page style guide covering background, light direction, crop, aspect ratio and colour, and then follow it for every product in the same session where possible. Consistency makes a catalog look professional and helps buyers compare items. This guide shows what to put in the style guide and how to apply it when you shoot and when you use generation tools.",
    sections: [
      {
        h2: "What consistency actually means",
        blocks: [
          p(
            "It does not mean every image is identical. It means the things a buyer notices across products match: background, framing, light, image shape and overall mood. When those match, a catalog looks like one brand, even with different products.",
          ),
        ],
      },
      {
        h2: "Write a one-page style guide",
        blocks: [
          ul(
            "Background: the colour and surface used for product-only images.",
            "Framing: how much space around the product, and where it sits in the frame.",
            "Light: the direction the light comes from and how soft it is.",
            "Aspect ratio: one shape for main images and one for supporting images.",
            "Mood for lifestyle images: two or three words, such as calm, warm and minimal.",
            "Colour handling: no heavy filters, and a rule to match the real product.",
          ),
        ],
      },
      {
        h2: "Shoot in batches",
        blocks: [
          p(
            "Consistency is easiest when you shoot all products in one session with one setup. Mark the position of the table, the light and the reflector, and note the time of day. If you must shoot across several days, repeat the same setup and time.",
          ),
        ],
      },
      {
        h2: "Consistency when you use generation tools",
        blocks: [
          p(
            "With ShootPX, the settings you control are the levers of consistency. Use the same aspect ratio, resolution and quality for all published images, and reuse the same scene wording in the prompt. If you write a scene as a sentence once and paste it for every product, the results share a look. Keep source photos consistent too, since the tool starts from them.",
          ),
          tip(
            "Keep a document with your standard scene sentences. Copy from it instead of rewriting each time, because small wording changes produce noticeably different scenes.",
            "Keep a prompt bank",
          ),
        ],
      },
      {
        h2: "Handle colour variants carefully",
        blocks: [
          p(
            "Variants of one product should look identical apart from colour. Photograph one colour, and use Recolor for the others so framing and light stay the same. Check each recoloured image against the real stock, since consistency should never override accuracy.",
          ),
        ],
      },
      {
        h2: "Audit and fix",
        blocks: [
          ol(
            "Put ten product images side by side on one screen.",
            "Mark the ones that stand out as different in background, crop or light.",
            "Fix those first, either by reshooting or by regenerating with the standard wording.",
            "Repeat monthly for new products.",
          ),
        ],
      },
      {
        h2: "When to break the rules",
        blocks: [
          p(
            "Some products need different treatment, such as a large item that needs a room scene. That is fine. Keep the rules for the elements that should match, and vary the rest deliberately, not by accident.",
          ),
        ],
      },
      {
        h2: "A sample style guide to copy",
        blocks: [
          p(
            "Here is the shape of a one-page style guide. Fill it in with your own choices.",
          ),
          ul(
            "Background for product-only images: ____ (colour and surface)",
            "Space around the product: ____ (tight, medium or roomy)",
            "Light direction: ____ (from the left, from the right, from above)",
            "Aspect ratio for main images: ____ and for supporting images: ____",
            "Lifestyle mood in three words: ____",
            "Resolution and quality we publish at: ____",
            "Things we never do: ____ (heavy filters, props that suggest extras)",
          ),
          p(
            "Pin the finished page where you work, and share it with anyone who shoots or edits for you. A guide that only you know cannot keep other people's work consistent.",
          ),
        ],
      },
      {
        h2: "Consistency across marketplaces and your own store",
        blocks: [
          p(
            "If you sell in several places, keep the core look the same everywhere, and adjust only where a marketplace's own image guidelines require it. Check those guidelines for each one, since they differ and change. Keeping the original source photo and your scene wording makes it easy to produce a variant for each place without starting over.",
          ),
        ],
      },
      {
        h2: "New products, old style",
        blocks: [
          p(
            "The real test of a style guide is the next product you add. When a new item arrives, shoot it in the same setup and process it with the same wording and settings. If you find you cannot match the look, either the guide is too vague or the setup has drifted, and it is worth fixing before the catalog grows further.",
          ),
        ],
      },
      {
        h2: "Consistency for teams and helpers",
        blocks: [
          p(
            "If more than one person takes photos or generates images, write down the exact wording and settings instead of relying on memory. Give helpers a sample image that shows the standard and a list of what to avoid. Ask them to send the original photo with each finished image so you can review both together. A five-minute check by the person who owns the style guide keeps drift out of the catalog.",
          ),
          p(
            "Review a random handful of products every couple of weeks. It is quicker to correct a small drift early than to redo dozens of images after it has spread across the catalog.",
          ),
        ],
      },
      {
        h2: "Signs your catalog has drifted",
        blocks: [
          ul(
            "Backgrounds that range from cream to grey to white across similar products.",
            "Some images tightly cropped and others with wide margins.",
            "Light that comes from different directions on products displayed side by side.",
            "A mixture of aspect ratios in one collection grid.",
            "Colour treatment that makes similar items look different in warmth or contrast.",
          ),
          p(
            "If you see two or more of these in a single collection, the fix is usually to pick the version you like best, write down what makes it that way and redo the outliers.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a designer for a style guide?",
        a: "No. A short list of decisions about background, light, framing, shape and mood is enough.",
      },
    ],
    related: ["listing-photoshoot", "shopify-stores", "product-photo-shot-list", "recolor"],
    ...D,
  },
  {
    slug: "show-colour-variants-without-reshooting",
    group: "blog",
    title: "Showing Colour Variants Without Reshooting Every One",
    metaDescription:
      "Show every colour of a product without shooting each one: photograph one, recolour with care and check colours against real stock first.",
    primaryKeyword: "product colour variants images",
    intent: "How-to: I sell many colours and cannot shoot each; what is a sensible way to show them?",
    h1: "Showing Colour Variants Without Reshooting Every One",
    intro:
      "You can show colour variants without reshooting each one by photographing your best colour carefully and generating the others from that photo, then checking every result against the real stock. This works well for items where colour is the only difference, such as plain garments, bags or covers. This guide explains the method, the limits and the checks that keep colour images honest.",
    sections: [
      {
        h2: "When this approach works",
        blocks: [
          p(
            "It works best when variants share the same shape, material and finish, and differ only in colour. It is less reliable when the colour changes the look of the material, such as glossy against matte, or when a variant has a different print or pattern.",
          ),
        ],
      },
      {
        h2: "Photograph the base variant well",
        blocks: [
          p(
            "Choose the colour that photographs best, often a mid-tone, and shoot it carefully: sharp, evenly lit, whole item in frame. Every generated variant inherits the framing, light and detail of this photo, so it is worth taking your time.",
          ),
        ],
      },
      {
        h2: "Recolor step by step",
        blocks: [
          ol(
            "Open ShootPX Recolor and upload the base photo.",
            "Open the colour field and choose the target colour from the palette, or type a hex value that matches your real product as closely as you can.",
            "In the text field, name the part to change, such as the shirt, or leave it blank to let the tool detect the area.",
            "Pick a resolution and check the credit cost shown.",
            "Generate, review, and repeat for each colour.",
          ),
          p(
            "The colour picker starts on a bright lime default, so change it before you generate.",
          ),
        ],
      },
      {
        h2: "Check every colour against real stock",
        blocks: [
          p(
            "A generated colour is an illustration, not a swatch. Screens differ, and the tool may not land exactly on the hex you typed. Hold the real item next to the screen in daylight and compare.",
          ),
          ul(
            "If the shade is close, publish and consider a line in the listing saying colours can vary slightly on screen.",
            "If it is off, adjust the hex and regenerate.",
            "If it is still off, or if the item has a print, stripes or a pattern that changed, photograph that variant for real.",
          ),
          tip(
            "Dark shades, whites and prints are where colour goes wrong most often. Give those variants extra scrutiny.",
            "Where errors hide",
          ),
        ],
      },
      {
        h2: "Keep the set consistent",
        blocks: [
          p(
            "Because every variant comes from the same photo, framing and light match, which makes the set look tidy. Use the same file naming and order so listings show variants in a predictable sequence.",
          ),
        ],
      },
      {
        h2: "Be upfront in the listing",
        blocks: [
          p(
            "Put the colour name in the listing text and image order in step with the variant selector. If a colour image is illustrative and you cannot confirm it, do not present it as an exact match. Buyers accept small shade differences when you are honest about them, and resent them when you are not.",
          ),
        ],
      },
      {
        h2: "Deciding which variants to show",
        blocks: [
          p(
            "If a product comes in many colours, you do not have to show them all as full images. Show the best sellers as full images and the rest as swatches or in a colour row in the listing text. Focus your effort on the colours buyers are most likely to choose, and use your own photograph for any colour where accuracy matters most.",
          ),
          ul(
            "Best-selling colours: full image, checked against real stock.",
            "Slow colours: a generated image, or a swatch if you are unsure of the match.",
            "Colours where the shade is subtle, such as off-whites and beiges: real photographs, since small differences are hard to judge on screen.",
          ),
        ],
      },
      {
        h2: "Naming and ordering",
        blocks: [
          p(
            "Buyers pick colours by name and by image, so make the two agree. Use the same colour name in the listing, the file name and the variant selector. Order the images in the same sequence as the variants, and keep the base colour first so the listing opens with your best photograph.",
          ),
        ],
      },
      {
        h2: "When to reshoot instead",
        blocks: [
          p(
            "Reshoot when the colour changes the character of the item. A glossy red and a matte black may reflect light differently, and a printed variant is a different design, not a recolour. If a returned order mentions colour, take that as a signal to replace the generated image with a real photo.",
          ),
        ],
      },
      {
        h2: "A small worked routine",
        blocks: [
          ol(
            "Photograph the base colour and keep the original file.",
            "List every other colour with the hex value that best matches the real product.",
            "Generate the two most different colours first, such as the lightest and the darkest.",
            "Compare those two with real stock. If they pass, generate the rest. If not, fix your hex values or photograph those colours.",
            "Name the files with the colour name, and order them to match the listing's colour selector.",
          ),
          p(
            "Starting with the two extremes tells you quickly whether the approach suits this product, before you spend credits on the full range.",
          ),
        ],
      },
      {
        h2: "Mistakes to avoid with colour variants",
        blocks: [
          ul(
            "Typing a hex value from memory instead of matching it to the real product.",
            "Publishing every colour without checking the darkest and lightest ones first.",
            "Recolouring a product that has a print, stripes or contrast stitching without inspecting the details.",
            "Using different framing for different colours, which makes the set look untidy.",
            "Hiding the fact that colours on screen may differ slightly from the item.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to name the part to recolour?",
        a: "No, the tool can detect it automatically. Naming the part helps when the photo contains several items.",
      },
      {
        q: "Can I recolour a product that has a print or stripes?",
        a: "You can try, but inspect the result closely. Prints, stripes and contrast stitching are where small errors show, so use a real photograph if the recoloured version does not match the design.",
      },
    ],
    related: ["recolor", "consistent-product-images-across-catalog", "clothing-and-apparel", "product-image-mistakes-that-cost-sales"],
    ...D,
  },
];
