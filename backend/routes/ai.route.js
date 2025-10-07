import express from "express"
import { allChannelId, allMessage, deleteChatByChannelId, newPromptQuery } from "../controllers/aiControllers.js";

const aiRouter = express.Router()


aiRouter.post("/channel/:channelId",newPromptQuery)
aiRouter.post("/delChat",deleteChatByChannelId)
aiRouter.post("/channels/allChnnels",allChannelId)
aiRouter.post("/channels/allMessages/:channelId", allMessage)

export default aiRouter;