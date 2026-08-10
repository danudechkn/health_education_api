import db from "../../../models/it-center/index";
import { Op } from "sequelize";

export class SurveyService {
    static async addActiveSurvey(body: any) {
        const {
            session_id,
            score_q1,
            score_q2,
            score_q3,
            feedback
        } = body;

        // 1. ตรวจสอบคะแนนให้อยู่ในช่วง 1-5
        const scores = [score_q1, score_q2, score_q3];
        for (let i = 0; i < scores.length; i++) {
            if (typeof scores[i] !== 'number' || scores[i] < 1 || scores[i] > 5) {
                throw new Error(`คำถามที่ ${i + 1} ไม่ถูกต้อง (ต้องเป็นตัวเลขระหว่าง 1-5)`);
            }
        }
        if (!session_id) {
            throw new Error("กรุณาส่ง session_id (หรือ order id) เพื่อใช้ตรวจสอบการประเมินซ้ำ");
        }

        const existingSurvey = await db.Surveys.findOne({ where: { session_id } });
        if (existingSurvey) {
            throw new Error("ออเดอร์หรือเซสชันนี้ได้รับการประเมินไปแล้ว");
        }

        const data = await db.Surveys.create({
            session_id,
            score_q1,
            score_q2,
            score_q3,
            feedback
        });

        return data;
    }

    static async trackVisit(req: any) {
        const todayStr = new Date().toLocaleDateString("en-CA");
        const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
        const ipAddress = ip.split(',')[0].trim();

        const data = await db.VisitorLog.create({
            ip_address: ipAddress,
            visit_date: todayStr
        });
        return data;
    }

    static async getDashboardStats() {
        const todayStr = new Date().toLocaleDateString("en-CA");
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoStr = thirtyDaysAgo.toLocaleDateString("en-CA");

        // 1. Visitor Stats
        const visitorsToday = await db.VisitorLog.count({
            where: {
                visit_date: todayStr
            }
        });

        const visitorsMonth = await db.VisitorLog.count({
            where: {
                visit_date: {
                    [Op.gte]: thirtyDaysAgoStr
                }
            }
        });

        const visitorsTotal = await db.VisitorLog.count();

        // 2. Survey Stats (Review Scores)
        const totalReviews = await db.Surveys.count();

        const ratings = await db.Surveys.findOne({
            attributes: [
                [db.sequelize.fn("AVG", db.sequelize.col("score_q1")), "avg_q1"],
                [db.sequelize.fn("AVG", db.sequelize.col("score_q2")), "avg_q2"],
                [db.sequelize.fn("AVG", db.sequelize.col("score_q3")), "avg_q3"],
            ],
            raw: true
        });

        // 3. Comments/Feedback
        const recentFeedback = await db.Surveys.findAll({
            where: {
                feedback: {
                    [Op.and]: [
                        { [Op.not]: null },
                        { [Op.ne]: "" }
                    ]
                }
            },
            order: [["created_at", "DESC"]],
            limit: 50
        });

        const avgQ1 = parseFloat(ratings?.avg_q1 || "0");
        const avgQ2 = parseFloat(ratings?.avg_q2 || "0");
        const avgQ3 = parseFloat(ratings?.avg_q3 || "0");
        const avgOverall = totalReviews > 0 ? (avgQ1 + avgQ2 + avgQ3) / 3 : 0;

        return {
            visitors: {
                today: visitorsToday,
                month: visitorsMonth,
                total: visitorsTotal
            },
            reviews: {
                total: totalReviews,
                avg_q1: avgQ1.toFixed(2),
                avg_q2: avgQ2.toFixed(2),
                avg_q3: avgQ3.toFixed(2),
                avg_overall: avgOverall.toFixed(2)
            },
            feedbacks: recentFeedback
        };
    }
}