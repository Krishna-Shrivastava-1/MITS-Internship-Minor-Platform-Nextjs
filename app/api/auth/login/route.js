

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { studentModel } from "@/models/student";
import { teacherModel } from "@/models/teacher";
import database from "@/Database/db";
import { loginRateLimiter } from "@/rateLimit/rateLimiter";

const secretKey = process.env.SecretKey;
const secretAdminEmail = process.env.SecretAdminEmail;
export async function POST(req) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "unknown";
        // console.log('ip - ', ip)
        await loginRateLimiter.consume(ip);
        const { email, password, enrollmentNumber } = await req.json();
        await database();
        if (!email || !password) {
            return NextResponse.json({
                message: "Please Fill All Fields",
                error: 401,
                success: false,
            });
        }

        const user = await studentModel.findOne({ email });
        const teacher = await teacherModel.findOne({ email })
        // if (!user) {
        //     return NextResponse.json({
        //         message: "User Not Found",
        //         success: false,
        //     });
        // }

        if (!teacher && !user) {
            return NextResponse.json({
                message: "Invalid Credential",
                // message: "User Not Found",
                success: false,
            });
        }

        // console.log(teacher?._id)
        const ispasswordcorrect = await bcrypt.compare(password, user?.password || teacher?.password);
        if (!ispasswordcorrect) {
            return NextResponse.json({
                message: "Invalid Credential",
                success: false,
            });
        }
        const role = email === secretAdminEmail ? "superadmin" : user?.role || teacher?.role;
        const token = jwt.sign(
            {
                id: user?._id || teacher?._id,
                role
            },
            secretKey,
            { expiresIn: "1d" }
        );
        if (user) {

            await studentModel.findByIdAndUpdate(user?._id, { role });
        } else if (teacher) {
            await teacherModel.findByIdAndUpdate(teacher?._id, { role });
        }
        const oneday = 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + oneday);
        const res = NextResponse.json({
            // token: token,
            message: `Logged in Successfully`,
            // message: `Logged in Successfully User - ${user.name}`,
            success: true,
            role,
            _id: user?._id

        });
        try {
            await loginRateLimiter.delete(ip);
        } catch (e) {
            console.warn("Failed to reset limiter:", e.message);
        }
        res.cookies.set("authtoken", token, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60,
        });

        return res

    } catch (error) {

        // console.log('error from login ', error);
        return NextResponse.json({
            message: `${error?.remainingPoints > 0 ? 'Server Error' : `Too many requests, try again in ${Math.ceil(error.msBeforeNext / 1000)}s`}`,
            success: false,
        });
    }
}