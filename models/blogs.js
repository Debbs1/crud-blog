const mongoose = require('mongoose');
const slugify = require('slugify');

const blogScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    img: {
        type: String,
        required: false,
        default: "placeholder.jpg"
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }
});

// blogScheme.pre('validate', (next) => {
//     if (this.title) {
//         this.slug = slugify(this.title, { lower: true, strict: true });
//     }
//     next()
// })

module.exports = mongoose.model('Blog', blogScheme);
