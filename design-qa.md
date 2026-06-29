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

## History Output Page

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-8151af53-711f-4394-9d21-752606d86f89.png`
- Paper reference: `C:/Users/Administrator/Desktop/History_Output.jsx`

Structure:
- `HistoryOutputPage`: 返回栏、新创作按钮、输出流容器。
- `history-output-block`: 文案气泡、方图结果、积分说明、操作胶囊按钮。
- `BottomNav`: 输出页底部导航激活态。

Round 1
- Findings:
- 需要从历史记录卡片点击进入新的输出页，而不是只停留在历史列表本身。
- 输出页需要复用所点击历史项的文案和图片，并按 PNG 形式连续流式展示两段内容。
- Action:
- 新增 `history-output` 视图状态与 `selectedHistoryItem`。
- 接入 `HistoryOutputPage`、返回按钮和三枚操作胶囊按钮。
- 第一轮截图后确认主体结构已经贴近设计稿。

Round 2
- Findings:
- 第一轮实现里底部 tabbar 的激活态仍然落在 `历史`，与 PNG 中 `首页` 激活不一致。
- Action:
- 将输出页传给 `BottomNav` 的激活态调整为 `home`，保持页面本身仍属于历史链路。
- 再次验证点击历史卡片后能进入输出页，`返回` 按钮存在，底部激活项为 `首页`。

final result: passed

## History Page

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-12c4d247-eac1-4f57-b557-1e856bb8f96a.png`
- Paper reference: `C:/Users/Administrator/Desktop/History.jsx`

Structure:
- `HistoryPage`: 页面容器、标题栏、创建按钮。
- `HistoryListItem`: 历史记录卡片缩略图、标题、时间/上下文信息。
- `BottomNav`: 历史 tab 激活态与切换入口。

Round 1
- Findings:
- `BottomNav` 右侧的 `历史/我的` 原本没有绑定点击，无法切换到历史页。
- 历史页需要独立视图和本地缩略图资源，不能复用首页或广场布局。
- Action:
- 新增 `history` 视图分支，接入 `HistoryPage` 与 `HistoryListItem`。
- 将 Paper 里的 7 张缩略图下载到 `public/assets/history/`，并补了第 8 张本地 placeholder 资源。
- 第一轮截图后确认了标题、按钮、卡片结构已基本对齐，但底部露出量偏大。

Round 2
- Findings:
- 第 8 条历史记录露出过多，和参考图相比没有被底部阴影与 tabbar 充分裁切。
- 卡片文案在垂直方向略偏上，底部阴影 top/height 也差了约 1px。
- Action:
- 将历史页可视高度收紧到 651px，并让列表区域按剩余空间裁切。
- 给文案区增加 58px 最小高度与垂直居中。
- 将底部阴影微调为 `top: 732px`、`height: 88px`。
- 第二轮截图复核后，历史页底部露出量与参考图一致，tabbar 历史态正常高亮。

final result: passed

## Video Generate Setting Menu

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-5da62f82-30aa-4ff5-815c-74ff34928aab.png`
- Paper reference: `C:/Users/Administrator/Desktop/Generate_Video_Menu_2.jsx`

Round 1
- Findings:
- The video generate second dropdown needed to be a wide grouped panel, not a simple list menu.
- The menu has two independent groups: video ratio and video duration, with `16:9` and `6s` selected by default.
- Action:
- Rebuilt the second video dropdown as a 378x212 panel with ratio cards and duration chips.
- Split video setting state into `selectedVideoRatio` and `selectedVideoDuration`, and updated the composer button text to use both values.

Round 2
- Findings:
- The duration strip height needed to match the PNG more closely, and the ratio labels needed centered alignment under their icons.
- Action:
- Tuned the duration board to 352x36 and kept all ratio labels full-width centered.
- Browser verification measured the panel at 378x212, ratio board at 352x91, and duration board at 352x36.
- Verified selecting `9:16` and `10s` updates the active states without affecting the grouped panel layout.

final result: passed

## Video Generate Menus

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-d2f8cd4b-e217-4df4-9547-e252dd01cd85.png`
- Paper reference: `C:/Users/Administrator/Desktop/Generate_Video_Menu_1.jsx`

Round 1
- Findings:
- The video generate composer buttons were not interactive.
- The supplied PNG/Paper reference defines the video model dropdown as a six-option list at `x=51`, `y=208`, `w=231`, `h=254`, with `Kling 3.0 Std` selected by default.
- Action:
- Added video generate model and setting state.
- Enabled both video composer dropdown buttons.
- Added a video model dropdown matching the supplied geometry and selected style.

Round 2
- Findings:
- The model menu geometry matched the reference, but non-selected text color needed to follow Paper's `#282828`.
- The second video settings button also needed a working dropdown path.
- Action:
- Tuned video dropdown option color.
- Added a video settings dropdown with selectable `16:9 / 9:16` and `6s / 10s` options.
- Verified in-browser that selecting model and setting updates the trigger buttons and auto-closes the dropdown.

final result: passed

## Image Generate Size Dropdown Strict Pass

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-122f68bf-1632-46c5-a62a-670feda8b4d4.png`
- Current comparison: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-3cb2e1fd-67d7-4ee2-ae55-5ea0174350fd.png`

Round 1
- Findings:
- The dropdown was using the wrong geometry: it was too narrow and too tall compared with the 400px reference.
- The correct reference panel is a wide, short panel: roughly `x=16`, `y=250`, `w=368`, `h=212`.
- Action:
- Rebuilt the size dropdown geometry to the wide panel.
- Reduced the ratio section to `340x92` and the clarity section to `340x36`.

Round 2
- Findings:
- The outer panel aligned, but the internal content sat about 5px too low.
- The title line-height was causing the ratio board to drift downward.
- Action:
- Reduced the dropdown section title line-height and adjusted the clarity-section top margin.
- Browser verification after this pass measured: panel `16/250/368/212`, ratio board `30/284/340/92`, clarity board `30/412/340/36`.

final result: passed

## Image Generate Size Dropdown Rebuild

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-13384ce8-48ec-492c-9a2a-50eb3ea7b0ee.png`
- Paper reference: `C:/Users/Administrator/Desktop/Generate_Image_Menu_1.jsx`

Structure:
- `ImageSizeDropdownPanel`: outer white floating panel.
- `RatioOption`: five fixed ratio choices inside the `图片比例` group.
- `ClarityOption`: three fixed clarity choices inside the `清晰度` group.

Round 1
- Findings:
- The previous implementation shared too much of the generic dropdown styling and was not isolated as the second-menu design.
- The outer panel radius, border/shadow, and selected-state blocks needed to match the PNG more closely.
- Action:
- Split the second dropdown into dedicated components.
- Reset the panel to the Paper-style 8px radius, `#DDDDE6` border, white background, and fixed `332x276` size at `left: 34px; top: 248px`.

Round 2
- Findings:
- The ratio group still looked slightly compressed compared with the PNG.
- The horizontal ratio icons for `4:3`, `9:16`, and `16:9` needed larger outlines.
- Action:
- Increased the ratio group/card height and tightened the spacing before the clarity section.
- Rebalanced the ratio outline dimensions while keeping the clarity section at the designed three-segment height.

final result: passed

## Image Generate Size Menu

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-e87bf889-516b-42b9-9f7f-df49b097075d.png`

Round 1
- Findings:
- The image-generate second dropdown was still a plain option list and did not match the grouped `图片比例 / 清晰度` layout from the design.
- The ratio selector needed icon outlines, fixed five-column spacing, and a separate three-segment clarity switch.
- Action:
- Split the image size control into two linked states: `selectedImageRatio` and `selectedImageClarity`.
- Rebuilt the dropdown as a grouped panel with ratio cards and clarity chips, while keeping the trigger button text in the `比例 | 清晰度` format.

Round 2
- Findings:
- The first grouped pass was structurally correct, but the panel shell, selected states, and inner spacing still needed to be closer to the PNG.
- Action:
- Tuned the floating panel border, shadow, padding, section spacing, ratio icon proportions, and the selected card/chip styling.
- Rechecked the live browser state and verified that selecting `16:9` and `4K` updates the trigger button text to `16:9 | 4K`.

final result: passed

## Size Clarity Panel

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-e87bf889-516b-42b9-9f7f-df49b097075d.png`

Round 1
- Findings:
- The ratio and clarity menu was still a plain text list and did not match the grouped panel in the design.
- Action:
- Rebuilt the second menu as a structured panel with two sections: `图片比例` and `清晰度`.
- Added dedicated ratio cards, clarity chips, and the corresponding visual states.

Round 2
- Findings:
- Needed to verify the grouped panel under real interaction and confirm that the second menu still updated its displayed text.
- Action:
- Rechecked the live browser state with the panel expanded and validated the menu text update path after changing clarity.

final result: passed

## Image Generate Menus

Source:
- PNG reference: `C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-a9401e13-e5b0-4e99-a2c2-8b28a67821fe.png`
- Paper reference: `C:/Users/Administrator/Desktop/Generate_Image_Menu_1.jsx`

Round 1
- Findings:
- The image generate state did not support the two dropdown interactions.
- `数字人形象` and `爆款图文` were still falling back to the image inspiration content.
- Action:
- Added dedicated menu state, selected values, and a dropdown layer for the image generate state.
- Added an empty content container for the two unsupported plaza tabs so they stay visually blank.
- Verified the first menu against the supplied PNG.

Round 2
- Findings:
- The second dropdown also needed verification, and the empty plaza tabs needed confirmation that they no longer rendered reused cards.
- Action:
- Added and verified the size dropdown panel.
- Checked the empty tabs in-browser and confirmed no image or video cards were rendered.

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
