# B2Binc Vanilla JS Website — V2 Prototype

Live site: **https://b2binc.in** (GitHub Pages). Keep `CNAME` as `b2binc.in` and `.nojekyll` in the repo root so the custom domain stays attached and Pages serves this static site as-is. Fallback: https://bhasker1998.github.io/b2binc/

This is a redesigned, animation-heavy prototype using only HTML, CSS and Vanilla JavaScript.

## New direction
- Dark industrial / orange / warm-paper theme
- Animated corrugated-packaging hero
- Floating 3D box
- Conveyor-belt animation
- Interactive manufacturing capability cards
- Animated production benchmark metrics
- Raw-material vs final-product quality dashboard
- Interactive sector selector
- Product filtering
- Scroll reveal + progress bar
- Responsive mobile navigation
- Prototype enquiry form

## Source handling
The supplied competitor/reference PDF was used for the requested structure and reference information: infrastructure, machine categories, testing categories, product types, reference dimensions/capacity and market sectors.

The website intentionally labels the numeric machinery/capacity figures as **reference / prototype benchmark values**. Before publishing as B2Binc's actual company profile, replace these with verified B2Binc data.

No competitor company name, contact information, logo or client list is included.

## Run
Extract the ZIP and open `index.html`, or use VS Code Live Server.

## Production checklist
- Verify actual machinery and production capacity.
- Replace prototype benchmark numbers.
- Add verified factory photographs.
- Connect enquiry form to email/CRM.
- Add legal/privacy pages.
- Add actual certifications and registrations if applicable.

## V2.1 changes
- Replaced the rotating 3D hero box with a stable front-facing animated box to prevent side-turn UI breakage.
- Added B2Binc branding and “DESIGN YOUR CUSTOM BOX WITH US” message to the animated hero box.
- Redesigned Market Coverage into a sector selector + live corrugated packaging image gallery.
- Added sector-specific packaging imagery and captions.
- Added mobile-specific layout and reduced-motion safeguards so the animations remain stable on phones.

## V2.2 changes
- Simplified Market Coverage to a static bullet-list layout with one corrugated packaging image.
- Reworked the hero package into a controlled 3D cube animation with limited rotation so it does not break on side turns.
- Rebuilt conveyor boxes as small 3D corrugated cartons with front/top/side faces and restrained movement.
- Added custom vector illustrations for corrugator, flexo printer, slotter/die cutter, folder-gluer-stitcher, and quality testing tools.
- Added reference infrastructure details from the supplied profile images.
- Expanded the product/reference capability section with boards, flute combinations, dimensions, capacities, box formats and conversion steps.
- Added mobile-safe responsive behavior and reduced-motion handling.


## V2.4 updates
- Redesigned Market Coverage as a dark visual section with a separate animated carton construction scene and a clean 12-market list.
- Replaced the distorted 3D conveyor cartons with stable 2D carton animations.
- Replaced illustrated machinery cards with representative real machinery photographs from publicly indexed manufacturer/industry pages. These are reference visuals, not B2Binc-owned plant photos; replace with licensed B2Binc images before commercial launch.
- Machinery research references: Green Pack Industries, Armour Kartons, Starpack/flexo-foldergluer, and PrintWeek India/BOBST.


### Representative machinery image sources
- Green Pack Industries — https://greenpack.co.in/infrastructure.aspx
- Armour Kartons — https://armorkartons.com/
- Flexo-Folder-Gluer / Starpack machine page — https://thai.flexo-foldergluer.com/sale-13823834-starpack-corrugated-box-printing-machine-fully-automatic-180-sheet-min.html
- PrintWeek India / BOBST reference — https://www.printweek.in/news/bobst-signals-india-shift-with-india-built-novaffg-1024-60618

These are third-party reference photographs loaded remotely in this prototype. Confirm permission/licensing and replace with B2Binc-owned or properly licensed photos for production use.

- Removed the 06 / WORKFLOW section; contact/start-project is now section 06.
- Rebuilt Market Coverage as a simple label grid with all sectors and no large animation/image.
- Restored the stable Version-1-style flat 2D conveyor box animation; no 3D box faces are used on the belt.

## V2.5 changes
- Rebuilt the infrastructure conveyor animation from scratch as a flat 2D carton animation. No perspective or 3D face transforms are used on the moving boxes.
- Added a dedicated Quality + Testing laboratory section matching the structure of the supplied profile: Raw Material Testing and Final Product Testing.
- Added the complete 7 raw-material checks and 8 final-product checks from the supplied profile screenshot.
- Added representative laboratory equipment imagery for bursting, GSM, Cobb, crush, box compression and sample/thickness testing. The lab photographs are crops from the user-supplied profile screenshot and are therefore reference visuals; replace them with B2Binc-owned photographs before launch.
- Testing terminology was also cross-checked against public corrugated packaging laboratory references covering GSM, bursting, Cobb, moisture, RCT/FCT/ECT and box compression testing.

## V2.5 changes
- Rebuilt the infrastructure conveyor animation from scratch as a flat 2D carton animation. No perspective or 3D face transforms are used on the moving boxes.
- Added a dedicated Quality + Testing laboratory section matching the structure of the supplied profile: Raw Material Testing and Final Product Testing.
- Added the complete 7 raw-material checks and 8 final-product checks from the supplied profile screenshot.
- Added representative laboratory equipment imagery for bursting, GSM, Cobb, crush, box compression and sample/thickness testing. The lab photographs are crops from the user-supplied profile screenshot and are therefore reference visuals; replace them with B2Binc-owned photographs before launch.
- Testing terminology was also cross-checked against public corrugated packaging laboratory references covering GSM, bursting, Cobb, moisture, RCT/FCT/ECT and box compression testing.

## V2.8 — Interactive laboratory + conveyor rebuild

- Rebuilt the infrastructure conveyor animation from scratch using a flat 2D carton treatment. The cartons use translation-only motion; no perspective, 3D transforms, face rotation or scaling is applied during desktop animation.
- Added a new interactive `04 / QUALITY + TESTING` laboratory console.
- Testing console has Raw Material / Final Product tabs, clickable individual checks, animated scan line, active equipment image, test status readout and responsive equipment strip.
- Added the separately supplied laboratory/equipment images as local assets:
  - `test-bursting-strength.png`
  - `test-cobb.png`
  - `test-tensile.png`
  - `test-box-compression.png`
  - `test-crease-cobb.png`
  - `test-tools-overview.png`
- Testing terminology follows the supplied TPPL profile screenshot: Raw Material Testing (GSM, Bursting Strength, Cobb Value, Moisture content, Ring Crush Test, Flat Crush Test, Viscosity Test) and Final Product Testing (Dimension Test, Bursting Strength, Punching Resistance of Board, Compression of the box, Sheer Strength test, Moisture content, Board thickness Test, Edge crush Test).
- The equipment visuals are provided as prototype/reference imagery. Verify B2Binc's actual laboratory equipment, standards and certifications before commercial publication.


### V2.8 changes
- Simplified the Quality + Testing section into two clean reference panels: Raw Material Testing and Final Product Testing.
- Used the supplied local laboratory equipment images in a simple image + text layout.
- Rebuilt the infrastructure conveyor cartons as strictly flat 2D boxes with no perspective, rotation, clip-path side faces, or 3D transforms.


## V2.8 Product System Update
- Removed the product-category filter controls completely.
- Rebuilt `02 / PRODUCT SYSTEM` to include the full supplied profile information for Boards and Boxes.
- Added reference capability figures for board width, cut length, board capacity and box capacity, clearly marked for verification before publication.
- Added two user-supplied airport/logistics box images as prominent product visuals.
- Added a clean packaging-format image grid using existing B2Binc prototype assets.
- Removed the old product filter JavaScript behavior.


## V2.9 Product image rotation
- Product System now shows one large visual at a time.
- The visual automatically swaps every 4 seconds using a smooth slide/fade transition.
- Uses existing B2Binc packaging images from the local assets folder.
- Added a small progress indicator to show the 4-second cycle.


### V2.10 change
- Removed the "THE B2Binc IDEA / Packaging is not a box" intro section completely.

### V2.9 infrastructure refinement
- Kept the existing moving-box conveyor animation unchanged.
- Rebuilt the infrastructure content below the conveyor into a simpler, image-led layout.
- Added the separately created machine visuals for board manufacturing, flexo printing, finishing, conversion and steam utility, plus the existing laboratory visual.
- Added compact infrastructure capabilities and reference utility figures from the supplied profile material.
- Removed the contact-section `HOURS` block.


V2.8 hero refinement: desktop box moved higher and slightly farther right; mobile uses a small text-free animated box icon behind the hero copy.


### V2.8 hero animation refinements
- Desktop hero box is 5% larger, lightly tilted, and has a 20px vertical float.
- Mobile hero box is a small opaque icon positioned to the right of the first headline line.
- Mobile box has no packaging text and uses a subtle smiling/blinking face animation.
- Mobile animation remains above the background but below the main text z-index so readability is preserved.


### V2.15
- Mobile Packaging Formats transitions changed from fade to a 1.5-second swipe.
- Image swaps remain staggered at 7-second intervals per slot; desktop remains unchanged.
- V2.16: removed the infrastructure laboratory overview image; mobile infrastructure now shows three images at a time and swaps one image every 7s using a 1.5s swipe transition. Desktop keeps the full infrastructure image layout.

## V2.18 mobile UX updates
- Reduced the mobile height of the Reference Product Capability (Boards + Boxes) section.
- Added touch swipe navigation to mobile Packaging Formats cards.
- Added touch swipe navigation to mobile Infrastructure cards.
- Added touch swipe navigation to the product feature slideshow.
- Left/right swipes can change an image immediately; automatic 7-second staggered rotation continues afterward.
- Swipe transitions preserve the 1.5-second visual motion used by the mobile rotators.
