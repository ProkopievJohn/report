import validator from 'sjv'

export default validator({
  createdAt: Date,
  modifiedAt: Date,
  password: String,
  email: {
    type: {
      address: String,
      verified: Boolean
    }
  },
  companies: {
    type: [{
      companyId: String,
      role: Number
    }]
  },
  lastSeen: Date
})
