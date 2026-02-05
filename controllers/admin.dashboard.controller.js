import { getDashboardStatsService } from "../services/admin.dashboard.service.js";

export const getDashboardStatsController = async (req, res, next) => {
  try {
    const data = await getDashboardStatsService();
    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e);
  }
};
