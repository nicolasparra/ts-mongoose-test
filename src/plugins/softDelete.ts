import mongoose from "mongoose";

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
    },
    deletedAt: {
      type: Date,
      default: null,
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
    this.pipeline().unshift({ $match: { isDeleted: false } });
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
};

export { softDeletePlugin };
