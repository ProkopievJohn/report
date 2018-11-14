import validator from 'sjv'

export default validator({
  companyId: String,
  creatorId: String,
  name: String,
  description: String,
  since: Date,
  to: Date,
  createdAt: Date,
  modifiedAt: Date,
  status: Number,
  abilities: {
    type: [{
      abilityId: String,
      quantity: Number
    }]
  },
  history: {
    type: [{
      createdAt: Date,
      action: {
        type: String,
        validate: [value => (
          ['created', 'modified', 'deleted'].indexOf(value) !== -1
            ? Promise.resolve()
            : Promise.reject(new Error('Wrong History Action'))
        )]
      },
      modifiedValues: Object
    }],
    minCount: 1
  }
})
