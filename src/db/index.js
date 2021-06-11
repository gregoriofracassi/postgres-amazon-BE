import s from "sequelize"
import pg from "pg"
const Sequelize = s.Sequelize
const DataTypes = s.DataTypes
import ProductModel from "./products.js"
import CartModel from "./carts.js"
import ReviewModel from "./reviews.js"
import UserModel from "./users.js"
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
})
const pool = new pg.Pool()
const test = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

const models = {
  Product: ProductModel(sequelize, DataTypes),
  Cart: CartModel(sequelize, DataTypes),
  Review: ReviewModel(sequelize, DataTypes),
  User: UserModel(sequelize, DataTypes),
  sequelize: sequelize,
  pool: pool,
}

// models.Author.hasMany(models.Blog, {
//   foreignKey: { allowNull: false },
//   onDelete: "CASCADE",
// })
// models.Blog.belongsTo(models.Author, {
//   foreignKey: { allowNull: false },
//   onDelete: "CASCADE",
// })

// product and users thru cart
models.User.belongsToMany(models.Product, {
  through: models.Cart,
  unique: false,
})
models.Product.belongsToMany(models.User, {
  through: models.Cart,
  unique: false,
})

models.User.hasMany(models.Cart)
models.Cart.belongsTo(models.User)

models.Product.hasMany(models.Cart)
models.Cart.belongsTo(models.Product)

// products and users thru reviews
models.User.belongsToMany(models.Product, {
  through: { model: models.Review, unique: false },
})
models.Product.belongsToMany(models.User, {
  through: models.Review,
  unique: false,
})

models.User.hasMany(models.Review)
models.Review.belongsTo(models.User)

models.Product.hasMany(models.Review)
models.Review.belongsTo(models.Product)

test()

export default models
