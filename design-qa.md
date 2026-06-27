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
