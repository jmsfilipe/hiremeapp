var uuid = require('node-uuid');

module.exports = {

    'secret': uuid.v4(),
    'database': 'mongodb://hiremeapp:hiremeapp@ds023714.mlab.com:23714/hiremeapp'

};