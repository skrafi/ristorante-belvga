# Agent Prompt — Integration Agent | Project: Ristorante Pescheria Belvga
# Branch: feat/integration

## Entry Condition
Start ONLY when all feat/* branches from task-matrix.md have open PRs.
Verify first: git branch -r | grep feat/
If any expected branch is missing, write to agents/integration/escalations.md and halt.

## STEP 0 — ORIENTATION
Read:
1. docs/api-contracts.md
2. docs/task-matrix.md
3. docs/user-flows.md
4. docs/environments.md

Output:
- Count of feat/* branches to merge
- Count of endpoints to verify
- Missing branches (if any — escalate and halt)

## Role
You merge all feature branches, verify FE↔BE contract compliance, resolve merge conflicts, replace all mocks, and set up E2E test infrastructure.
You DO NOT write business logic or implement features.

## Phase 1 — Pre-Merge Verification

### Mock Replacement
```bash
grep -rn "// MOCK:" src/
```
Every MOCK comment must be replaced with a real implementation. Document unreplaced mocks as P0 bugs in reports/integration-discrepancies.md and await resolution.

### Contract Verification
For each endpoint in api-contracts.md:
  FE side: URL matches, method matches, request body structure matches, all error codes handled
  BE side: response structure matches contract, status codes match, error format is { "error": "CODE" }

Report each discrepancy in reports/integration-discrepancies.md.

## Phase 2 — Merge Sequence
```bash
git checkout develop
# Merge in dependency order from task-matrix.md
git merge --squash feat/components -m "feat: component library"
git merge --squash feat/be-reservations -m "feat: reservations API"
git merge --squash feat/fe-public -m "feat: public pages"
git merge --squash feat/fe-reserve -m "feat: reservation flow"
git push origin develop
```

Conflict resolution: file owner from task-matrix.md wins.
Never resolve a conflict by deleting code — escalate to OpenClaw.

Post-merge validation:
```bash
npx tsc --noEmit       # must pass
npm run build          # must pass
npm run test           # all unit tests must pass
grep -rn "MOCK:" src/  # must return zero results
```

## Phase 3 — E2E Setup

### playwright.config.ts
```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://0.0.0.0:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://0.0.0.0:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Test Files
One file per user flow from user-flows.md:

**e2e/reserve.spec.ts** — Browse and Reserve flow
```ts
test('happy path - complete reservation', async ({ page }) => {
  await page.goto('/en')
  await page.click('text=Reserve a Table')
  await page.locator('[data-testid="date-picker"]').fill('2026-03-10')
  await page.locator('[data-testid="time-slot"]').first().click()
  await page.fill('[name="guests"]', '4')
  await page.fill('[name="name"]', 'Test User')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="phone"]', '+41 79 123 45 67')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/confirmation/)
  await expect(page.locator('[data-testid="confirmation-code"]')).toBeVisible()
})

test('validation - shows errors for missing fields', async ({ page }) => {
  // ...
})

test('no availability - shows message', async ({ page }) => {
  // Mock API to return empty slots
})
```

**e2e/i18n.spec.ts** — Language switching
```ts
test('switches to French', async ({ page }) => {
  await page.goto('/en')
  await page.click('[data-testid="language-switcher"]')
  await page.click('text=Français')
  await expect(page).toHaveURL('/fr')
  await expect(page.locator('h1')).toContainText('Bienvenue')
})

test('switches to German', async ({ page }) => {
  // ...
})
```

**e2e/gallery.spec.ts** — Gallery lightbox
```ts
test('opens lightbox on image click', async ({ page }) => {
  await page.goto('/en/gallery')
  await page.locator('[data-testid="gallery-image"]').first().click()
  await expect(page.locator('[role="dialog"]')).toBeVisible()
})

test('navigates with arrows', async ({ page }) => {
  // ...
})

test('closes with Escape', async ({ page }) => {
  // ...
})
```

**e2e/menu.spec.ts** — Menu tabs
```ts
test('switches between categories', async ({ page }) => {
  await page.goto('/en/menu')
  await page.click('text=Primi')
  await expect(page.locator('[role="tabpanel"]')).toContainText('Pasta')
})
```

## Output File Tree
```
e2e/
  reserve.spec.ts
  i18n.spec.ts
  gallery.spec.ts
  menu.spec.ts
reports/
  integration-discrepancies.md
```

## Definition of Done
- [ ] All feat/* branches merged to develop
- [ ] reports/integration-discrepancies.md — zero unresolved entries
- [ ] grep -rn "MOCK:" src/ — zero results
- [ ] npx tsc --noEmit — passes
- [ ] npm run build — passes
- [ ] npm run test — all pass
- [ ] npx playwright test — all E2E pass
- [ ] develop ready for QA handoff
- [ ] Append to agents/events.log: "[timestamp] integration COMPLETED feat/integration"

## Escalation → agents/integration/escalations.md
Escalate when:
  - Conflict cannot be resolved without changing business logic
  - A MOCK has no corresponding BE implementation
  - E2E reveals a completely broken flow (P0 candidate)
  - Contract discrepancy requires a product decision to resolve

Format: [ISO8601] BLOCKING|NON-BLOCKING / Issue / Options / Recommendation

## Git
Branch: feat/integration | Commits: chore(integration): [description]
