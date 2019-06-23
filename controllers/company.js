const Company = require('./../models').Company;
const Branch = require('./../models').Branch;

module.exports = {

    // get all companies.
    index: (req, res) => Company.findAll({
        include: [{
            model: Branch,
            as: 'branches'
        }],
    })
        .then(companies => res.status(200).send(companies))
        .catch(error => res.status(400).send(error)),

    //get one company.
    show: (req, res) => Company.findById(req.params.id, {
        include: [{
            model: Branch,
            as: 'branches'
        }],
    })
        .then(company => {
            if (!company) return res.status(404).send({ message: "Company resources not found" });
            return res.status(200).send(company);
        })
        .catch(error => res.status(400).send(error)),

    //create  an  new company.
    create: (req, res) => Company.create(req.body)
        .then(company => res.status(201).send(company))
        .catch(error => res.status(400).send(error)),

    // Update company.
    update: (req, res) => Company.findById()
        .then(company => {
            if (!company) return res.status(404).send({ message: "Company resource not found"});
            company.update(req.body)
            .then(company => res.status(200).send(company))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error)),

    addWithBranches: (req, res) => Company.create({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        branches: req.body.branches
    }, {
        include: [{
            model: Branch,
            as: 'branches'
        }]
    })
    .then(company => res.status(200).send(company))
    .catch(error => res.status(400).send(error)),

    // delete company.
    delete: (req, res) => Company.findById(req.params.id)
    .then(company => {
        if (!company) res.status(404).send({ message: "Company resource not found"});
        company.destroy()
        .then(company => res.status(204).send(company))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error)),
};