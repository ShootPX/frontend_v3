import type { SeoPage } from "./types";
import { img, ol, p, tip, ul } from "./blocks";

const D = { publishedAt: "2026-09-21", updatedAt: "2026-09-21", published: true } as const;

export const blogPagesA: SeoPage[] = [
  {
    slug: "ai-product-photography-vs-traditional-photoshoot",
    group: "blog",
    title: "AI Product Photography vs a Photoshoot: Compare Cost",
    metaDescription:
      "A simple framework and formula to compare AI product photography with a traditional photoshoot on cost, time and risk, using your own store's numbers.",
    primaryKeyword: "ai product photography vs traditional photoshoot",
    intent: "Decision: which approach is cheaper and faster for my own store, and how do I work that out?",
    h1: "AI Product Photography vs a Traditional Photoshoot: How to Compare Cost and Time for Your Own Store",
    intro:
      "The honest answer to which is cheaper is that it depends on your catalog, and you can work it out in about ten minutes with one formula: total spend divided by the number of images you actually publish. This guide gives you that formula, a checklist of the costs people forget, and a way to compare time and risk, so you can fill in your own numbers rather than trust anyone else's.",
    sections: [
      {
        h2: "Compare like with like",
        blocks: [
          p(
            "Comparisons often go wrong because they compare a price to a price. A photographer quotes a day rate, an AI tool quotes a credit price, and neither tells you what you get at the end. The fair unit is the finished, published image: one that is good enough that you would put it on a listing.",
          ),
          p(
            "So before comparing anything, decide what you need. How many products do you have? How many images does each need? Which of those images are main listing images, which are lifestyle, and which show a person? Write the count down. Every calculation below depends on it.",
          ),
        ],
      },
      {
        h2: "The cost formula",
        blocks: [
          p("For either approach, use the same formula:"),
          ul(
            "Cost per published image = total spend for the batch (₹) ÷ number of images you actually publish.",
          ),
          p(
            "The word actually matters. If you generate or shoot forty images and publish twenty, your denominator is twenty, not forty. Failed shots, rejected generations and images that did not match the product all raise your real cost per image.",
          ),
          p("Fill in the spend side with everything, not only the headline price:"),
          ul(
            "Traditional shoot: photographer or studio fee, a model if needed, props and backgrounds, travel or courier of stock to and from the studio, editing or retouching charges, and the cost of a reshoot if something is wrong.",
            "AI product photography: credits used, including the credits spent on tests and rejected results, plus the time you spend taking source photos.",
            "For both: your own time, valued at what an hour of your work is worth to you.",
          ),
        ],
      },
      {
        h2: "The time formula",
        blocks: [
          p("Time is where the two approaches differ most, so measure it with a second formula:"),
          ul(
            "Time to a published image = preparation + shooting or generating + review + fixes + upload.",
          ),
          p(
            "For a studio shoot, preparation includes finding and booking someone, sending stock, and waiting for a date. For AI, preparation is taking a clear source photo yourself. Review and fixes are the part people skip: how long does it take you to check an image, reject it and get a replacement?",
          ),
          tip(
            "Time the whole thing once for a single product with each approach. One real trial beats any estimate, including ours.",
            "Test with one product",
          ),
        ],
      },
      {
        h2: "Where the risk sits",
        blocks: [
          p(
            "Cost and time are only two sides. The third is risk: how likely is it that the image misrepresents the product?",
          ),
          ul(
            "A traditional shoot photographs the real item, so colour and detail are as accurate as the photographer and the camera allow. The risk is more about delays and cost overruns.",
            "AI generation builds a new image from your photo. Fine details such as small text, patterns and exact colour can shift, so the risk is inaccuracy. That is manageable with a check against the real product, but it is real, and returns caused by images that oversell are a cost too.",
          ),
          p(
            "Add an allowance for this to the AI side of your formula: the time to check every image, and the credits for regenerating the ones that fail.",
          ),
        ],
      },
      {
        h2: "Which situations favour which approach",
        blocks: [
          p("These are patterns, not rules. Your own numbers decide."),
          ul(
            "Many products, each needing several images: AI is often easier to scale, because each extra image is credits rather than another booking. Run the formula to confirm.",
            "A small number of high-value products where buyers inspect closely: a real shoot is safer, because the main images must be exact.",
            "Products that need many scenes or colours from one item: AI is often practical, because you avoid restaging and reshooting.",
            "A brand campaign with a fixed creative direction: a photographer gives you control that generation does not.",
          ),
          p(
            "Many sellers end up combining them: real photos for the most important main images, generated images for supporting slots, colour variants and social posts.",
          ),
        ],
      },
      {
        h2: "A worked structure to copy",
        blocks: [
          p("Copy this into a spreadsheet and fill each blank with your own figure."),
          ol(
            "Number of products I need images for: ____",
            "Images per product: ____ (main, supporting, lifestyle, on-model)",
            "Total images needed: products × images per product",
            "Traditional total spend: fee + model + props + travel + retouching + reshoot allowance = ₹____",
            "AI total spend: credits for tests + credits for final images + regeneration allowance = ₹____ (convert your credits using the current plan or pack price)",
            "Published images: ____ for each approach",
            "Cost per published image for each approach: spend ÷ published images",
            "Hours spent on each approach, valued at your hourly worth",
          ),
          p(
            "If you are unsure how to convert credits into rupees, look at the current plans and credit packs in the pricing section of the ShootPX home page and use the price of the pack you would actually buy.",
          ),
        ],
      },
      {
        h2: "What the formula will not tell you",
        blocks: [
          p(
            "It will not tell you whether one approach sells more. The only way to know that is to test: use the two kinds of images on comparable products and look at how listings perform. Keep the comparison fair by changing only the images. Until you have that evidence, the formula tells you what each image costs, not what each image earns.",
          ),
          p(
            "If you decide to try AI for part of your catalog, the guide to AI product photography explains what the tools can and cannot do, and the listing photoshoot page shows the settings that change the cost.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Is AI product photography always cheaper than a photoshoot?",
        a: "No. It depends on how many images you need, how many you publish after rejecting weak ones, and how much time you spend checking. Use the cost-per-published-image formula with your own figures.",
      },
      {
        q: "What costs do people usually forget?",
        a: "Reshoots or regenerations, retouching, travel or courier of stock, test credits and their own time.",
      },
    ],
    related: ["ai-product-photography", "listing-photoshoot", "product-photo-shot-list", "product-photos-with-a-phone"],
    ...D,
  },
  {
    slug: "product-photos-with-a-phone",
    group: "blog",
    title: "How to Shoot Product Photos with Just a Phone",
    metaDescription:
      "Step-by-step guide to taking clear product photos with a phone: light, background, steadiness, focus and a quick checklist before you upload.",
    primaryKeyword: "product photography with phone",
    intent: "How-to: I only have a phone, how do I take product photos that look professional?",
    h1: "How to Shoot Product Photos with Just a Phone",
    intro:
      "You can take good product photos with any recent phone if you control three things: the light, the background and how steady the phone is. Set the product near a window, put it on a plain surface, hold the phone still and tap to focus on the product, and you will get a photo that is clear enough for a listing or to use as the starting point for AI product photography. The rest of this guide covers each step in detail.",
    sections: [
      {
        h2: "Start with a clean lens and a clean product",
        blocks: [
          p(
            "A phone lens picks up fingerprints and pocket dust constantly, and the result is a soft, hazy photo that no editing can rescue. Wipe the lens with a soft, clean cloth before every session. Do the same for the product: lint on dark fabric, fingerprints on glass or steel and dust on jewellery all show up more clearly in a photo than they do in person.",
          ),
        ],
      },
      {
        h2: "Use window light, not the phone's flash",
        blocks: [
          p(
            "Light is the biggest difference between a rough photo and a good one. The phone's flash is small and harsh, and it flattens the product and creates hard shadows and glare. A window gives you a larger, softer light for free.",
          ),
          ul(
            "Place the product near a window with daylight coming through, not in direct sun.",
            "If sunlight is strong, hang a thin white curtain or a sheet across the window to soften it.",
            "Put the product so the light falls on it from the side. Side light shows shape and texture.",
            "Switch off room lights, since mixed colours of light make colours look off.",
          ),
          p(
            "The dedicated guide on lighting at home without special equipment covers reflectors and mixed light in more depth.",
          ),
        ],
      },
      {
        h2: "Choose a plain background",
        blocks: [
          p(
            "A plain background keeps attention on the product and makes the edges easy to see. A large sheet of white or light grey paper, a clean tabletop or a piece of plain fabric will do. Curve the paper up behind the product so there is no visible line where the table ends and the wall begins.",
          ),
          p(
            "Remove anything else from the frame: chargers, cups, your reflection in glossy products. If you are going to upload the photo to a generation tool, an uncluttered frame also helps the tool understand where the product ends.",
          ),
          img(
            "/home/phone.webp",
            "A person photographs a folded navy t-shirt on a wooden desk using a phone, with a laptop showing an upload screen next to it",
            "Shoot on a plain surface in daylight, then upload the photo to the tool you want to use.",
          ),
        ],
      },
      {
        h2: "Keep the phone steady and level",
        blocks: [
          p(
            "Blur from shaky hands is common in dim rooms, because the phone lengthens its exposure. Rest your elbows on the table, lean the phone on a stack of books, or use a small tripod if you have one. Use the grid lines in your camera settings to keep the horizon straight and the product level, and use the timer so pressing the button does not shake the phone.",
          ),
          ul(
            "Shoot straight on for most items, and from above for flat lay items.",
            "Keep the phone parallel to the product to avoid a stretched or leaning shape.",
            "Stand back a little and zoom in slightly, rather than holding the phone very close. Very close shots can distort shapes.",
          ),
        ],
      },
      {
        h2: "Focus and exposure",
        blocks: [
          p(
            "Tap on the product on the screen so the phone focuses there rather than on the background. After tapping, most phones show a small brightness slider. Slide it until the product looks correctly bright, not dark and not washed out. If the product is white, phones often make it look grey, so nudge the brightness up. If the product is dark, they can wash it out, so nudge it down.",
          ),
        ],
      },
      {
        h2: "Take more than one angle",
        blocks: [
          p("Sellers who take one photo often need a reshoot later. Take a small set every time:"),
          ol(
            "Front view of the whole product.",
            "Back view.",
            "Side or three-quarter view.",
            "A close-up of a detail such as fabric, stitching, a clasp or a label.",
            "A photo that shows scale, such as the product held in a hand.",
          ),
          p(
            "You may not use all of them, but having them means you can answer buyer questions later without going back to the item.",
          ),
        ],
      },
      {
        h2: "A quick checklist before you upload",
        blocks: [
          ul(
            "Is the whole product in the frame with some space around it?",
            "Is it sharp when you zoom in on the screen?",
            "Does the colour on the screen look like the real item?",
            "Are there no reflections, stray objects or shadows crossing the product?",
            "Is the file a PNG, JPEG or WebP under 10 MB, if you plan to use it in ShootPX?",
          ),
          tip(
            "Look at the photo on a bigger screen than the phone. Blur and colour problems that hide on a small screen are obvious on a laptop.",
            "Check big",
          ),
        ],
      },
      {
        h2: "What to do with the photo next",
        blocks: [
          p(
            "A clear phone photo is a complete deliverable in itself for many listings. If you want a cleaner scene, a styled setting or another colour, you can use it as the starting point for a generation tool. Listing Photoshoot builds new images around your photo, and the AI product photography guide explains what to expect. Whichever route you take, compare the final image with the real product before you publish.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a tripod?",
        a: "Not strictly. Resting the phone on a stack of books and using the camera timer gives most of the benefit. A tripod just makes it easier.",
      },
      {
        q: "Should I use portrait mode?",
        a: "It depends on the product. Portrait mode blurs the background by estimating edges, and it can blur parts of the product. Check the edges if you use it, or leave it off and use a plain background instead.",
      },
    ],
    related: ["white-background-product-photos", "product-photography-lighting-at-home", "listing-photoshoot", "ai-product-photography"],
    ...D,
  },
  {
    slug: "white-background-product-photos",
    group: "blog",
    title: "White Background Product Photos: How to Shoot Them",
    metaDescription:
      "How to shoot clean white-background product photos at home, and what to check before you upload, including edges, shadows and colour accuracy.",
    primaryKeyword: "white background product photos",
    intent: "How-to: how do I get a clean white-background photo, and how do I know it's good enough?",
    h1: "White-Background Product Photos: How to Shoot Them and What to Check",
    intro:
      "A clean white-background photo needs three things: a white surface that curves behind the product, soft light that reaches both sides of it, and an exposure that makes the white read as white rather than grey. Get those right and you can shoot at home with a phone. This guide shows the setup, then gives you a checklist for edges, shadows and colour before you upload. Whether a marketplace requires a white background is a rule set by that marketplace, so check its current image guidelines.",
    sections: [
      {
        h2: "Why sellers use white backgrounds",
        blocks: [
          p(
            "A plain white background removes distractions, makes product edges easy to see and gives a catalog a uniform look. Some marketplaces have their own rules about the main image, which is a reason to check the current guidelines for the one you sell on. This guide covers the photography, not the rules.",
          ),
        ],
      },
      {
        h2: "The setup: a curved white sweep",
        blocks: [
          p(
            "You need a large white sheet or chart paper. Tape one edge to a wall at about the height of your product, and let the rest curve down and out onto the table beneath it. The curve means there is no hard line where floor meets wall, so the background looks continuous.",
          ),
          ul(
            "Use paper that is really white and free of creases and marks.",
            "Keep the paper well beyond the product on every side, so the edges of the sheet never appear in frame.",
            "Place the product a little way in front of the wall, not touching it, to reduce shadows.",
          ),
        ],
      },
      {
        h2: "Lighting a white background",
        blocks: [
          p(
            "The two classic problems are grey backgrounds and dark shadows. A background looks grey when it is under-lit, and shadows are dark when the light comes from a single hard direction.",
          ),
          ol(
            "Place the setup by a window with diffuse daylight, or soften light with a thin white curtain.",
            "Position the product so light reaches it from one side, and put a white card or a sheet of thermocol on the other side to bounce light back and lift the shadow.",
            "Make sure the background is lit at least as brightly as the product. Move the setup closer to the window if the paper looks dull.",
            "Avoid mixing daylight with a coloured bulb. Turn the room lights off.",
          ),
          tip(
            "If the paper looks grey on the phone, raise the exposure a little after tapping to focus. Phones tend to expose for an average scene and turn white into grey.",
            "Grey paper fix",
          ),
        ],
      },
      {
        h2: "Camera settings that help",
        blocks: [
          ul(
            "Tap on the product to focus, then adjust brightness until the background reads white and the product still shows detail.",
            "Keep the phone steady and parallel to the product so the shape looks right.",
            "Use the timer to avoid shake.",
            "Leave a small margin around the product, so you can crop later without cutting parts off.",
          ),
        ],
      },
      {
        h2: "What to check before you upload",
        blocks: [
          p("Zoom into the photo on a large screen and go through this list."),
          ul(
            "Edges: are they clean, without a halo of grey or a fringe of the background colour around the product?",
            "Shadows: a soft shadow under the product looks natural. A hard, dark shadow does not.",
            "Colour: does the product still look like itself, or has white light washed it out?",
            "Detail: are stitching, printed text or fine texture visible and sharp?",
            "Cleanliness: no dust, lint, fingerprints or paper creases.",
            "Framing: the whole product is inside the frame with even space around it.",
          ),
        ],
      },
      {
        h2: "White backgrounds and AI-generated images",
        blocks: [
          p(
            "If you use a generation tool for a listing image, you can describe the plain, light background you want in the scene prompt, for example a plain light background with soft light. Then run the same checks: edges, shadows, colour and detail. Generated images can alter fine details, so compare the result with the real item and with the marketplace's current guidance on the main image.",
          ),
          p(
            "ShootPX Listing Photoshoot takes a photo and a short scene description and generates new images from it. If your own white-background photo is already good, you do not need to regenerate it. Use the tool where the photo is not good enough or where you want other scenes.",
          ),
        ],
      },
      {
        h2: "Common problems and fixes",
        blocks: [
          ul(
            "Grey background: move closer to the window and raise the exposure.",
            "Blue or yellow tint: switch off room lights and turn the phone's auto white balance on, or shoot at a different time of day.",
            "Reflections on shiny products: move the light source to a wider angle and use a larger, softer light.",
            "Paper crease lines: use a fresh sheet or smooth it, and keep the product away from the fold.",
          ),
        ],
      },
      {
        h2: "Editing after the shoot, without overdoing it",
        blocks: [
          p(
            "A little editing is normal: crop so the product sits centrally with even margins, straighten the image and adjust brightness so the background reads as white. Stop there. Heavy contrast, saturation or sharpening change the look of the product itself, and a buyer will notice when the item arrives looking different.",
          ),
          p(
            "Compare your edited image with the real product before uploading. If the colour has moved, undo some of the adjustment rather than accepting the drift.",
          ),
        ],
      },
      {
        h2: "Shooting shiny and dark products on white",
        blocks: [
          p(
            "White backgrounds are hardest with the two extremes. Dark products can disappear into shadows, so add more bounce light on the shadow side and check the edges. Shiny products mirror the white surround, so the item can look washed out. If that happens, try a light grey card just outside the frame on one side, which gives the edge a little definition without ruining the white background.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does every marketplace require a white background?",
        a: "Rules differ by marketplace and category and they change. Check the current image guidelines for the marketplace you sell on.",
      },
      {
        q: "Can I get a white background without special equipment?",
        a: "Yes. A large sheet of white paper, a window and a white card to bounce light are enough for most small products.",
      },
    ],
    related: ["product-photography-lighting-at-home", "product-photos-with-a-phone", "listing-photoshoot", "amazon-india-sellers"],
    ...D,
  },
  {
    slug: "product-photography-lighting-at-home",
    group: "blog",
    title: "Product Photography Lighting at Home, No Equipment",
    metaDescription:
      "How to light product photos at home using a window, a white sheet and simple reflectors, and how to fix glare, harsh shadows and colour casts.",
    primaryKeyword: "product photography lighting at home",
    intent: "How-to: how do I light products well without buying lights?",
    h1: "Product Photography Lighting at Home Without Special Equipment",
    intro:
      "You can light product photos well at home with a window, a thin white sheet to soften the light and a white card to bounce it back into the shadows. Soft, side-lit daylight is what studio lights try to imitate, so you are copying the goal, not settling for less. This guide explains where to place the product, how to soften and shape the light with things you already own, and how to fix the usual problems.",
    sections: [
      {
        h2: "Understand hard and soft light",
        blocks: [
          p(
            "Hard light comes from a small source, such as direct sun through a clear window or a bare bulb. It creates sharp shadows and bright glare. Soft light comes from a large source, such as an overcast sky or sunlight passed through a thin curtain. It wraps around the product and creates gentle shadows.",
          ),
          p(
            "For nearly every product, soft light looks better. Your job at home is to make the light source bigger and gentler than it naturally is.",
          ),
        ],
      },
      {
        h2: "Pick the right window and time of day",
        blocks: [
          ul(
            "Choose a window that does not get direct sun at the time you shoot. A north-facing or shaded window gives the most even light.",
            "If direct sun is unavoidable, cover the glass with a thin white curtain, a white bedsheet or a sheet of butter paper.",
            "Shoot at the time of day when the light is bright but not harsh, and take your photos in one window each time so lighting stays similar across products.",
            "Switch off tube lights and bulbs. They add a colour cast that shows up in the photo.",
          ),
        ],
      },
      {
        h2: "Place the product relative to the light",
        blocks: [
          p(
            "Put a table close to the window so the product sits sideways to it. Light from the side creates shape and texture. Light from directly behind creates a silhouette, and light from the camera's direction flattens the product.",
          ),
          ol(
            "Set the product on a table beside the window.",
            "Put the phone on the side away from the window, pointing at the product.",
            "Check the screen. If one side of the product is very dark, add a reflector on that side.",
          ),
        ],
      },
      {
        h2: "Make reflectors from things at home",
        blocks: [
          p(
            "A reflector bounces light into the shadow side of the product, so the shadows lift and detail shows. You do not need to buy one.",
          ),
          ul(
            "White chart paper or a sheet of thermocol gives a soft, neutral fill.",
            "A piece of white cardboard held near the product works the same way.",
            "Aluminium foil glued to cardboard gives a stronger, harder fill, so use it sparingly.",
            "A piece of black card on the opposite side deepens shadows if the product looks too flat.",
          ),
          tip(
            "Move the reflector closer for a stronger fill and further away for a subtle one. Check the phone screen after every move.",
            "Adjust by eye",
          ),
        ],
      },
      {
        h2: "Handling shiny and glass products",
        blocks: [
          p(
            "Shiny surfaces reflect whatever is in front of them, including the window, your phone and you. To control this, use a larger, softer light source such as a bigger diffusing sheet, and change your angle a few degrees until the brightest reflection moves off the important part. For particularly reflective items, the jewellery guide covers glare in more detail.",
          ),
        ],
      },
      {
        h2: "Fix the common problems",
        blocks: [
          ul(
            "Hard shadows: soften the light with a curtain or sheet and add a reflector on the shadow side.",
            "Orange or blue colour cast: turn off room lights and shoot in daylight only.",
            "Flat, dull photo: move the product so light comes from the side instead of the front.",
            "Dark photo and blur: bring the setup closer to the window rather than turning on a lamp.",
            "Colours that look wrong on screen: compare with the real product in daylight, and correct brightness rather than heavily filtering.",
          ),
        ],
      },
      {
        h2: "Keep lighting consistent across products",
        blocks: [
          p(
            "A catalog looks organised when the light matches from product to product. Mark the table position, the reflector position and the time of day you shoot, and repeat them. If you plan to use generation tools later, consistent source photos give you more consistent results, because the tool starts from similar inputs.",
          ),
          p(
            "After the photos are taken, tools such as Listing Photoshoot can build clean scenes around them, but they work best when the source photo is already evenly lit and sharp.",
          ),
        ],
      },
      {
        h2: "A ten-minute lighting test",
        blocks: [
          p(
            "Before you shoot a whole batch, run a quick test with one product so you know your setup works.",
          ),
          ol(
            "Put the product beside the window and take one photo with no reflector.",
            "Add a white card on the shadow side and take another.",
            "Hang a thin sheet over the window and take a third.",
            "Open the three photos on a large screen and pick the one with the softest shadows and truest colour.",
            "Note which combination won, and repeat it for every product.",
          ),
          p(
            "Doing this once teaches you more about your own window than any guide can, because every room has its own light.",
          ),
        ],
      },
      {
        h2: "Small products and large products need different set-ups",
        blocks: [
          p(
            "Small items such as jewellery, cosmetics and stationery fit easily inside a small tent or on a table by a window, where the light source is much bigger than the product. Large items such as furniture or bags need more room and more light, so shoot them in the brightest part of the room with the window to one side, and step back so the phone does not distort the shape.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can I use a phone torch or LED lamp instead of a window?",
        a: "You can, but a small light is harsh. If you use one, bounce it off a white wall or card, or diffuse it, to make it larger and softer.",
      },
      {
        q: "What is the easiest single improvement?",
        a: "Move the product next to a window, turn off room lights and turn off the flash.",
      },
    ],
    related: ["product-photos-with-a-phone", "white-background-product-photos", "listing-photoshoot", "photograph-jewellery-without-glare"],
    ...D,
  },
];
