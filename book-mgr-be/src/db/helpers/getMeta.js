const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: +new Date()
    },
    updatedAt: {
      type: Number,
      dafault: (new Date()).getTime()
    }
  }
}

module.exports = {
  getMeta
};