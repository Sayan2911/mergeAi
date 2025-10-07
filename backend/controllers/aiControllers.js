import Channel from "../models/Channel.js";
import Message from "../models/Message.js";
import { aiApiCall } from "../utils/aiApiCall.js";

export const newPromptQuery = async (req, res) => {
  try {
    const { prompt, isFirstAi, isSecondAi, isThirdAi } = req.body;
    const channelId = req.params.channelId;
    const userId = req.user;

    let channel;
    let isNewChannel = false;
    if (!channelId) {
      channel = await Channel.create({
        userId: userId, // comes from protect middleware
        prompts: [],
      });
      isNewChannel = true;
    } else {
      channel = await Channel.findById(channelId);
      isNewChannel = false;
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }
    }

    const lastMessage = await Message.findOne({ channelId: channel._id }).sort({
      promptIndex: -1,
    });
    const nextIndex =
      lastMessage && typeof lastMessage.promptIndex === "number"
        ? lastMessage.promptIndex + 1
        : 1;

    const userMessage = await Message.create({
      channelId: channel._id,
      role: "user",
      content: prompt,
      promptIndex: nextIndex,
    });

    const finalChannelId = channel._id.toString();

    const aiResponses = await aiApiCall(
      prompt,
      isFirstAi,
      isSecondAi,
      isThirdAi
    );
    const normalizeResponse = (resp) => {
      if (!resp) return "";
      if (typeof resp === "string") return resp;
      if (resp.content) return resp.content;
      return JSON.stringify(resp);
    };

    const aiMessages = [];

    if (aiResponses.firstAi) {
      aiMessages.push({
        channelId: channel._id,
        role: "assistant",
        model: "gemma-3",
        content: normalizeResponse(aiResponses.firstAi),
        promptIndex: nextIndex,
      });
    }

    if (aiResponses.secondAi) {
      aiMessages.push({
        channelId: channel._id,
        role: "assistant",
        model: "gpt-oss-20b",
        content: normalizeResponse(aiResponses.secondAi),
        promptIndex: nextIndex,
      });
    }

    if (aiResponses.thirdAi) {
      aiMessages.push({
        channelId: channel._id,
        role: "assistant",
        model: "meta-llama/llama-4-maverick:free",
        content: normalizeResponse(aiResponses.thirdAi),
        promptIndex: nextIndex,
      });
    }

    await Message.insertMany(aiMessages); // faster than multiple create calls

    res.json({
      channelId: finalChannelId,
      promptIndex: nextIndex,
      // userMessage,
      aiMessages,
      isNewChannel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteChatByChannelId = async (req, res) => {
  try {
    const { channelId } = req.body;
    let channel;
    if (!channelId) {
      return res.status(404).json({ message: "Channel id is not given" });
    } else {
      channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      } else {
        // 1️⃣ Delete all messages in this channel
        await Message.deleteMany({ channelId: channel._id });

        // 2️⃣ Delete the channel itself
        await Channel.findByIdAndDelete(channel._id);

        res.json({ message: "Channel and messages deleted successfully" });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "problem when deleting chat by channel id" });
  }
};

export const allChannelId = async (req, res) => {
  try {
    const userId = req.user; // comes from protect middleware

    // Fetch all channels that belong to this user
    const channels = await Channel.find({ userId }).select("_id createdAt");

    res.json({ channels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem when fetching all channel id" });
  }
};
export const allMessage = async (req, res) => {
  try {
    const channelId = req.params.channelId; // comes from protect middleware

    // Fetch all channels that belong to this user
    const meassages = await Message.find({ channelId }).select(
      "_id promptIndex role content createdAt"
    );

    res.json({ meassages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem when fetching all meassage" });
  }
};
