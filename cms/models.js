var ObjectId = require('mongoose').Schema.Types.ObjectId;
var CmsModels = require('../../currentcms/lib/models');

exports = module.exports = {

  Project: {
    meta: {
      plural: "Projects",
      name: "<%= name %>",
      dashboard: true
    },
    schema: {
      name: String,
      description: String,
      clients: [{type: ObjectId, ref: 'Client'}],
      presentations: [{type: ObjectId, ref: 'Presentation'}]
    },
    browse: [
      {name: "name", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "created", cell: "char", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"},
      {name: "modified", cell: "char", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"}
    ],
    form: [
      {name: "name", widget: "input"},
      {name: "description", widget: "rich_text"},
      {name: "clients", widget: "choose_create", options: {type: "Client", array: true}},
      {name: "presentations", widget: "choose_create", options: {type: "Presentation", array: true}}
    ]
  },

  Presentation: {
    meta: {
      plural: "Presentations",
      name: "<%= name %>",
      dashboard: true
    },
    schema: {
      name: String,
      description: String,
      approved: Boolean,
      completionDate: Date,
      slides: [{type: ObjectId, ref: 'Slide'}],
      comments: [{type: ObjectId, ref: 'Comment'}]
    },
    browse: [
      {name: "name", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "approved", cell: "bool", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "completionDate", cell: "date", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "created", cell: "date", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"},
      {name: "modified", cell: "date", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"}
    ],
    form: [
      {name: "name", widget: "input"},
      {name: "description", widget: "rich_text"},
      {name: "approved", widget: "boolean"},
      {name: "completionDate", widget: "date"},
      {name: "slides", widget: "choose_create", options: {type: "Slide", array: true}},
      {name: "comments", widget: "choose_create", options: {type: "Comment", array: true}}
    ]
  },

  Slide: {
    meta: {
      plural: "Slides",
      name: "<%= title %>",
      dashboard: true
    },
    schema: {
      title: String,
      description: String,
      resources: [{type: ObjectId, ref: 'Resource'}]
    },
    browse: [
      {name: "title", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "resources", cell: "image" },
      {name: "created", cell: "date", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"},
      {name: "modified", cell: "date", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"}
    ],
    form: [
      {name: "title", widget: "input"},
      {name: "description", widget: "rich_text"},
      {name: "resources", widget: "upload", options: {type: "Resource", array: true}}
    ]
  },

  Comment: {
    meta: {
      plural: "Comments",
      name: "<%= text %>",
      dashboard: true
    },
    schema: {
      author: {type: ObjectId, ref: 'Client'},
      text: String
    },
    browse: [
      {name: "author", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "text", cell: "char", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"}
    ],
    form: [
      {name: "text", widget: "rich_text"},
      {name: "author", widget: "choose_create", options: {type: "Client", array: false}}
    ]
  },

  Client: {
    meta: {
      plural: "Clients",
      name: "<% try{ %><%= first %><% }catch(e){} %> <% try{ %><%= last %><% }catch(e){} %>",
      dashboard: true
    },
    schema: {
      title: String,
      first: String,
      last: String,
      description: String,
      email: String,
      phone: String
    },
    browse: [
      {name: "title", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "first", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "last", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "email", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "phone", cell: "char", filters: ["$regex", "="], order: "asc,desc,default"},
      {name: "created", cell: "date", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"},
      {name: "modified", cell: "date", filters: ["$gt", "$lt", "$gte", "$lte"], order: "asc,desc"}
    ],
    form: [
      {begin: 'row'},
        {name: "title", widget: "input"},
        {name: "first", widget: "input"},
        {name: "last", widget: "input"},
      {end: 'row'},
      {name: "email", widget: "input"},
      {name: "phone", widget: "input"},
      {name: "description", widget: "rich_text"}
    ]
  },

  Resource: CmsModels.ResourceInfo(),
  User: CmsModels.UserInfo()

};



