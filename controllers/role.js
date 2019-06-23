// import all the required files.
const Role = require('../models').Role;
const User = require('../models').User;


module.exports = {

	// index => loads all the roles
	index: (req, res) => Role.findAll({
		include: [{
			model: User,
			as: 'users'
		}],
	})
		.then(roles => res.send(roles))
		.catch(error => res.status(400).send(error)),


	// Create => creates a new resource
	create: (req, res) => Role.create(req.body)
		.then(role => res.status(201).send(role))
		.catch(error => res.status(400).send(error)),

	// Show => Loads a single item
	show: (req, res) => Role.findById(req.params.id, {
		include: [{
			model: User,
			as: 'users'
		}],
	})
		.then(role => {
			if (!role) return res.status(404).send({ message: "Role not found" });
			return res.status(200).send(role);
		})
		.catch(error => res.status(400).send(error)),


	// Add user
	addUser: (req, res) => Role.findById(req.body.role_id, {
		include: [{
			model: User,
			as: 'users'
		}],
	})
		.then(role => {
			if (!role) return res.status(404).send({ message: "Role not found" });

			User.findById(req.body.role_id)
				.then(course => {
					if (!course) return res.status(404).send({ message: "User not found" });

					role.addUser(course);
					return res.status(200).send(role);
				})
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),




	// Update => updates the resource.
	update: (req, res) => Role.findById(req.params.id, {
		include: [{
			model: User,
			as: 'users'
		}],
	})
		.then(role => {
			if (!role) return res.status(404).send({ message: "Resource not found" });
			return role.update({
				name: request.body.name || classroom.name,
			})
				.then(role => res.status(200).send(role))
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),

	// Delete => removes a resource from the database.
	delete: (req, res) => Role.findById(req.params.id)
		.then(role => {
			if (!role) return res.status(404).send({ message: "Resource not found." });
			role.destroy()
				.then(role => res.status(204).send(role))
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),
};
