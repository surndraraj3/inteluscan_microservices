import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    item_name: {
      type: String
    },
    item_code: {
      type: String
    },
    item_description: {
      type: String
    },
    company_name: {
      type: String
    },
    item_status: {
      default: 'active',
      type: String
    }
  },
  {
    timestamps: true
  }
);
productSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      item_name: this.item_name,
      item_code: this.item_code,
      company_name: this.company_name,
      item_description: this.item_description,
      item_status:this.item_status
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};
const model = mongoose.model("Product", productSchema);

export const schema = model.schema;
export default model;
