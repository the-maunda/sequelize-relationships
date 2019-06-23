// import all the required files.
const User = require('../models').User;
const Profile = require('../models').Profile;
const Role = require('../models').Role;
const RoleUser = require('../models').RoleUser;


module.exports = {

	// index => loads all the roles
	index: (req, res) => User.findAll({
		include: [{
			model: Profile,
			as: 'profile'
        }, 
        {
            model: Role,
            as: 'roles',
        }],
	})
		.then(users => res.send(users))
		.catch(error => res.status(400).send(error)),


	// Create => creates a new resource
	create: (req, res) => User.create(req.body)
		.then(user => res.status(201).send(user))
		.catch(error => res.status(400).send(error)),

	// Show => Loads a single item
	show: (req, res) => User.findById(req.params.id, {
        include: [{
			model: Profile,
			as: 'profile'
        }, 
        {
            model: Role,
            as: 'roles',
        }],
    })
		.then(user => {
			if (!user) return res.status(404).send({ message: "User not found" });
			return res.status(200).send(user);
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
	update: (req, res) => User.findById(req.params.id, {
		include: [{
			model: Role,
			as: 'roles'
        }, 
        {
            model: Profile,
            as: 'profile',
        }
    ],
	})
		.then(user => {
			if (!user) return res.status(404).send({ message: "Resource not found" });
			return user.update(req.body)
				.then(user => res.status(200).send(user))
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),

	// Delete => removes a resource from the database.
	delete: (req, res) => Role.findById(req.params.id)
		.then(user => {
			if (!user) return res.status(404).send({ message: "Resource not found." });
			user.destroy()
				.then(user => res.status(204).send(user))
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error)),
};
