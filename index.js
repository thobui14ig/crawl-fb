const axios = require('axios');
const dayjs = require('dayjs');
const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "103.79.143.150",
  user: "root",
  password: "123456",
  database: 'hoctienganh',
  insecureAuth : true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const ids = [618114715010581, 452769581947089, 533851090781667, 296769157540088, 382908015245608, 118056438849756, 309364699595518, 283314998828030, 289369428379939, 270943974674097, 1441789296060907,1390167227872503]
const token = `EAABwzLixnjYBO2Di31VKiRE5nDN6pfkOkj1t6ZBRtuxXmioodkveCy9YyhWkjQWKBBa5VYNwFu8PDbwGtdmKZB3qqpumSkQeLKm3OsCJWO3NJSDyWG4mCZAjfJ0ZAMKjMvk354UEiyxmQNZAlMyBOoK687Y7qZB9xKxqAn6w9ZBA7gq3fNNCGqklwGoLTK9yZBXNhawVznYZD`


async function getUser() {
    try {
        const apis = ids.map(id => {
            const api = `https://graph.facebook.com/v18.0/${id}/feed?access_token=${token}&fields=created_time,message,id&limit=5`
            return axios.get(api);
        })


        const data = await Promise.all(apis)
        for (const items of data) {
          const post = findLatestPost(items.data.data)
          const input = {
              postId: post.id.split('_')[1],
              authorId: '111111',
              authorId: 'Test',
              content: post?.message ? post?.message.slice(10, 30) : '',
              time: dayjs(post.created_time).format('YYYY-MM-DD HH:mm:ss')
          };
          
          await axios({
            method: 'post',
            url: 'https://buithanhtho.name.vn/api/post',
            data: input
          });
        }

        
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

  setInterval(getUser, 3500);