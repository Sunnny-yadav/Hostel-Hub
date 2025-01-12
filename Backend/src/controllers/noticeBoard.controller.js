import { NoticeBoard } from "../Models/notice.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.js";

const storeNotice = AsyncHandeller(async (req, res, next) => {
  const { notice } = req.body;
  const { _id } = req.userData;

  if (!notice) {
    return next({
      status: 400,
      message: "Textbox is empty",
    });
  };

  const reveiwNotice = await NoticeBoard.findOne({
    notice
  });

  if(reveiwNotice){
    return next({
        status:400,
        message:"Notice Already Posted"
    })
  };



  const storedNotice = await NoticeBoard.create({
    notice,
    wardenId: _id,
  });

  if (!storedNotice) {
    return next({
      status: 400,
      message: "Notice not Created",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, storedNotice, "Notice Added Successful"));
});

const getLatestNotice = AsyncHandeller(async (req, res, next) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const latestNotice = await NoticeBoard
    .find({
    createdAt: { $gte: date },
  })
    .sort({ createdAt: -1 })
    .limit(1);

  if (latestNotice.length === 0) {
    return next({
      status: 400,
      message: "No Notice Posted today",
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, latestNotice[0], "latestNotice fetching successful"),
    );
});



export { storeNotice, getLatestNotice };
