import db from "../../../models/it-center/index";

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
}