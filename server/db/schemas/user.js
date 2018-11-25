import validator from 'sjv'

export default validator({
  createdAt: Date,
  modifiedAt: Date,
  password: String,
  status: Number,
  name: String,
  email: {
    type: {
      address: String,
      verified: Boolean
    }
  },
  company: {
    type: {
      companyId: String,
      role: Number
    }
  },
  lastSeen: Date,
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
