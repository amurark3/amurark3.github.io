import { test } from "node:test";
import assert from "node:assert/strict";
import { resume } from "./resume.ts";

const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
};

test("basics has a valid email and outbound links", () => {
  const { email, links } = resume.basics;
  assert.match(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.ok(isHttpUrl(links.github));
  assert.ok(isHttpUrl(links.linkedin));
  assert.ok(links.resume.startsWith("/") && links.resume.endsWith(".pdf"));
});

test("every experience entry is complete", () => {
  assert.ok(resume.experience.length > 0);
  for (const job of resume.experience) {
    assert.ok(job.company && job.role && job.period && job.tabLabel, job.company);
    assert.ok(isHttpUrl(job.url), job.url);
    assert.ok(job.bullets.length > 0, `${job.company} has no bullets`);
  }
});

test("experience tab labels are unique so tabs have stable ids", () => {
  const labels = resume.experience.map((job) => job.tabLabel);
  assert.equal(new Set(labels).size, labels.length);
});

test("project links are valid when present", () => {
  for (const project of resume.projects) {
    assert.ok(project.title && project.description && project.tech.length > 0, project.title);
    if (project.github) assert.ok(isHttpUrl(project.github), project.github);
    if (project.live) assert.ok(isHttpUrl(project.live), project.live);
  }
});

test("skill groups and education are non-empty", () => {
  assert.ok(resume.skills.every((group) => group.items.length > 0));
  assert.ok(resume.education.every((entry) => isHttpUrl(entry.url)));
});
