import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";

const register_User = AsyncHandeller(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "tested successfully" },
        "registration of user done",
      ),
    );
});

export { register_User };
