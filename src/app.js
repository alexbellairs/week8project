const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
} = require("./movie/functions");

const app = async (yargsObj) => {
  try {
    await sequelize.sync({ alter: true });
    if (yargsObj.add) {
      // add something to movie table
      await addMovie({
        title: yargsObj.title,
        actor: yargsObj.actor,
        rating: yargsObj.rating,
      });
    } else if (yargsObj.list) {
      //list content of movie table
      await listMovies();
    } else if (yargsObj.update) {
      //update one entry in movie table

      const criteria = { title: yargsObj.update };
      let update = {};
      if (yargsObj.title) {
        update = { ...update, title: yargsObj.title };
      }
      if (yargsObj.actor) {
        update = { ...update, actor: yargsObj.actor };
      }
      if (yargsObj.rating) {
        update = { ...update, rating: yargsObj.rating };
      }

      await updateMovie(criteria, update);
    } else if (yargsObj.delete) {
      {
        await deleteMovie({ title: yargsObj.title });
      }
    } else {
      console.log("Incorrect Command");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
};

app(yargs.argv);
