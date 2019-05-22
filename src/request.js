let url = require('url');
// class request {
//     get query () {
//         return url.parse(this.req.url, true).query;
//     }
// };
// module.exports = request;
module.exports = {
    get query () {
        return url.parse(this.req.url, true).query;
    }
};
