const { test } = require('node:test');
const assert = require('node:assert');

const { riddleLoader, loadStory } = require('./../intropage/script');
const { FakeDocument, FakeElement } = require('./utils/fakeDom');

test('riddleLoader builds carousel markup for each clue line', () => {
  const doc = new FakeDocument();
  const inner = new FakeElement('div', doc);
  const indicators = new FakeElement('ol', doc);
  doc.setSelector('.carousel-inner', inner);
  doc.setSelector('.carousel-indicators', indicators);

  riddleLoader('First line\nSecond line', doc);

  assert.ok(inner.innerHTML.includes('First line'));
  assert.ok(inner.innerHTML.includes('Second line'));
  assert.ok(indicators.innerHTML.includes('data-bs-slide-to="0"'));
  assert.ok(indicators.innerHTML.includes('data-bs-slide-to="1"'));
});

test('loadStory fetches story data and writes to DOM', async () => {
  const doc = new FakeDocument();
  const title = new FakeElement('h1', doc);
  const intro = new FakeElement('div', doc);
  const riddle = new FakeElement('div', doc);
  doc.setSelector('.page-title', title);
  doc.setSelector('.intro-text', intro);
  doc.setSelector('.riddle-box', riddle);
  doc.setSelector('.carousel-inner', new FakeElement('div', doc));
  doc.setSelector('.carousel-indicators', new FakeElement('ol', doc));

  const fetchStub = async () => ({
    json: async () => ({
      story_title: 'A Title',
      story_outline: 'Outline',
      riddle_text: 'Clue 1\nClue 2'
    })
  });

  await loadStory(doc, fetchStub, 1);

  assert.equal(title.textContent, 'A Title');
  assert.ok(intro.innerHTML.includes('Outline'));
});