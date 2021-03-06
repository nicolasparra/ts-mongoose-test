import UserService from "../../services/User.service";

const userService = new UserService();

const userResolvers = {
  Query: {
    getUsers: async () => {
      return await userService.getAll();
    },
  },
  Mutation: {
    async createTask(parent, { task }, context, info) {
      //   const { title, description } = task;
      //   const newTask = new Task({ title, description });
      //   await newTask.save();
      //   return newTask;
    },
    async deleteTask(_, { id }) {
      //   await Task.findByIdAndDelete(id);
      //   return "Task Deleted";
    },
    async updateTask(_, { id, task }) {
      //   const { title, description } = task;
      //   const newTask = await Task.findByIdAndUpdate(
      //     id,
      //     {
      //       $set: {
      //         title,
      //         description,
      //       },
      //     },
      //     {
      //       new: true,
      //     }
      //   );
      //   return newTask;
    },
  },
};

export { userResolvers };
