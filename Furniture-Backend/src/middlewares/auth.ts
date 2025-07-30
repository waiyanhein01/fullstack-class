// import { userData } from "./../../prisma/seed";
import { Request, Response, NextFunction } from "express";
import { errorCode } from "../../config/errorCode";
import { getUserById, updateUser } from "../services/authService";
import { createError } from "../utils/errorUtil";

import jwt from "jsonwebtoken";

interface UserIdRequest extends Request {
  userId?: number;
}

export const auth = (req: UserIdRequest, res: Response, next: NextFunction) => {
  //if mobile request, use headers
  // const platform = req.headers["x-platform"];
  // if (platform === "mobile") {
  //   const accessTokenMobile = req.headers.authorization?.split(" ")[1];
  //   console.log("accessTokenMobile", accessTokenMobile);
  // } else {
  //   //if web request, use cookies
  //   console.log("from web");
  // }

  const accessToken = req.cookies ? req.cookies.accessToken : null;
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;

  if (!refreshToken) {
    return next(
      createError(
        "You are unauthenticated user.",
        401,
        errorCode.unauthenticated
      )
    );
  }

  // Generate new access token and refresh token if access token is expired
  const generateNewToken = async () => {
    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as {
        id: number;
        phone: string;
      };
    } catch (err) {
      return next(
        createError(
          "You are unauthenticated user.",
          401,
          errorCode.unauthenticated
        )
      );
    }

    if (isNaN(decodedRefreshToken.id)) {
      return next(
        createError(
          "You are unauthenticated user.",
          401,
          errorCode.unauthenticated
        )
      );
    }

    const user = await getUserById(decodedRefreshToken.id);

    if (!user) {
      return next(
        createError(
          "You are unauthenticated user.",
          401,
          errorCode.unauthenticated
        )
      );
    }

    if (user.phone !== decodedRefreshToken.phone) {
      return next(
        createError(
          "You are unauthenticated user.",
          401,
          errorCode.unauthenticated
        )
      );
    }

    if (user.randToken !== refreshToken) {
      return next(
        createError(
          "You are unauthenticated user.",
          401,
          errorCode.unauthenticated
        )
      );
    }

    const accessTokenPayload = {
      id: user!.id,
    };

    const refreshTokenPayload = {
      phone: user!.phone,
      id: user!.id,
    };

    const newAccessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 60 * 15,
      }
    );

    const newRefreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const userData = {
      randToken: newRefreshToken,
    };

    await updateUser(user!.id, userData);

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

    req.userId = user.id;
    next();
  };

  // Check if access token is present and expires
  if (!accessToken) {
    generateNewToken(); // await generateNewToken();
  } else {
    let decodedAccessToken;
    try {
      decodedAccessToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as {
        id: number;
      };

      // Check number type
      if (isNaN(decodedAccessToken.id)) {
        return next(
          createError(
            "You are unauthenticated user.",
            401,
            errorCode.unauthenticated
          )
        );
      }

      req.userId = decodedAccessToken.id;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        generateNewToken();
      } else {
        return next(createError("Token is invalid.", 400, errorCode.attack));
      }
    }
  }
};
