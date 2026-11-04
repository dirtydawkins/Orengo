import test from "node:test";
import assert from "node:assert/strict";
import {
  createEnquiry,
  detailLimit,
  projectTypes,
  projectStages,
} from "../src/lib/enquiry.ts";

test("every project and stage produces a complete draft without optional details", () => {
  for (const type of projectTypes)
    for (const stage of projectStages) {
      const { message, subject } = createEnquiry(type.id, stage.id);
      assert.ok(message.startsWith("Hi Lameck,"));
      assert.ok(message.includes(type.phrase));
      assert.ok(message.includes(stage.phrase));
      assert.equal(message.split("\n").length, 2);
      assert.equal(message.trim(), message);
      assert.ok(subject.includes(type.label));
    }
});

test("draft details remain plain text and survive URL encoding without adding query parameters", () => {
  const details =
    "Bookings for A&B + café?\r\n<script>example</script> # Nairobi";
  const draft = createEnquiry("booking", "idea", `  ${details}  `);
  const url = new URL(
    `https://wa.me/254705370435?text=${encodeURIComponent(draft.message)}`,
  );
  assert.equal(url.pathname, "/254705370435");
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  assert.equal(url.searchParams.get("text"), draft.message);
  assert.ok(draft.message.endsWith(details.replace("\r\n", "\n")));
  const mail = new URL(
    `mailto:elorengo26@gmail.com?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.message)}`,
  );
  assert.equal(mail.searchParams.get("body"), draft.message);
  assert.equal(mail.searchParams.get("subject"), draft.subject);
});

test("empty details are omitted and long descriptions are bounded", () => {
  assert.equal(
    createEnquiry("other", "new", " \r\n ").message,
    createEnquiry("other", "new").message,
  );
  assert.equal(
    createEnquiry(
      "website",
      "existing",
      "x".repeat(detailLimit + 30),
    ).message.split("\n\n")[1].length,
    detailLimit,
  );
});

test("unexpected choices do not silently create a misleading draft", () => {
  assert.throws(() => createEnquiry("unknown", "idea"), /Choose a valid/);
  assert.throws(() => createEnquiry("booking", "unknown"), /Choose a valid/);
});
