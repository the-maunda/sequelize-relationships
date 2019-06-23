const User = require('../models').User;
const Profile = require('../models').Profile;

module.exports = {

	// index => loads all the roles
	index: (req, res) => Profile.findAll({
		include: [{
			model: User,
			as: 'user'
        }],
	})
		.then(profile => res.send(profile))
		.catch(error => res.status(400).send(error)),


	// Create => creates a new resource
	create: (req, res) => Profile.create(req.body)
		.then(profile => res.status(201).send(profile))
		.catch(error => res.status(400).send(error)),

	// Show => Loads a single item
	show: (req, res) => Profile.findById(req.params.id, {
        include: [{
			model: User,
			as: 'user'
        }],
    })
		.then(profile => {
			if (!profile) return res.status(404).send({ message: "Profile not found" });
			return res.status(200).send(profile);
		})
		.catch(error => res.status(400).send(error)),


	// Update => updates the resource.
	update: (req, res) => Profile.findById(req.params.id, {
		include: [{
			model: User,
			as: 'user'
        }],
	})
		.then(profile => {
			if (!profile) return res.status(404).send({ message: "Profile Resource not found" });
			return profile.update(req.body)
				.then(profile => res.status(200).send(profile))
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),

	// Delete => removes a resource from the database.
	delete: (req, res) => Profile.findById(req.params.id)
		.then(profile => {
			if (!profile) return res.status(404).send({ message: "Resource not found." });
			user.destroy()
				.then(profile => res.status(204).send(profile))
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),
};