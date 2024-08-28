import Blog from "../../models/blog.js";

export const createBlog = async (req, res)=>{

    try {
        const { title, description, status, category } = req.body;

        const isExistingBlog = await Blog.findOne({ title });
        if (isExistingBlog) {
            return res.status(400).json({
                message: "Blog already exists",
                success: false
            });
        }

        const newBlog = new Blog({
            title,
            description,
            status,
            category
        });

        await newBlog.save();
        return res.status(201).json({
            message: "Blog registered successfully",
            success: true,
            newBlog
        });

    } catch (error) {
        console.error(error); 
       return  res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const deleteBlog = async(req, res)=> {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

            return res.status(200).json({
            message: "Blog deleted successfully",
            success: true
        });

    } catch (error) {
      console.error(error);
         return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const viewBlog = async (req, res)=>{
    try {
        const blogView = await Blog.find()
        if(!blogView){
            return res.status(400).json({
                message:"No blog found",
                success:false,
              
            })
        }
        return res.status(200).json({
            message:"Blogs fetch succcessfully",
            success:true,
            blogView
        })

    } catch (error) {
        console.error(error)
    return  res.status(404).json({
            message:"Internal Server Error",
            success:false,
            error
        })
        
    }
}

export const updateBlog = async (req, res)=>{
    try {
        const {id}= req.params

       const blogUpdate = await Blog.findByIdAndUpdate(id)

       if(!blogUpdate){
       return res.status(400).json({
            message:"Blog not found",
            success:false
        })
       }
        
      return res.status(201).json({
        message:"Blog update successfully",
        success:true,
        blogUpdate
       })
        }
        
     catch (error) {
        res.status(404).json({
            message:"Internal Server Error",
            success:false,
            error
        })
        
    }
}
export const singleViewBlog = async(req, res)=>{
    try {

        const { id } = req.params;
        const blogView = await Blog.findById(id)

        if(!blogView){
           return  res.status(400).json({
            message:"No blog found",
            success:false
           })

        }
        return res.status(200).json({
            message:"View Blog",
            success:false,
            blogView
        
        })
    } catch (error) {
        
        console.error(error)
       return res.status(404).json({
            message:"Internal Server Error",
            sucess:false,
            error
        })
    }
}

