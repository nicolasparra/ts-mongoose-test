import mongoose from "mongoose";

/*
Para agregar los eliminados a las aggregation se 
debe colocar un match el comienzo con isDeleted:true
*/

export type TWithSoftDeleted = {
  isDeleted: boolean;
  deletedAt: Date | null;
};

type TDocument = TWithSoftDeleted & mongoose.Document;

const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      select: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  });

  const typesFindQueryMiddleware = [
    "count",
    "find",
    "findOne",
    "findOneAndDelete",
    "findOneAndRemove",
    "findOneAndUpdate",
    "update",
    "updateOne",
    "updateMany",
  ];

  const excludeInFindQueriesIsDeleted = async function (this, next) {
    this.where({ isDeleted: false });
    next();
  };

  const excludeInDeletedInAggregateMiddleware = async function (
    this: mongoose.Aggregate<any>,
    next
  ) {
    const isDelete = this.pipeline()[0]["$match"]
      ? this.pipeline()[0]["$match"].isDeleted
        ? this.pipeline()[0]["$match"].isDeleted
        : false
      : false;
    if (!isDelete) {
      this.pipeline().unshift({ $match: { isDeleted: false } });
    } else {
      this.pipeline().shift();
    }
    console.log(this.pipeline());
    next();
  };

  schema.statics.deleteOne = async function (option: Object, cb) {
    const updatedSchema = await this.updateOne(option, {
      isDeleted: true,
      deletedAt: new Date(),
    });

    return updatedSchema;
  };

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });

  schema.pre("aggregate", excludeInDeletedInAggregateMiddleware);
  // schema.statics.aggregate = async function (option: Object, cb) {
  //   console.log(this);
  // };
};

export { softDeletePlugin };
