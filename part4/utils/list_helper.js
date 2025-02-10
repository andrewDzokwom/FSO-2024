function dummy(blogs){
  return 1
}

function totalLikes(blogs){
  function sumReducer (sum, current){
    return sum + current.likes
  }
  return blogs.reduce(sumReducer, 0)
}

function favoriteBlog(blogs){
  const arrOfLikes = blogs.map(blog => blog.likes)
  const highestLike = Math.max(...arrOfLikes)
  const favBlog = blogs.find(blog => blog.likes === highestLike)
  return blogs.length ===0 ? {} : favBlog

}

module.exports = { dummy, totalLikes, favoriteBlog, favoriteBlog }