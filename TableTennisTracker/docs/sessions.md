# Create Training Session — MVP Specification

## Scope

This document defines the **MVP Create Training Session screen**.  
Focus: **fast manual entry**, **low friction**, **high analytical value**.  
Single-user app → **no user identity fields on client**.

---

## Screen: Create Training Session (MVP)

### Goal

Allow the user to quickly log a training session in under **30 seconds**.

---

## UI Fields (Client-Side)

### 1. Date

- **Field name:** `date`
- **Type:** `LocalDate`
- **Required:** YES
- **Default:** Today
- **UI:** Date picker

---

### 2. Duration

- **Field name:** `duration_min`
- **Type:** `Int`
- **Required:** YES
- **Range:** 5–300
- **UI:** Numeric input or slider
- **Unit:** Minutes

---

### 3. Session Type

- **Field name:** `session_type`
- **Type:** `Enum`
- **Required:** YES
- **UI:** Single-select chips / dropdown

**Allowed values:**

- `TECHNIQUE`
- `MATCH_PLAY`
- `SERVE_PRACTICE`
- `PHYSICAL`
- `FREE_PLAY`

---

### 4. Intensity (RPE)

- **Field name:** `rpe`
- **Type:** `Int`
- **Required:** YES
- **Range:** 1–10
- **UI:** Slider with labels

**Label guidance:**

- 1–2 → Very easy
- 3–4 → Easy
- 5–6 → Moderate
- 7–8 → Hard
- 9–10 → Max effort

---

### 5. Notes

- **Field name:** `notes`
- **Type:** `String`
- **Required:** NO
- **UI:** Multiline text
- **Max length:** 1000 chars (soft limit)

---

## Fields Explicitly NOT in MVP

Do NOT include in this screen:

- `user_id`
- technical focus
- match statistics
- warmup / cooldown
- location / partner
- subjective feelings
- exercises / drills

These will be added in later iterations.

---

## Persistence Model (MVP)

### Stored Fields

- `id` (UUID, generated locally)
- `date`
- `duration_min`
- `session_type`
- `rpe`
- `notes`
- `created_at`
- `updated_at`
- `is_dirty` (boolean, default true)

### Backend Responsibility

- Attach `user_id` from auth context
- Handle sync & conflict resolution

---

## Validation Rules

- `duration_min > 0`
- `rpe in 1..10`
- `session_type` must be defined
- `date` cannot be in the future (soft rule)

---

## UX Rules

- Single screen
- Minimal scrolling
- Primary CTA: **Save Session**
- Secondary CTA: **Cancel**
- Save is disabled until required fields are valid

---

## Future-Compatible Notes

This MVP data model is **forward-compatible** with:

- session structure breakdown
- drill-level tracking
- weekly load analytics
- coaching features

No migrations required when expanding.

---

## End of MVP Spec