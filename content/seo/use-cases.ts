import type { SeoPage } from "./types";
import { ol, p, tip, ul } from "./blocks";

const D = { publishedAt: "2026-09-21", updatedAt: "2026-09-21" } as const;

export const useCasePages: SeoPage[] = [
  {
    slug: "jewellery-photography",
    group: "use-cases",
    title: "Jewellery Product Photography with AI: A Seller Guide",
    metaDescription:
      "How Indian jewellery sellers can use AI product photography for listings and social posts, and where to double-check details like stones and engraving.",
    primaryKeyword: "jewellery product photography",
    intent: "Commercial investigation: can AI product photos work for my jewellery catalog, and what should I watch for?",
    h1: "Jewellery Product Photography with AI: What Works and What to Check",
    intro:
      "AI product photography can work for jewellery if you start with a clean, sharp photo of each piece and check the generated result closely against the real item. It is useful for producing consistent listing images and styled scenes, and it is risky wherever a buyer relies on fine detail, such as stone settings, engraving or the exact tone of the metal. This page explains how to use ShootPX for jewellery and where a human check matters most.",
    sections: [
      {
        h2: "Why jewellery is harder to photograph than most products",
        blocks: [
          p(
            "Jewellery is small, reflective and detailed. Polished metal mirrors everything around it, stones pick up light unevenly, and a slightly wrong angle can flatten a piece that looks striking in person. That is why sellers often struggle to get a phone photo that does the item justice, and why a poor photo can cost an order even when the piece itself is beautiful.",
          ),
          p(
            "The two problems sellers describe most are glare on metal and a cluttered background that competes with a small item. The first is a shooting problem you solve before you upload anything, and the second is exactly what a generation tool can help with.",
          ),
        ],
      },
      {
        h2: "Start with the best input you can take",
        blocks: [
          p(
            "The generated image can only be as accurate as the photo it learns from. For jewellery, that means a sharp photo, the whole piece in frame, and lighting that shows the stones and metal without strong reflections. If glare is spoiling your source photos, the guide on photographing jewellery without glare walks through simple fixes such as diffusing the light and changing your angle.",
          ),
          ul(
            "Photograph each piece on a plain, neutral surface so the edges are easy to see.",
            "Fill the frame with the piece, but keep every part of it visible, including clasps, hooks or backs.",
            "Keep the phone steady, and tap to focus on the piece itself, not on the surface.",
            "Take a second photo from a different angle for pieces with a distinctive side or back.",
          ),
          p(
            "PNG, JPEG and WebP files up to 10 MB each are accepted, so a phone photo saved at normal quality is fine.",
          ),
        ],
      },
      {
        h2: "Which ShootPX tool fits which jewellery job",
        blocks: [
          p("The four live tools do different jobs, and only some suit jewellery."),
          ul(
            "Listing Photoshoot is the everyday choice. Describe a simple, quiet scene, such as a soft neutral surface with gentle light, and generate listing images that keep your catalog looking consistent.",
            "Creative Photoshoot suits campaign-style images: a piece on a marble-like surface, or a scene with a fabric or petals nearby. Use it for social posts and story pages more than for the main listing image.",
            "Model Shoot is built around garments and accessories on a model, and it lets you label extra slots such as watch or bag. Check the result carefully before using it for necklaces, earrings or other pieces, because how a small item sits on a person is easy to get wrong.",
            "Recolor can help with a single change, such as showing a strap or a plated finish in another colour, but treat metal tones with extra care. Compare the result with the real finish.",
          ),
        ],
      },
      {
        h2: "The checks that protect you from returns and complaints",
        blocks: [
          p(
            "With jewellery, buyers scrutinise details. Before you publish any generated image, go through a short checklist with the physical piece in your hand.",
          ),
          ol(
            "Count the stones and check their placement against the real piece.",
            "Look at the shape of the clasp, hooks, pendant bail or ear back.",
            "Read any engraving or text. If it is unreadable or altered, do not use that image.",
            "Compare the metal tone. Gold, rose gold and silver tones can shift.",
            "Check proportions. A pendant should not look bigger or smaller than it is.",
            "Look at the scene. Nothing in it should suggest a size, weight or included item that does not match the product.",
          ),
          tip(
            "If a generated image fails one check, do not fix it in your head. Generate again, or use your own photograph for that piece.",
            "Rule of thumb",
          ),
        ],
      },
      {
        h2: "A practical workflow for a jewellery catalog",
        blocks: [
          ol(
            "Photograph every piece the same way, with the same surface and light, so your inputs are consistent.",
            "Run one piece through Listing Photoshoot at a low setting to settle on wording for the scene.",
            "Reuse that wording across the rest of the catalog and generate at the quality you plan to publish.",
            "Review every image against the real piece with the checklist above.",
            "Keep your own untouched photograph as a backup for each piece, so you can swap it in when a generated image does not pass.",
          ),
          p(
            "Consistency is the real advantage here. A catalog where every piece sits in the same style of scene looks more organised and trustworthy than one built from mismatched phone photos, and a single prompt reused across pieces gives you that without a studio.",
          ),
        ],
      },
      {
        h2: "Images that go beyond the listing",
        blocks: [
          p(
            "Once your listing images are done, the same source photo can feed social posts. A Creative Photoshoot scene that suits a festival mood, a gifting theme or a minimal flat lay gives you content for Instagram without another shoot. For ideas on timing this around the calendar, see the guide to planning product photography for festive-season sales.",
          ),
          p(
            "Keep the story honest. If a scene shows a piece with a flower or a fabric, the listing text should still describe exactly what is in the box, so the image sells the mood and the text sets expectations.",
          ),
        ],
      },
      {
        h2: "Where AI is not the right answer for jewellery",
        blocks: [
          p(
            "If you sell high-value pieces where a buyer will study the craftsmanship, invest in real photographs for the main listing image, ideally macro shots that show the work. Generated images are then a supplement for secondary slots, not a substitute. If you sell fashion jewellery or lower-value items in volume, generation is a more comfortable fit, provided you keep to the checks above.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Will AI images show my stones and engraving accurately?",
        a: "Not reliably. Small details can change in generated images, so compare every result with the real piece and use your own photo when a detail is wrong.",
      },
      {
        q: "Which ShootPX tool should I try first for jewellery?",
        a: "Listing Photoshoot, with a simple, quiet scene description. It is the least risky way to see how your pieces come out.",
      },
    ],
    related: ["photograph-jewellery-without-glare", "listing-photoshoot", "creative-photoshoot", "instagram-sellers"],
    published: true,
    ...D,
  },
  {
    slug: "clothing-and-apparel",
    group: "use-cases",
    title: "AI Photos for Clothing and Apparel Sellers",
    metaDescription:
      "How clothing sellers can use ShootPX for product shots, colour variants and on-model images, plus the checks to run before you publish.",
    primaryKeyword: "clothing product photography",
    intent: "Commercial investigation: how can I get listing and on-model images for my garments without a shoot?",
    h1: "AI Product Photos for Clothing and Apparel Sellers",
    intro:
      "Clothing sellers can use ShootPX to turn garment photos into listing images, colour variants and on-model shots, using three of its four tools: Listing Photoshoot, Recolor and Model Shoot. Apparel is the category the tools handle most directly, because Model Shoot is built around garments. This page walks through a workable process from a rack of stock to a set of images, and the checks a clothing seller should never skip.",
    sections: [
      {
        h2: "The three images most garments need",
        blocks: [
          p(
            "A garment listing usually works best with a clear product-only shot, a view that shows how it fits on a body, and a view that shows a detail such as fabric or print. ShootPX covers the first two directly and helps with the third only if you supply a close photo of the detail.",
          ),
          ul(
            "Product-only shot: Listing Photoshoot, from a flat or hanging photo.",
            "On-body shot: Model Shoot, with a preset, generated or uploaded model.",
            "Colour range: Recolor, from one photographed colour.",
          ),
        ],
      },
      {
        h2: "Taking the source photo",
        blocks: [
          p(
            "Lay the garment flat on a plain surface or hang it against a plain wall. Smooth out creases, because a generated image tends to inherit them. Keep the whole garment in the frame with a little space around it, and shoot in soft light, such as beside a window during the day, so colour reads truthfully.",
          ),
          p(
            "For Model Shoot, more angles help. The tool suggests front, back, side and detail photos for each garment, and it treats photos in the same slot as the same item, so keep each garment in its own slot. If you are choosing between flat lays, mannequins and live models for your own shooting, the guide comparing them will help you decide what to photograph in the first place.",
          ),
        ],
      },
      {
        h2: "Running a Model Shoot for apparel",
        blocks: [
          ol(
            "Choose a model. Pick a preset, generate one from attributes such as gender, age bracket, ethnicity, body type and skin tone, or upload your own.",
            "Upload the garments. Use single garment mode for one piece, or multiple garments mode for a top and bottom together, with up to three extra labelled slots for things like shoes or a bag.",
            "Set the aspect ratio, number of outputs and resolution. Add a short note about the light or setting if you want one.",
            "Check the credit total and generate.",
            "Review each result and download the ones that show the garment faithfully.",
          ),
          p(
            "The whole shoot can include up to 10 images, counting the model, garments and any reference images. References guide pose and style only, and they never define the product, so use them to steer the mood rather than to show the garment.",
          ),
        ],
      },
      {
        h2: "Choosing a model who represents your customer",
        blocks: [
          p(
            "The model is the first cue a buyer gets about who the garment is for. A kurta for working women in their thirties reads differently on a model of that age and build than on a very different look. Take a moment on the model step to match the attributes to the people you actually sell to, rather than accepting the first preset that appears.",
          ),
          p(
            "If your customers vary widely, generate more than one model and run the same garment on each. That gives you options for different pages and campaigns without arranging extra shoots.",
          ),
        ],
      },
      {
        h2: "Colour variants with Recolor",
        blocks: [
          p(
            "If a design comes in several colours, photograph one, run Recolor for each of the others, and keep the framing identical across the set. In the tool you pick the target colour from the palette or by hex, and you can name the area to change, such as the shirt, or leave it blank for automatic detection.",
          ),
          tip(
            "Recolor illustrates a colour. It does not swatch it. Compare the result with the real fabric before you publish, particularly for prints, stripes and dark shades.",
            "Colour accuracy",
          ),
        ],
      },
      {
        h2: "The checks every clothing seller should run",
        blocks: [
          ul(
            "Fit and length: does the garment sit on the model the way it would on a real person of that size?",
            "Neckline, sleeves and hem: are they the shape of your actual design?",
            "Prints and embroidery: is placement and scale right, and is any text on the garment correct?",
            "Colour: does it match the fabric you will ship?",
            "Extras: has the tool added a belt, dupatta or accessory you are not selling?",
          ),
          p(
            "If an image fails one of these, do not publish it. A generated image that overpromises on fit or colour leads directly to returns and disappointed buyers.",
          ),
        ],
      },
      {
        h2: "Where to draw the line",
        blocks: [
          p(
            "Use generated images to make your catalog look organised and to show garments on a body you could not otherwise afford to shoot. Do not use them to imply a fit or fabric quality that the garment does not deliver. Include honest size charts and fabric descriptions in your listing, because those, not the images, answer the questions that lead to returns.",
          ),
        ],
      },
      {
        h2: "Sizes, fit and honest expectations",
        blocks: [
          p(
            "Returns in clothing usually come from fit and colour, and neither is fixed by a better image alone. Put a clear size chart in the listing, state the fabric and mention if the garment runs small or large. A generated on-model image shows how a garment could look on a body of a particular type, so pick the model attributes that resemble the size range you sell rather than the most flattering option.",
          ),
          p(
            "If the model looks noticeably slimmer or taller than your typical customer, buyers may read the garment as sized for them, and be disappointed when it does not fit the same way.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can I show a top and a bottom together on one model?",
        a: "Yes. Multiple garments mode has Top and Bottom slots, and you can add up to three more slots with your own labels.",
      },
      {
        q: "Do I need a model photo to use Model Shoot?",
        a: "No. You can choose a preset model or generate one from attributes. Uploading your own model photo is optional.",
      },
    ],
    related: ["model-shoot", "recolor", "clothing-photography-flat-lay-mannequin-model", "meesho-sellers"],
    published: true,
    ...D,
  },
  {
    slug: "home-and-decor",
    group: "use-cases",
    title: "Home Decor Product Photography with AI",
    metaDescription:
      "How home and decor sellers can create styled room-style scenes from one product photo with ShootPX, and how to keep scale and material honest.",
    primaryKeyword: "home decor product photography",
    intent: "Commercial investigation: how can I show decor and home items in believable settings?",
    h1: "Home Decor Product Photography with AI: Styled Scenes Without Staging a Room",
    intro:
      "Home and decor products sell on context: buyers want to see how a lamp, a cushion cover or a wall hanging looks in a room. AI product photography lets you generate that context from a single product photo using ShootPX Creative Photoshoot, and use Listing Photoshoot for a clean product-only image alongside it. This page covers how to do that while keeping size and materials honest, which matters more in home goods than in most categories.",
    sections: [
      {
        h2: "Why context matters for decor",
        blocks: [
          p(
            "A decor item photographed alone on a plain surface tells a buyer very little about size, colour in a room or how it works with other furniture. A shot in a styled setting answers those questions immediately. It also makes a catalog look like a store rather than a list of items.",
          ),
          p(
            "Staging a real room for every product is slow and awkward, particularly if you sell bulky or fragile items. Generating the setting removes the staging, but it adds a new duty: making sure the invented setting does not mislead.",
          ),
        ],
      },
      {
        h2: "Set up the source photo",
        blocks: [
          ul(
            "Place the item on a plain surface with soft light from the side.",
            "Show the whole item, including base, handle or hanging loop.",
            "For items with texture, such as woven baskets or hand-block prints, take an extra close photo so you have it for reference.",
            "Include a common object for scale in a separate reference photo, so you remember the real proportions when you review results.",
          ),
          p(
            "Upload PNG, JPEG or WebP files up to 10 MB each. The tool builds the new image around what it sees, so an even, sharp photo helps it keep the item's shape and colour.",
          ),
        ],
      },
      {
        h2: "Writing scenes that suit home goods",
        blocks: [
          p(
            "Creative Photoshoot accepts either an idea from its dropdown or a scene you describe. For decor, description usually works better because you know the setting your buyer imagines. Describe the surface, the light and the mood, and leave the product itself out of the sentence.",
          ),
          ul(
            "A cushion cover: a plain sofa in morning window light.",
            "A brass diya stand: a wooden shelf with a soft evening glow.",
            "A wall hanging: a plain wall above a low console in warm daylight.",
            "A ceramic vase: a bare table beside a window with a linen curtain.",
          ),
          p(
            "If your wording feels thin, the free Enhance prompt button offers a fuller version you can accept or dismiss.",
          ),
        ],
      },
      {
        h2: "Keep scale and materials honest",
        blocks: [
          p(
            "Home goods are bought on size and material, and generated scenes can quietly distort both. A small tabletop item can look large in a room, and a printed cotton cover can look like linen. Buyers who receive something smaller or plainer than the image implied become returns and bad reviews.",
          ),
          tip(
            "Always state real dimensions and material in the listing text, and pick scenes that do not exaggerate size. A tabletop item belongs on a table, not filling a wall.",
            "Scale check",
          ),
          ol(
            "Check the item's proportions against a nearby object in the scene.",
            "Confirm the colour matches the real item under normal light.",
            "Check texture and pattern. Fine repeats can blur or shift.",
            "Make sure no props imply the listing includes more than it does.",
          ),
        ],
      },
      {
        h2: "A simple image set for a decor listing",
        blocks: [
          p(
            "A workable set for most items is one clean product-only image from Listing Photoshoot, one or two styled scenes from Creative Photoshoot, and your own photo of texture or detail. If the item comes in several colours, Recolor can generate the others from the one you photographed, though patterned items need careful checking.",
          ),
          p(
            "Keep the scenes related across your catalog. If every cushion cover sits on a similar sofa in similar light, your store looks designed. Reuse the wording that worked so the style stays consistent, and see the guide on keeping product images consistent for more on that.",
          ),
        ],
      },
      {
        h2: "When to use real photos instead",
        blocks: [
          p(
            "For pieces sold on finish or craftsmanship, such as hand-painted, carved or artisan work, your own close-up photographs carry the proof. Use generated scenes as supporting images rather than the main evidence.",
          ),
        ],
      },
      {
        h2: "Category notes for common decor items",
        blocks: [
          ul(
            "Wall art and hangings: shoot straight on so edges are square, and generate scenes where the piece hangs at a believable height above furniture.",
            "Lighting and lamps: photograph them switched off for the source photo, and let the scene provide the mood. Check that any glow in a generated image does not overstate the real brightness.",
            "Textiles: cushion covers, throws and curtains show texture best in side light. Add a close-up of the weave from your own camera.",
            "Kitchen and dining: describe a plain counter or table, and avoid food props that suggest the item is sold with them.",
            "Planters and vases: show them empty in the source photo. A scene with plants or flowers should not imply that they come with the pot.",
          ),
        ],
      },
      {
        h2: "Colour and light in a room",
        blocks: [
          p(
            "Buyers of decor care how a colour will look in their own home, which differs from your scene. Prefer neutral scenes so the item's colour is easy to read, and avoid strongly tinted light that makes a cream item look yellow or a grey item look blue. If you sell in several colours, generate each one from the same photo with Recolor and check it against the real piece, since large flat colour areas make small errors obvious.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Which tool is best for room-style scenes?",
        a: "Creative Photoshoot. It lets you choose an idea or describe the setting in your own words.",
      },
      {
        q: "How do I stop the scene from misleading buyers about size?",
        a: "Choose scenes that suit the item's real size and state dimensions in the listing. Compare proportions in the result with the real item.",
      },
    ],
    related: ["creative-photoshoot", "listing-photoshoot", "lifestyle-vs-studio-product-images", "consistent-product-images-across-catalog"],
    published: false,
    ...D,
  },
  {
    slug: "beauty-and-skincare",
    group: "use-cases",
    title: "Beauty and Skincare Product Photography with AI",
    metaDescription:
      "How beauty and skincare sellers can create clean and styled product images from one photo with ShootPX, and why label text needs a careful check.",
    primaryKeyword: "skincare product photography",
    intent: "Commercial investigation: can AI produce credible images of bottles, jars and tubes for my brand?",
    h1: "Beauty and Skincare Product Photography with AI: Bottles, Jars and Tubes",
    intro:
      "Beauty and skincare products can work well with AI product photography because they are simple shapes on plain backdrops, and ShootPX Listing and Creative Photoshoot can build clean or styled scenes around one packshot. The main risk is label text: names, ingredients and claims printed on packaging may not come out exactly as printed, and in this category that matters. This page explains a safe way to use the tools.",
    sections: [
      {
        h2: "What makes this category different",
        blocks: [
          p(
            "Beauty packaging is the product. A bottle's shape, a cap's finish and a label's typography are what a buyer recognises. It is also a category where printed text carries legal and trust weight: product names, sizes and directions all sit on the pack.",
          ),
          p(
            "That has two consequences for generated images. First, glossy, simple shapes are well suited to generated scenes, so the visual side is doable. Second, any text on the pack is a place where generation may go wrong, and a wrong word on a skincare label is more serious than a wrong texture on a cushion.",
          ),
        ],
      },
      {
        h2: "Photographing the pack",
        blocks: [
          ul(
            "Shoot the product straight on at the height of its centre, so the label is not distorted.",
            "Use soft, diffused light from the side. Direct light on glossy bottles creates a hard reflection across the label.",
            "Wipe the pack, because fingerprints on gloss and glass show clearly.",
            "Take a second photo of the back of the pack if you plan to show it.",
          ),
          p(
            "Upload as PNG, JPEG or WebP up to 10 MB. Keep the original file, because you will want it for your comparison.",
          ),
        ],
      },
      {
        h2: "Using Listing Photoshoot for a clean image",
        blocks: [
          p(
            "For the main image, describe a quiet surface and light, such as a pale stone slab with soft daylight. Keep the prompt free of product claims and free of text you want to appear, since the tool builds a scene, not a label. Generate a small batch at low settings first to see how the pack holds up, then raise the settings for the ones you plan to keep.",
          ),
        ],
      },
      {
        h2: "Using Creative Photoshoot for mood",
        blocks: [
          p(
            "Skincare sells mood: calm mornings, clean shelves, natural textures. A Creative Photoshoot scene can supply that around your pack. Describe surface, light and a few props, for example a wet stone ledge in cold morning light or a bathroom shelf with a folded towel. Avoid props that imply ingredients your product does not contain, such as fruit or flowers that suggest a formulation, because a scene can be read as a claim.",
          ),
        ],
      },
      {
        h2: "The label check",
        blocks: [
          p(
            "Before publishing any generated beauty image, zoom in on the label and read it against the real pack, word for word.",
          ),
          ol(
            "Read the product name and any variant name.",
            "Check the size or quantity text.",
            "Look at the logo shape and colours.",
            "Confirm nothing has been added, such as extra words or badges.",
            "Check the cap, pump or nozzle matches the real one.",
          ),
          tip(
            "If the label text is wrong in any way, do not use the image. Use your own packshot instead and let the generated scene support it elsewhere in the listing.",
            "Do not compromise on text",
          ),
        ],
      },
      {
        h2: "Handling claims and regulation",
        blocks: [
          p(
            "Cosmetic and skincare claims can be regulated, and the rules depend on what you sell and where. This page cannot tell you what is allowed. Keep the text in the listing accurate, do not let a generated scene suggest results or ingredients your product does not deliver, and check the relevant rules for your product category before you publish.",
          ),
        ],
      },
      {
        h2: "A reasonable image set",
        blocks: [
          p(
            "A workable beauty listing might combine your own accurate packshot, one clean generated image, one styled scene, and your own photo of the texture or swatch. That keeps the parts that need to be exact under your control and lets generation carry the parts that are about atmosphere.",
          ),
        ],
      },
      {
        h2: "Shots that suit each kind of pack",
        blocks: [
          ul(
            "Bottles with pumps or droppers: keep the pump upright and visible in the source photo, and check the tip in the result.",
            "Jars: photograph with the lid on for the main image, and separately with the lid off if you want to show the texture, using your own photo for the contents.",
            "Tubes: stand them on the cap or lay them flat, and check that the crimped end and text are not distorted in the result.",
            "Sets and gift boxes: photograph the set together and compare the number and order of items in the result with the real box.",
          ),
        ],
      },
      {
        h2: "Keeping a brand look",
        blocks: [
          p(
            "Beauty brands live on a consistent look. Decide on two or three surfaces and one light mood, write each as a single sentence, and reuse the same sentences for every product. When the wording stays the same, scenes for a serum, a cleanser and a moisturiser feel like a family, even though each was generated separately.",
          ),
          p(
            "Keep the same aspect ratio and resolution for published images, and keep the original packshot for every product in a folder beside the generated versions, so the comparison is always one click away.",
          ),
        ],
      },
      {
        h2: "Reviewing a batch efficiently",
        blocks: [
          p(
            "Beauty catalogs tend to be large, with many similar-looking packs, so review can turn into a blur. Work through images one product at a time with the real pack beside you, and reject at the first mismatch instead of trying to rescue it. Keep a short list of what you rejected and why. If the same problem keeps showing up, such as a cap that keeps changing shape, change the input photo or the scene wording rather than regenerating the same way.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Will label text be reproduced exactly?",
        a: "Not reliably. Read the label on every generated image against the real pack and use your own packshot if anything differs.",
      },
      {
        q: "Can I use Model Shoot for skincare?",
        a: "Model Shoot is designed around garments and accessories, so it is not the natural fit for bottles and jars. Listing and Creative Photoshoot are better matches.",
      },
    ],
    related: ["listing-photoshoot", "creative-photoshoot", "product-image-mistakes-that-cost-sales", "lifestyle-vs-studio-product-images"],
    published: false,
    ...D,
  },
];
