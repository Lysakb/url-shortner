/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Signup a new user
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User details for signup
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               description: User's name
 *             email:
 *               type: string
 *               description: Email of the user
 *             password:
 *               type: string
 *               description: User's password
 *     responses:
 *       201:
 *         description: Signup successful. Returns user details
 *       400:
 *         description: Passwords do not match
 *       409:
 *         description: User already exists
 */
module.exports = { signupDoc };

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user's credentials.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               description: Email of user.
 *             password:
 *               type: string
 *               description: password of user.
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User does not exist.
 */
module.exports = { loginDoc };

/**
 * @swagger
 * /url/shorten:
 *   post:
 *     summary: Create a short url
 *     parameters:
 *       - in: Bearer token
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token to authenticate user
 *       - in: body
 *         name: Long url
 *         required: true
 *         type: string
 *         description: Long url to be shorten
 *       - in: body
 *         name: custom name
 *         required: false
 *         type: string
 *         description: Custom name to customize the short url
 *     responses:
 *       200:
 *         description: Short url created
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: Long url is invalid
 */
module.exports = {createUrl}

/**
 * @swagger
 * /user/history:
 *   get:
 *     summary: Get states based on the provided state name
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - States
 *     parameters:
 *       - in: query
 *         name: state_name
 *         required: false
 *         type: string
 *         description: Name of the state
 *       - in: query
 *         name: lga
 *         required: false
 *         type: string
 *         description: Local Government Area
 *     responses:
 *       200:
 *         description: A list of states
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: State not found
 */
exports.stateDoc = {};

/**
 * @swagger
 * /location/lga:
 *   get:
 *     summary: Get local governments based on the provided LGA name
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - Local Government
 *     parameters:
 *       - in: query
 *         name: lga_name
 *         required: false
 *         type: string
 *         description: Name of the Local Government Area
 *     responses:
 *       200:
 *         description: A list of local governments
 *       401:
 *         description: Missing or Invalid Authorization header
 *       404:
 *         description: Local Government not found
 */
exports.lgaDoc = {};
