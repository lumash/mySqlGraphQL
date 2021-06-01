const Meal = require("./models/meals");
const Order = require("./models/orders");
const OrderItem = require("./models/order_items");
const { Op } = require("sequelize");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const mealType = new GraphQLObjectType({
  name: "Meal",
  description: "this is the meal info",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    imageLink: { type: GraphQLString },
    active: { type: GraphQLInt },
    createdDate: { type: GraphQLString },
  }),
});

const orderType = new GraphQLObjectType({
  name: "Order",
  description: "order details",
  fields: () => ({
    id: { type: GraphQLID },
    useName: { type: GraphQLString },
    userPhone: { type: GraphQLString },
    userAddress: { type: GraphQLString },
    totalPrice: { type: GraphQLInt },
    orderDate: { type: GraphQLString },
    items: {
      type: GraphQLList(orderItemType),
      resolve: async (parent) => {
        try {
          return await OrderItem.findAll({ orderId: parent.id });
        } catch (error) {
          console.log("Error:", error);
        }
      },
    },
  }),
});

const orderItemType = new GraphQLObjectType({
  name: "OrderItem",
  description: "order item details",
  fields: () => ({
    id: { type: GraphQLID },
    quntity: { type: GraphQLInt },
    totalPrice: { type: GraphQLInt },
    mealId: { type: GraphQLID },
    orderId: { type: GraphQLID },
    item: {
      type: mealType,
      resolve: async (parent) => {
        try {
          const res = await Meal.findAll({
            where: {
              id: parent.mealId,
            },
          });
          console.log("res: ", res);
          return res[0].dataValues;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    },
    // order: {
    //   type: orderType,
    //   resolve: (parent) => {
    //     return Order.findById(parent.orderId);
    //   },
    // },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    //// meals queries start .. working
    meals: {
      type: new GraphQLList(mealType),
      resolve: async () => {
        return await Meal.findAll();
      },
    },
    mealById: {
      type: mealType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const res = await Meal.findAll({
          where: {
            id: args.id,
          },
        });
        return res[0].dataValues;
      },
    },
    mealByName: {
      type: new GraphQLList(mealType),
      args: { name: { type: GraphQLString } },
      resolve: async (parent, args) => {
        try {
          const res = await Meal.findAll({
            where: {
              name: args.name,
            },
          });
          let result = [];
          for (const item of res) {
            result.push(item.dataValues);
          }
          return result;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    },
    //// orders queries
    orders: {
      type: new GraphQLList(orderType),
      resolve: async () => {
        return await Order.findAll();
      },
    },
    orderById: {
      type: orderType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const res = await Order.findAll({
          where: {
            id: args.id,
          },
        });
        return res[0].dataValues;
      },
    },
    orderByUserName: {
      type: new GraphQLList(orderType),
      args: { name: { type: GraphQLString } },
      resolve: async (parent, args) => {
        try {
          const res = await Order.findAll({
            where: {
              useName: args.name,
            },
          });
          let result = [];
          for (const item of res) {
            result.push(item.dataValues);
          }
          return result;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    },
    //////// orders queries end
    ////// order_items
    orderItems: {
      type: new GraphQLList(orderItemType),
      resolve: async () => {
        return await OrderItem.findAll();
      },
    },
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addMeal: {
      // works well
      type: mealType,
      description: "add a meal: name, price, active",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        active: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        try {
          const meal = await Meal.create(args);
          console.log(meal.toJSON());
          return meal;
        } catch (err) {
          console.log("Error: ", err.errors[0].message);
        }
      },
    },
    addOrder: {
      // works fine
      type: orderType,
      description:
        "add an order (userName, userPhone, userAddress, totalPrice)",
      args: {
        useName: { type: GraphQLString },
        userPhone: { type: GraphQLString },
        userAddress: { type: GraphQLString },
        totalPrice: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        try {
          const order = await Order.create(args);
          console.log(order.toJSON());
          return order;
        } catch (err) {
          console.log("Error: ", err.errors[0].message);
        }
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
