export default (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  })
  return Cart
}
