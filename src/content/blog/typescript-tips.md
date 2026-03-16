---
title: "TypeScript Patterns I Use Daily"
date: "2026-01-22"
description: "A handful of TypeScript patterns that make codebases more maintainable and catch bugs earlier."
slug: "typescript-tips"
---

# TypeScript Patterns I Use Daily

After years of writing TypeScript, certain patterns have become second nature for writing robust code.

## Branded types

Prevent mixing IDs of different entities at compile time:

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function getUser(id: UserId) { ... }
// getUser(postId) → compile error ✓
```

## Exhaustive switch

```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}
```

Add this to switch statements to catch missing cases at compile time.

## Const assertions

```typescript
const STATUS = ['active', 'inactive', 'pending'] as const;
type Status = typeof STATUS[number];
```

Clean alternative to enums with better inference.
