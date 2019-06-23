const Company = require('./../models').Company;
const Branch = require('./../models').Branch;

module.exports = {

    // get all companies.
    index: (req, res) => (req, res) => Branch.findAll({
        include: [{
            model: Company,
            as: 'company'
        }],
    })
        .then(branch => res.send(branch))
        .catch(error => res.status(400).send(error)),

    //get one company.
    show: (req, res) => Branch.findById(req.params.id, {
        include: [{
            model: Company,
            as: 'company'
        }],
    })
        .then(branch => {
            if (!branch) return res.status(404).send({ message: "Branch resources not found" });
            return res.status(200).send(branch);
        })
        .catch(error => res.status(400).send(error)),

    //create  an  new company.
    create: (req, res) => Branch.create(req.body)
        .then(branch => res.status(201).send(branch))
        .catch(error => res.status(400).send(error)),

    // Update company.
    update: (req, res) => Branch.findById()
        .then(branch => {
            if (!branch) return res.status(404).send({ message: "Branch resource not found"});
            company.update(req.body)
            .then(branch => res.status(200).send(branch))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error)),

    // delete company.
    delete: (req, res) => Branch.findById(req.params.id)
    .then(branch => {
        if (!branch) res.status(404).send({ message: "Branch resource not found"});
        company.destroy()
        .then(branch => res.status(204).send(branch))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error)),
};