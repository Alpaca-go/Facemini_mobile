# Design QA

final result: passed

Reference states:
- Model menu: `codex-clipboard-cbf15c99-c865-4dcd-9ea3-bdd46381c752.png`
- Thinking menu: `codex-clipboard-474668c2-7212-4eb6-a4cd-329ad55ca6b4.png`
- Paper references: `Model_Menu_1.jsx`, `Model_Menu_2.jsx`

Round 1 findings:
- Added model and thinking dropdown components with Paper target geometry.
- Model dropdown uses `left: 51px`, `top: 88px`, `width: 231px`, `height: 374px`.
- Thinking dropdown uses `left: 183px`, `top: 368px`, `width: 153px`, `height: 94px`.
- Browser screenshot revealed a yellow focus outline on the active control that is not present in the PNG.

Round 2 fixes:
- Removed native button focus outlines to match the PNG state.
- Confirmed production build passes after dropdown implementation.

Residual notes:
- The Codex in-app browser viewport is scaled by the desktop shell, so full 400x820 screenshots may appear cropped in local QA captures. Layout dimensions are set in CSS pixels to the provided 400x820 visual target.
