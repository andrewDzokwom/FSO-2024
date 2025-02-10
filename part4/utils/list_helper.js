function dummy(blogs){
  return 1
}

function totalLikes(blogs){
  function sumReducer (sum, current){
    return sum + current.likes
  }
  return blogs.reduce(sumReducer, 0)
}

module.exports = { dummy, totalLikes }