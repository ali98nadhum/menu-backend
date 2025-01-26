

const checkTitle = async (title, model) => {
    try {
        const existingTitle = await model.findOne({ title });
        if (existingTitle) {
            return { success: false, message: "Title already exists" };
        }
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
  }


 

  
  module.exports = {
    checkTitle,
  }