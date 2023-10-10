
const axios = require('axios');
const dayjs = require('dayjs');

async function getUser() {
    try {
      const { data } = await axios.get('https://graph.facebook.com/v18.0/1390167227872503/feed?access_token=EAABwzLixnjYBO2Di31VKiRE5nDN6pfkOkj1t6ZBRtuxXmioodkveCy9YyhWkjQWKBBa5VYNwFu8PDbwGtdmKZB3qqpumSkQeLKm3OsCJWO3NJSDyWG4mCZAjfJ0ZAMKjMvk354UEiyxmQNZAlMyBOoK687Y7qZB9xKxqAn6w9ZBA7gq3fNNCGqklwGoLTK9yZBXNhawVznYZD&fields=created_time,message,id&limit=5');
      
      const groups = data.data.map(fb => {
        return {
            ...fb, created_time: dayjs(fb.created_time).format('YYYY-MM-DD HH:mm:ss')
        }
      })
        const post = findLatestPost(groups)

      console.log(post);
    } catch (error) {
      console.error(error);
    }
}

// Hàm để tìm bài viết có thời gian lớn nhất
function findLatestPost(posts) {
    var latestPost = null;
    var latestTime = 0;
  
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var postTime = new Date(post.created_time).getTime();
  
      if (postTime > latestTime) {
        latestTime = postTime;
        latestPost = post;
      }
    }
  
    return latestPost;
  }
getUser()