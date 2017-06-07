import { Router } from 'express';

const router = Router();

// Mock Users
const users = [
    {name: 'Alexandre'},
    {name: 'Sebastien'}
];

/**
 * GET users list
 */
router.get('/users', function(req, res, next){
    res.json(users);
})

/**
 * GET user by id
 */
router.get('/users/:id', function(req, res, next){
    let id = parseInt(req.params.id);
    if(id >= 0 && id < users.length){
        res.json(users[id]);
    } else {
        res.sendStatus(404);
    }
});

export default router;