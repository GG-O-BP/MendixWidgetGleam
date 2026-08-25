import assert from "node:assert/strict";
import test from "node:test";

import {
  generateNames,
  isValidProjectName,
  splitWords,
} from "../src/naming.mjs";

test("name conversion preserves deterministic word order", () => {
  assert.deepEqual(splitWords("Order_Status-Widget"), [
    "order",
    "status",
    "widget",
  ]);
  assert.deepEqual(generateNames("Order_Status-Widget"), {
    pascalCase: "OrderStatusWidget",
    snakeCase: "order_status_widget",
    lowerCase: "orderstatuswidget",
    displayName: "Order Status Widget",
    kebabCase: "order-status-widget",
  });
});

test("valid names cover alphabetic boundaries", () => {
  assert.equal(isValidProjectName("A"), true);
  assert.equal(isValidProjectName("alpha_beta-widget"), true);
  assert.equal(isValidProjectName("widget2"), true);
});

test("invalid and empty names cannot produce unsafe Mendix identifiers", () => {
  for (const value of ["", "   ", "1widget", "widget/path", "위젯"]) {
    assert.equal(isValidProjectName(value), false, value);
    assert.equal(generateNames(value), null, value);
  }
});
