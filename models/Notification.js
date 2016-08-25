var mongoose = require("mongoose");

var NotificationSchema = new mongoose.Schema({
    content: {
        type: String
    },
    link: {
        type: String
    },
    isRead: {
        type: Boolean
    }
});

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = {
    Notification: Notification
}
