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
exports.userSignup ={};

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
exports.userLogin ={};

/**
 * @swagger
 * /url/shorten:
 *   post:
 *     summary: Create a short url
 *     tags:
 *       - URL Shortening
 *     parameters:
 *       - in: Bearer token
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token to authenticate user
 *       - in: body
 *         name: Original url
 *         required: true
 *         type: string
 *         description: Original url to be shorten
 *       - in: body
 *         name: custom name
 *         required: false
 *         type: string
 *         description: Custom name to customize the short url
 *     responses:
 *       200:
 *         description: Short url created
 *       401:
 *         description: Invalid Token
 *       404:
 *         description: Original url is invalid
 */
exports.createShortenUrl = {}

/**
 * @swagger
 * /:shortUrl:
 *   get:
 *     summary: Redirect the short url to the original url
 *     tags:
 *       - URL Shortening
 *     parameters:
 *       - in: Path
 *         name: shortUrl
 *         required: true
 *         type: string
 *         description: The url to be found
 *       - in: Bearer token
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token to authenticate user
 *     responses:
 *       200:
 *         description: Content of the original url
 *       401:
 *         description: Invalid Token
 *       404:
 *         description: Url not found
 */
exports.getUrl = {};

/**
 * @swagger
 * /user/history:
 *   get:
 *     summary: Get History of users
 *     tags:
 *       - URL Shortening
 *     parameters:
 *       - in: Bearer token
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token to authenticate user
 *     responses:
 *       200:
 *         description: History of the user
 *       401:
 *         description: Invalid Token
 *       404:
 *         description: User not found
 */
exports.userHistory = {};

/**
 * @swagger
 * /user/link:
 *   get:
 *     summary: Get all short url link created by the user
 *     tags:
 *       - URL Shortening
 *     parameters:
 *       - in: Bearer token
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token to authenticate user
 *     responses:
 *       200:
 *         description: All shorturl links created by the user
 *       401:
 *         description: Invalid Token
 *       404:
 *         description: User not found
 */
exports.getLinks = {};

/**
 * @swagger
 * /qr/scan:
 *   get:
 *     summary: Generate qr code for the short url
 *     tags:
 *       - URL Shortening
 *     parameters:
 *       - in: body
 *         name: shortUrl
 *         required: true
 *         type: string
 *         description: The url to be found
 *       - in: Bearer token
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token to authenticate user
 *     responses:
 *       200:
 *         description: Generates qr code for the url
 *       401:
 *         description: Invalid Token
 *       404:
 *         description: Url not found
 */
exports.scanQr = {};
