var ACTIVE = 'active';
var RECORDED = 'recorded';
var ANNOTATED = 'annotated';
var VALIDATED = 'validated';

exports = module.exports = {
  default: ACTIVE,
  states: [ACTIVE, RECORDED, ANNOTATED, VALIDATED],
  ACTIVE: { name: "Active" },
  RECORDED: {name: "Recorded"},
  ANNOTATED: {name: "Annotated"},
  VALIDATED: {name: "Validated"},
  groups: {
    admin: "editor",
    editor: {
      transitions: [
        {from: ACTIVE, to: [RECORDED, ANNOTATED, VALIDATED]},
        {from: RECORDED, to: [ACTIVE]},
        {from: ANNOTATED, to: [ACTIVE]}
      ]
    }
//    contributor: {
//      transitions: [],
//      requests: [
//        {from: DRAFT, to: [PUBLISHED]},
//        {from: PUBLISHED, to: [DRAFT]},
//        {from: PUBLISHED, to: [FLAGGED]}
//      ]
//    }
  }
}
