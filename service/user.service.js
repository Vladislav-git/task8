const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const mydb = new Sequelize('postgres://postgres:1234@127.0.0.1:5432/mydb');
const usersmodel = mydb.define('users', {
	login: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	picture_path: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});
usersmodel.sequelize.sync();


class UsersService {

	me = async (login) => {
		return usersmodel.findOne({where: {login : login}})
			.then(data => data)
			.catch(err => 'no such ')
	};


	login = async (login, pass) => {
		return usersmodel.findOne({where: {login : login}})
			.then(data => {
				if (bcrypt.compareSync(pass, data.password) === true) {
					const token = jwt.sign({ login }, 'somesecretkey');
					return token;
				} else {
					return 'wrong password';
				};
			})
			.catch(err => 'wrong login')

	};

	getUsers = async () => {
		return usersmodel.findAll()
			.then(data => data)
			.catch(err => 'Try again')
	};

	getUserById = async (id) => {
		return usersmodel.findByPk(id)
			.then(data => data)
			.catch(err => 'User not found')
	};

	addUser = async (body, path) => {
		console.log(path);
		const password = JSON.parse(body.data).password;
		const login = JSON.parse(body.data).login;
		const cryptedpass = bcrypt.hashSync(password, 10);
		return usersmodel.findOrCreate({where: {login: login, password: cryptedpass, picture_path: path}})
			.then(() => 'user created')
			.catch(err => err.message)
	};

	changeUser = async (body, id) => {
		return usersmodel.findByPk(id)
			.then(data => {
				data.password = body.password;
				return data;
			})
			.catch(err => err.message)
	};

	deleteUser = async (id) => {
		return usersmodel.destroy({where:{id:`${id}`}})
			.then(data => 'user deleted')
			.catch(err => err.message)
	};
};


module.exports = new UsersService();