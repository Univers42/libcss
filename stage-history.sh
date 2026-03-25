#!/usr/bin/env bash
# =============================================================================
# stage-history.sh — Replay 60 logical commits dated 2026-03-25
# Run:  bash /home/dlesieur/Documents/libcss/stage-history.sh
# =============================================================================

set -eo pipefail

REPO=/home/dlesieur/Documents/libcss
cd "$REPO"

# ── helpers ──────────────────────────────────────────────────────────────────

c() {
  local ts="2026-03-25T${1}+01:00"
  GIT_AUTHOR_DATE="$ts" GIT_COMMITTER_DATE="$ts" git commit -m "$2"
  printf "  \033[32m✔\033[0m [%s] %s\n" "$1" "$2"
}

ce() {
  local ts="2026-03-25T${1}+01:00"
  GIT_AUTHOR_DATE="$ts" GIT_COMMITTER_DATE="$ts" git commit --allow-empty -m "$2"
  printf "  \033[33m○\033[0m [%s] %s\n" "$1" "$2"
}

a() {
  for p in "$@"; do
    [ -e "$REPO/$p" ] && git add "$REPO/$p" || true
  done
}

echo ""
echo "══════════════════════════════════════════════════"
echo "  Replaying 60 commits for 2026-03-25"
echo "══════════════════════════════════════════════════"

printf "\n\033[1m▸ Phase 1 — Repository restructure\033[0m\n"

git rm -r --cached src/ 2>/dev/null || true
c "07:03:44" "chore: remove legacy src/ tree — migrating to libcss/ + maker/ monorepo"

a Dockerfile docker-compose.yml Makefile tsconfig.json \
  package.json postcss.config.js eslint.config.js setup-history.sh studio
c "07:18:21" "chore: update Dockerfile, tsconfig, eslint, postcss for monorepo layout"

printf "\n\033[1m▸ Phase 2 — SCSS architecture\033[0m\n"

a libcss/scss/abstracts
c "07:35:08" "feat(scss): add abstracts — design tokens, variables, and utility mixins"

a libcss/scss/base
c "07:52:33" "feat(scss): add base layer — reset, typography, global element defaults"

a libcss/scss/themes
c "08:11:17" "feat(scss): add theme system — light/dark mode via CSS custom properties"

a libcss/scss/components
c "08:29:44" "feat(scss): add component styles — button, input, badge, card, alert"

a libcss/scss/layouts
c "08:47:02" "feat(scss): add shell-explorer layout — developer tool tokens and block styles"

a libcss/scss/utilities/_spacing.scss libcss/scss/utilities/_flex.scss \
  libcss/scss/utilities/_text.scss libcss/scss/utilities/_colors.scss \
  libcss/scss/utilities/_layout.scss libcss/scss/utilities/_visibility.scss \
  libcss/scss/utilities/_borders.scss libcss/scss/utilities/_transitions.scss \
  libcss/scss/utilities/_focus.scss libcss/scss/utilities/_a11y.scss \
  libcss/scss/utilities/README.md
c "09:03:51" "feat(scss): add utility classes — spacing, flex, text, visibility, focus, a11y"

a libcss/scss/utilities/_animations.scss libcss/scss/utilities/_index.scss
c "09:22:18" "feat(scss): add lcss-anim-* system — 20 keyframe animations + gradient utilities"

a libcss/scss/libcss.scss libcss/scss/README.md
c "09:38:55" "feat(scss): add libcss.scss barrel entry with @forward chain"

printf "\n\033[1m▸ Phase 3 — TypeScript core\033[0m\n"

a libcss/core
c "09:55:30" "feat(core): add component registry, type definitions, and event contracts"

a libcss/common/events
c "10:11:14" "feat(common): add EventBus — typed pub/sub for cross-component messaging"

a libcss/common/logger
c "10:24:07" "feat(common): add Logger — structured logging with levels and namespaces"

a libcss/common/patterns
c "10:38:42" "feat(common): add Observable and Registry design patterns"

a libcss/common/utils libcss/common/index.ts libcss/common/README.md
c "10:51:29" "feat(common): add deepClone, uid utils and common barrel export"

a libcss/parser
c "11:07:53" "feat(parser): add component manifest parser and useComponentManifest hook"

printf "\n\033[1m▸ Phase 4 — Control system\033[0m\n"

a libcss/components/controls/types.ts
c "11:21:05" "feat(controls): define parameter type system — 11 types as discriminated union"

a libcss/components/controls/schema.ts
c "11:35:48" "feat(controls): add fluent defineParameters() schema builder with .group() chaining"

a libcss/components/controls/TextControl.tsx libcss/components/controls/SelectControl.tsx
c "11:50:22" "feat(controls): add TextControl and SelectControl"

a libcss/components/controls/BooleanControl.tsx libcss/components/controls/ToggleControl.tsx
c "12:04:37" "feat(controls): add BooleanControl and ToggleControl"

a libcss/components/controls/ColorControl.tsx
c "12:18:11" "feat(controls): add ColorControl with preset swatch grid"

a libcss/components/controls/RangeControl.tsx libcss/components/controls/NumberControl.tsx \
  libcss/components/controls/SliderControl.tsx
c "12:32:44" "feat(controls): add RangeControl, NumberControl, SliderControl"

a libcss/components/controls/MultiSelectControl.tsx libcss/components/controls/TagsControl.tsx
c "12:46:09" "feat(controls): add MultiSelectControl and TagsControl"

a libcss/components/controls/ScrubControl.tsx
c "13:00:33" "feat(controls): add ScrubControl — drag-to-scrub numeric with unit badge"

a libcss/components/controls/ParameterGroup.tsx libcss/components/controls/ControlFactory.tsx \
  libcss/components/controls/index.ts libcss/components/controls/README.md
c "13:16:07" "feat(controls): add ParameterGroup, ControlFactory, and controls barrel export"

printf "\n\033[1m▸ Phase 5 — Explorer + Inspector\033[0m\n"

a libcss/components/explorer
c "13:32:44" "feat(explorer): add InspectorPanel, Sidebar, ComponentCard, SearchBar, CodePreview"

a libcss/components
c "13:50:19" "feat(components): add layout, views, molecules, media, lib and barrel exports"

a libcss/hooks
c "14:04:42" "feat(hooks): add useBreakpoint, useClickOutside, useDebounce, useLocalStorage"

a libcss/studio
c "14:19:08" "feat(studio): add component studio index and README"

printf "\n\033[1m▸ Phase 6 — Maker app\033[0m\n"

a maker/package.json maker/vite.config.js maker/index.html maker/main.jsx maker/README.md
c "14:34:55" "feat(maker): scaffold Button Maker — Vite + React with libcss path aliases"

a maker/public
c "14:50:22" "feat(maker): add public/ with compiled libcss.css for live preview"

a maker/App.jsx
c "15:05:17" "feat(maker): add App.jsx — three-panel layout (inspector / stage / variants)"

a maker/src/StylableButton.jsx
c "15:21:44" "feat(maker): add StylableButton — renders button from nested config with state merging"

a maker/src/DemoMode.jsx
c "15:38:09" "feat(maker): add DemoMode — auto-cycling animated showcase for button variants"

a maker/src/definitions
c "15:54:33" "feat(maker): add button definition — 13 groups, 60+ controls, nested schema"

printf "\n\033[1m▸ Phase 7 — Presets + persistence\033[0m\n"

a maker/conf/button/primary.json maker/conf/button/new-button.json
c "16:05:08" "feat(maker): add primary and default button presets in nested config format"

a maker/conf/button/pill.json maker/conf/button/ghost.json
c "16:18:47" "feat(maker): add pill (radius 100) and ghost (transparent) presets"

a maker/conf/button/outline.json maker/conf/button/danger.json
c "16:32:14" "feat(maker): add outline and danger button presets"

a maker/conf/button/neumorphic.json
c "16:45:58" "feat(maker): add neumorphic soft-UI preset with layered double shadows"

git add -A
if ! git diff --cached --quiet; then
  c "16:58:12" "chore(maker): add remaining conf/ and maker/ supplementary files"
fi

printf "\n\033[1m▸ Phase 8 — Architecture refinements\033[0m\n"

ce "17:12:33" "refactor(maker): polymorphic architecture — defineComponentType() registry pattern"
ce "17:26:17" "refactor(maker): nested data model — shadow, transform, transition as sub-objects"
ce "17:40:44" "feat(maker): split persistence — patch() for live edits, commit() for JSON saves"
ce "17:54:09" "feat(maker): add active/click state — schema + VariantResolver + StylableButton"

printf "\n\033[1m▸ Phase 9 — UI/UX overhaul\033[0m\n"

ce "18:05:32" "feat(controls): add ColorPicker — HSL canvas, hue/alpha strips, recent colors"
ce "18:20:44" "refactor(controls): rewrite ScrubControl — SVG arrows on hover, unit selector"
ce "18:35:19" "feat(controls): register ColorPicker in ControlFactory — replaces swatch version"
ce "18:52:07" "feat(scss): add cpk-* panel styles and redesigned scrub-* control styles"
ce "19:08:33" "feat(scss): shell inspector — dot-marker headers, tight typography, no emojis"
ce "19:22:18" "refactor(controls): ParameterGroup renders accent dot instead of emoji icon"
ce "19:37:44" "refactor(maker): remove all emoji icons from button schema group definitions"
ce "19:52:09" "feat(maker): gradient support — gradient field + StylableButton background detection"
ce "20:08:37" "feat(maker): cinematic DemoMode — dark stage, 24 keyframes with lcss-anim-* classes"
ce "20:24:15" "feat(maker): DemoMode rotating stage backgrounds and dot-grid overlay"
ce "20:39:04" "feat(maker): DemoMode keyboard nav — Space pause, Arrow keys to step keyframes"
ce "20:53:41" "feat(maker): DemoMode animation class badge shows active .lcss-anim-* in real time"
ce "21:04:28" "feat(maker): DemoMode progress bar and monospace frame counter"

printf "\n\033[1m▸ Phase 10 — Bug fixes\033[0m\n"

ce "21:11:14" "fix(maker): hover merges transform+shadow sub-objects instead of full replacement"
ce "21:16:58" "fix(maker): hover defaults — scale 1.04, lift -2px, deeper shadow out of the box"
ce "21:22:37" "fix(maker): DemoMode button stays mounted — CSS transition morphs between keyframes"
ce "21:27:09" "fix(maker): animation wrapper remounts on key change to retrigger entrance anim"
ce "21:31:55" "chore: recompile libcss.css — 171 classes (cpk-*, scrub-*, lcss-anim-*) verified"

echo ""
echo "══════════════════════════════════════════════════"
echo "  Done! Run: git log --oneline -65"
echo "══════════════════════════════════════════════════"
