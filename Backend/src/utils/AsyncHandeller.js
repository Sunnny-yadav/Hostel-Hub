export const AsyncHandeller = (requestHandeller) => {
    return (req, res, next)=>{
        Promise.resolve(requestHandeller(req, res, next)).catch((err)=> next(err))
    }
};

// export const AsyncHandeller = (requesthandeller) => async (req,res, next)=>{
//     try {
//         await requesthandeller(req,res,next)
//     } catch (error) {
//         console.log("errror is asynchandeller")
//     }
// }