const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLInt, GraphQLString, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLNonNull } = graphql;

const Movie = require("../models/Movie");
const Director = require("../models/Director");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(directors, { id: parent.directorId });
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        //parenttan RootQuery resolve içerisinden dönen veri gelir
        //return _.filter(movies, { directorId: parent.id });
        console.log(parent);
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(movies, { id: args.id });
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(directors, { id: args.id });
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
        directorId: { type: GraphQLString },
      },
      resolve(parent, args) {
        const movie = new Movie({
          title: args.title,
          description: args.description,
          year: args.year,
          directorId: args.directorId,
        });

        return movie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const director = new Director({
          name: args.name,
          birth: args.birth,
        });

        return director.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
