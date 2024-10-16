const Poster = require('../models/poster');

const add = async (name, imageFile) => {
    try {
        // Check for required fields
        if (!name) {
            throw new Error('Poster name is required!');
        }

        let posterData = {
            name: name,
        };

        if (imageFile && imageFile.filename) {
            posterData.img = imageFile.filename;
        }

        const poster = await Poster.create(posterData);
        return poster;
    } catch (error) {
        throw new Error(error);
    }
}


const allPosters = async () => {
    try {
        const allPosters = await Poster.findAll({
            attributes: {
                exclude: ['updatedAt']
            }
        });

        const formattedPosters = allPosters.map(poster => {
            const formattedDate = new Date(poster.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const imageUrl = `http://localhost:4000/${poster.img}`;
            return {
                id: poster.id,         // Add id field
                name: poster.name,     // Add name field
                addedDate: formattedDate,
                img: imageUrl
            };
        });

        return formattedPosters;
    } catch (error) {
        throw new Error(error);
    }
}



const onePoster = async (name) => {
    try {
        const onePoster = await Poster.findOne({ where: { name: name } });
        return onePoster;
    } catch (error) {
        throw new Error('Error while fetching Poster');
    }
};

module.exports = {
    add,
    allPosters,
    onePoster
}