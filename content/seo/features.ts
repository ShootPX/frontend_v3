import type { SeoPage } from "./types";
import { img, ol, p, tip, ul } from "./blocks";

const DATES = { publishedAt: "2026-09-21", updatedAt: "2026-09-21", published: true } as const;

export const featurePages: SeoPage[] = [
  {
    slug: "listing-photoshoot",
    group: "features",
    title: "Listing Photoshoot: AI Product Listing Photos",
    metaDescription:
      "Turn one product photo into listing-ready images with ShootPX Listing Photoshoot. Describe the scene, pick quality and size, then review.",
    primaryKeyword: "ai product listing photos",
    intent: "Transactional/informational: can I make listing images from a phone photo, and how does the tool work?",
    h1: "Listing Photoshoot: Listing-Ready Product Photos from One Upload",
    intro:
      "Listing Photoshoot is the ShootPX tool for making product images you can put on a marketplace or store listing. You upload a photo of your product, describe the scene you want in a sentence, choose a quality, resolution and shape, and it generates new images of that product. It is the tool to start with if you need clean, consistent images for a product page.",
    sections: [
      {
        h2: "What you put in",
        blocks: [
          p(
            "The input is one or more photos of your product. Files can be PNG, JPEG or WebP, up to 10 MB each. A sharp photo with the entire product visible works best, because the tool builds the new image around what it can see. A phone photo taken near a window is a perfectly good starting point.",
          ),
          img(
            "/home/shoot.webp",
            "A folded navy t-shirt with a small square patch on the chest, lying on an orange surface lit from the upper left",
            "The kind of clear, uncluttered product photo that gives the tool a good starting point.",
          ),
          p(
            "You then set how the result should look. The settings panel groups them into Settings and a prompt box at the bottom.",
          ),
        ],
      },
      {
        h2: "The settings you control",
        blocks: [
          ul(
            "Output images: how many images to generate in one run. Each extra image costs more credits, so start small while you are testing a look.",
            "Size: the shape of the image. Choose it from the aspect-ratio options in the panel, and pick the shape that suits where the image will be used.",
            "Resolution: 1K, 2K or 4K. Higher resolution costs more credits.",
            "Quality: a step from low up to max. Higher quality costs more credits, and the panel shows the credit cost of each level at your chosen resolution.",
            "Prompt: a short description of the scene, for example a stone ledge in cold morning light.",
          ),
          p(
            "Under the prompt box there is an Enhance prompt button, which rewrites your description into a fuller one. It is free, and it only suggests a rewrite. You accept or dismiss it, so your own text is never replaced without your say-so.",
          ),
        ],
      },
      {
        h2: "How to run a listing shoot",
        blocks: [
          ol(
            "Open Listing Photoshoot from the Tools page in the studio.",
            "Upload your product photo.",
            "Set the number of images, size, resolution and quality.",
            "Write the scene in the prompt box. Keep it to what should be around the product, not a description of the product itself.",
            "Check the credit figure shown near the Generate button and press Generate.",
            "Review the images. Download single images or use Download all.",
          ),
          tip(
            "Use a low quality and 1K resolution while you experiment with the scene wording, then generate the version you plan to publish at the higher settings. You spend the extra credits only once you like the look.",
            "Save credits",
          ),
        ],
      },
      {
        h2: "Checking the result before you publish",
        blocks: [
          p(
            "Look at the generated image the way a buyer would. Is the colour the colour of the item you will ship? Are the edges, straps, buttons or prints where they should be? Is any writing on the product still readable and correct? Generated images can vary in fine detail, so a quick side-by-side with the real product is worth the minute it takes.",
          ),
          p(
            "Then read the image guidelines of the marketplace you are selling on. They change over time and differ between marketplaces, so ShootPX does not try to guess them for you. If a guideline asks for a specific background or framing on the main image, put that in your prompt and confirm the result meets it.",
          ),
        ],
      },
      {
        h2: "When to pick a different tool",
        blocks: [
          p(
            "Listing Photoshoot is built around a product on its own in a scene. If you want a more styled, story-driven image, Creative Photoshoot gives you preset ideas as well as free-text prompts. If the product exists in one colour and you need others, Recolor changes the colour without a new scene. For clothing that should be seen on a person, Model Shoot handles that.",
          ),
          p(
            "Any set of results can also be sent to another tool from the results screen with the Send to option, so a listing image can become the input for a recolor.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "How many photos can I upload?",
        a: "The upload area shows the limit for the tool when you open it. Files must be PNG, JPEG or WebP and no larger than 10 MB each.",
      },
      {
        q: "Does the cost change with settings?",
        a: "Yes. Quality, resolution and the number of images all change the credit cost, and the estimate is shown before you generate.",
      },
    ],
    related: ["creative-photoshoot", "ai-product-photography", "product-photo-shot-list", "white-background-product-photos"],
    ...DATES,
  },
  {
    slug: "creative-photoshoot",
    group: "features",
    title: "Creative Photoshoot: AI Lifestyle Product Photos",
    metaDescription:
      "Create lifestyle and concept product scenes from one photo with ShootPX Creative Photoshoot. Pick an idea or describe your own scene.",
    primaryKeyword: "ai lifestyle product photos",
    intent: "Commercial investigation: can I get styled lifestyle images without staging a scene?",
    h1: "Creative Photoshoot: Lifestyle Scenes Around Your Product",
    intro:
      "Creative Photoshoot is the ShootPX tool for images that show a product in a styled scene rather than on a plain backdrop. You upload a product photo, then either choose one of the built-in ideas or describe the scene in your own words, and the tool generates new images with your product in that setting. It is meant for social posts, banners, product story pages and any place where atmosphere sells more than a clean cut-out.",
    sections: [
      {
        h2: "Idea or prompt: two ways to direct the scene",
        blocks: [
          p(
            "This tool asks for a direction before it will run. You can pick an idea from the Idea dropdown, or you can write a scene in the prompt box. If you leave both empty, the form asks you to describe your scene or pick an idea, so you never generate blind.",
          ),
          p(
            "Ideas are a quick starting point when you do not yet know what you want. The prompt is for when you do, such as a wet stone ledge in cold morning light, or a kitchen counter with soft window light and a few loose herbs beside the jar.",
          ),
          tip(
            "Describe the surroundings, the light and the mood. Leave the product itself out of the description, because the photo you uploaded already tells the tool what it looks like.",
            "Prompt tip",
          ),
        ],
      },
      {
        h2: "Settings in the order you will meet them",
        blocks: [
          ul(
            "Idea: optional if you write a prompt, otherwise required.",
            "Settings: aspect ratio, resolution and quality, plus how many images to generate. Aspect ratio is chosen from a grid of shapes drawn to scale, which helps you see the crop before you generate.",
            "Prompt: your own scene description, with a free Enhance prompt button that offers a fuller rewrite you can accept or dismiss.",
          ),
          p(
            "Credit cost rises with quality and resolution and with the number of images. The cost appears next to the Generate button, and each quality level in the menu shows its own credit price at the resolution you have selected.",
          ),
        ],
      },
      {
        h2: "Where creative images earn their place",
        blocks: [
          p(
            "A styled scene answers questions that a plain product image cannot: how big is this, where would I use it, what does it feel like. That makes creative images a strong second or third image in a listing, a good fit for social media posts, and a useful way to keep a store's pages from looking identical.",
          ),
          p(
            "They are a weaker choice for the main image of a marketplace listing, where guidelines about the first image often apply. Check the marketplace's current rules, and use Listing Photoshoot for that slot if a plain presentation is required.",
          ),
        ],
      },
      {
        h2: "A simple workflow for a product set",
        blocks: [
          ol(
            "Generate one scene at low quality to test the wording.",
            "Adjust the prompt until the mood is right. Try Enhance prompt if your description feels thin.",
            "Raise resolution and quality for the final run.",
            "Compare the product in each image with the real item.",
            "Download the ones you like, or send them on to another tool.",
          ),
          p(
            "If you are building images for one product across several looks, run one prompt at a time and note which wording gave you the result. Reusing the wording on the next product helps the set look related.",
          ),
        ],
      },
      {
        h2: "What to keep in mind",
        blocks: [
          p(
            "Scenes are generated, so props, surfaces and shadows are invented for the image. Make sure the scene does not imply something untrue about the product, such as a size, a material or an included accessory the buyer will not receive.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to write a prompt?",
        a: "No. You can choose an idea instead. The tool needs one or the other before it will generate.",
      },
      {
        q: "Does Enhance prompt cost credits?",
        a: "No, it is free. It shows a rewritten version of your prompt that you can accept or dismiss.",
      },
    ],
    related: ["listing-photoshoot", "lifestyle-vs-studio-product-images", "ai-product-photography", "instagram-sellers"],
    ...DATES,
  },
  {
    slug: "recolor",
    group: "features",
    title: "AI Product Recolor: Change Product Colour in a Photo",
    metaDescription:
      "Show your product in other colours without reshooting. ShootPX Recolor lets you pick a colour, name the part to change and generate a variant.",
    primaryKeyword: "change product colour in photo",
    intent: "Transactional: I have one photo and need the same product in another colour.",
    h1: "Recolor: Show Your Product in Another Colour from One Photo",
    intro:
      "Recolor is the ShootPX tool for changing the colour of a product in a photo. You upload the image, pick the target colour from a colour picker or type a hex value, optionally say which part of the product to change, and generate. It exists for sellers who photographed one colour of an item and need to show others.",
    sections: [
      {
        h2: "What you do, step by step",
        blocks: [
          ol(
            "Open Recolor and upload your design. The upload area is titled Upload your design, and it accepts PNG, JPEG or WebP up to 10 MB.",
            "Choose the colour. The colour field opens a palette with a saturation square, a hue slider and a hex input, plus a preview of the colour.",
            "In the text field, name the part you want to change, for example the shirt. If you leave it blank, the tool tries to detect the area itself.",
            "Pick the resolution. The credit cost of each option is shown in the menu.",
            "Generate and review the result.",
          ),
          p(
            "The colour starts on a bright lime default, so remember to change it before you generate, or you will produce a lime variant.",
          ),
        ],
      },
      {
        h2: "Naming the area to change",
        blocks: [
          p(
            "Auto-detect is convenient for a photo with one obvious product. It is less certain when a picture holds several items, such as a shirt and trousers together, or a product on a similarly coloured surface. In those cases, name the part you want changed in plain words. The more specific the name, the less room there is for the tool to recolour something else.",
          ),
          tip(
            "If the first result changed the wrong part, generate again with a more specific target, for example the kurta body rather than the outfit.",
            "If it recolours the wrong thing",
          ),
        ],
      },
      {
        h2: "Choosing colours that match real stock",
        blocks: [
          p(
            "A recoloured image is an illustration of a colour, not a sample of it. Screens differ, and generated colour can sit slightly off the hex you typed. Use a hex that is as close as possible to the real product colour, look at the result next to the physical piece, and if the shade differs noticeably, either adjust the hex and try again or use a real photo for that variant.",
          ),
          p(
            "This matters because colour mismatch is a common reason a buyer feels an item was not as shown. If you cannot confirm the colour, consider saying in the listing text that the shade on screen may differ slightly from the item.",
          ),
        ],
      },
      {
        h2: "Where Recolor fits into a listing",
        blocks: [
          p(
            "Recolor is a good fit when a product has one shape and several colourways, as many garments, bags, cushion covers and stationery items do. Photograph the hero colour once, run Recolor for each other colour you stock, and you have a matching set with the same framing and light. For the reasoning behind this approach, read the guide on showing colour variants without reshooting each one.",
          ),
          p(
            "It is not the right tool for products where the colour interacts with texture in a way that is hard to fake, like a multicolour print or a marbled finish. Check every result closely for those.",
          ),
        ],
      },
      {
        h2: "A quick way to test a colour before you commit",
        blocks: [
          p(
            "Colour decisions are easier to judge on screen than in your head. Before you generate a full set, run the palest and the darkest colour you plan to sell as a test. If both look believable on your photo, the middle shades usually will too. If one looks off, you have learned that before spending credits on the whole range.",
          ),
          p(
            "Keep a note of the hex value you used for each colour, next to the name you use in the listing. When you restock or add a season, you can generate the same shades again and the whole range stays matched.",
          ),
        ],
      },
      {
        h2: "What Recolor does not do",
        blocks: [
          p(
            "Recolor changes colour. It does not change the shape of the product, add a new print or swap the fabric. If you need the product in a new scene, use Listing Photoshoot or Creative Photoshoot, and if you need it on a person, use Model Shoot. The results screen has a Send to option, so a recoloured image can be passed straight into another tool without downloading and re-uploading it.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to name the part to recolour?",
        a: "No. If you leave the text field blank, the tool tries to detect the area on its own. Naming the part is more reliable when the photo has more than one item.",
      },
      {
        q: "Will the colour match my real product exactly?",
        a: "Not guaranteed. Screens and generation both introduce variation, so compare the result with the physical item.",
      },
    ],
    related: ["show-colour-variants-without-reshooting", "listing-photoshoot", "clothing-and-apparel", "ai-product-photography"],
    ...DATES,
  },
  {
    slug: "model-shoot",
    group: "features",
    title: "AI Model Shoot: Clothing on AI Models",
    metaDescription:
      "Show garments on an AI-generated model with ShootPX Model Shoot. Choose a preset, generate or upload a model, add garments and generate on-model shots.",
    primaryKeyword: "ai model shoot for clothing",
    intent: "Commercial investigation: can I show my garments on a model without hiring one?",
    h1: "Model Shoot: Put Your Garments on an AI-Generated Model",
    intro:
      "Model Shoot is the ShootPX tool that shows your clothing or accessories on a model, without a casting, a studio or a photographer. You pick or create a model, upload photos of the garments, choose the output settings and generate on-model shots. It runs as a three-step flow: Model, Products, then Output.",
    sections: [
      {
        h2: "Step 1: choose your model",
        blocks: [
          p("The model step has three tabs, and you only need one."),
          ul(
            "Presets: pick from ready-made models shown as thumbnails.",
            "Generate: create a model from attributes such as gender, age bracket, ethnicity, body type and skin tone, with an optional note where you can describe details like a smile or hair length. This step needs no image and uses credits.",
            "Upload: bring your own model photo.",
          ),
          img(
            "/home/model.webp",
            "A young man in a navy oversized t-shirt and cream trousers leans against a terracotta wall with palm shadows, looking to the side",
            "An example of the kind of on-model shot the tool is designed to produce.",
          ),
          p(
            "Pick a model whose look matches the customer you sell to. It is the first thing a buyer reads about who the product is for.",
          ),
        ],
      },
      {
        h2: "Step 2: add the garments",
        blocks: [
          p(
            "Choose between a single garment and multiple garments. In single mode there is one slot. In multiple mode you get a Top slot and a Bottom slot, and you can add up to three extra slots, each with your own label, such as watch, hat, shoes or bag.",
          ),
          p(
            "Each slot accepts several photos of the same item, and the tool suggests front, back, side and detail views. Giving it more angles of one garment helps it understand the item. Keep each item in its own slot, because the tool treats photos in the same slot as the same item.",
          ),
          p(
            "You can also add optional reference images. These are used for style and pose guidance only and never define what the product looks like, so do not use them to show the garment itself.",
          ),
          p(
            "There is a total limit of 10 images per shoot, counting the model, the product photos and any references. A counter shows how many you have used.",
          ),
        ],
      },
      {
        h2: "Step 3: set the output",
        blocks: [
          ul(
            "Aspect ratio: choose from the shapes offered.",
            "Outputs: how many images to generate.",
            "Resolution: 1K, 2K or 4K, with each step costing more credits.",
            "Prompt: an optional note such as soft window light or a minimal studio, with the free Enhance prompt button.",
          ),
          p(
            "The panel shows the total credit cost for your output count and resolution before you press Generate on-model shots. If your balance is lower than the cost, a warning tells you that some outputs may not be generated, with a link to buy credits.",
          ),
        ],
      },
      {
        h2: "Limits worth knowing",
        blocks: [
          p(
            "Some model and garment combinations cannot be generated, and the tool will tell you so instead of producing something wrong. Only one generation runs at a time, so start the next shoot after the current one finishes. Results appear in the results panel, where you can download images or send them to another tool.",
          ),
          p(
            "As with every generated image, check the garment against the real one. Look closely at the neckline, sleeve length, print placement and colour, because a buyer will compare what they receive with what they saw.",
          ),
          tip(
            "Upload flat, well-lit garment photos with the whole item visible. A creased or partly hidden garment gives the tool less to work with.",
            "Input tip",
          ),
        ],
      },
      {
        h2: "Reusing a model across a collection",
        blocks: [
          p(
            "Once you have a model you like, whether a preset, one you generated or one you uploaded, you can keep choosing that same model. If you want a collection to feature the same face and build, do exactly that. If you sell to several kinds of customers, run the same garment on more than one model and use each version on the page that suits it.",
          ),
          p(
            "The Generate tab is separate from the shoot itself and uses its own credits, so it is worth settling on a small set of models you like rather than generating a new one for every product.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a photo of a real person?",
        a: "No. You can pick a preset model or generate one from attributes. You can also upload your own model photo if you prefer.",
      },
      {
        q: "Can I show more than one item on the model?",
        a: "Yes. Multiple garments mode has Top and Bottom slots plus up to three extra labelled slots, within a total of 10 images per shoot.",
      },
    ],
    related: ["clothing-and-apparel", "clothing-photography-flat-lay-mannequin-model", "recolor", "ai-product-photography"],
    ...DATES,
  },
];
