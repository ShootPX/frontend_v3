// Before → after preview shown on a tool's empty results canvas.
// Files live in public/editor/. A tool without an entry (or whose image is
// missing) falls back to the plain placeholder.
export type ToolEmptyPreview = {
  src: string;
  alt: string;
  caption: string;
};

export const TOOL_EMPTY_PREVIEWS: Record<string, ToolEmptyPreview> = {
  listing_photoshoot: {
    src: "/editor/listing-photoshoot.png",
    alt: "A plain product photo turned into a set of clean marketplace listing shots",
    caption: "Turn one product photo into a full set of listing-ready images.",
  },
  creative_photoshoot: {
    src: "/editor/creative-photoshoot.png",
    alt: "A plain product photo placed into a styled creative scene",
    caption: "Place your product in a scroll-stopping scene, no studio needed.",
  },
  recolor: {
    src: "/editor/recolor.png",
    alt: "A product photo shown in its original colour and a new colour",
    caption: "Change the colour of any product while keeping its texture and shadows.",
  },
  model_shoot: {
    src: "/editor/model-shoot.png",
    alt: "A flat-lay garment photo turned into a model wearing it",
    caption: "See your product on a real-looking model, ready for your store.",
  },
};
