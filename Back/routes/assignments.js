let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignmentsWithPagination(req, res) {
    // get page and limit from query string
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    let myAggregate = Assignment.aggregate();

    const options = {
        page,
        limit,
    };

    // requête de recherche par le nom
    Assignment.aggregatePaginate(myAggregate, options)
        .then((err, assignments) => {
            if (err) {
                res.send(err)
            } else {
                res.send(assignments);
            }
        });
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;
    console.log(assignmentId);

    // si on cherche un objet par une ou plusieurs propriétés autres que _id qui
    // est la clé primaire de l'objet, on peut utiliser la méthode find ou findOne
    // exemple :
    // Assignment.find({name: "Nouveau DEVOIR", rendu:false}, (err, assignment) => {
    //     if(err){res.send(err)}
    //     res.json(assignment);
    // })

    // on va plutôt faire un findById avec l'id mongoDB
    Assignment.findById(assignmentId, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.name = req.body.name;
    assignment.dueDate = req.body.dueDate;
    assignment.submitted = req.body.submitted;

    console.log("POST assignment received :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json(assignment._id)
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json("Assignment id=" + req.body._id + " updated");
        }

        // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json(assignment.nom + " deleted");
    })
}



module.exports = { getAssignmentsWithPagination, postAssignment, getAssignment, updateAssignment, deleteAssignment };
