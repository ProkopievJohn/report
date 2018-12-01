import validator from 'sjv'

export default validator({
  companyId: String,
  creatorId: String,
  projectId: String,
  userId: String,
  abilityId: String,
  hours: Number,
  sonce: Date,
  to: Date,
  createdAt: Date,
  modifiedAt: Date,
  status: Number,
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
