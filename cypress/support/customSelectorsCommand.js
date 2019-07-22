const selectors = {
  postcode_lookup_input: '[name=postcode]',
  postcode_lookup_search: '#postcode_button',
  postcode_lookup_container: '.form__row--address-lookup',
  school_lookup_input: '.rbt-input-main',
};

Cypress.Commands.add("findByCustomId", { prevSubject: "element" }, (subject, id) => (
  subject.find(selectors[id])
));

Cypress.Commands.add("parentsByCustomId", { prevSubject: "element" }, (subject, id) => (
  subject.parents(selectors[id])
));

Cypress.Commands.add("parentByCustomId", { prevSubject: "element" }, (subject, id) => (
  subject.parent(selectors[id])
));
