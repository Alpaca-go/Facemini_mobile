# Design QA

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-0b3fcfe2-29d0-4223-a75b-21e23893bb24.png`
- Paper reference: `C:/Users/Administrator/Desktop/Inspiration-Image.jsx`

Target:
- `http://localhost:5173/`
- View: `tabbar -> 广场 -> 灵感广场`

Round 1
- Findings:
- Page structure and masonry layout were missing.
- Plaza tab in bottom nav did not switch to a dedicated view.
- Plaza header energy pill background did not match the reference state.
- Action:
- Implemented dedicated `InspirationPlaza` view.
- Wired bottom nav `广场` button to switch views.
- Added local image assets and the two-column masonry layout.
- Added plaza-specific header pill styling.

Round 2
- Findings:
- Content baseline and tab text color were slightly off versus the PNG.
- Plaza content needed tighter alignment to the reference top spacing.
- Action:
- Adjusted plaza top offset, grid offset, inactive tab color, and content z-index.
- Re-ran browser capture and compared the plaza state again.

Residual notes
- Browser capture uses a wider in-app viewport, so screenshots include extra blank area around the 400x820 frame.
- Within the 400x820 frame, the current plaza page matches the supplied PNG structure, spacing, and imagery closely enough for this iteration.

final result: passed

## Video Generate State

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-02040be1-419c-4039-b127-740461f1af0d.png`
- Paper reference: `C:/Users/Administrator/Desktop/Generate_Video.jsx`

Round 1
- Findings:
- The plaza generate state only supported the image-generation variant.
- In the video inspiration tab, clicking the bottom prompt still opened the image title and image-generation controls.
- Action:
- Added a dedicated plaza generate variant state and switched it by the active inspiration tab.
- Implemented the video generate heading, top fade, model selector text, ratio-duration selector text, and the `720积分` badge.

Round 2
- Findings:
- The longer video badge text needed slightly more width to avoid feeling cramped.
- Action:
- Added a video-specific submit badge width and rechecked the live browser result.

final result: passed

## Inspiration Video Tab

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-b3353eca-b078-4682-aa3b-ffa6609542e3.png`
- Paper reference: `C:/Users/Administrator/Desktop/Inspiration_Video.jsx`

Round 1
- Findings:
- The plaza page only supported the image inspiration waterfall and had no dedicated video tab content.
- Video inspiration needed a single-column 16:9 card flow instead of the two-column image masonry layout.
- Action:
- Added `public/assets/video/` and stored the 4 video cards as `video-1.jpg` to `video-4.jpg`.
- Split the plaza content into image-grid and video-grid subcomponents and wired the `视频灵感` tab switch.

Round 2
- Findings:
- The first pass matched the structure, but the video list needed a small bottom breathing space to behave more like the reference scroll area.
- Action:
- Added dedicated bottom padding to the video list and rechecked the live browser state.

final result: passed

## Plaza Generate State

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-54fd0595-677b-4c5f-9c6e-70b8051ca712.png`
- Paper reference: `C:/Users/Administrator/Desktop/Generate_Image.jsx`

Round 1
- Findings:
- Clicking the plaza prompt correctly opened the generate state, but the masonry list stayed at its previous scroll position.
- That caused the top image pair to differ from the PNG reference.
- Action:
- Added a dedicated `is-plaza-generate` state.
- Implemented generate-state heading, close button, full composer, and keyboard transition.

Round 2
- Findings:
- The main structure matched, but the image baseline still needed to reset to the intended first row.
- Action:
- Reset the masonry container to the top when entering the generate state.
- Kept the plaza scroll mode active while the generate state is open so the layout does not snap back.

final result: passed

## Plaza Scroll State

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-566fd218-6cf9-40b9-91f2-2d5a77cb6b0a.png`
- Paper reference: `C:/Users/Administrator/Desktop/Inspiration_Image_Scrolling.jsx`

Round 1
- Findings:
- Dragging the masonry list changed `scrollTop`, but the scrolled visual state did not consistently apply.
- The bottom prompt and tabbar fade state were therefore not visible.
- Action:
- Added dedicated plaza scroll-mode state and connected it to the masonry scroll interaction.
- Added bottom prompt component and matching transition styles.

Round 2
- Findings:
- The scrolled state appeared, but the bottom shadow treatment still differed from the reference.
- Action:
- Kept the short bottom shadow visible while fading only the tabbar itself.
- Tuned the scrolled-state bottom shadow height and gradient to the Paper and PNG values.

Round 3
- Findings:
- Needed to verify that native scroll and drag scroll both trigger the same scrolled state.
- Needed to confirm the prompt and shadow sit on the intended 400x820 coordinates.
- Action:
- Bound the masonry container `onScroll` state update alongside pointer dragging.
- Rechecked the live page in-browser: prompt `310x60`, top `732px`; shadow top `771px`; tabbar opacity `0`; heading opacity `0`.

final result: passed
