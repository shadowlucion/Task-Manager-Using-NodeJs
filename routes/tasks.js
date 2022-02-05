const express = require('express')
const router = express.Router()
const {
    getAllTask,
    createSingleTask,
    deleteSingleTask,
    updateSingleTask,
    getSingleTask,
}  = require('../controllers/tasks')



router.route('/')
    .get(getAllTask)
    .post(createSingleTask);

router.route('/:id')
    .get(getSingleTask)
    .patch(updateSingleTask)
    .delete(deleteSingleTask);

module.exports = router;