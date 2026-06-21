# Security Specification for Italienisch Aktiv

## 1. Data Invariants
* A user's progress document can only be read, created, or updated by the owner of that document (`userId` matching authenticated `uid`).
* An user progress record must contain a valid `userId`, a bounded `displayName`, and integer `points`.
* Leaderboard reads (`list`) are restricted to reading entries where `points` is an integer, protecting other sensitive fields if any.

## 2. The "Dirty Dozen" Payloads
The following payloads should be rejected by the security rules:
1. Creating progress with non-matching `userId` in the document path (`uid` mismatch).
2. Creating progress with a `points` value that is not an integer.
3. Creating progress with a `displayName` exceeding 100 characters.
4. Setting a negative streak value.
5. Attempting to update another user's progress document.
6. Updating progress to set a fake `userId` during update.
7. Shadow updates with un-whitelisted attributes.
8. Listing without passing basic schema safety check.
9. Write operations from unauthenticated clients.
10. Spoofing owner state.
11. Admin role self-escalation.
12. Creating a document with an ID longer than 128 characters.

## 3. Recommended Tests
A `firestore.rules.test.ts` or local unit tests should verify all read and write boundaries are locked:
* `get` allowed only for owner (`userId == auth.uid`)
* `list` restricts queries and enforces layout structure
* Anonymous and Google-signed-in users can write their own progress
